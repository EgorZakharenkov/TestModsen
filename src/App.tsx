import "./App.css";
import { Header } from "./components/Header/Header.tsx";
import { Footer } from "./components/Footer/Footer.tsx";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home.tsx";
import { Product } from "./pages/Product/Product.tsx";
import { Favorites } from "./pages/Favorites/Favorites.tsx";
function App() {
  return (
    <>
      <Header />
      <main className={"main"}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
