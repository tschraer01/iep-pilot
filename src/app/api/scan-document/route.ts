import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = file.type || 'image/png'

    const isImage = mimeType.startsWith('image/')

    let content: Anthropic.Messages.MessageParam['content']

    if (isImage) {
      content = [
        {
          type: 'image',
          source: {
            type: 'base64',
            media_type: mimeType as 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp',
            data: base64,
          },
        },
        {
          type: 'text',
          text: `You are an expert at reading special education documents including IEPs, evaluation reports, and referral forms.

Extract any student information visible in this document and return it as a JSON object with these exact field names (use empty string "" if not found):
{
  "name": "student full name",
  "grade": "grade level (K, 1-12)",
  "dateOfBirth": "YYYY-MM-DD format",
  "disability": "disability category",
  "schoolDistrict": "school or district name",
  "teacher": "teacher or case manager name",
  "parentName": "parent or guardian name",
  "parentEmail": "parent email",
  "parentPhone": "parent phone number",
  "nextIepDate": "YYYY-MM-DD format",
  "presentLevels": "present levels of academic achievement text",
  "readingLevel": "reading level (e.g. 2nd grade)",
  "mathLevel": "math level (e.g. 4th grade)",
  "notes": "any other relevant notes or accommodations"
}

Return ONLY the JSON object with no additional text or explanation.`,
        },
      ]
    } else {
      // For non-image files (PDF, DOC, etc.), provide guidance to fill manually
      return NextResponse.json({
        extracted: {},
        message: 'PDF scanning requires image conversion. Please upload a PNG or JPG screenshot of the document, or fill in the form manually.',
      })
    }

    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content }],
    })

    const text = response.content[0].type === 'text' ? response.content[0].text : ''

    // Parse JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      return NextResponse.json({ extracted: {}, message: 'Could not parse extracted data' })
    }

    const extracted = JSON.parse(jsonMatch[0])

    // Remove empty string values so they don't overwrite existing form data
    const cleaned: Record<string, string> = {}
    for (const [key, value] of Object.entries(extracted)) {
      if (typeof value === 'string' && value.trim() && value !== 'N/A' && value !== 'Unknown') {
        cleaned[key] = value.trim()
      }
    }

    return NextResponse.json({ extracted: cleaned })
  } catch (error) {
    console.error('Scan document error:', error)
    return NextResponse.json({ extracted: {}, error: 'Failed to scan document' }, { status: 500 })
  }
}
