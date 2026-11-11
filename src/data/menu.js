export const categories = ["Stew 'N' Soup", 'Grill', 'Healthy', 'Groceries']

const slug = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

// [name, price, category]
const raw = [
  ['Golden Penny Semovita', 0.99, 'Groceries'],
  ['Efo Riro With Pounded Yam', 14.99, "Stew 'N' Soup"],
  ['Grilled Fish With Plantain', 10.99, 'Grill'],
  ['Isi Ewu (Sauced Goat Meat)', 16.99, 'Grill'],
  ['Asun', 18.99, 'Grill'],
  ['Fish Stew (Omooyo)', 14.99, "Stew 'N' Soup"],
  ['Egusi Soup', 14.99, "Stew 'N' Soup"],
  ['Suya', 1.99, 'Grill'],
  ['Seafood Boil', 14.99, "Stew 'N' Soup"],
  ['Ewa Agoyin', 9.99, 'Healthy'],
  ['Gizdodo', 9.99, 'Grill'],
  ['Cowparts Peppersoup', 14.99, "Stew 'N' Soup"],
  ['Asaro (Yam Pottage)', 12.5, 'Grill'],
  ['Amstel Malta', 0.99, 'Groceries'],
  ['Jollof Rice & Chicken', 14.99, 'Grill'],
  ['Peak Evaporated Milk', 0.99, 'Groceries'],
  ['Stock Fish Stew', 14.99, "Stew 'N' Soup"],
  ['Moin-Moin', 1.99, 'Healthy'],
  ['Cowbell Powder Milk', 0.99, 'Groceries'],
  ['Peppered Snails', 20.99, 'Grill'],
  ['Stewed Meat', 14.99, 'Grill'],
  ['Okro Soup (Ila Asepo)', 14.99, "Stew 'N' Soup"],
  ['Close Up Toothpaste', 0.99, 'Groceries'],
  ['Salad', 1.25, 'Healthy'],
  ['Three Crowns Milk', 0.99, 'Groceries'],
  ['Plantain Fries', 1.75, 'Grill'],
  ['Efo Riro', 14.99, "Stew 'N' Soup"],
  ['Nkwobi', 14.99, 'Grill'],
  ['Stew (Ayamas)', 14.99, "Stew 'N' Soup"],
]

// Photos go in public/images/menu/<id>.jpg (e.g. egusi-soup.jpg)
export const menu = raw.map(([name, price, category]) => ({ id: slug(name), name, price, category }))
