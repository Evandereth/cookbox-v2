import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  FiBookOpen,
  FiBriefcase,
  FiCalendar,
  FiHome,
  FiMenu,
  FiShoppingCart,
  FiUsers,
  FiX,
} from "react-icons/fi"
import { useCart } from "./cart.js"
import logo from "../img/logo.png"

const navigationItems = [
  { label: "Home", href: "/", route: true, icon: FiHome },
  { label: "Our Menu", href: "/menu", route: true, icon: FiBookOpen },
  { label: "Catering", href: "/catering", route: true, icon: FiUsers },
  { label: "Cookout Booking", href: "/cookout", route: true, icon: FiCalendar },
  { label: "Careers", href: "/careers", route: true, icon: FiBriefcase },
]

export default function Navbar({ activePage = "Home" }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { count, openCart } = useCart()

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false)
    }
    window.addEventListener("keydown", closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", closeOnEscape)
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="sticky top-0 z-20 bg-white/70 shadow-sm backdrop-blur-sm">
        <div className="bg-maroon text-xs text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-x-6 px-4 py-1.5 md:justify-end">
            <span><a className="transition hover:text-white" href="mailto:Admin@cookboxltd.com">Admin@cookboxltd.com</a></span>
            <span><a className="transition hover:text-white" href="tel:+447475595055">07475595055</a></span>
            <span>Location, UK</span>
          </div>
        </div>

        <nav aria-label="Main navigation" className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/" className="w-35 shrink-0" aria-label="Cookbox Inc. home">
            <img className="relative h-full w-full cursor-pointer object-cover" src={logo} alt="Cookbox Inc." />
          </Link>
          <div className="hidden items-center gap-3 lg:flex xl:gap-5">
            {navigationItems.map((item) => {
              const NavigationLink = item.route ? Link : "a"
              const destination = item.route ? { to: item.href } : { href: item.href }

              return (
                <NavigationLink
                  key={item.label}
                  {...destination}
                  aria-current={activePage === item.label ? "page" : undefined}
                  className={`whitespace-nowrap text-sm transition hover:text-maroon ${activePage === item.label ? "font-medium text-maroon" : "text-stone-700"}`}
                >
                  {item.label}
                </NavigationLink>
              )
            })}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={openCart}
              aria-label={`Open cart${count ? `, ${count} ${count === 1 ? "item" : "items"}` : ""}`}
              className="relative flex h-10 items-center justify-center gap-2 rounded-md px-2 text-stone-600 transition hover:bg-rose-50 hover:text-maroon focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon lg:px-3"
            >
              <FiShoppingCart size={22} aria-hidden="true" />
              <span className="hidden text-sm lg:inline">Cart</span>
              {count > 0 && (
                <span aria-hidden="true" className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-maroon px-1 text-[11px] font-medium text-white">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls={isMenuOpen ? "mobile-navigation" : undefined}
              onClick={() => setIsMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-md text-stone-700 transition hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon lg:hidden"
            >
              {isMenuOpen ? <FiX size={23} /> : <FiMenu size={23} />}
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-black/55"
            aria-label="Close navigation menu"
            onClick={() => setIsMenuOpen(false)}
          />
          <aside
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="absolute right-0 top-0 flex h-full w-[min(22rem,88vw)] flex-col bg-white shadow-2xl"
          >
            <div className="flex h-14 shrink-0 items-center justify-between border-b border-stone-100 px-5">
              <Link to="/" onClick={() => setIsMenuOpen(false)} aria-label="Cookbox Inc. home">
                <img className="h-8 w-auto max-w-40 object-contain" src={logo} alt="Cookbox Inc." />
              </Link>
              <button
                type="button"
                aria-label="Close navigation menu"
                onClick={() => setIsMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-md text-stone-500 hover:bg-stone-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-maroon"
              >
                <FiX size={23} />
              </button>
            </div>
            <nav aria-label="Mobile navigation links" className="flex-1 overflow-y-auto px-4 py-5">
              <div className="mb-7">
                <h2 className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-stone-400">Main Menu</h2>
                <ul className="space-y-1">
                  {navigationItems.map(({ label, href, route, icon: Icon }) => {
                    const NavigationLink = route ? Link : "a"
                    const destination = route ? { to: href } : { href }
                    const className = `flex min-h-12 items-center gap-3 rounded-lg px-3 text-[15px] font-medium transition focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-maroon ${activePage === label ? "bg-rose-50 text-maroon" : "text-stone-700 hover:bg-rose-50 hover:text-maroon"}`

                    return (
                      <li key={label}>
                        <NavigationLink
                          {...destination}
                          aria-current={activePage === label ? "page" : undefined}
                          onClick={() => setIsMenuOpen(false)}
                          className={className}
                        >
                          <Icon className={`shrink-0 ${activePage === label ? "text-maroon" : "text-stone-600"}`} size={18} aria-hidden="true" />
                          <span>{label}</span>
                        </NavigationLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div>
                <h2 className="mb-2 px-2 text-xs font-medium uppercase tracking-wide text-stone-400">My Account</h2>
                <ul className="space-y-1">
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        setIsMenuOpen(false)
                        openCart()
                      }}
                      className="flex min-h-12 items-center gap-3 rounded-lg px-3 text-[15px] font-medium text-stone-700 transition hover:bg-rose-50 hover:text-maroon focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-maroon"
                    >
                      <FiShoppingCart className="shrink-0 text-stone-600" size={18} aria-hidden="true" />
                      <span>My Cart{count > 0 ? ` (${count})` : ""}</span>
                    </button>
                  </li>
                </ul>
              </div>
            </nav>
            <div className="shrink-0 border-t border-stone-100 px-4 py-4 text-center text-sm text-stone-500">
              © Cookbox Inc. {new Date().getFullYear()}
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
