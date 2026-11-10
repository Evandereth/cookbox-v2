import { useState } from 'react'
import BulkMenu from './BulkMenu.jsx'
import {
  FiBox,
  FiBriefcase,
  FiCheck,
  FiClipboard,
  FiFlag,
  FiGift,
  FiHome,
  FiImage,
  FiTool,
  FiUsers,
} from 'react-icons/fi'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import Navbar from './Navbar.jsx'
import image1 from '../img/catering-1-gy0NmtZm.jpg'
import image2 from '../img/catering-2-D3UPnsXd.jpg'
import image3 from '../img/catering-3-Da7dWLQ8.jpg'
// import { GiHealthDecrease } from 'react-icons/gi'

const features = [
  'Customizable menu options to suit your preferences',
  'Full-service catering or drop-off options available',
  'Accommodates dietary restrictions and preferences',
  'Professional and courteous staff',
]

const events = [
  { icon: FiBriefcase, title: 'Corporate Events', text: 'Meetings, conferences, and office gatherings' },
  { icon: FiGift, title: 'Special Celebrations', text: 'Weddings, birthdays, and anniversaries' },
  { icon: FiUsers, title: 'Family Gatherings', text: 'Reunions, holiday meals, and dinner parties' },
  { icon: FiFlag, title: 'Cultural Events', text: 'Festivals, community gatherings, and cultural celebrations' },
]

const bulk = [
  ['Cooler of Fried Rice', 120], ['Large Tray Asaro', 50], ['Large Tray of Chicken', 45],
  ['Large Tray of Jollof Rice', 45], ['Large Tray of Fried Rice', 50], ['Cooler of Jollof rice', 100],
  ['Large Tray of Peppered Fish', 50], ['Large Tray of Turkey', 50], ['Large tray Jambalaya Rice', 50],
  ['Large Tray of Peppered Beef', 120], ['Large Tray of Moinmoin', 50], ['Large Tray of Assorted Meat', 100],
  ['Large tray of Small Chops', 50], ['Large tray of Gizdodo', 50],
]

const hire = [
  { icon: FiHome, title: 'Marquee Hire', img: 'marquee.jpg', text: 'Premium marquees for events of all sizes, from intimate gatherings to large celebrations.' },
  { icon: FiBox, title: 'Furniture Hire', img: 'furniture.jpg', text: 'Stylish and comfortable furniture options to accommodate your guests and enhance your event space.' },
  { icon: FiTool, title: 'Catering Equipment', img: 'equipment.jpg', text: 'Professional catering equipment to ensure your food service runs smoothly and efficiently.' },
  { icon: FiClipboard, title: 'Event Planning', img: 'planning.jpg', text: 'Comprehensive event planning services to bring your vision to life and ensure every detail is perfect.' },
  { icon: FiImage, title: 'Hall Decor', img: 'decor.jpg', text: 'Beautiful and elegant decorations to transform your venue into a stunning and memorable space.' },
]

const interests = ['Catering', 'Bulk Orders', 'Marquee Hire', 'Furniture Hire', 'Catering Equipment', 'Event Planning', 'Hall Decor']

const field = 'w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-maroon/40'

const emptyForm = { name: '', date: '', email: '', guests: '', phone: '', interest: '', info: '', company: '' }

export default function Catering() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', msg: '' })
    try {
      const res = await fetch('/send-catering.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          date: form.date,
          guests: form.guests,
          type: form.interest,
          message: form.info,
          company: form.company, // honeypot
        }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus({ state: 'success', msg: data.message || "Thanks! We'll be in touch shortly." })
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
      <Navbar activePage="Catering" />
      {/* Intro */}
      <section className="py-14">
        <Header tag="Catering Services" name='Let Us Cater Your Next Event' subName="From intimate gatherings to large celebrations, Cookbox Inc. offers exceptional catering services featuring authentic Nigerian and Afro-Caribbean cuisine." />
          
        
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 h-52 rounded-md overflow-hidden bg-stone-200"><img src={image1} alt="Buffet trays of food" /></div>
            <div className="h-36 rounded-md overflow-hidden bg-stone-200"><img src={image2} alt="Grilled chicken" /></div>
            <div className="h-36 rounded-md overflow-hidden bg-stone-200"><img src={image3} alt="Catering chafing dishes" /></div>
          </div>
          <div>
            <h3 className="font-head text-xl text-stone-900">Customized Catering Solutions</h3>
            <p className="text-sm text-stone-600 mt-3">Our catering services are designed to bring the rich, vibrant flavors of Nigerian cuisine to your special events. Whether you're planning a corporate function, wedding celebration, birthday party, or family gathering, our team will work with you to create a memorable dining experience.</p>
            <ul className="mt-4 space-y-2">
              {features.map((f) => (
                <li key={f} className="flex gap-2 text-sm text-stone-700"><FiCheck size={16} className="text-maroon mt-0.5 shrink-0" />{f}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Events we cater */}
      <section className="pb-16">
        <h3 className="font-head text-xl text-center text-stone-900 mb-8">Events We Cater</h3>
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-5">
          {events.map((e) => (
            <div key={e.title} className="bg-stone-50 rounded-lg p-6 text-center">
              <span className="w-12 h-12 rounded-full bg-maroon text-white grid place-items-center mx-auto"><e.icon size={20} /></span>
              <h4 className="font-head text-stone-900 mt-3">{e.title}</h4>
              <p className="text-xs text-stone-500 mt-1">{e.text}</p>
            </div>
          ))}
        </div>
      </section>


      {/* Bulk order */}

      <section className="bg-[#fefbe8] py-14">
        {/* <Heading tag="Party Size Portions" sub="Hosting a big event has never been easier. With our bulk ordering options, you can enjoy stress-free catering with perfectly portioned meals, expertly crafted to delight your guests. Let us handle the food while you enjoy the occasion!">
          Order in Bulk
        </Heading> */}

        {/* <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="font-head text-lg text-stone-900 mb-3">Bulk Order Menu</h3>
            <ul className="divide-y divide-stone-100">
              {bulk.map(([name, price]) => (
                <li key={name} className="flex justify-between py-2.5 text-sm">
                  <span className="text-stone-700">{name}</span>
                  <span className="font-medium text-maroon">{price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div> */}

        <BulkMenu />
      </section>


      {/* Events & hire */}


      <section className="bg-slate-50 py-14">
        {/* <Heading tag="Complete Event Solutions" sub="We specialize in providing Marquee, Furniture, and Catering Equipment Hire, Event Planning, and Hall Decor. Our goal is to create memorable experiences and turn your dream event into a reality.">
          Events &amp; Hire Service
        </Heading> */}
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-5">
          {hire.map((h) => (
            <article key={h.title} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-40 bg-stone-300">
                {/* <Pic name={h.img} alt={h.title} /> */}
                <div className="absolute inset-0 bg-black/35 grid place-items-center text-white"><h.icon size={28} /></div>
              </div>
              <div className="p-4">
                <h3 className="font-head text-stone-900">{h.title}</h3>
                <p className="text-xs text-stone-500 mt-1">{h.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reach us */}
      <section id='reach' className="py-14">
        {/* <Heading sub="Tell us about your event, and we'll help bring your vision to life.">Reach Us</Heading> */}
        <form onSubmit={submit} className="max-w-3xl mx-auto px-4">
          <div className="relative bg-white rounded-lg shadow p-6 grid sm:grid-cols-2 gap-4">
            {/* Honeypot: hidden spam trap, leave empty */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px]"
              value={form.company}
              onChange={set('company')}
            />
            <label className="text-xs text-stone-600">Name
              <input required className={`${field} mt-1`} placeholder="Your full name" value={form.name} onChange={set('name')} />
            </label>
            <label className="text-xs text-stone-600">Date of Occasion
              <input type="date" required className={`${field} mt-1`} value={form.date} onChange={set('date')} />
            </label>
            <label className="text-xs text-stone-600">Email
              <input type="email" required className={`${field} mt-1`} placeholder="your@email.com" value={form.email} onChange={set('email')} />
            </label>
            <label className="text-xs text-stone-600">Expected Number of Guests
              <input type="number" min="1" className={`${field} mt-1`} placeholder="Number of attendees" value={form.guests} onChange={set('guests')} />
            </label>
            <label className="text-xs text-stone-600">Phone Number
              <input type="tel" className={`${field} mt-1`} placeholder="Your contact number" value={form.phone} onChange={set('phone')} />
            </label>
            <label className="text-xs text-stone-600">Area of Interest
              <select className={`${field} mt-1`} value={form.interest} onChange={set('interest')}>
                <option value="">Select an option</option>
                {interests.map((i) => <option key={i}>{i}</option>)}
              </select>
            </label>
            <label className="text-xs text-stone-600 sm:col-span-2">Additional Information
              <textarea rows="4" className={`${field} mt-1`} placeholder="Tell us more about your event requirements..." value={form.info} onChange={set('info')} />
            </label>

            <button
              type="submit"
              disabled={status.state === 'sending'}
              className="sm:col-span-2 bg-maroon hover:bg-maroon-dark disabled:opacity-60 text-white text-sm py-3 rounded-md transition"
            >
              {status.state === 'sending' ? 'Sending...' : 'Submit Inquiry'}
            </button>

            {status.msg && (
              <p role="status" className={`sm:col-span-2 text-sm text-center ${status.state === 'success' ? 'text-green-700' : 'text-red-700'}`}>
                {status.msg}
              </p>
            )}
          </div>
        </form>
      </section>
      <Footer />
    </>
  )
}