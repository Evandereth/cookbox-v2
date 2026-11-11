import { useEffect, useRef, useState } from 'react'
import {
  FiCheck,
  FiChevronRight,
  FiClock,
  FiDollarSign,
  FiMail,
  FiMapPin,
  FiPhone,
  FiX,
} from 'react-icons/fi'
import { jobs } from '../data/jobs.js'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'

const Tag = ({ icon: Icon, children }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon/5 px-3 py-1.5 text-xs font-medium text-stone-700">
    <Icon size={14} className="text-maroon" aria-hidden="true" />
    {children}
  </span>
)

const Meta = ({ label, children, wide }) => (
  <div className={`rounded-xl bg-maroon/5 px-3.5 py-3 ${wide ? 'col-span-2' : ''}`}>
    <p className="text-[11px] font-medium uppercase tracking-wide text-stone-500">{label}</p>
    <p className="mt-1 text-sm font-medium leading-snug text-stone-900">{children}</p>
  </div>
)

function JobSheet({ job, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  const applyHref = `mailto:admin@cookboxltd.com?subject=${encodeURIComponent('Job application: ' + job.title)}`

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="job-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up motion-reduce:animate-none flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white sm:max-w-xl sm:rounded-3xl"
      >
        {/* Header */}
        <div className="relative bg-linear-to-br from-maroon-dark via-maroon to-[#8a1a28] px-5 pb-6 pt-3 text-white">
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-white/40 sm:hidden" />
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-3 grid h-11 w-11 place-items-center rounded-full bg-white/15 hover:bg-white/25 cursor-pointer"
          >
            <FiX size={20} aria-hidden="true" />
          </button>
          <p className="text-xs text-white/75">Now hiring</p>
          <h2 id="job-title" className="mr-10 mt-1 font-head text-2xl font-medium leading-tight">{job.title}</h2>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-5">
          <div className="grid grid-cols-2 gap-2.5">
            <Meta label="Location">{job.location}</Meta>
            <Meta label="Salary">{job.salary}</Meta>
            <Meta label="Type">{job.type}</Meta>
            <Meta label="Closing date">{job.closing}</Meta>
            <Meta label="Hours" wide>{job.hours}</Meta>
          </div>

          <h3 className="mt-7 font-head text-lg text-maroon">About the role</h3>
          <p className="mt-2 text-sm leading-relaxed text-stone-600">{job.about}</p>

          <h3 className="mt-7 font-head text-lg text-maroon">Key Responsibilities</h3>
          <ul className="mt-1">
            {job.responsibilities.map((r) => (
              <li key={r.title} className="mt-4 flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-maroon/10">
                  <FiCheck size={14} className="text-maroon" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-stone-600">
                  <strong className="font-medium text-stone-900">{r.title}:</strong> {r.text}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mt-7 font-head text-lg text-maroon">Required Skills</h3>
          <ul className="mt-1">
            {job.skills.map((r) => (
              <li key={r.id} className="mt-4 flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-maroon/10">
                  <FiCheck size={14} className="text-maroon" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-stone-600">
                   {r.text}
                </p>
              </li>
            ))}
          </ul>

          <h3 className="mt-7 font-head text-lg text-maroon">Qualifications and Experience</h3>
          <ul className="mt-1">
            {job.qualifications.map((r) => (
              <li key={r.id} className="mt-4 flex gap-3">
                <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-maroon/10">
                  <FiCheck size={14} className="text-maroon" aria-hidden="true" />
                </span>
                <p className="text-sm leading-relaxed text-stone-600">
                   {r.text}
                </p>
              </li>
            ))}
          </ul>

          <p className='mt-3 text-xs text-stone-500 italic'>
            Cookbox Ltd is an equal opportunities employer. We welcome applications from all backgrounds and are committed to fostering a diverse and inclusive workplace.
          </p>

        </div>

        {/* Sticky apply bar */}
        <div className="bg-white px-4 pb-4 pt-3 shadow-[0_-4px_16px_rgba(60,20,20,0.08)]">
          <a
            href={applyHref}
            className="flex min-h-13 w-full items-center justify-center rounded-xl bg-maroon text-base font-medium text-white transition hover:bg-maroon-dark"
          >
            Apply now
          </a>
        </div>
      </div>
    </div>
  )
}

export default function Careers() {
  const [selected, setSelected] = useState(null)

  return (
    <>
      <Navbar activePage="Careers" />
      {/* Hero */}
      <section className="px-4 pt-4">
        <div className="mx-auto max-w-3xl rounded-3xl bg-linear-to-br from-maroon-dark via-maroon to-[#8a1a28] px-6 py-9 text-white">
          <p className="text-xs text-white/75">Careers at Cookbox</p>
          <h1 className="mt-2 font-head text-4xl font-medium">Join our Team</h1>
          <p className="mt-4 text-sm leading-relaxed text-white/85">
            Cookbox Inc Ltd is a vibrant restaurant specializing in authentic African cuisine, celebrating the rich culinary heritage of Africa. We are seeking passionate and skilled professionals to join our team.
          </p>
          <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
            <span className="rounded-full bg-white/15 px-3.5 py-1.5">{jobs.length} open roles</span>
            <span className="rounded-full bg-white/15 px-3.5 py-1.5">Leicester, UK</span>
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-4 font-head text-lg text-stone-900">Open positions</h2>
          <div className="grid gap-6">
            {jobs.map((job) => (
              <article key={job.id} className="rounded-2xl bg-white p-5 shadow-sm border-l-4 border-maroon-dark">
                <h3 className="font-head text-xl text-stone-900">{job.title}</h3>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  <Tag icon={FiMapPin}>{job.location}</Tag>
                  <Tag icon={FiDollarSign}>Salary - {job.salary}</Tag>
                  <Tag icon={FiClock}>{job.type}</Tag>
                </div>
                <p className="mb-5 mt-3.5 text-sm leading-relaxed text-stone-600">{job.summary}</p>
                <button
                  onClick={() => setSelected(job)}
                  className="flex min-h-12 w-50 items-center justify-center gap-2 rounded-xl bg-maroon text-[15px] font-medium text-white cursor-pointer transition hover:bg-maroon-dark"
                >
                  View details <FiChevronRight size={18} aria-hidden="true" />
                </button>
              </article>
            ))}
          </div>

          {/* Contact */}
          <div className="mt-8 rounded-2xl bg-white p-6 text-center shadow-sm">
            <h2 className="font-head text-lg text-stone-900">Contact Information</h2>
            <p className="mb-5 mt-2.5 text-sm leading-relaxed text-stone-600">
              Questions about our current openings, or want to send a general application? Get in touch.
            </p>
            <a
              href="tel:01163195197"
              className="flex min-h-12 items-center justify-center gap-2 rounded-xl border-[1.5px] border-maroon text-[15px] font-medium text-maroon hover:bg-maroon/5"
            >
              <FiPhone size={16} aria-hidden="true" /> Call 0116 319 5197
            </a>
            <a
              href="mailto:admin@cookboxltd.com"
              className="mt-2.5 flex min-h-12 items-center justify-center gap-2 rounded-xl bg-maroon/5 text-[15px] font-medium text-maroon hover:bg-maroon/10"
            >
              <FiMail size={16} aria-hidden="true" /> admin@cookboxltd.com
            </a>
          </div>
        </div>
      </section>

      {selected && <JobSheet job={selected} onClose={() => setSelected(null)} />}
      <Footer />
    </>
  )
}
