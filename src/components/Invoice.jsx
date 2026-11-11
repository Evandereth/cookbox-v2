import { Link } from 'react-router-dom'
import { FiPrinter } from 'react-icons/fi'
import { money } from './cart.js'

const COMPANY = {
  name: 'Cookbox Inc Ltd',
  place: 'Leicester, UK',
  phone: '07475595055',
  email: 'Admin@cookboxltd.com',
}

const BANK = { name: 'Cookbox Inc Ltd', account: '59537862', sort: '309950' }

export default function Invoice({ order }) {
  const { invoice, items, total, customer, fulfilment, payment, preferredDate, notes } = order
  const delivery = fulfilment === 'delivery'

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 rounded-2xl bg-green-50 p-5 text-center print:hidden">
        <h1 className="font-head text-2xl text-green-800">Thank you, your order is placed!</h1>
        <p className="mt-2 text-sm text-green-800/80">
          A copy of your invoice has been emailed to {customer.email}. We will contact you to confirm your order.
        </p>
      </div>

      <article className="invoice rounded-2xl bg-white p-6 shadow-sm sm:p-10">
        {/* Header */}
        <header className="flex flex-wrap items-start justify-between gap-6 border-b border-stone-200 pb-6">
          <div>
            <p className="font-script text-2xl italic text-maroon">Cookbox inc</p>
            <p className="mt-2 text-sm text-stone-600">{COMPANY.name}</p>
            <p className="text-sm text-stone-600">{COMPANY.place}</p>
            <p className="text-sm text-stone-600">{COMPANY.phone}</p>
            <p className="text-sm text-stone-600">{COMPANY.email}</p>
          </div>
          <div className="text-right">
            <h2 className="font-head text-3xl font-medium text-maroon">INVOICE</h2>
            <p className="mt-2 text-sm text-stone-600"><span className="text-stone-500">Invoice no:</span> <strong>{invoice.number}</strong></p>
            <p className="text-sm text-stone-600"><span className="text-stone-500">Date:</span> {invoice.date}</p>
          </div>
        </header>

        {/* Bill to + order details */}
        <section className="grid gap-6 py-6 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-stone-500">Billed to</h3>
            <p className="mt-2 text-sm font-medium text-stone-900">{customer.name}</p>
            <p className="text-sm text-stone-600">{customer.email}</p>
            <p className="text-sm text-stone-600">{customer.phone}</p>
          </div>
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wide text-stone-500">{delivery ? 'Delivery' : 'Collection'}</h3>
            {delivery ? (
              <p className="mt-2 text-sm text-stone-600">{customer.address}<br />{customer.postcode}</p>
            ) : (
              <p className="mt-2 text-sm text-stone-600">Collect from Cookbox, Leicester</p>
            )}
            {preferredDate && <p className="mt-1 text-sm text-stone-600">Preferred date: {preferredDate}</p>}
          </div>
        </section>

        {/* Items */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-wide text-stone-500">
                <th className="py-2 font-medium">Item</th>
                <th className="py-2 text-center font-medium">Qty</th>
                <th className="py-2 text-right font-medium">Price</th>
                <th className="py-2 text-right font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {items.map((i) => (
                <tr key={i.id} className="border-b border-stone-100">
                  <td className="py-3 pr-2 text-stone-900">{i.name}</td>
                  <td className="py-3 text-center text-stone-600">{i.qty}</td>
                  <td className="py-3 text-right text-stone-600">{money(i.price)}</td>
                  <td className="py-3 text-right font-medium text-stone-900">{money(i.price * i.qty)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 ml-auto w-full max-w-xs space-y-1.5 text-sm">
          <div className="flex justify-between text-stone-600"><span>Subtotal</span><span>{money(total)}</span></div>
          {delivery && <div className="flex justify-between text-stone-600"><span>Delivery</span><span>To be confirmed</span></div>}
          <div className="flex justify-between border-t border-stone-200 pt-2 font-head text-lg font-semibold text-maroon">
            <span>Total</span><span>{money(total)}</span>
          </div>
        </div>

        {notes && (
          <section className="mt-6">
            <h3 className="text-xs font-medium uppercase tracking-wide text-stone-500">Order notes</h3>
            <p className="mt-1 text-sm text-stone-600">{notes}</p>
          </section>
        )}

        {/* Payment */}
        <section className="mt-8 rounded-xl bg-maroon/5 p-5 text-sm">
          <h3 className="font-head text-stone-900">Payment</h3>
          {payment === 'bank' ? (
            <>
              <p className="mt-2 text-stone-600">Please pay by bank transfer and use <strong>{invoice.number}</strong> as the payment reference.</p>
              <p className="mt-2 text-stone-700">Account name: {BANK.name}</p>
              <p className="text-stone-700">Account number: {BANK.account}</p>
              <p className="text-stone-700">Sort code: {BANK.sort}</p>
            </>
          ) : (
            <p className="mt-2 text-stone-600">Payment due on {delivery ? 'delivery' : 'collection'}.</p>
          )}
        </section>

        <p className="mt-8 text-center text-xs text-stone-500">Thank you for choosing Cookbox Inc Ltd.</p>
      </article>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center print:hidden">
        <button
          onClick={() => window.print()}
          className="flex min-h-[48px] items-center justify-center gap-2 rounded-xl bg-maroon px-6 text-sm font-medium text-white hover:bg-maroon-dark"
        >
          <FiPrinter size={16} aria-hidden="true" /> Print / Save as PDF
        </button>
        <Link to="/menu" className="flex min-h-[48px] items-center justify-center rounded-xl border-[1.5px] border-maroon px-6 text-sm font-medium text-maroon hover:bg-maroon/5">
          Back to menu
        </Link>
      </div>
    </div>
  )
}
