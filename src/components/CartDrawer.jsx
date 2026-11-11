import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FiX, FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi'
import { useCart, money } from './cart.js'

export default function CartDrawer() {
  const { open, closeCart, items, add, decrease, remove, clear, total, count } = useCart()

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [open, closeCart])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center sm:p-4" onClick={closeCart}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-sheet-up motion-reduce:animate-none flex max-h-[88dvh] w-full flex-col overflow-hidden rounded-t-3xl bg-white sm:max-w-md sm:rounded-3xl"
      >
        <div className="flex items-center justify-between px-5 py-4">
          <h2 id="cart-title" className="font-head text-xl text-stone-900">Your cart {count > 0 && <span className="text-sm text-stone-500">({count})</span>}</h2>
          <button onClick={closeCart} aria-label="Close cart" className="grid h-11 w-11 place-items-center rounded-full hover:bg-stone-100">
            <FiX size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="px-5 pb-10 pt-6 text-center text-stone-500">
            <FiShoppingCart className="mx-auto mb-3 text-stone-300" size={36} />
            <p className="text-sm">Your cart is empty.</p>
            <Link to="/menu" onClick={closeCart} className="mt-4 inline-block text-sm font-medium text-maroon">Browse the menu</Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-stone-100 overflow-y-auto px-5">
              {items.map((i) => (
                <li key={i.id} className="flex items-center gap-3 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-stone-900">{i.name}</p>
                    <p className="text-xs text-stone-500">{money(i.price)} each</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => decrease(i.id)} aria-label={`Remove one ${i.name}`} className="grid h-10 w-10 place-items-center rounded-full bg-stone-100 hover:bg-stone-200"><FiMinus size={16} /></button>
                    <span className="w-6 text-center text-sm font-medium">{i.qty}</span>
                    <button onClick={() => add(i)} aria-label={`Add one ${i.name}`} className="grid h-10 w-10 place-items-center rounded-full bg-stone-100 hover:bg-stone-200"><FiPlus size={16} /></button>
                  </div>
                  <p className="w-16 text-right text-sm font-medium text-maroon">{money(i.price * i.qty)}</p>
                  <button onClick={() => remove(i.id)} aria-label={`Delete ${i.name}`} className="grid h-10 w-10 place-items-center text-stone-400 hover:text-red-600"><FiTrash2 size={16} /></button>
                </li>
              ))}
            </ul>

            <div className="border-t border-stone-100 px-5 pb-5 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600">Total</span>
                <span className="font-head text-xl font-semibold text-maroon">{money(total)}</span>
              </div>
              <Link
                to="/checkout"
                onClick={closeCart}
                className="mt-4 flex min-h-[52px] items-center justify-center rounded-xl bg-maroon text-base font-medium text-white transition hover:bg-maroon-dark"
              >
                Checkout
              </Link>
              <button onClick={clear} className="mt-2 min-h-[44px] w-full text-sm text-stone-500 hover:text-maroon">Clear cart</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
