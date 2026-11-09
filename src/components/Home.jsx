// import { ShoppingCart, CreditCard, Clock, Star, Quote, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react'

// Images live in /public/images — swap in the real files with the same names.
// const img = (name) => `/images/${name}`
import Slider from "../components/Slider.jsx"
import bgimage from "../img/bg-one.jpg"
import logo from "../img/logo.png"
import image1 from "../img/bg-home.jpg"
import jollof from "../img/jollof.jpg"
import egusi from "../img/egusi.jpg"
import suya from "../img/suya.jpg"
import pounded from "../img/pounded.jpg"


const dishes = [
  { name: 'Jollof Rice', tag: 'Main Course', img: jollof, text: 'Fragrant rice cooked with tomatoes, peppers, and spices.' },
  { name: 'Egusi Soup', tag: 'Soup', img: egusi, text: 'Traditional Nigerian soup made with ground melon seeds and leafy vegetables.' },
  { name: 'Suya', tag: 'Appetizer', img: suya, text: 'Spicy seasoned meat grilled to perfection with a blend of ground roasted spices.' },
  { name: 'Pounded Yam & Efo Riro', tag: 'Special', img: pounded, text: 'Smooth yam paste served with vegetable soup cooked with seasoned meats.' },
]

const steps = [
  { id:"01", title: 'Browse Our Menu', text: 'Explore our wide selection of authentic Nigerian dishes and groceries on our website shop.' },
  {id:"02", title: 'Add to Cart', text: 'Select your favorite meals and add them to your cart. Customize your order as needed.' },
  {id:"03", title: 'Checkout', text: 'Proceed to checkout, enter your delivery address, and choose your preferred payment method.' },
  {id:"04", title: 'Wait for Delivery', text: 'Sit back and relax as we prepare and deliver your authentic Nigerian food straight to your door.' },
]

// Placeholder review text — replace with the real reviews.
const reviews = [
  { name: 'Nwachukwu Obiakwa', stars: 5, text: 'Professional service and great attention to detail. We ordered Cookbox catering for our wedding party and it was a hit.' },
  { name: 'T Bada', stars: 5, text: 'Very authentic, fresh, and delicious African food. My favorite takeaway, great service and fair prices.' },
  { name: 'Adesola Fagemiwa', stars: 5, text: 'Fantastic service, 100% good food and good service.' },
  { name: 'Tamilare Orujo', stars: 4, text: 'Very, very tasty food and very good service as always.' },
]

const Heading = ({ tag, children, sub }) => (
  <div className="text-center max-w-2xl mx-auto mb-10 px-4">
    {tag && <span className="inline-block bg-maroon/10 text-maroon text-xs font-medium rounded-full px-3 py-1 mb-3">{tag}</span>}
    <h2 className="font-head text-2xl md:text-3xl text-stone-900">{children}</h2>
    <div className="w-12 h-0.5 bg-maroon mx-auto mt-3 mb-4" />
    <p className="text-sm text-stone-500">{sub}</p>
  </div>
)

export default function Home() {
  return (
    <div>
      {/* Top bar + nav */}
      
      <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-sm shadow-sm">
      
          <div className="bg-maroon text-white text-xs">
            <div className="max-w-6xl mx-auto px-4 py-1.5 flex flex-wrap justify-center md:justify-end    gap-x-6">
              <span>Opening hours: Mon–Sat</span><span>07970 000000</span><span>Location, UK</span>
            </div>
          </div>
      
            <nav className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
             <div className="w-35">
              <a href="/" className="font-script italic text-maroon text-lg"><img className="relative w-full h-full object-cover cursor-pointer" src={logo} alt="" /></a>
              </div> 
              {/* <button aria-label="Cart" className="text-stone-700"><ShoppingCart size={20} /></   button> */}
            </nav>
          </header>

      {/* Hero */}
      <section className="relative min-h-140 md:min-h-160 flex items-end bg-stone-900">
        <img src={bgimage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" onError={(e) => (e.currentTarget.style.display = 'none')} />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
        <div className="relative max-w-6xl mx-auto w-full px-4 pb-12 grid md:grid-cols-2 gap-8 items-end">
          <div>
            <span className="inline-block bg-maroon text-white text-xs px-3 py-1 rounded-sm mb-3">Authentic Nigerian Cuisine</span>
            <h1 className="font-head text-4xl md:text-5xl text-white font-semibold leading-tight">
              Welcome to <span className="block font-script italic text-red-700 mt-1">Cookbox Inc.</span>
            </h1>
            <p className="text-white/85 text-sm mt-4 max-w-md">Bringing the best of Nigerian cuisine to your table! We specialize in traditional Afro-Caribbean meals prepared with fresh, locally sourced ingredients.</p>
            <a href="#menu" className="inline-block mt-6 bg-maroon hover:bg-maroon-dark text-white text-sm px-6 py-3 rounded-md transition">Explore Our Menu</a>
          </div>
          <div className="bg-black/60 backdrop-blur-sm text-white rounded-lg p-5 md:max-w-sm md:ml-auto border-l-3 border-maroon">
            <h3 className="font-head text-lg">Fine Dining with an African Twist</h3>
            <p className="text-xs text-white/80 mt-2">Whether you're hosting a grand celebration, craving a nostalgic taste of home, or exploring something new, we've got you covered.</p>
            <div>
              <ul className="w-full flex gap-4 text-xs mt-3 text-white/90 list-disc  marker:text-maroon list-inside">
                <li>Meals</li>
                <li>Catering</li>
                <li>Groceries</li>
              </ul>
            </div>

          </div>
        </div>
      </section>


      {/* <Slider /> */}

      {/* About */}
      <section className="max-w-6xl mx-auto px-4 py-14 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="font-head text-center text-3xl md:text-4xl uppercase text-maroon leading-tight">A taste of home, anywhere you are</h2>
          <p className="text-sm text-stone-600 my-4 max-w-md">At Cookbox Inc., we deliver food that is more than just a meal — it's a connection to culture, tradition, and cherished memories. Founded with a passion for Nigerian and Afro-Caribbean cuisine, we bring authentic flavors straight to your table.</p>
        </div>

        <div className=" rounded-md overflow-hidden bg-stone-200 aspect-4/3">
          <img src={image1} alt="Assorted Nigerian dishes" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
        </div>
      </section>



      {/* Popular dishes */}


      <section id="menu" className="bg-stone-50 py-14">
        <Heading sub="Experience authentic Nigerian flavors with our carefully crafted selection of traditional dishes.">Our Popular Dishes</Heading>
        <div className="max-w-5xl mx-auto px-4 grid sm:grid-cols-2 gap-6 ">
          {dishes.map((d) => (
            <article key={d.name} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-45 bg-stone-200">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                <span className="absolute top-3 right-3 bg-maroon text-white text-[10px] px-2.5 py-1 rounded-full">{d.tag}</span>
              </div>
              <div className="p-4 h-25 w-full"><h3 className="font-head text-stone-900">{d.name}</h3><p className="text-xs text-stone-500 mt-1">{d.text}</p></div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8"><a href="#" className="inline-block bg-maroon hover:bg-maroon-dark text-white text-sm px-6 py-2.5 rounded-md transition">View Full Menu</a></div>
      </section>



      {/* How to order */}
      <section className="bg-mint py-14">
        <Heading tag="Simple Process" sub="Getting your favorite Nigerian dishes delivered to your doorstep is quick and easy.">How to Order</Heading>
        <div className="max-w-4xl mx-auto p-5 grid sm:grid-cols-2 gap-5">
          {steps.map((s, i) => (
            <div key={s.title} className="relative bg-white/50 rounded-xl border border-maroon-dark p-6 text-center h-50 flex flex-col justify-center items-start gap-5">
              <h1 className="text-maroon-dark">
                {s.id}
              </h1>
              <h3 className="font-head mt-3 text-maroon-dark text-xl">{s.title}</h3>
              <p className="text-xs text-left text-stone-500 mt-1">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-14">
        <Heading tag="Our Team" sub="Meet the passionate people who make our authentic Nigerian cuisine possible.">The Faces Behind Cookbox</Heading>
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6, 7].map((n) => (
            <div key={n} className="aspect-3/4 rounded-md overflow-hidden bg-stone-200">
              <img src="" alt={`Cookbox team member ${n}`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-peach py-14">
        <Heading tag="Customer Reviews" sub="Read what our satisfied customers have to say about their experience with our authentic Nigerian cuisine.">What Our Customers Say</Heading>
        <div className="max-w-4xl mx-auto px-4 grid sm:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <figure key={r.name} className="bg-white rounded-lg shadow-sm p-6 relative">
              {/* <Quote className="absolute top-4 right-4 text-stone-200" size={28} /> */}
              {/* <div className="flex gap-0.5 text-amber-400">{Array.from({ length: r.stars }, (_, i) => <Star key={i} size={14} fill="currentColor" />)}</div> */}
              <blockquote className="text-sm italic text-stone-600 mt-3">"{r.text}"</blockquote>
              <figcaption className="flex items-center gap-3 mt-4">
                <span className="w-8 h-8 rounded-full bg-ember text-white grid place-items-center text-sm">{r.name[0]}</span>
                <span className="text-sm font-medium text-stone-800">{r.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-maroon text-white pt-12 pb-6">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <a href="/" className="font-script italic text-lg">Cookbox Inc.</a>
            <p className="text-sm text-white/80 mt-3 max-w-sm">Bringing the best of Nigerian cuisine to your table! We specialize in traditional Afro-Caribbean meals prepared with fresh, locally sourced ingredients.</p>
            {/* <div className="flex gap-3 mt-4"><Instagram size={18} /><Facebook size={18} /></div> */}
          </div>
          <div>
            <h4 className="text-ember font-head mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm text-white/85">
              <li className="flex gap-2"> Your address here</li>
              <li className="flex gap-2"> 07970 000000</li>
              <li className="flex gap-2"> hello@cookboxltd.com</li>

              {/* <li className="flex gap-2"><MapPin size={16} /> Your address here</li>
              <li className="flex gap-2"><Phone size={16} /> 07970 000000</li>
              <li className="flex gap-2"><Mail size={16} /> hello@cookboxltd.com</li> */}
            </ul>
          </div>
        </div>
        <p className="text-center text-xs text-white/60 mt-10">© {new Date().getFullYear()} Cookbox Inc. All Rights Reserved.</p>
      </footer>
    </div>
  )
}












