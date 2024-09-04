import "./App.css";
import { Header } from "./components/Header/Header";
import { Footer } from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import { routes } from "./constants";
function App() {
  return (
    <>
      <Header />
      <main className={"main"}>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.page} />
          ))}
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
