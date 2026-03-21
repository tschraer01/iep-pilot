'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import { Plus, X, TrendingUp, TrendingDown, Minus, Calendar, BarChart2, CheckCircle, AlertTriangle } from 'lucide-react'

interface DataPoint {
  date: string
  value: number
  notes: string
}

interface ProgressRecord {
  id: string
  student: string
  goal: string
  domain: string
  target: number
  unit: string
  dataPoints: DataPoint[]
  baseline: number
}

const INITIAL_RECORDS: ProgressRecord[] = [
  { id:'P001',student:'Michael Chen',goal:'Oral Reading Fluency — Grade-level passage, 120 WCPM target',domain:'Reading',target:120,unit:'WCPM',baseline:68,dataPoints:[{date:'2025-01-08',value:68,notes:'Baseline probe'},{date:'2025-01-22',value:74,notes:'CBM probe 1'},{date:'2025-02-05',value:79,notes:'CBM probe 2'},{date:'2025-02-19',value:83,notes:'CBM probe 3'},{date:'2025-03-05',value:88,notes:'CBM probe 4 — strong progress'},] },
  { id:'P002',student:'Emma Rodriguez',goal:'Following 3-step oral directions without repetition',domain:'Communication',target:80,unit:'% accuracy',baseline:45,dataPoints:[{date:'2025-01-10',value:45,notes:'Baseline observation'},{date:'2025-01-24',value:55,notes:'Week 2 check'},{date:'2025-02-07',value:60,notes:'Improving, still needs support'},{date:'2025-02-21',value:70,notes:'Strong week'},{date:'2025-03-07',value:75,notes:'Approaching target'},] },
  { id:'P003',student:'James Wilson',goal:'On-task behavior during independent work — 15 min consecutive',domain:'Behavior',target:80,unit:'% intervals on-task',baseline:35,dataPoints:[{date:'2025-01-09',value:35,notes:'Baseline interval recording'},{date:'2025-01-23',value:42,notes:'Week 2 — 5 min chunks'},{date:'2025-02-06',value:48,notes:'Movement break strategy helping'},{date:'2025-02-20',value:52,notes:'Inconsistent week'},{date:'2025-03-06',value:58,notes:'Better with visual timer'},] },
]

const STUDENT_GOALS = [
  {student:'Michael Chen',goals:['Oral Reading Fluency — Grade-level passage, 120 WCPM target','Reading Comprehension — Main idea, 80% accuracy','Math — Multi-digit multiplication, 90% accuracy']},
  {student:'Emma Rodriguez',goals:['Following 3-step oral directions without repetition','Social turn-taking during group activities, 4/5 opportunities','Written paragraph — topic sentence + 3 details']},
  {student:'James Wilson',goals:['On-task behavior during independent work — 15 min consecutive','Transition within 2 minutes of verbal cue','Math fact fluency — multiplication 0-9, 90% in 3 min']},
]

const EMPTY_POINT: DataPoint = { date: new Date().toISOString().split('T')[0], value: 0, notes: '' }

const DOMAINS = ['Reading','Writing','Math','Communication','Behavior','Social-Emotional','Life Skills','Fine Motor','Speech','Transition']

export default function ProgressPage() {
  const [records,setRecords]=useState<ProgressRecord[]>(INITIAL_RECORDS)
  const [addPoint,setAddPoint]=useState<{recordId:string,form:DataPoint}|null>(null)
  const [addRecord,setAddRecord]=useState(false)
  const [newRecord,setNewRecord]=useState<Omit<ProgressRecord,'id'|'dataPoints'>>({student:'',goal:'',domain:'',target:80,unit:'% accuracy',baseline:0})
  const [expanded,setExpanded]=useState<string|null>(null)

  const latestValue=(r:ProgressRecord)=>r.dataPoints.length?r.dataPoints[r.dataPoints.length-1].value:r.baseline
  const trend=(r:ProgressRecord)=>{
    if(r.dataPoints.length<2)return 'flat'
    const last=r.dataPoints[r.dataPoints.length-1].value
    const prev=r.dataPoints[r.dataPoints.length-2].value
    if(last>prev+2)return 'up'
    if(last<prev-2)return 'down'
    return 'flat'
  }
  const progress=(r:ProgressRecord)=>Math.min(100,Math.round(((latestValue(r)-r.baseline)/(r.target-r.baseline))*100))
  const status=(r:ProgressRecord)=>{
    const pct=progress(r)
    if(latestValue(r)>=r.target)return 'met'
    if(pct>=60)return 'on-track'
    return 'needs-support'
  }

  const statusConfig={
    'met':{label:'Goal Met',color:'text-green-600',bg:'bg-green-50',border:'border-green-200',icon:<CheckCircle className="w-4 h-4 text-green-500"/>},
    'on-track':{label:'On Track',color:'text-blue-600',bg:'bg-blue-50',border:'border-blue-200',icon:<TrendingUp className="w-4 h-4 text-blue-500"/>},
    'needs-support':{label:'Needs Support',color:'text-orange-600',bg:'bg-orange-50',border:'border-orange-200',icon:<AlertTriangle className="w-4 h-4 text-orange-500"/>},
  }

  const savePoint=()=>{
    if(!addPoint)return
    setRecords(prev=>prev.map(r=>r.id===addPoint.recordId?{...r,dataPoints:[...r.dataPoints,addPoint.form]}:r))
    setAddPoint(null)
  }

  const saveRecord=()=>{
    if(!newRecord.student||!newRecord.goal)return
    setRecords(prev=>[...prev,{...newRecord,id:`P${Date.now()}`,dataPoints:[]}])
    setNewRecord({student:'',goal:'',domain:'',target:80,unit:'% accuracy',baseline:0})
    setAddRecord(false)
  }

  const miniChart=(r:ProgressRecord)=>{
    const points=[{value:r.baseline},...r.dataPoints]
    if(points.length<2)return null
    const W=200,H=50,pad=4
    const vals=points.map(p=>p.value)
    const min=Math.min(...vals,r.baseline)-5
    const max=Math.max(...vals,r.target)+5
    const x=(i:number)=>pad+(i/(points.length-1))*(W-pad*2)
    const y=(v:number)=>H-pad-((v-min)/(max-min))*(H-pad*2)
    const d=points.map((p,i)=>`${i===0?'M':'L'}${x(i)},${y(p.value)}`).join(' ')
    const targetY=y(r.target)
    return(
      <svg width={W} height={H} className="overflow-visible">
        <line x1={pad} y1={targetY} x2={W-pad} y2={targetY} stroke="#22c55e" strokeWidth={1} strokeDasharray="4,3" opacity={0.6}/>
        <path d={d} fill="none" stroke="#6366f1" strokeWidth={2} strokeLinejoin="round"/>
        {points.map((p,i)=><circle key={i} cx={x(i)} cy={y(p.value)} r={3} fill="#6366f1"/>)}
      </svg>
    )
  }

  const cls="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"

  return(
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Progress Monitoring</h1>
          <p className="text-gray-500 mt-1">Track student progress toward IEP goals with data-driven insights</p>
        </div>
        <button type="button" onClick={()=>setAddRecord(true)} className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 font-medium">
          <Plus className="w-4 h-4"/>Add Goal to Track
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {(['on-track','needs-support','met'] as const).map(s=>{
          const count=records.filter(r=>status(r)===s).length
          const cfg=statusConfig[s]
          return(
            <div key={s} className={`${cfg.bg} border ${cfg.border} rounded-xl p-4 flex items-center gap-3`}>
              {cfg.icon}
              <div><p className={`font-bold text-xl ${cfg.color}`}>{count}</p><p className="text-xs text-gray-500">{cfg.label}</p></div>
            </div>
          )
        })}
      </div>

      {/* Progress Cards */}
      <div className="space-y-4">
        {records.map(r=>{
          const s=status(r);const cfg=statusConfig[s];const pct=progress(r);const t=trend(r);const latest=latestValue(r)
          const isExpanded=expanded===r.id
          return(
            <div key={r.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="font-semibold text-gray-900">{r.student}</span>
                      <span className="text-gray-400">·</span>
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{r.domain}</span>
                      <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                        {cfg.icon}{cfg.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-1">{r.goal}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl font-bold text-gray-900">{latest}<span className="text-sm font-normal text-gray-400 ml-1">{r.unit}</span></p>
                    <p className="text-xs text-gray-400">Target: {r.target} {r.unit}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Baseline: {r.baseline}</span>
                    <span>{pct}% of goal range</span>
                    <span>Target: {r.target}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 relative">
                    <div className="h-2.5 rounded-full transition-all duration-500" style={{width:`${pct}%`,backgroundColor: s==='met'?'#22c55e':s==='on-track'?'#6366f1':'#f97316'}}/>
                  </div>
                </div>

                {/* Mini chart */}
                <div className="flex items-center justify-between">
                  <div>{miniChart(r)}</div>
                  <div className="flex items-center gap-3">
                    {t==='up'&&<span className="flex items-center gap-1 text-xs text-green-600"><TrendingUp className="w-3.5 h-3.5"/>Improving</span>}
                    {t==='down'&&<span className="flex items-center gap-1 text-xs text-red-500"><TrendingDown className="w-3.5 h-3.5"/>Declining</span>}
                    {t==='flat'&&<span className="flex items-center gap-1 text-xs text-gray-400"><Minus className="w-3.5 h-3.5"/>Flat</span>}
                    <button type="button" onClick={()=>setExpanded(isExpanded?null:r.id)} className="text-xs text-gray-500 hover:text-gray-700 underline">
                      {isExpanded?'Hide':'Show'} data ({r.dataPoints.length} points)
                    </button>
                    <button type="button" onClick={()=>setAddPoint({recordId:r.id,form:{...EMPTY_POINT}})}
                      className="flex items-center gap-1.5 text-sm font-medium bg-brand-500 text-white px-3 py-1.5 rounded-lg hover:bg-brand-600">
                      <Plus className="w-3.5 h-3.5"/>Add Data Point
                    </button>
                  </div>
                </div>

                {/* Data point history */}
                {isExpanded&&(
                  <div className="mt-4 border-t border-gray-100 pt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Data History</h4>
                    {r.dataPoints.length===0?<p className="text-sm text-gray-400">No data points yet. Add your first measurement.</p>:(
                      <div className="space-y-2">
                        {[...r.dataPoints].reverse().map((dp,i)=>(
                          <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-2.5 text-sm">
                            <span className="flex items-center gap-2 text-gray-500"><Calendar className="w-3.5 h-3.5"/>{dp.date}</span>
                            <span className="font-bold text-gray-900">{dp.value} <span className="font-normal text-gray-400 text-xs">{r.unit}</span></span>
                            <span className="text-gray-500 text-xs max-w-[200px] truncate">{dp.notes||'—'}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {/* Add Data Point Modal */}
      {addPoint&&(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Add Data Point</h2>
              <button type="button" title="Close" onClick={()=>setAddPoint(null)}><X className="w-5 h-5 text-gray-400"/></button>
            </div>
            <div className="p-6 space-y-4">
              {(()=>{const r=records.find(x=>x.id===addPoint.recordId);return r&&(
                <div className="bg-brand-50 border border-brand-100 rounded-lg p-3 text-sm">
                  <p className="font-medium text-brand-800">{r.student}</p>
                  <p className="text-brand-600 text-xs mt-0.5">{r.goal}</p>
                </div>
              )})()}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                <input type="date" title="Data point date" value={addPoint.form.date}
                  onChange={e=>setAddPoint(p=>p?{...p,form:{...p.form,date:e.target.value}}:null)}
                  className={cls}/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Score / Value * <span className="text-gray-400 font-normal">({records.find(r=>r.id===addPoint.recordId)?.unit})</span>
                </label>
                <input type="number" value={addPoint.form.value}
                  onChange={e=>setAddPoint(p=>p?{...p,form:{...p.form,value:parseFloat(e.target.value)||0}}:null)}
                  className={cls} placeholder="Enter measured value"/>
                {(()=>{const r=records.find(x=>x.id===addPoint.recordId);return r&&<p className="text-xs text-gray-400 mt-1">Target: {r.target} {r.unit} · Baseline: {r.baseline} {r.unit}</p>})()}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes / Observations</label>
                <textarea value={addPoint.form.notes} rows={3}
                  onChange={e=>setAddPoint(p=>p?{...p,form:{...p.form,notes:e.target.value}}:null)}
                  className={cls} placeholder="Conditions, student behavior, probe type, interventions used..."/>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50 rounded-b-xl">
              <button type="button" onClick={()=>setAddPoint(null)} className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100">Cancel</button>
              <button type="button" onClick={savePoint} className="px-4 py-2 text-sm bg-brand-500 text-white rounded-lg hover:bg-brand-600 font-medium">Save Data Point</button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Goal to Track Modal */}
      {addRecord&&(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Add Goal to Track</h2>
              <button type="button" title="Close" onClick={()=>setAddRecord(false)}><X className="w-5 h-5 text-gray-400"/></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Student *</label>
                <select title="Select student" value={newRecord.student} onChange={e=>{const s=e.target.value;setNewRecord(p=>({...p,student:s,goal:''}))}} className={cls}>
                  <option value="">Select student</option>
                  {STUDENT_GOALS.map(sg=><option key={sg.student}>{sg.student}</option>)}
                </select>
              </div>
              {newRecord.student&&(
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IEP Goal *</label>
                  <select title="Select IEP goal" value={newRecord.goal} onChange={e=>setNewRecord(p=>({...p,goal:e.target.value}))} className={cls}>
                    <option value="">Select goal</option>
                    {STUDENT_GOALS.find(sg=>sg.student===newRecord.student)?.goals.map(g=><option key={g}>{g}</option>)}
                    <option value="__custom__">Enter custom goal...</option>
                  </select>
                  {newRecord.goal==='__custom__'&&<textarea onChange={e=>setNewRecord(p=>({...p,goal:e.target.value}))} className={`${cls} mt-2`} rows={2} placeholder="Type goal description..."/>}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domain</label>
                <select title="Select domain" value={newRecord.domain} onChange={e=>setNewRecord(p=>({...p,domain:e.target.value}))} className={cls}>
                  <option value="">Select domain</option>
                  {DOMAINS.map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Baseline</label>
                  <input type="number" title="Baseline value" placeholder="0" value={newRecord.baseline} onChange={e=>setNewRecord(p=>({...p,baseline:parseFloat(e.target.value)||0}))} className={cls}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                  <input type="number" title="Target value" placeholder="80" value={newRecord.target} onChange={e=>setNewRecord(p=>({...p,target:parseFloat(e.target.value)||0}))} className={cls}/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select title="Select measurement unit" value={newRecord.unit} onChange={e=>setNewRecord(p=>({...p,unit:e.target.value}))} className={cls}>
                    <option>% accuracy</option>
                    <option>WCPM</option>
                    <option>% intervals</option>
                    <option>trials correct</option>
                    <option>frequency</option>
                    <option>duration (min)</option>
                    <option>score</option>
                    <option>rating (1-5)</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50 rounded-b-xl">
              <button type="button" onClick={()=>setAddRecord(false)} className="px-4 py-2 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100">Cancel</button>
              <button type="button" onClick={saveRecord} disabled={!newRecord.student||!newRecord.goal||newRecord.goal==='__custom__'} className="px-4 py-2 text-sm bg-brand-500 text-white rounded-lg hover:bg-brand-600 font-medium disabled:opacity-50">
                Start Tracking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
