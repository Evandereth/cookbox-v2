import { useEffect, useMemo, useReducer, useState } from 'react'
import { CartContext } from './cart.js'

const KEY = 'cookbox-cart'

function reducer(items, a) {
  switch (a.type) {
    case 'add': {
      const found = items.find((i) => i.id === a.item.id)
      if (found) return items.map((i) => (i.id === a.item.id ? { ...i, qty: i.qty + 1 } : i))
      return [...items, { id: a.item.id, name: a.item.name, price: a.item.price, qty: 1 }]
    }
    case 'dec':
      return items.map((i) => (i.id === a.id ? { ...i, qty: i.qty - 1 } : i)).filter((i) => i.qty > 0)
    case 'remove':
      return items.filter((i) => i.id !== a.id)
    case 'clear':
      return []
    default:
      return items
  }
}

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY))
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, [], load)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)) } catch { /* storage unavailable */ }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      open,
      count: items.reduce((n, i) => n + i.qty, 0),
      total: items.reduce((sum, i) => sum + i.qty * i.price, 0),
      add: (item) => dispatch({ type: 'add', item }),
      decrease: (id) => dispatch({ type: 'dec', id }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
      openCart: () => setOpen(true),
      closeCart: () => setOpen(false),
    }),
    [items, open]
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
