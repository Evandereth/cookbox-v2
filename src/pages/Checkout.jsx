import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiShoppingCart } from 'react-icons/fi'
import { useCart, money } from '../components/cart.js'
import Footer from '../components/Footer.jsx'
import Invoice from '../components/Invoice.jsx'
import Navbar from '../components/Navbar.jsx'

const input = 'w-full rounded-md border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-maroon/40'

const Field = ({ label, required, full, children }) => (
  <label className={`block text-xs font-medium text-stone-700 ${full ? 'sm:col-span-2' : ''}`}>
    {label}{required && <span className="text-red-600"> *</span>}
    <div className="mt-1.5">{children}</div>
  </label>
)

const Choice = ({ title, text, ...props }) => (
  <label className="flex cursor-pointer gap-3 rounded-xl border border-stone-200 bg-white p-4 text-sm has-[:checked]:border-maroon has-[:checked]:bg-maroon/5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-maroon/40">
    <input type="radio" className="mt-0.5 h-4 w-4 accent-maroon" {...props} />
    <span>
      <span className="block font-medium text-stone-900">{title}</span>
      <span className="block text-xs text-stone-500">{text}</span>
    </span>
  </label>
)

const emptyForm = {
  name: '', email: '', phone: '', fulfilment: 'delivery', address: '', postcode: '',
  date: '', payment: 'bank', notes: '', company: '',
}

export default function Checkout() {
  const { items, total, count, clear, openCart } = useCart()
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState({ state: 'idle', msg: '' })
  const [placed, setPlaced] = useState(null)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })
  const today = new Date().toISOString().split('T')[0]
  const delivery = form.fulfilment === 'delivery'

  const submit = async (e) => {
    e.preventDefault()
    setStatus({ state: 'sending', msg: '' })
    try {
      const res = await fetch('/send-order.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          fulfilment: form.fulfilment,
          address: delivery ? form.address : '',
          postcode: delivery ? form.postcode : '',
          date: form.date,
          payment: form.payment,
          notes: form.notes,
          company: form.company, // honeypot
          items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
        }),
      })
      const data = await res.json()
      if (data.ok && data.invoice) {
        setPlaced({
          invoice: data.invoice,
          items,
          total,
          customer: { name: form.name, email: form.email, phone: form.phone, address: form.address, postcode: form.postcode },
          fulfilment: form.fulfilment,
          payment: form.payment,
          preferredDate: form.date,
          notes: form.notes,
        })
        clear()
        window.scrollTo(0, 0)
      } else {
        setStatus({ state: 'error', msg: data.error || 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ state: 'error', msg: 'Network error. Please try again.' })
    }
  }

  // After ordering: show the invoice
  if (placed) {
    return (
      <>
        <Navbar activePage="Checkout" />
        <main className="bg-[#faf8f5] px-4 py-10">
          <Invoice order={placed} />
        </main>
        <Footer />
      </>
    )
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <>
        <Navbar activePage="Checkout" />
        <main className="bg-[#faf8f5] px-4 py-20 text-center">
          <FiShoppingCart className="mx-auto mb-4 text-stone-300" size={44} aria-hidden="true" />
          <h1 className="font-head text-2xl text-stone-900">Your cart is empty</h1>
          <p className="mt-2 text-sm text-stone-600">Add some dishes from the menu to place an order.</p>
          <Link to="/menu" className="mt-6 inline-flex min-h-[48px] items-center rounded-xl bg-maroon px-8 text-sm font-medium text-white hover:bg-maroon-dark">
            Browse the menu
          </Link>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar activePage="Checkout" />
      <main className="bg-[#faf8f5] px-4 py-10">
        <h1 className="mb-8 text-center font-head text-3xl text-maroon">Checkout</h1>

        <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_360px]">
        {/* Order summary (first on phones, right column on desktop) */}
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm lg:order-last lg:sticky lg:top-20">
          <div className="flex items-center justify-between">
            <h2 className="font-head text-lg text-stone-900">Order summary <span className="text-sm text-stone-500">({count})</span></h2>
            <button type="button" onClick={openCart} className="min-h-[44px] text-sm font-medium text-maroon">Edit cart</button>
          </div>
          <ul className="mt-2 divide-y divide-stone-100">
            {items.map((i) => (
              <li key={i.id} className="flex items-start justify-between gap-3 py-2.5 text-sm">
                <span className="text-stone-700">{i.qty} × {i.name}</span>
                <span className="shrink-0 font-medium text-stone-900">{money(i.price * i.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex items-center justify-between border-t border-stone-200 pt-3">
            <span className="text-sm text-stone-600">Total</span>
            <span className="font-head text-xl font-semibold text-maroon">{money(total)}</span>
          </div>
          {delivery && <p className="mt-2 text-xs text-stone-500">Delivery charges, if any, will be confirmed when we contact you.</p>}
        </aside>

        {/* Form */}
        <form onSubmit={submit} className="relative rounded-2xl bg-white p-6 shadow-sm">
          {/* Honeypot: hidden spam trap, leave empty */}
          <input
            type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
            className="absolute -left-[9999px]" value={form.company} onChange={set('company')}
          />

          <h2 className="font-head text-lg text-stone-900">Your details</h2>
          <div className="mt-4 grid gap-5 sm:grid-cols-2">
            <Field label="Full Name" required>
              <input required autoComplete="name" className={input} placeholder="Enter your full name" value={form.name} onChange={set('name')} />
            </Field>
            <Field label="Mobile Number" required>
              <input type="tel" required autoComplete="tel" className={input} placeholder="Your contact number" value={form.phone} onChange={set('phone')} />
            </Field>
            <Field label="Email Address" required full>
              <input type="email" required autoComplete="email" className={input} placeholder="your@email.com" value={form.email} onChange={set('email')} />
            </Field>
          </div>

          <h2 className="mt-8 font-head text-lg text-stone-900">Delivery or collection</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Choice name="fulfilment" value="delivery" checked={delivery} onChange={set('fulfilment')} title="Delivery" text="We bring it to your door" />
            <Choice name="fulfilment" value="collection" checked={!delivery} onChange={set('fulfilment')} title="Collection" text="Pick up from Cookbox, Leicester" />
          </div>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            {delivery && (
              <>
                <Field label="Delivery Address" required>
                  <input required autoComplete="street-address" className={input} placeholder="House number and street" value={form.address} onChange={set('address')} />
                </Field>
                <Field label="Postcode" required>
                  <input required autoComplete="postal-code" className={input} placeholder="LE1 1AA" value={form.postcode} onChange={set('postcode')} />
                </Field>
              </>
            )}
            <Field label="Preferred Date (optional)" full>
              <input type="date" min={today} className={input} value={form.date} onChange={set('date')} />
            </Field>
            <Field label="Order Notes (optional)" full>
              <textarea rows="3" className={input} placeholder="Allergies, spice level, delivery instructions..." value={form.notes} onChange={set('notes')} />
            </Field>
          </div>

          <h2 className="mt-8 font-head text-lg text-stone-900">Payment</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Choice name="payment" value="bank" checked={form.payment === 'bank'} onChange={set('payment')} title="Bank transfer" text="Account details are on your invoice" />
            <Choice name="payment" value="cash" checked={form.payment === 'cash'} onChange={set('payment')} title={`Pay on ${delivery ? 'delivery' : 'collection'}`} text="Pay when you receive your order" />
          </div>

          <button
            type="submit"
            disabled={status.state === 'sending'}
            className="mt-8 flex min-h-[52px] w-full items-center justify-center rounded-xl bg-maroon text-base font-medium text-white transition hover:bg-maroon-dark disabled:opacity-60"
          >
            {status.state === 'sending' ? 'Placing order...' : `Place order · ${money(total)}`}
          </button>
          {status.msg && (
            <p role="alert" className="mt-3 text-center text-sm text-red-700">{status.msg}</p>
          )}
        </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
