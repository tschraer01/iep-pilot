import { NextRequest, NextResponse } from 'next/server'

interface GenerateIEPRequest {
  studentId: string
  goalIds: string[]
}

interface IEPContent {
  presentLevels: string
  goals: string[]
  accommodations: string[]
  services: string[]
}

// Mock student and goal data - in production, would query Supabase
const mockStudents: Record<string, any> = {
  STU001: {
    name: 'Michael Chen',
    grade: '3rd',
    disability: 'SLD',
    readingLevel: 'Below grade level',
    mathLevel: 'Grade level',
    socialEmotional: 'Has difficulty with peer interactions',
  },
  STU002: {
    name: 'Emma Rodriguez',
    grade: '5th',
    disability: 'ADHD',
    readingLevel: 'Grade level',
    mathLevel: 'Above grade level',
    socialEmotional: 'Impulsive, needs behavior support',
  },
  STU003: {
    name: 'James Wilson',
    grade: '2nd',
    disability: 'Autism',
    readingLevel: 'Grade level',
    mathLevel: 'Grade level',
    socialEmotional: 'Challenges with social communication',
  },
}

const mockGoals: Record<string, any> = {
  G001: {
    text: 'Student will read grade-level texts with 90% accuracy',
    domain: 'Reading',
  },
  G002: {
    text: 'Student will solve two-digit addition problems with 85% accuracy',
    domain: 'Math',
  },
  G003: {
    text: 'Student will initiate conversations with peers during unstructured time',
    domain: 'Social Skills',
  },
  G004: {
    text: 'Student will independently complete morning hygiene routine',
    domain: 'Self-Care',
  },
}

async function callAnthropicAPI(
  student: any,
  selectedGoals: any[]
): Promise<IEPContent> {
  const apiKey = process.env.ANTHROPIC_API_KEY

  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY not configured')
  }

  const prompt = `You are an expert special education IEP writer. Generate a comprehensive IEP section based on this student information and goals.

Student: ${student.name}
Grade: ${student.grade}
Disability Category: ${student.disability}
Reading Level: ${student.readingLevel}
Math Level: ${student.mathLevel}
Social-Emotional: ${student.socialEmotional}

Selected Goals:
${selectedGoals.map((g: any) => `- ${g.text}`).join('\n')}

Please provide:
1. A Present Levels section (2-3 sentences describing current academic and functional performance)
2. 3-4 Measurable Annual Goals (specific, measurable, achievable)
3. 3-4 Appropriate Accommodations (based on the disability and goals)
4. 2-3 Special Education Services (frequency and duration)

Format your response as JSON with keys: presentLevels, goals (array), accommodations (array), services (array)
Ensure the JSON is valid and can be parsed.`

  const response = await fetch('https://api.anthropic.com/v1/messages/batches', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    }),
  })

  if (!response.ok) {
    console.error('Anthropic API error:', await response.text())
    throw new Error(`Anthropic API error: ${response.status}`)
  }

  const data = await response.json()

  // Extract content from response
  let contentText = ''
  if (data.content && data.content[0] && data.content[0].text) {
    contentText = data.content[0].text
  }

  // Parse JSON from response
  const jsonMatch = contentText.match(/\{[\s\S]*\}/)
  if (!jsonMatch) {
    throw new Error('Could not parse IEP content from API response')
  }

  const parsedContent = JSON.parse(jsonMatch[0])

  return {
    presentLevels: parsedContent.presentLevels,
    goals: parsedContent.goals,
    accommodations: parsedContent.accommodations,
    services: parsedContent.services,
  }
}

function generateMockIEP(
  student: any,
  selectedGoals: any[]
): IEPContent {
  // Fallback mock generation if API fails
  return {
    presentLevels: `${student.name} is a ${student.grade} grade student with ${student.disability}. Currently, reading performance is ${student.readingLevel}, math performance is ${student.mathLevel}, and social-emotional functioning shows the following: ${student.socialEmotional}. Student demonstrates both strengths and areas needing support across academic and functional domains.`,
    goals: selectedGoals.map(
      (g: any) =>
        `${g.text} as measured by curriculum-based measurement probes and teacher observations.`
    ),
    accommodations: [
      'Extended time on assessments',
      'Preferential seating',
      'Use of graphic organizers',
      'Reduced distractions for independent work',
    ],
    services: [
      'Special education services: 60 minutes per day in small group instruction',
      'Speech and language services: 30 minutes per week',
      'Behavioral support services: Consultation as needed',
    ],
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: GenerateIEPRequest = await request.json()

    if (!body.studentId || !body.goalIds || body.goalIds.length === 0) {
      return NextResponse.json(
        { error: 'Missing studentId or goalIds' },
        { status: 400 }
      )
    }

    const student = mockStudents[body.studentId]
    if (!student) {
      return NextResponse.json(
        { error: 'Student not found' },
        { status: 404 }
      )
    }

    const selectedGoals = body.goalIds
      .map((id: string) => mockGoals[id])
      .filter(Boolean)

    if (selectedGoals.length === 0) {
      return NextResponse.json(
        { error: 'No valid goals found' },
        { status: 400 }
      )
    }

    // Try to call Anthropic API, fallback to mock if it fails
    let iepContent: IEPContent
    try {
      iepContent = await callAnthropicAPI(student, selectedGoals)
    } catch (error) {
      console.warn('Anthropic API failed, using mock generation:', error)
      iepContent = generateMockIEP(student, selectedGoals)
    }

    return NextResponse.json({
      success: true,
      content: iepContent,
    })
  } catch (error) {
    console.error('Error generating IEP:', error)
    return NextResponse.json(
      { error: 'Failed to generate IEP' },
      { status: 500 }
    )
  }
}
