'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Search, Filter, Copy, CheckCircle, BookOpen, FileText, X } from 'lucide-react'
import Link from 'next/link'

interface Goal {
  id: string
  domain: string
  subdomain: string
  gradeBand: string
  category: string
  goalText: string
  shortTermObjectives: string[]
  measuredBy: string
  alignedStandards?: string
}

const GOALS: Goal[] = [
  // READING - DECODING
  { id:'G001',domain:'Reading',subdomain:'Decoding',gradeBand:'K-2',category:'Phonics',goalText:'By [annual review date], given a list of CVC, CVCE, and common vowel team words, [student] will decode words with 90% accuracy across 3 consecutive probe sessions, as measured by teacher-administered word reading assessments.',shortTermObjectives:['Identify all letter sounds in isolation with 95% accuracy','Blend 3-phoneme words (CVC) with 80% accuracy across 3 probes','Decode CVCE words with 85% accuracy across 3 probes'],measuredBy:'Curriculum-based assessment, timed word reading probes',alignedStandards:'CCSS.ELA-LITERACY.RF.1.3'},
  { id:'G002',domain:'Reading',subdomain:'Decoding',gradeBand:'3-5',category:'Phonics',goalText:'By [annual review date], given grade-level text, [student] will decode multisyllabic words by applying knowledge of syllabication rules with 85% accuracy across 3 consecutive probe sessions, as measured by curriculum-based reading assessments.',shortTermObjectives:['Identify and apply closed syllable pattern with 90% accuracy','Identify and apply open syllable pattern with 85% accuracy','Divide 2-syllable words correctly in 4 of 5 opportunities'],measuredBy:'Teacher-administered word lists, CBM reading probes',alignedStandards:'CCSS.ELA-LITERACY.RF.3.3'},
  // READING - FLUENCY
  { id:'G003',domain:'Reading',subdomain:'Fluency',gradeBand:'1-3',category:'Oral Reading Fluency',goalText:'By [annual review date], when given a grade-level reading passage, [student] will read with correct prosody at a rate of [X] words correct per minute (WCPM) with 95% accuracy, as measured by 3 consecutive timed oral reading fluency probes.',shortTermObjectives:['Read with appropriate phrasing and expression on familiar texts','Increase WCPM from baseline by 20% on grade-level passages','Self-correct decoding errors during oral reading in 3 of 5 opportunities'],measuredBy:'Weekly CBM oral reading fluency probes (AIMSweb, DIBELS)'},
  { id:'G004',domain:'Reading',subdomain:'Fluency',gradeBand:'3-5',category:'Oral Reading Fluency',goalText:'By [annual review date], [student] will increase oral reading fluency from [current WCPM] to [target WCPM] on grade-level passages, as measured by weekly curriculum-based measurement probes with 95% accuracy.',shortTermObjectives:['Read decodable texts fluently with minimal errors','Practice repeated reading of grade-level passages twice weekly','Demonstrate appropriate rate, accuracy, and prosody on familiar texts'],measuredBy:'AIMSweb, DIBELS, or teacher-created CBM probes'},
  // READING - COMPREHENSION
  { id:'G005',domain:'Reading',subdomain:'Comprehension',gradeBand:'3-5',category:'Main Idea',goalText:'By [annual review date], after reading a grade-level passage, [student] will identify the main idea and 3 supporting details with 80% accuracy across 4 out of 5 opportunities, as measured by written responses and teacher observation.',shortTermObjectives:['Distinguish main idea from supporting details in short paragraphs','Identify the main idea of a passage using graphic organizer support','State 2 supporting details for a given main idea with 75% accuracy'],measuredBy:'Written comprehension checks, teacher observation rubrics',alignedStandards:'CCSS.ELA-LITERACY.RI.4.2'},
  { id:'G006',domain:'Reading',subdomain:'Comprehension',gradeBand:'4-8',category:'Inference',goalText:'By [annual review date], when reading informational or literary text, [student] will make and confirm inferences using direct text evidence in 4 out of 5 opportunities, as measured by teacher observation and written responses.',shortTermObjectives:['Locate specific text evidence to support a given inference','Practice "think aloud" strategy to verbalize inference-making process','Use graphic organizers to connect text evidence with conclusions'],measuredBy:'Teacher observation, written responses, comprehension checks',alignedStandards:'CCSS.ELA-LITERACY.RI.5.1'},
  { id:'G007',domain:'Reading',subdomain:'Comprehension',gradeBand:'K-3',category:'Vocabulary',goalText:'By [annual review date], when encountering unknown vocabulary words during reading, [student] will use context clues, prefixes, or suffixes to determine word meaning with 75% accuracy across 4 out of 5 opportunities.',shortTermObjectives:['Identify context clues in a sentence to determine word meaning','Recognize common prefixes (un-, re-, pre-) and their meanings','Use a dictionary or glossary independently to confirm word meaning'],measuredBy:'Teacher observation, vocabulary assessments',alignedStandards:'CCSS.ELA-LITERACY.L.3.4'},
  // WRITING
  { id:'G008',domain:'Writing',subdomain:'Written Expression',gradeBand:'3-5',category:'Paragraph Writing',goalText:'By [annual review date], [student] will write a 5-sentence paragraph with a clear topic sentence, 3 supporting details, and a conclusion sentence with 90% of words spelled correctly, as measured across 3 consecutive writing samples.',shortTermObjectives:['Identify topic sentence, body sentences, and conclusion in a model paragraph','Write a topic sentence for a given topic with teacher support','Include at least 2 relevant supporting details in a written paragraph'],measuredBy:'Scored writing samples using district rubric',alignedStandards:'CCSS.ELA-LITERACY.W.4.2'},
  { id:'G009',domain:'Writing',subdomain:'Conventions',gradeBand:'1-3',category:'Mechanics',goalText:'By [annual review date], [student] will use correct capitalization (proper nouns, sentence beginnings) and end punctuation in all written sentences with 90% accuracy across 3 consecutive writing probes.',shortTermObjectives:['Capitalize the first word in a sentence 100% of the time across 3 probes','Use a period, question mark, or exclamation point at the end of sentences with 90% accuracy','Capitalize names and the pronoun "I" with 90% accuracy'],measuredBy:'Written work samples, editing exercises'},
  { id:'G010',domain:'Writing',subdomain:'Written Expression',gradeBand:'6-8',category:'Argumentative Writing',goalText:'By [annual review date], [student] will write a multi-paragraph argumentative essay that includes a clear claim, at least 2 pieces of text evidence, and a concluding statement, scoring a 3 or higher on the district 4-point writing rubric across 3 consecutive essays.',shortTermObjectives:['Identify claim and evidence in a sample argumentative text','Write a claim statement with appropriate hedging language','Cite at least one piece of text evidence with correct attribution'],measuredBy:'District writing rubric, teacher feedback',alignedStandards:'CCSS.ELA-LITERACY.W.7.1'},
  // MATH - OPERATIONS
  { id:'G011',domain:'Math',subdomain:'Operations',gradeBand:'2-4',category:'Multiplication',goalText:'By [annual review date], when given 20 single-digit multiplication facts (0-12), [student] will answer correctly in less than 3 minutes with 90% accuracy across 3 consecutive probe sessions.',shortTermObjectives:['Master x0 and x1 multiplication facts with 100% accuracy','Master x2 and x5 multiplication facts with 95% accuracy','Master x3 and x4 multiplication facts with 90% accuracy'],measuredBy:'Timed math fact probes, multiplication fact assessments'},
  { id:'G012',domain:'Math',subdomain:'Operations',gradeBand:'3-5',category:'Multi-digit Operations',goalText:'By [annual review date], [student] will add and subtract multi-digit whole numbers (up to 4 digits) using standard algorithm with 85% accuracy across 3 consecutive skill probes, as measured by curriculum-based math assessments.',shortTermObjectives:['Add 2-digit numbers with regrouping with 90% accuracy','Subtract 3-digit numbers with borrowing with 85% accuracy','Check answers using estimation or inverse operations'],measuredBy:'Curriculum-based math probes, classroom assessments',alignedStandards:'CCSS.MATH.CONTENT.4.NBT.B.4'},
  { id:'G013',domain:'Math',subdomain:'Operations',gradeBand:'4-6',category:'Fractions',goalText:'By [annual review date], [student] will add and subtract fractions with like and unlike denominators with 80% accuracy across 3 consecutive probes, as measured by curriculum-based math assessments.',shortTermObjectives:['Add fractions with like denominators with 90% accuracy','Find least common denominator for unlike fractions with teacher support','Add fractions with unlike denominators with 80% accuracy'],measuredBy:'Curriculum-based math assessments, chapter tests',alignedStandards:'CCSS.MATH.CONTENT.5.NF.A.1'},
  // MATH - PROBLEM SOLVING
  { id:'G014',domain:'Math',subdomain:'Problem Solving',gradeBand:'2-4',category:'Word Problems',goalText:'By [annual review date], [student] will solve grade-level one- and two-step word problems involving addition and subtraction with 80% accuracy across 4 out of 5 opportunities, as measured by teacher-created assessments.',shortTermObjectives:['Identify key words that signal addition or subtraction operations','Use a graphic organizer (CUBES strategy) to organize problem information','Solve one-step word problems with 85% accuracy'],measuredBy:'Teacher-created assessments, benchmark tests'},
  { id:'G015',domain:'Math',subdomain:'Problem Solving',gradeBand:'5-8',category:'Algebraic Reasoning',goalText:'By [annual review date], [student] will solve one-variable linear equations and inequalities with 80% accuracy across 3 consecutive assessments, demonstrating understanding of inverse operations.',shortTermObjectives:['Use inverse operations to isolate a variable in one-step equations','Solve two-step equations with whole number solutions with 80% accuracy','Graph solutions to inequalities on a number line'],measuredBy:'Chapter assessments, curriculum-based probes',alignedStandards:'CCSS.MATH.CONTENT.6.EE.B.7'},
  // SOCIAL-EMOTIONAL
  { id:'G016',domain:'Social-Emotional',subdomain:'Self-Regulation',gradeBand:'K-5',category:'Coping Skills',goalText:'By [annual review date], when experiencing frustration or anxiety, [student] will independently use a learned coping strategy (e.g., deep breathing, requesting a break, using a calm-down corner) in 4 out of 5 observed opportunities across 3 consecutive weeks.',shortTermObjectives:['Identify personal triggers for frustration with adult support','Practice 3 coping strategies during calm instruction time','Use a visual feelings thermometer to identify escalating emotions'],measuredBy:'Behavior observation data, ABC charts, teacher log'},
  { id:'G017',domain:'Social-Emotional',subdomain:'Social Skills',gradeBand:'K-3',category:'Peer Interaction',goalText:'By [annual review date], during structured group activities, [student] will take turns, share materials, and listen to peers without interrupting in 4 out of 5 opportunities, as measured by teacher observation data across 3 consecutive weeks.',shortTermObjectives:['Wait for a peer to finish speaking before responding in 3 of 5 opportunities','Share materials during cooperative activities without adult prompting in 3 of 5 opportunities','Use appropriate greetings and conversation starters with peers'],measuredBy:'Teacher observation, behavior log, social skills checklist'},
  { id:'G018',domain:'Social-Emotional',subdomain:'Self-Awareness',gradeBand:'3-8',category:'Emotional Identification',goalText:'By [annual review date], [student] will accurately identify and verbally label personal emotions using a feelings vocabulary chart or scale in 4 out of 5 daily check-ins across 3 consecutive weeks, as measured by teacher/counselor observation.',shortTermObjectives:['Identify at least 5 emotion words using a visual feelings chart','Match facial expressions to emotion words with 80% accuracy','Use "I feel ___ because ___" sentence frame in 3 of 5 opportunities'],measuredBy:'Daily check-in records, counselor observation notes'},
  // BEHAVIOR
  { id:'G019',domain:'Behavior',subdomain:'On-Task Behavior',gradeBand:'K-5',category:'Attention',goalText:'By [annual review date], [student] will remain on-task during independent work for a minimum of 15 consecutive minutes without teacher redirection in 4 out of 5 observations across 3 consecutive weeks, as measured by interval recording.',shortTermObjectives:['Remain on-task for 5 consecutive minutes without redirection','Use a self-monitoring checklist to track on-task behavior','Increase on-task time to 10 consecutive minutes across 3 observations'],measuredBy:'Interval recording, self-monitoring checklist, teacher log'},
  { id:'G020',domain:'Behavior',subdomain:'Transitions',gradeBand:'K-5',category:'Flexibility',goalText:'By [annual review date], when transitioning between activities, [student] will do so within 2 minutes of verbal cue without engaging in disruptive behavior in 4 out of 5 observed transitions across 3 consecutive weeks.',shortTermObjectives:['Follow a visual schedule to anticipate upcoming transitions','Begin packing materials within 1 minute of transition signal','Move to new activity without verbal protest in 3 of 5 transitions'],measuredBy:'Transition observation log, behavior data sheets'},
  { id:'G021',domain:'Behavior',subdomain:'Self-Monitoring',gradeBand:'3-8',category:'Executive Function',goalText:'By [annual review date], [student] will independently use a self-monitoring tool (checklist, visual timer, goal chart) to track work completion and behavior during at least 3 scheduled work periods per day across 3 consecutive weeks.',shortTermObjectives:['Learn to use a self-monitoring checklist with adult modeling','Complete self-monitoring form independently for one work period per day','Compare self-rating to teacher rating with 80% accuracy'],measuredBy:'Self-monitoring forms, teacher verification data'},
  // COMMUNICATION / LANGUAGE
  { id:'G022',domain:'Communication',subdomain:'Expressive Language',gradeBand:'K-3',category:'Sentence Structure',goalText:'By [annual review date], [student] will produce grammatically correct sentences of 5-7 words during structured speaking activities in 80% of observed opportunities across 3 consecutive SLP sessions.',shortTermObjectives:['Use subject + verb structure in all spoken sentences with 90% accuracy','Expand sentences by adding adjectives and adverbs with adult support','Produce complete sentences without run-ons in structured activities'],measuredBy:'SLP observation, speech-language session data'},
  { id:'G023',domain:'Communication',subdomain:'Receptive Language',gradeBand:'K-5',category:'Following Directions',goalText:'By [annual review date], [student] will follow 3-step oral directions without repetition in 4 out of 5 opportunities during classroom activities, as measured by teacher/SLP observation data.',shortTermObjectives:['Follow 1-step directions without repetition in 95% of opportunities','Follow 2-step directions without repetition in 4 of 5 opportunities','Repeat multi-step directions back before executing to confirm comprehension'],measuredBy:'Teacher observation log, SLP session data'},
  { id:'G024',domain:'Communication',subdomain:'Pragmatics',gradeBand:'3-8',category:'Conversational Skills',goalText:'By [annual review date], when engaged in conversation, [student] will maintain topic-relevant exchanges for at least 4 turns with a peer or adult in 4 out of 5 opportunities, as measured by SLP and teacher observation.',shortTermObjectives:['Initiate a topic-appropriate conversation with a peer in 3 of 5 opportunities','Respond to a conversational question with a related comment','Maintain a conversation for at least 2 turns without topic switching'],measuredBy:'SLP session data, structured observation'},
  // LIFE SKILLS
  { id:'G025',domain:'Life Skills',subdomain:'Daily Living',gradeBand:'K-3',category:'Independence',goalText:'By [annual review date], [student] will independently complete a 4-step morning routine (unpack backpack, put away materials, turn in homework, begin morning work) with no more than 1 verbal prompt in 4 out of 5 opportunities across 3 consecutive weeks.',shortTermObjectives:['Follow a visual routine checklist with adult modeling','Complete 2 steps of morning routine independently in 3 of 5 opportunities','Use visual schedule to initiate morning routine without verbal prompt'],measuredBy:'Routine checklist, teacher observation log'},
  { id:'G026',domain:'Life Skills',subdomain:'Functional Math',gradeBand:'6-12',category:'Money Skills',goalText:'By [annual review date], [student] will count and make correct change for purchases up to $20.00 with 90% accuracy across 3 consecutive trials, as measured by teacher-created simulated shopping assessments.',shortTermObjectives:['Identify all coin and bill denominations with 100% accuracy','Calculate total cost of 2-item purchase with 85% accuracy','Make correct change from $10 for purchases under $10 with 80% accuracy'],measuredBy:'Simulated shopping assessments, real-world practice observations'},
  { id:'G027',domain:'Life Skills',subdomain:'Vocational',gradeBand:'9-12',category:'Career Readiness',goalText:'By [annual review date], [student] will independently complete a job application form with accurate personal information and contact details with 90% accuracy across 3 consecutive opportunities, as measured by direct assessment.',shortTermObjectives:['Identify and memorize personal information needed for job applications','Complete sample application with adult support using 4 or fewer prompts','Complete application independently within the allowed time frame'],measuredBy:'Direct assessment of completed applications'},
  // FINE MOTOR
  { id:'G028',domain:'Fine Motor',subdomain:'Handwriting',gradeBand:'K-3',category:'Pencil Control',goalText:'By [annual review date], [student] will write all uppercase and lowercase manuscript letters legibly (identifiable to an unfamiliar reader) with appropriate size, spacing, and formation in 4 out of 5 writing samples, as measured by handwriting rubric.',shortTermObjectives:['Form letters a-m using correct starting point and stroke sequence in 80% of trials','Maintain appropriate letter size relative to lined paper in 80% of writing samples','Use appropriate spacing between words in 4 of 5 writing samples'],measuredBy:'Handwriting rubric, OT observation'},
  { id:'G029',domain:'Fine Motor',subdomain:'Tool Use',gradeBand:'K-2',category:'Scissor Skills',goalText:'By [annual review date], [student] will use scissors to cut along straight and curved lines within 0.5 cm of the line with 80% accuracy across 4 out of 5 tasks, as measured by OT observation and work samples.',shortTermObjectives:['Hold scissors correctly with thumb and two fingers in 4 of 5 opportunities','Cut along a straight line within 1 cm of the line with 80% accuracy','Cut along a gently curved line with 80% accuracy'],measuredBy:'OT observation, work samples with measured accuracy'},
  // EXECUTIVE FUNCTION
  { id:'G030',domain:'Executive Function',subdomain:'Organization',gradeBand:'4-8',category:'Materials Management',goalText:'By [annual review date], [student] will independently organize materials for each class (correct book, binder, and assignments) using a written or visual checklist with 85% accuracy across 3 consecutive weekly spot checks.',shortTermObjectives:['Use a daily materials checklist with adult reminders for 2 consecutive weeks','Complete checklist independently before leaving home in 3 of 5 days','Maintain organized binder with dividers and filed papers in 85% of spot checks'],measuredBy:'Weekly materials spot checks, teacher observation'},
  { id:'G031',domain:'Executive Function',subdomain:'Planning',gradeBand:'5-12',category:'Long-term Assignments',goalText:'By [annual review date], [student] will break long-term assignments into stages and record due dates in a planner without teacher prompting in 3 out of 4 opportunities over a 6-week period, as measured by planner checks.',shortTermObjectives:['Identify steps needed to complete a multi-part project with adult support','Record all assignment due dates in a planner with 90% accuracy','Submit assignment components on the scheduled due date in 3 of 4 opportunities'],measuredBy:'Planner reviews, assignment submission records'},
  // SPEECH - ARTICULATION
  { id:'G032',domain:'Speech',subdomain:'Articulation',gradeBand:'K-3',category:'Sound Production',goalText:'By [annual review date], [student] will produce the /r/ sound in all word positions (initial, medial, final) with 80% accuracy during conversational speech, as measured by 3 consecutive SLP probes.',shortTermObjectives:['Produce /r/ in isolation with 90% accuracy','Produce /r/ in initial word position in structured activities with 80% accuracy','Produce /r/ in all positions during oral reading with 75% accuracy'],measuredBy:'SLP articulation probes, conversational speech samples'},
  { id:'G033',domain:'Speech',subdomain:'Articulation',gradeBand:'K-2',category:'Intelligibility',goalText:'By [annual review date], [student] will produce age-appropriate speech sounds with 80% overall intelligibility to unfamiliar listeners during conversational speech, as measured by SLP rating across 3 consecutive sessions.',shortTermObjectives:['Produce all early-developing sounds (/m, b, p, n, d, h/) with 95% accuracy','Produce all middle-developing sounds with 80% accuracy in structured activities','Self-monitor speech intelligibility using a simple rating scale'],measuredBy:'SLP intelligibility ratings, structured conversation samples'},
  // TRANSITION
  { id:'G034',domain:'Transition',subdomain:'Post-Secondary',gradeBand:'9-12',category:'Career Exploration',goalText:'By [annual review date], [student] will research and identify 3 post-secondary career options aligned with personal interests and skills using career exploration tools, as measured by completion of a career exploration portfolio with all required sections.',shortTermObjectives:['Complete a career interest inventory (Holland Code or O*NET)','Research job responsibilities and required education for 2 career options','Interview one professional in a field of interest and document findings'],measuredBy:'Portfolio review, teacher observation'},
  { id:'G035',domain:'Transition',subdomain:'Independent Living',gradeBand:'9-12',category:'Community Access',goalText:'By [annual review date], [student] will independently plan and use public transportation to travel to a familiar community location on 3 separate occasions, as measured by teacher observation and self-report.',shortTermObjectives:['Identify bus routes and schedules for 2 familiar destinations','Practice bus ride with adult support on 2 occasions','Plan and execute an independent community outing using public transit'],measuredBy:'Teacher/job coach observation, self-report log'},
  // AAC
  { id:'G036',domain:'Communication',subdomain:'AAC',gradeBand:'K-12',category:'Device Use',goalText:'By [annual review date], [student] will use their AAC device to request preferred items, reject non-preferred items, and comment on activities in 4 out of 5 opportunities across 3 consecutive sessions, as measured by SLP observation.',shortTermObjectives:['Activate AAC device to make a request in 3 of 5 structured opportunities','Use AAC to indicate "no" or "stop" in 4 of 5 opportunities','Spontaneously comment on an activity using AAC in 1 of 5 opportunities'],measuredBy:'SLP session data, AAC device usage logs'},
  // LISTENING COMPREHENSION
  { id:'G037',domain:'Reading',subdomain:'Listening Comprehension',gradeBand:'K-4',category:'Comprehension',goalText:'By [annual review date], [student] will answer literal and inferential questions about orally presented grade-level passages with 80% accuracy across 3 consecutive probe sessions, as measured by teacher-administered assessments.',shortTermObjectives:['Answer "who, what, where" questions about a read-aloud passage with 85% accuracy','Identify the problem and solution in a read-aloud story with 80% accuracy','Make a logical prediction before listening and confirm/disconfirm after'],measuredBy:'Teacher-administered listening comprehension assessments'},
]

const DOMAINS = [...new Set(GOALS.map(g=>g.domain))]
const GRADE_BANDS = [...new Set(GOALS.map(g=>g.gradeBand))]

export default function GoalBankPage() {
  const [search,setSearch]=useState('')
  const [domainFilter,setDomainFilter]=useState('all')
  const [gradeFilter,setGradeFilter]=useState('all')
  const [selected,setSelected]=useState<Goal|null>(null)
  const [copied,setCopied]=useState<string|null>(null)

  const filtered=GOALS.filter(g=>{
    const matchSearch=!search||g.goalText.toLowerCase().includes(search.toLowerCase())||g.domain.toLowerCase().includes(search.toLowerCase())||g.subdomain.toLowerCase().includes(search.toLowerCase())||g.category.toLowerCase().includes(search.toLowerCase())
    const matchDomain=domainFilter==='all'||g.domain===domainFilter
    const matchGrade=gradeFilter==='all'||g.gradeBand===gradeFilter
    return matchSearch&&matchDomain&&matchGrade
  })

  const copy=async(g:Goal)=>{
    await navigator.clipboard.writeText(g.goalText)
    setCopied(g.id);setTimeout(()=>setCopied(null),2000)
  }

  const domainColor: Record<string,string>={
    'Reading':'bg-blue-100 text-blue-800',
    'Writing':'bg-purple-100 text-purple-800',
    'Math':'bg-green-100 text-green-800',
    'Social-Emotional':'bg-yellow-100 text-yellow-800',
    'Behavior':'bg-orange-100 text-orange-800',
    'Communication':'bg-pink-100 text-pink-800',
    'Life Skills':'bg-teal-100 text-teal-800',
    'Fine Motor':'bg-rose-100 text-rose-800',
    'Executive Function':'bg-indigo-100 text-indigo-800',
    'Speech':'bg-cyan-100 text-cyan-800',
    'Transition':'bg-amber-100 text-amber-800',
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Goal Bank</h1>
        <p className="text-gray-500 mt-1">{GOALS.length} research-aligned IEP goals across all domains · Search, filter, copy, and add to IEPs</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search goals, domains, categories..."
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"/>
        </div>
        <select title="Filter by domain" value={domainFilter} onChange={e=>setDomainFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="all">All Domains</option>
          {DOMAINS.map(d=><option key={d}>{d}</option>)}
        </select>
        <select title="Filter by grade band" value={gradeFilter} onChange={e=>setGradeFilter(e.target.value)} className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-brand-500">
          <option value="all">All Grade Bands</option>
          {GRADE_BANDS.map(g=><option key={g}>{g}</option>)}
        </select>
        {(search||domainFilter!=='all'||gradeFilter!=='all')&&(
          <button type="button" onClick={()=>{setSearch('');setDomainFilter('all');setGradeFilter('all')}} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1">
            <X className="w-4 h-4"/>Clear
          </button>
        )}
      </div>
      <p className="text-xs text-gray-400 mb-4">{filtered.length} goal{filtered.length!==1?'s':''} shown</p>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filtered.map(g=>(
          <div key={g.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${domainColor[g.domain]||'bg-gray-100 text-gray-700'}`}>{g.domain}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{g.subdomain}</span>
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Gr. {g.gradeBand}</span>
              </div>
              <span className="text-xs text-gray-400 flex-shrink-0">{g.id}</span>
            </div>
            <p className="text-sm text-gray-800 leading-relaxed line-clamp-3">{g.goalText}</p>
            <p className="text-xs text-gray-400">Measured by: {g.measuredBy}</p>
            <div className="flex items-center gap-2 pt-1 border-t border-gray-100">
              <button type="button" onClick={()=>setSelected(g)} className="flex items-center gap-1.5 text-xs text-brand-600 hover:text-brand-700 font-medium px-2.5 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
                <BookOpen className="w-3.5 h-3.5"/>View Full Goal
              </button>
              <button type="button" onClick={()=>copy(g)} className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gray-800 font-medium px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
                {copied===g.id?<CheckCircle className="w-3.5 h-3.5 text-green-500"/>:<Copy className="w-3.5 h-3.5"/>}
                {copied===g.id?'Copied!':'Copy Goal'}
              </button>
              <Link href={`/dashboard/iep/new?goal=${g.id}`} className="flex items-center gap-1.5 text-xs text-green-600 hover:text-green-700 font-medium px-2.5 py-1.5 rounded-lg hover:bg-green-50 transition-colors ml-auto">
                <FileText className="w-3.5 h-3.5"/>Add to IEP
              </Link>
            </div>
          </div>
        ))}
        {!filtered.length&&(
          <div className="col-span-2 py-16 text-center text-gray-400">
            <Search className="w-10 h-10 mx-auto mb-3 opacity-30"/>
            <p>No goals match your search. Try different keywords or clear the filters.</p>
          </div>
        )}
      </div>

      {/* Goal Detail Modal */}
      {selected&&(
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="flex flex-wrap gap-1.5 mb-1">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${domainColor[selected.domain]||'bg-gray-100 text-gray-700'}`}>{selected.domain}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{selected.subdomain}</span>
                  <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">Grade {selected.gradeBand}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">{selected.category}</h2>
              </div>
              <button type="button" title="Close" onClick={()=>setSelected(null)}><X className="w-5 h-5 text-gray-400"/></button>
            </div>
            <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Annual Goal</h3>
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <p className="text-sm text-gray-800 leading-relaxed">{selected.goalText}</p>
                </div>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Short-Term Objectives / Benchmarks</h3>
                <ul className="space-y-2">
                  {selected.shortTermObjectives.map((obj,i)=>(
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center text-xs font-bold mt-0.5">{i+1}</span>
                      {obj}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-400 mb-1">Measured By</p>
                  <p className="text-gray-800">{selected.measuredBy}</p>
                </div>
                {selected.alignedStandards&&(
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-400 mb-1">Aligned Standards</p>
                    <p className="text-gray-800 font-mono text-xs">{selected.alignedStandards}</p>
                  </div>
                )}
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-between items-center bg-gray-50 rounded-b-xl">
              <button type="button" onClick={()=>copy(selected)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm text-gray-700">
                {copied===selected.id?<CheckCircle className="w-4 h-4 text-green-500"/>:<Copy className="w-4 h-4"/>}
                {copied===selected.id?'Copied!':'Copy Goal Text'}
              </button>
              <Link href={`/dashboard/iep/new?goal=${selected.id}`} onClick={()=>setSelected(null)}
                className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 text-sm font-medium">
                <FileText className="w-4 h-4"/>Add to IEP
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
