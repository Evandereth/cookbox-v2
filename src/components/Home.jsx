// import { ShoppingCart, CreditCard, Clock, Star, Quote, Instagram, Facebook, MapPin, Phone, Mail } from 'lucide-react'

// Images live in /public/images — swap in the real files with the same names.
// const img = (name) => `/images/${name}`
// import Slider from "../components/Slider.jsx"

import { useState } from "react"
import { FiStar } from "react-icons/fi"
import Footer from "./Footer"
import Navbar from "./Navbar"
import bgimage from "../img/bg-one.jpg"
import image1 from "../img/bg-home.jpg"
import jollof from "../img/jollof.jpg"
import egusi from "../img/egusi.jpg"
import suya from "../img/suya.jpg"
import pounded from "../img/pounded.jpg"
import team1 from "../img/team-2-HIh6KOdg.jpg"
import team2 from "../img/team-1-DoNqsOPJ.jpg"
import team3 from "../img/team-3-B8eHjTD3.jpg"
import team4 from "../img/team-4-DX61uscJ.jpg"
import team5 from "../img/team-5-BXSBAsDg.jpg"
import team6 from "../img/team-6-BvWKLxvu.jpg"
import team7 from "../img/team-7-CEMDaLJK.jpg"


    


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

    const [activeImage, setActiveImage] = useState(0)

    const teamImage = [
      {id:1, image:team1},
      {id:2, image:team2},
      {id:3, image:team3},
      {id:4, image:team4},
      {id:5, image:team5},
      {id:6, image:team6},
      {id:7, image:team7}
    ]

  return (
    <div>
      <Navbar activePage="Home" />

      {/* Hero */}
      <section id="home" className="relative min-h-140 md:min-h-160 flex items-center bg-stone-900">
        <img src={bgimage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70" onError={(e) => (e.currentTarget.style.display = 'none')} />
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10" />
        <div className="relative max-w-7xl mx-auto w-full px-4 pb-12 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-block bg-maroon text-white text-xs px-3 py-1 rounded-sm mb-3">Authentic Nigerian Cuisine</span>
            <h1 className="font-head text-4xl md:text-7xl text-white font-semibold leading-tight">
              Welcome to <span className="block font-script italic text-red-700 mt-1">Cookbox Inc.</span>
            </h1>
            <p className="text-white/85 text-sm md:text-lg mt-4 max-w-xl">Bringing the best of Nigerian cuisine to your table! We specialize in traditional Afro-Caribbean meals prepared with fresh, locally sourced ingredients.</p>
            <a href="#menu" className="inline-block mt-6 bg-maroon hover:bg-maroon-dark text-white text-md md:text-lg lg:text-xl px-6 py-3 rounded-md transition">Explore Our Menu</a>
          </div>

          <div className="bg-black/60 backdrop-blur-sm text-white rounded-lg p-5 md:max-w-md lg:max-w-lg md:h-50 lg:h-auto flex flex-col gap-5 md:ml-auto border-l-3 border-maroon">
            <h3 className="font-head text-lg">Fine Dining with an African Twist</h3>
            <p className="text-xs md:text-md lg:text-lg text-white/80 mt-2">Whether you're hosting a grand celebration, craving a nostalgic taste of home, or exploring something new, we've got you covered.</p>
            <div>
              <ul className="w-full flex gap-4 text-xs md:text-md lg:text-lg mt-3 text-white/90 list-disc  marker:text-maroon list-inside">
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
        <div className="w-full mx-auto px-4 flex flex-wrap gap-10 justify-center items-center">
          {dishes.map((d) => (
            <article key={d.name} className="w-[22em] h-75 bg-white rounded-lg border-l-4 border-maroon shadow overflow-hidden">
              <div className="relative h-45 bg-stone-200">
                <img src={d.img} alt={d.name} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
                <span className="absolute top-3 right-3 bg-maroon text-white text-[10px] px-2.5 py-1 rounded-full">{d.tag}</span>
              </div>
              <div className="p-4 h-25 w-full flex flex-col gap-3 justify-around items-start"><h3 className="font-head text-stone-900 text-xl font-bold">{d.name}</h3><p className="text-sm text-stone-500 mt-1">{d.text}</p></div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8"><a href="#" className="inline-block bg-maroon hover:bg-maroon-dark text-white text-sm px-6 py-2.5 rounded-md transition">View Full Menu</a></div>
      </section>



      {/* How to order */}
      <section className="bg-mint py-14">
        <Heading tag="Simple Process" sub="Getting your favorite Nigerian dishes delivered to your doorstep is quick and easy.">How to Order</Heading>
        <div className="w-full mx-auto px-4 flex flex-wrap gap-10 justify-center items-center">
          {steps.map((s, i) => (
            <div key={s.title} className="relative w-[22em] bg-white/50 rounded-xl border border-maroon-dark p-6 text-center h-55 flex flex-col justify-center items-start gap-5">
              <h1 className="text-maroon-dark">
                {s.id}
              </h1>
              <h3 className="font-head mt-3 text-maroon-dark text-xl">{s.title}</h3>
              <p className="text-sm text-left text-stone-500 mt-1">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-14">
        <Heading tag="Our Team" sub="Meet the passionate people who make our authentic Nigerian cuisine possible.">The Faces Behind Cookbox</Heading>
        <div className="max-w-4xl mx-auto px-4 flex flex-wrap justify-center items-center gap-4">
          {teamImage.map((teamImg, index) => (
            <div key={index} className="w-20 h-20 aspect-3/4 rounded-lg overflow-hidden bg-stone-200">
              <img 
              onClick={()=>setActiveImage(index)}
              src={teamImg.image} alt={`Cookbox team member ${teamImg}`} className={`w-full h-full object-cover object-top cursor-pointer rounded-lg ${index === activeImage ? 'border-4 border-maroon-dark' : "border-0"}`} onError={(e) => (e.currentTarget.style.display = 'none')} />
            </div>
          ))}
        </div>

        <div className="w-[90%] mx-auto my-5 flex justify-center items-center">
          <div className="w-full h-100 md:w-150 md:h-160 lg:w-200 lg:h-150 aspect-3/4 rounded-xl overflow-hidden bg-stone-200">
            <img src={teamImage[activeImage].image} alt={`Cookbox team member`} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
          </div>
        </div>

      </section>

      {/* Testimonials */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-stone-50 via-peach to-rose-50 py-16 md:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -bottom-36 -left-24 -z-10 h-80 w-80 rounded-full bg-amber-100/60 blur-3xl" />
        <Heading tag="Customer Reviews" sub="A little love from the people who bring Cookbox to their table.">What Our Customers Say</Heading>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-5 px-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {reviews.map((r) => (
            <figure key={r.name} className="group relative flex min-h-64 flex-col overflow-hidden rounded-2xl border border-white/80 bg-white/85 p-6 shadow-[0_8px_30px_rgba(74,10,18,0.06)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(74,10,18,0.12)] sm:p-7">
              <span aria-hidden="true" className="absolute -right-1 -top-5 font-serif text-8xl leading-none text-maroon/[0.07] transition group-hover:text-maroon/[0.12]">“</span>
              <div className="relative mb-5 flex gap-1" role="img" aria-label={`${r.stars} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, index) => (
                  <FiStar
                    key={index}
                    size={15}
                    aria-hidden="true"
                    className={index < r.stars ? "fill-amber-400 text-amber-400" : "text-stone-200"}
                  />
                ))}
              </div>
              <blockquote className="relative flex-1 text-[15px] leading-7 text-stone-600">
                “{r.text}”
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3 border-t border-stone-100 pt-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-rose-100 to-orange-100 font-head text-sm font-semibold text-maroon ring-4 ring-rose-50">
                  {r.name[0]}
                </span>
                <span className="text-sm font-semibold text-stone-800">{r.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}


