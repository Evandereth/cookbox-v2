import {
  FiClock,
  FiFacebook,
  FiInstagram,
  FiMail,
  FiMapPin,
  FiPhone,
} from "react-icons/fi"
import logo from "../img/logo.png"

export default function Footer() {
  return (
    <footer id="contact" className="bg-maroon pt-12 pb-6 text-white md:pt-14">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 md:grid-cols-[1fr_auto] md:gap-16">
        <div>
          <a href="/#home" className="inline-flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white" aria-label="Cookbox Inc. home">
            <img src={logo} alt="Cookbox Inc." className="h-10 w-auto max-w-48 object-contain" />
          </a>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/85 md:text-base">
            Bringing the best of Nigerian cuisine to your table! We specialize in traditional Afro-Caribbean meals prepared with fresh, locally sourced ingredients.
          </p>
          <div className="mt-6 flex items-center gap-3" aria-label="Social media">
            <span role="img" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/15 hover:text-white">
            <a href="https://www.instagram.com/cookbox_inc?exln=MXJ0bGpkNGkybzAwYw==" target="_blank" rel="noopener noreferrer">
                <FiInstagram size={20} aria-hidden="true" />
            </a>
            </span>
            <span role="img" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/15 hover:text-white">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FiFacebook size={20} aria-hidden="true" />
            </a>
            </span>
          </div>
        </div>
        <div className="md:min-w-64">
          <h2 className="mb-5 font-head text-lg font-semibold text-ember">Contact Us</h2>
          <ul className="space-y-4 text-sm text-white/90">
            <li className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 shrink-0 text-amber-400" size={19} aria-hidden="true" />
              <span>Leicester, UK</span>
            </li>
            <li className="flex items-start gap-3">
              <FiPhone className="mt-0.5 shrink-0 text-amber-400" size={18} aria-hidden="true" />
              <a className="transition hover:text-white" href="tel:+447475595055">07475595055</a>
            </li>
            <li className="flex items-start gap-3">
              <FiMail className="mt-0.5 shrink-0 text-amber-400" size={19} aria-hidden="true" />
              <a className="transition hover:text-white" href="mailto:Admin@cookboxltd.com">Admin@cookboxltd.com</a>
            </li>
            <li className="flex items-start gap-3">
              <FiClock className="mt-0.5 shrink-0 text-amber-400" size={19} aria-hidden="true" />
              <span>Mon–Fri: 11am–10pm<br />Sat–Sun: 12pm–11pm</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-6xl border-t border-white/30 px-4 pt-5">
        <p className="text-xs text-white/75">© Copyright {new Date().getFullYear()}. Andicox studios. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
