import { useState } from 'react'
import { FiArrowRight, FiBox, FiGrid, FiPackage, FiStar } from 'react-icons/fi'
import Header from './Header.jsx'

const CURRENCY = '£' // change or remove if these prices aren't in pounds

const categories = [
  {
    id: 'rice', label: 'Rice', icon: FiPackage,
    items: [
      ['Cooler of Fried Rice', 120],
      ['Cooler of Jollof Rice', 100],
      ['Large Tray of Jollof Rice', 45],
      ['Large Tray of Fried Rice', 50],
      ['Large Tray of Jambalaya Rice', 50],
    ],
  },
  {
    id: 'meat', label: 'Meat & Fish', icon: FiStar,
    items: [
      ['Large Tray of Chicken', 45],
      ['Large Tray of Peppered Fish', 50],
      ['Large Tray of Turkey', 50],
      ['Large Tray of Peppered Beef', 120],
      ['Large Tray of Assorted Meat', 100],
      ['Large Tray of Gizdodo', 50],
    ],
  },
  {
    id: 'sides', label: 'Sides & Snacks', icon: FiBox,
    items: [
      ['Large Tray Asaro', 50],
      ['Large Tray of Moinmoin', 50],
      ['Large Tray of Small Chops', 50],
    ],
  },
]

const sizeOf = (name) => (name.toLowerCase().startsWith('cooler') ? 'Cooler' : 'Large tray')

export default function BulkMenu() {
  const [tab, setTab] = useState('all')
  const visible = tab === 'all' ? categories : categories.filter((c) => c.id === tab)
  const tabs = [{ id: 'all', label: 'All', icon: FiGrid }, ...categories]

  return (
    <section className="bg-linear-to-b from-[#fefbe8] to-white py-5">
      <Header
        tag="Party Size Portions"
        name="Order in Bulk"
        subName="Hosting a big event has never been easier. With our bulk ordering options, you can enjoy stress-free catering with perfectly portioned meals, expertly crafted to delight your guests. Let us handle the food while you enjoy the occasion!"
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Filter tabs */}
        <div role="tablist" className="flex flex-wrap gap-2 overflow-x-auto pb-2 mb-8 justify-center items-center">
          {tabs.map((t) => {
            const TabIcon = t.icon

            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm transition cursor-pointer ${
                  tab === t.id
                    ? 'bg-maroon text-white shadow'
                    : 'bg-white text-stone-600 border border-stone-200 hover:border-maroon hover:text-maroon'
                }`}
              >
                <TabIcon size={14} />
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Categories */}
        <div className="space-y-10">
          {visible.map((c) => {
            const CategoryIcon = c.icon

            return (
              <div key={c.id}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-maroon/10 text-maroon">
                    <CategoryIcon size={18} />
                  </span>
                  <h3 className="font-head text-lg text-stone-900">{c.label}</h3>
                  <span className="text-xs text-stone-400">{c.items.length} items</span>
                  <span className="h-px flex-1 bg-stone-200" />
                </div>

                <ul className="grid gap-3 sm:grid-cols-2">
                  {c.items.map(([name, price]) => (
                    <li
                      key={name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-stone-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-stone-800">{name}</p>
                        <span className="mt-1 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                          {sizeOf(name)}
                        </span>
                      </div>
                      <span className="shrink-0 rounded-lg bg-maroon px-3 py-1.5 font-head text-sm text-white">
                        {CURRENCY}{price}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 rounded-2xl bg-maroon px-6 py-6 text-center text-white sm:flex sm:items-center sm:justify-between sm:text-left">
          <div>
            <h4 className="font-head text-lg">Ready to place a bulk order?</h4>
            <p className="mt-1 text-sm text-white/80">Tell us your date and guest numbers and we'll take care of the rest.</p>
          </div>
          <a
            href="#reach"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-medium text-maroon transition hover:bg-stone-100 sm:mt-0"
          >
            Make an enquiry <FiArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  )
}
