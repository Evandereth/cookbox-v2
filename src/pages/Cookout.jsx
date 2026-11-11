import { useState } from 'react'
import { FiCalendar, FiCloud, FiCoffee, FiMapPin, FiSun } from 'react-icons/fi'
import Footer from '../components/Footer.jsx'
import Navbar from '../components/Navbar.jsx'
import cookoutFlyer from '../img/event-BZ4XJC9x.jpg'

const occasions = ['Birthday Parties', 'Corporate Events', 'Wedding Receptions', 'Holiday Celebrations', 'Family Reunions']

// Time slots are placeholders: edit to match what you offer
const slots = ['Morning (9am - 12pm)', 'Afternoon (12pm - 4pm)', 'Evening (4pm - 8pm)', 'Night (8pm - late)', 'All Day (9am - 8pm)']

const seasons = [
  { icon: FiSun, color: 'text-amber-500', title: 'Summer Classic', text: 'Traditional BBQ favorites, cold sides, refreshing beverages, and outdoor grilling.' },
  { icon: FiCloud, color: 'text-sky-500', title: 'Winter Warmers', text: 'Hot soups, indoor grilling, warming beverages, and festive holiday menus.' },
]

const perks = [
  { title: 'Event Planning', text: "We'll help you choose the perfect seasonal menu and additional services for your specific event type." },
  { title: 'Seasonal Customization', text: 'Our menus adapt to the season and your occasion, ensuring fresh ingredients and appropriate dishes.' },
  { title: 'Full Service Experience', text: 'From setup to cleanup, we handle everything so you can enjoy your seasonal celebration.' },
]

const input = 'w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-maroon/40'

const Field = ({ label, required, full, children }) => (
  <label className={`block text-xs font-medium text-stone-700 ${full ? 'sm:col-span-2' : ''}`}>
    {label}{required && <span className="text-red-600"> *</span>}
    <div className="mt-1.5">{children}</div>
  </label>
)

const emptyForm = {
  name: '', email: '', phone: '', date: '', guests: '', location: '',
  dietary: '', slot: '', access: false, info: '', company: '',
}

export default function Cookout() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const today = new Date().toISOString().split('T')[0]

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', msg: '' })
    try {
      const res = await fetch('/send-cookout.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          guests: form.guests,
          location: form.location,
          dietary: form.dietary,
          slot: form.slot,
          access: form.access ? 'Yes' : 'No',
          message: form.info,
          company: form.company, // honeypot
        }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus({ state: 'success', msg: data.message || "Thanks! We'll be in touch within 24 hours." })
        setForm(emptyForm)
      } else {
        setStatus({ state: 'error', msg: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ state: 'error', msg: 'Network error. Please try again.' })
    }
  }

  return (
    <>
      <Navbar activePage="Cookout Booking" />
      {/* Hero */}
      <section className="bg-linear-to-br from-maroon-dark via-maroon to-[#8a1a28] text-white px-4 py-14 text-center">
        <h1 className="font-head text-3xl md:text-5xl font-medium max-w-2xl mx-auto leading-tight">Seasonal Cookout Experiences</h1>
        <p className="mt-5 max-w-2xl mx-auto text-sm md:text-base text-white/85 leading-relaxed">
          Celebrate every season and special occasion with our expertly crafted cookout experiences. From spring gatherings to winter warmers, we bring seasonal flavors and event-perfect menus to your location.
        </p>
        <div className="mt-8 flex justify-center gap-12">
          {seasons.map((s) => (
            <div key={s.title} className="text-center">
              <s.icon className={`mx-auto ${s.color}`} size={32} />
              <p className="mt-2 text-sm font-medium">{s.title}</p>
              <p className="text-xs text-white/70">{s.title === 'Summer Classic' ? 'Traditional BBQ' : 'Comfort Foods'}</p>
            </div>
          ))}
        </div>
        <ul className="mt-8 flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
          {occasions.map((o) => (
            <li key={o} className="rounded-full bg-white/15 px-3 py-1.5 text-xs">{o}</li>
          ))}
        </ul>
      </section>

      {/* Reservation form */}
      <section id="reservation" className="py-14 px-4 scroll-mt-20">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="font-head text-3xl text-maroon">Reservation</h2>
          <p className="mt-3 text-sm text-stone-600">
            Fill out the form below to book your cookout experience. Our team will get in touch within 24 hours to confirm details and discuss your requirements.
          </p>
        </div>

        <form onSubmit={submit} className="relative max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 grid sm:grid-cols-2 gap-5">
          {/* Honeypot: hidden spam trap, leave empty */}
          <input
            type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
            className="absolute left-[-9999px]" value={form.company} onChange={set('company')}
          />

          <Field label="Full Name" required>
            <input required className={input} placeholder="Enter your full name" value={form.name} onChange={set('name')} />
          </Field>
          <Field label="Email Address" required>
            <input type="email" required className={input} placeholder="your@email.com" value={form.email} onChange={set('email')} />
          </Field>
          <Field label="Mobile Number" required>
            <input type="tel" required className={input} placeholder="Your contact number" value={form.phone} onChange={set('phone')} />
          </Field>
          <Field label="Preferred Cookout Date" required>
            <input type="date" required min={today} className={input} value={form.date} onChange={set('date')} />
          </Field>
          <Field label="Number of Guests" required>
            <input type="number" required min="1" className={input} placeholder="How many people will attend?" value={form.guests} onChange={set('guests')} />
          </Field>
          <Field label="Event Location" required>
            <input required className={input} placeholder="Address or venue name" value={form.location} onChange={set('location')} />
          </Field>
          <Field label="Dietary Requirements" full>
            <textarea rows="3" className={input} placeholder="Any allergies, vegetarian, vegan, halal requirements etc." value={form.dietary} onChange={set('dietary')} />
          </Field>
          <Field label="Preferred Time Slot" required full>
            <select required className={input} value={form.slot} onChange={set('slot')}>
              <option value="">Select time slot</option>
              {slots.map((s) => <option key={s}>{s}</option>)}
            </select>
          </Field>

          <div className="sm:col-span-2">
            <p className="text-xs font-medium text-stone-700">Accessibility Requirements</p>
            <label className="mt-2 flex items-center gap-3 rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm text-stone-700">
              <input type="checkbox" className="h-4 w-4 accent-maroon" checked={form.access} onChange={(e) => setForm({ ...form, access: e.target.checked })} />
              Disabled Access Required
            </label>
          </div>

          <Field label="Additional Information" full>
            <textarea rows="4" className={input} placeholder="Tell us more about your event, specific menu preferences, setup requirements, or any special requests..." value={form.info} onChange={set('info')} />
          </Field>

          <button
            type="submit"
            disabled={status.state === 'sending'}
            className="sm:col-span-2 bg-maroon hover:bg-maroon-dark disabled:opacity-60 text-white text-sm font-medium py-3.5 rounded-md transition"
          >
            {status.state === 'sending' ? 'Sending...' : 'Book My Cookout'}
          </button>
          {status.msg && (
            <p role="status" className={`sm:col-span-2 text-sm text-center ${status.state === 'success' ? 'text-green-700' : 'text-red-700'}`}>
              {status.msg}
            </p>
          )}
        </form>
      </section>

      {/* Seasonal experiences */}
      <section className="bg-stone-50 py-14 px-4">
        <h2 className="font-head text-2xl md:text-3xl text-maroon text-center mb-8">Seasonal Cookout Experience</h2>
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-5">
          {seasons.map((s) => (
            <div key={s.title} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <s.icon className={`mx-auto ${s.color}`} size={30} />
              <h3 className="font-head mt-3 text-stone-900">{s.title}</h3>
              <p className="mt-2 text-xs text-stone-500">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Perfect for every event */}
      <section className="py-14 px-4">
        <h2 className="font-head text-2xl md:text-3xl text-maroon text-center mb-8">Perfect for Every Event</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
          {perks.map((p, i) => (
            <div key={p.title} className="bg-white rounded-lg shadow-sm p-6 text-center">
              <span className="mx-auto w-14 h-14 rounded-full bg-maroon text-white font-head text-xl grid place-items-center">{i + 1}</span>
              <h3 className="font-head mt-4 text-stone-900">{p.title}</h3>
              <p className="mt-2 text-sm text-stone-500">{p.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl mx-auto text-center text-sm text-stone-600">
          <strong className="text-maroon">Seasonal Pricing:</strong> Our menus are priced according to seasonal availability and event complexity. Holiday and peak season events may have premium pricing. Contact us for detailed quotes.
        </p>
      </section>

      {/* Upcoming events */}
      <section className="bg-stone-50 py-14 px-4">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="font-head text-2xl md:text-3xl text-maroon">Upcoming Events</h2>
          <p className="mt-3 text-sm text-stone-600">Join us for exciting upcoming cookout events and special occasions.</p>
        </div>

        <article className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
          <div className="aspect-4/3 bg-stone-900">
            <img className="h-full w-full object-cover" src={cookoutFlyer} alt="Cookout Special Edition event flyer" />
          </div>
          <div className="p-5">
            <span className="inline-block rounded-full bg-maroon text-white text-[10px] px-3 py-1">Special Edition</span>
            <h3 className="font-head text-xl text-stone-900 mt-3">Cookout Special Edition</h3>
            <ul className="mt-3 space-y-2 text-sm text-stone-700">
              <li className="flex gap-2"><FiCalendar size={16} aria-hidden="true" className="text-maroon mt-0.5 shrink-0" />20th December, 4PM - 8PM</li>
              <li className="flex gap-2"><FiMapPin size={16} aria-hidden="true" className="text-maroon mt-0.5 shrink-0" />No 3 Medina Road LE3 9AY</li>
              <li className="flex gap-2"><FiCoffee size={16} aria-hidden="true" className="text-maroon mt-0.5 shrink-0" />Buffet, Music (DJ) and Socialising</li>
            </ul>
            <p className="mt-4 text-sm text-stone-500">Amount per seat:</p>
            <p className="font-head text-xl text-maroon">£20 (£10 - early bird)</p>

            <div className="mt-4 rounded-lg bg-stone-50 p-4 text-sm">
              <p className="font-head text-stone-900">Payment Information</p>
              <p className="mt-2 text-stone-600">Account: 59537862</p>
              <p className="text-stone-600">Sort Code: 309950</p>
              <p className="text-stone-600">Cookbox Inc Ltd</p>
            </div>

            <div className="mt-4 text-sm flex justify-center">
                <button className='bg-stone-50 border-2 border-maroon-dark py-2 px-5 cursor-pointer uppercase rounded-lg'>
                    <a href="">
                        chat on whatsapp
                    </a>
                </button>
            </div>
          </div>
        </article>
      </section>
      <Footer />
    </>
  )
}
