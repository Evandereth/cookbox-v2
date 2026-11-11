import { useLayoutEffect } from "react";
import Home from "./components/Home";
import Catering from "./components/Catering";
import Cookout from "./components/Cookout";
import Careers from "./components/Career";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";

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
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catering" element={<Catering />} />
        <Route path="/cookout" element={<Cookout />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
