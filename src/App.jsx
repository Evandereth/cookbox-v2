import { useLayoutEffect } from "react";
import Home from "./pages/Home";
import Catering from "./pages/Catering";
import Cookout from "./pages/Cookout";
import Careers from "./pages/Career";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import CartDrawer from "./components/CartDrawer";
import { CartProvider } from "./components/CartContext";

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/cookout" element={<Cookout />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <CartDrawer />
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
