import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home/Home";
import { Product } from "./pages/Product/Product";
import { Favorites } from "./pages/Favorites/Favorites";
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
