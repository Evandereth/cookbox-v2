import { createContext, useContext } from 'react'

export const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)
export const money = (n) => `£${n.toFixed(2)}`
