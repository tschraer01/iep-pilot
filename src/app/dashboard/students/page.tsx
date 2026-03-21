'use client'

export const dynamic = 'force-dynamic'

import { useState, useRef } from 'react'
import { Plus, Upload, X, FileText, Edit, BarChart2, Trash2, Loader2, Download, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface Student {
  id: string; name: string; grade: string; dateOfBirth: string; disability: string
  schoolDistrict: string; teacher: string; parentName: string; parentEmail: string
  parentPhone: string; nextIepDate: string; presentLevels: string; readingLevel: string
  mathLevel: string; notes: string
}

const INITIAL_STUDENTS: Student[] = [
  { id:'STU001',name:'Michael Chen',grade:'4',dateOfBirth:'2014-03-15',disability:'Specific Learning Disability',schoolDistrict:'Springfield USD',teacher:'Ms. Johnson',parentName:'David Chen',parentEmail:'david.chen@email.com',parentPhone:'555-0101',nextIepDate:'2025-09-15',presentLevels:'Michael reads at approximately a 2nd grade level. He demonstrates strong listening comprehension but struggles with decoding multi-syllabic words. In math, he performs at grade level for computation but needs support with word problems.',readingLevel:'2nd grade',mathLevel:'4th grade',notes:'Responds well to preferential seating and extended time. Enjoys science topics.' },
  { id:'STU002',name:'Emma Rodriguez',grade:'6',dateOfBirth:'2012-08-22',disability:'Autism Spectrum Disorder',schoolDistrict:'Springfield USD',teacher:'Mr. Davis',parentName:'Maria Rodriguez',parentEmail:'maria.r@email.com',parentPhone:'555-0102',nextIepDate:'2025-11-30',presentLevels:'Emma demonstrates strong academic skills in math and science. She needs support with social communication, particularly in group settings and interpreting non-literal language.',readingLevel:'6th grade',mathLevel:'8th grade',notes:'Benefits from visual schedules, advance notice of transitions, and a quiet workspace.' },
  { id:'STU003',name:'James Wilson',grade:'3',dateOfBirth:'2015-12-04',disability:'Other Health Impairment (ADHD)',schoolDistrict:'Springfield USD',teacher:'Ms. Thompson',parentName:'Robert Wilson',parentEmail:'rwilson@email.com',parentPhone:'555-0103',nextIepDate:'2025-08-20',presentLevels:'James demonstrates age-appropriate academic skills but struggles significantly with attention and impulse control. Benefits from frequent breaks, preferential seating, and tasks broken into smaller steps.',readingLevel:'3rd grade',mathLevel:'3rd grade',notes:'Medication administered at 8am. Check in with school nurse as needed.' },
]

const EMPTY: Omit<Student,'id'> = { name:'',grade:'',dateOfBirth:'',disability:'',schoolDistrict:'',teacher:'',parentName:'',parentEmail:'',parentPhone:'',nextIepDate:'',presentLevels:'',readingLevel:'',mathLevel:'',notes:'' }

const DISABILITY_OPTIONS = ['Autism Spectrum Disorder','Deaf-Blindness','Deafness','Developmental Delay','Emotional Disturbance','Hearing Impairment','Intellectual Disability','Multiple Disabilities','Orthopedic Impairment','Other Health Impairment (ADHD)','Other Health Impairment (Other)','Specific Learning Disability','Speech or Language Impairment','Traumatic Brain Injury','Visual Impairment']
const GRADES = ['K','1','2','3','4','5','6','7','8','9','10','11','12']

export default function StudentsPage() {
  const [students,setStudents]=useState<Student[]>(INITIAL_STUDENTS)
  const [showModal,setShowModal]=useState(false)
  const [editing,setEditing]=useState<Student|null>(null)
  const [form,setForm]=useState<Omit<Student,'id'>>(EMPTY)
  const [scanning,setScanning]=useState(false)
  const [scanMsg,setScanMsg]=useState<{type:'error'|'success',text:string}|null>(null)
  const [dragOver,setDragOver]=useState(false)
  const [report,setReport]=useState<Student|null>(null)
  const fileRef=useRef<HTMLInputElement>(null)

  const openAdd=()=>{ setEditing(null);setForm(EMPTY);setScanMsg(null);setShowModal(true) }
  const openEdit=(s:Student)=>{ setEditing(s);setForm({...s});setScanMsg(null);setShowModal(true) }
  const close=()=>{ setShowModal(false);setEditing(null);setScanMsg(null) }
  const change=(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>setForm(p=>({...p,[e.target.name]:e.target.value}))

  const save=()=>{
    if(!form.name.trim())return
    editing ? setStudents(p=>p.map(s=>s.id===editing.id?{...form,id:editing.id}:s))
             : setStudents(p=>[...p,{...form,id:`STU${Date.now()}`}])
    close()
  }

  const del=(id:string)=>{ if(confirm('Remove this student?'))setStudents(p=>p.filter(s=>s.id!==id)) }

  const scan=async(file:File)=>{
    setScanMsg(null);setScanning(true)
    try{
      const fd=new FormData();fd.append('file',file)
      const res=await fetch('/api/scan-document',{method:'POST',body:fd})
      const data=await res.json()
      if(data.extracted&&Object.keys(data.extracted).length>0){
        setForm(p=>({...p,...data.extracted}))
        setScanMsg({type:'success',text:'AI extracted information — review and complete any missing fields below.'})
      } else setScanMsg({type:'error',text:'Could not extract information. Please fill in the form manually.'})
    }catch{ setScanMsg({type:'error',text:'Scan failed. Please fill in the form manually.'}) }
    finally{ setScanning(false) }
  }

  const onFile=(e:React.ChangeEvent<HTMLInputElement>)=>{ const f=e.target.files?.[0];if(f)scan(f);e.target.value='' }
  const onDrop=(e:React.DragEvent)=>{ e.preventDefault();setDragOver(false);const f=e.dataTransfer.files[0];if(f)scan(f) }
  const iepColor=(d:string)=>{ if(!d)return 'text-gray-500';const days=Math.ceil((new Date(d).getTime()-Date.now())/86400000);return days<0?'text-red-600 font-semibold':days<30?'text-orange-500 font-semibold':'text-gray-700' }
  const cls="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-500 mt-1">{students.length} students on caseload</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 bg-brand-500 text-white px-4 py-2 rounded-lg hover:bg-brand-600 font-medium">
          <Plus className="w-4 h-4"/>Add Student
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>{['Student','Grade','Disability','Levels','Next IEP','Actions'].map(h=>(
              <th key={h} className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {students.map(s=>(
              <tr key={s.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-brand-700 font-bold text-sm">{s.name.split(' ').map((n:string)=>n[0]).join('')}</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{s.name}</p>
                      <p className="text-xs text-gray-500">{s.parentName}{s.parentPhone?` · ${s.parentPhone}`:''}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-700">{s.grade==='K'?'K':`Gr. ${s.grade}`}</td>
                <td className="px-6 py-4"><span className="inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{s.disability}</span></td>
                <td className="px-6 py-4 text-xs text-gray-600">{s.readingLevel&&<div>R: {s.readingLevel}</div>}{s.mathLevel&&<div>M: {s.mathLevel}</div>}</td>
                <td className="px-6 py-4"><span className={`text-sm ${iepColor(s.nextIepDate)}`}>{s.nextIepDate||'—'}</span></td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Link href={`/dashboard/iep/new?student=${s.id}`} className="p-1.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg" title="Open IEP"><FileText className="w-4 h-4"/></Link>
                    <button onClick={()=>openEdit(s)} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit"><Edit className="w-4 h-4"/></button>
                    <button onClick={()=>setReport(s)} className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Report"><BarChart2 className="w-4 h-4"/></button>
                    <button onClick={()=>del(s.id)} className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4"/></button>
                  </div>
                </td>
              </tr>
            ))}
            {!students.length&&<tr><td colSpan={6} className="px-6 py-16 text-center text-gray-400">No students yet.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal&&(
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl my-8">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">{editing?`Edit — ${editing.name}`:'Add New Student'}</h2>
              <button onClick={close}><X className="w-5 h-5 text-gray-400"/></button>
            </div>
            <div className="p-6 space-y-8 max-h-[72vh] overflow-y-auto">
              {!editing&&(
                <section>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2"><Upload className="w-4 h-4 text-brand-500"/>AI Document Scan — Quick Import</h3>
                  <div className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragOver?'border-brand-500 bg-brand-50':'border-gray-300 hover:border-gray-400'}`}
                    onDragOver={e=>{e.preventDefault();setDragOver(true)}} onDragLeave={()=>setDragOver(false)} onDrop={onDrop}
                    onClick={()=>!scanning&&fileRef.current?.click()}>
                    {scanning?(
                      <div className="flex flex-col items-center gap-3">
                        <Loader2 className="w-10 h-10 text-brand-500 animate-spin"/>
                        <p className="text-sm text-gray-600 font-medium">Scanning with AI — extracting student info...</p>
                      </div>
                    ):(
                      <>
                        <Upload className="w-10 h-10 text-gray-300 mx-auto mb-3"/>
                        <p className="text-sm font-medium text-gray-700 mb-1">Drop files here or click to upload</p>
                        <p className="text-xs text-gray-400">PDF, PNG, JPG — evaluation reports, previous IEPs, referral forms</p>
                        <input ref={fileRef} type="file" accept=".pdf,.png,.jpg,.jpeg" className="hidden" onChange={onFile} multiple/>
                      </>
                    )}
                    {scanMsg&&<p className={`mt-3 text-xs rounded-lg p-2 ${scanMsg.type==='error'?'text-red-600 bg-red-50':'text-green-700 bg-green-50'}`}>{scanMsg.type==='success'?'✓ ':''}{scanMsg.text}</p>}
                  </div>
                </section>
              )}

              <section>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Student Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label><input name="name" value={form.name} onChange={change} className={cls} placeholder="First Last"/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Grade</label><select name="grade" value={form.grade} onChange={change} className={cls}><option value="">Select</option>{GRADES.map(g=><option key={g} value={g}>{g==='K'?'Kindergarten':`Grade ${g}`}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label><input type="date" name="dateOfBirth" value={form.dateOfBirth} onChange={change} className={cls}/></div>
                  <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Disability Category</label><select name="disability" value={form.disability} onChange={change} className={cls}><option value="">Select</option>{DISABILITY_OPTIONS.map(d=><option key={d}>{d}</option>)}</select></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">School / District</label><input name="schoolDistrict" value={form.schoolDistrict} onChange={change} className={cls}/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Case Manager / Teacher</label><input name="teacher" value={form.teacher} onChange={change} className={cls}/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Next IEP Date</label><input type="date" name="nextIepDate" value={form.nextIepDate} onChange={change} className={cls}/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Reading Level</label><input name="readingLevel" value={form.readingLevel} onChange={change} className={cls} placeholder="e.g., 2nd grade"/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Math Level</label><input name="mathLevel" value={form.mathLevel} onChange={change} className={cls} placeholder="e.g., 4th grade"/></div>
                </div>
              </section>

              <section>
                <h3 className="text-sm font-semibold text-gray-700 mb-4">Parent / Guardian</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2"><label className="block text-sm font-medium text-gray-700 mb-1">Name</label><input name="parentName" value={form.parentName} onChange={change} className={cls}/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Email</label><input type="email" name="parentEmail" value={form.parentEmail} onChange={change} className={cls}/></div>
                  <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone</label><input type="tel" name="parentPhone" value={form.parentPhone} onChange={change} className={cls}/></div>
                </div>
              </section>

              <section>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Present Levels of Academic Achievement</label>
                <textarea name="presentLevels" value={form.presentLevels} onChange={change} rows={4} className={cls} placeholder="Current academic performance, strengths, areas of need..."/>
              </section>
              <section>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes & Accommodations</label>
                <textarea name="notes" value={form.notes} onChange={change} rows={3} className={cls} placeholder="Health info, accommodations, behavioral considerations, sensory needs..."/>
              </section>
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-end bg-gray-50 rounded-b-xl">
              <button onClick={close} className="px-4 py-2 text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm font-medium">Cancel</button>
              <button onClick={save} disabled={!form.name.trim()} className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 text-sm font-medium disabled:opacity-50">
                {editing?'Save Changes':'Add Student'}
              </button>
            </div>
          </div>
        </div>
      )}

      {report&&(
        <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Student Summary Report</h2>
                <p className="text-sm text-gray-500">{report.name} · {new Date().toLocaleDateString()}</p>
              </div>
              <button onClick={()=>setReport(null)}><X className="w-5 h-5 text-gray-400"/></button>
            </div>
            <div className="p-6 space-y-4 text-sm max-h-[60vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {([['Student Name',report.name],['Grade',report.grade],['Date of Birth',report.dateOfBirth],['Disability',report.disability],['School / District',report.schoolDistrict],['Case Manager',report.teacher],['Next IEP Date',report.nextIepDate],['Reading Level',report.readingLevel],['Math Level',report.mathLevel]] as [string,string][]).map(([l,v])=>(
                  <div key={l} className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-400 mb-0.5">{l}</p><p className="font-medium text-gray-900">{v||'—'}</p></div>
                ))}
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">Parent / Guardian</p>
                <p>{report.parentName||'—'} · {report.parentEmail||''} · {report.parentPhone||''}</p>
              </div>
              {report.presentLevels&&<div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-400 mb-1">Present Levels</p><p className="leading-relaxed">{report.presentLevels}</p></div>}
              {report.notes&&<div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-400 mb-1">Notes & Accommodations</p><p className="leading-relaxed">{report.notes}</p></div>}
            </div>
            <div className="border-t border-gray-200 px-6 py-4 flex gap-3 justify-between items-center bg-gray-50 rounded-b-xl">
              <p className="text-xs text-gray-400">Ctrl+P / Cmd+P to save as PDF</p>
              <div className="flex gap-3">
                <button onClick={()=>window.print()} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-100 text-sm"><Download className="w-4 h-4"/>Print / PDF</button>
                <Link href={`/dashboard/iep/new?student=${report.id}`} className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 text-sm">Open IEP<ChevronRight className="w-4 h-4"/></Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
