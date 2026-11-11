import { useMemo, useState } from 'react'
import { FiCoffee, FiPlus, FiSearch } from 'react-icons/fi'
import { menu, categories } from '../data/menu.js'
import { useCart, money } from '../components/cart.js'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'


const PAGE = 12

const tones = {
  "Stew 'N' Soup": 'bg-orange-100 text-orange-800',
  Grill: 'bg-rose-100 text-maroon',
  Healthy: 'bg-green-100 text-green-800',
  Groceries: 'bg-amber-100 text-amber-800',
}



function DishCard({ dish }) {
  const { add, items } = useCart()
  const inCart = items.find((i) => i.id === dish.id)?.qty || 0

  return (
    <article className="overflow-hidden rounded-2xl bg-white shadow-sm">
      <div className={`relative flex h-29.5 items-center justify-center sm:h-47.5 ${tones[dish.category]}`}>
        <FiCoffee size={36} strokeWidth={1.4} aria-hidden="true" />
        {dish.image && (
          <img
            src={dish.image}
            alt={dish.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <span className={`absolute left-2.5 top-2.5 rounded-full bg-white px-2.5 py-1 text-[10px] font-medium sm:left-3.5 sm:top-3.5 sm:text-[11px] ${tones[dish.category].split(' ')[1]}`}>
          {dish.category}
        </span>
      </div>
      <div className="p-3 pl-3.5 sm:p-4.5">
        <h3 className="min-h-10 font-head text-sm leading-snug text-stone-900 sm:min-h-11.5 sm:text-base">{dish.name}</h3>
        <div className="mt-2 flex items-center justify-between sm:mt-3.5">
          {/* <span className="font-head text-base font-semibold text-maroon sm:text-lg">{money(dish.price)}</span> */}
          <p className='text-xs text-stone-300'>
            price coming soon
          </p>
          
          <button
            disabled
            onClick={() => add(dish)}
            aria-label={`Add ${dish.name} to cart${inCart ? `, ${inCart} in cart` : ''}`}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-maroon text-white transition hover:bg-maroon-dark active:scale-95 sm:rounded-xl cursor-pointer"
          >
            <FiPlus size={20} />
            {inCart > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-stone-900 px-1 text-[11px] font-medium">{inCart}</span>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export default function Menu() {
  const [cat, setCat] = useState('All')
  const [query, setQuery] = useState('')
  const [shown, setShown] = useState(PAGE)
  const { count, total, openCart } = useCart()

  const counts = useMemo(() => {
    const c = { All: menu.length }
    categories.forEach((k) => (c[k] = menu.filter((m) => m.category === k).length))
    return c
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return menu.filter((m) => (cat === 'All' || m.category === cat) && (!q || m.name.toLowerCase().includes(q)))
  }, [cat, query])

  const pick = (c) => { setCat(c); setShown(PAGE) }
  const search = (e) => { setQuery(e.target.value); setShown(PAGE) }
  const reset = () => { setCat('All'); setQuery(''); setShown(PAGE) }

  return (
    <>
      <Navbar activePage="Our Menu" />
      <main className="bg-[#faf8f5] pb-28">
      {/* Hero + search */}
      <section className="px-4 pt-4">
        <div className="mx-auto max-w-6xl rounded-3xl bg-maroon px-5 py-8 text-white sm:px-10 sm:py-12 sm:text-center">
          <p className="text-xs text-white/75">Fresh from our kitchen</p>
          <h1 className="mt-1.5 font-head text-4xl font-medium sm:text-5xl">Our Menu</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/85 sm:mx-auto sm:mt-3">
            Experience authentic Nigerian flavors with our carefully crafted selection of traditional dishes.
          </p>
          <label className="mt-5 flex h-12 items-center gap-2.5 rounded-xl bg-white px-4 sm:mx-auto sm:max-w-md sm:rounded-full">
            <FiSearch size={18} className="shrink-0 text-stone-500" />
            <input
              type="search"
              value={query}
              onChange={search}
              aria-label="Search the menu"
              placeholder="Search dishes"
              className="w-full bg-transparent text-sm text-stone-900 outline-none placeholder:text-stone-400"
            />
          </label>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        {/* Category chips */}
        <div role="tablist" aria-label="Menu categories" className="-mx-4 flex gap-2 flex-wrap px-4 pb-3 pt-5 justify-center">
          {['All', ...categories].map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={cat === c}
              onClick={() => pick(c)}
              className={`min-h-11 shrink-0 rounded-full border px-4 text-sm font-medium transition cursor-pointer ${
                cat === c ? 'border-maroon bg-maroon text-white' : 'border-stone-300 bg-white text-stone-700 hover:border-maroon hover:text-maroon'
              }`}
            >
              {c} <span className={`ml-1 text-xs ${cat === c ? 'text-white/75' : 'text-stone-500'}`}>{counts[c]}</span>
            </button>
          ))}
        </div>

        <p className="mb-3 text-sm text-stone-600" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'dish' : 'dishes'}
        </p>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-stone-700">No dishes match your search.</p>
            <button onClick={reset} className="mt-3 min-h-11 text-sm font-medium text-maroon">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4 lg:gap-6">
            {filtered.slice(0, shown).map((d) => <DishCard key={d.id} dish={d} />)}
          </div>
        )}

        {/* Load more */}
        {filtered.length > shown && (
          <div className="mt-8 text-center">
            <p className="mb-3 text-sm text-stone-600">Showing {shown} of {filtered.length} dishes</p>
            <button
              onClick={() => setShown(shown + PAGE)}
              className="min-h-12 rounded-full border-[1.5px] border-maroon px-8 text-sm font-medium text-maroon transition hover:bg-maroon hover:text-white"
            >
              Load more
            </button>
          </div>
        )}
      </div>

      {/* Floating cart bar */}
      {count > 0 && (
        <div className="fixed inset-x-4 bottom-4 z-30 mx-auto max-w-md">
          <div className="flex items-center justify-between rounded-full bg-stone-900 py-2 pl-5 pr-2 text-sm text-white shadow-xl">
            <span>
              {count} {count === 1 ? 'item' : 'items'} · <b className="font-head text-[15px] font-semibold">{money(total)}</b>
            </span>
            <button onClick={openCart} className="min-h-[44px] rounded-full bg-maroon px-5 font-medium hover:bg-maroon-dark">View cart</button>
          </div>
        </div>
      )}
      </main>
      <Footer />
    </>
  )
}
 