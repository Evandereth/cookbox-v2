import Home from "./components/Home";
import Catering from "./components/Catering";

function App() {
  const isCateringPage = window.location.pathname.replace(/\/+$/, "") === "/catering"

  return (
    <main>
      {isCateringPage ? <Catering /> : <Home />}
    </main>
  )
}

export default App
