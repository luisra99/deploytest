import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./Nav.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Existencia from "./pages/existencia.js";
import CrearExistencia from "./pages/crearExistencia.js";
import Vales from "./pages/vales.js";
import Configuration2 from "./pages/configuracion2.js";
import Locales from "./pages/locales.js";
import Trabajadores from "./pages/trabajadores.js";
import MrmaForm from "./pages/mrmaform.js";
import { Navbar } from "./components/Navbar.jsx";
import Gastos from "./pages/gastos.js";
import Test from "./pages/test.js";
import Home from "./pages/home.js";
import Signin from "./components/login/Signin.jsx";
function App() {
  return (
    <div>
      <Router>
        <Navbar>
          <Routes>
            <Route path="/vales" element={<Vales />} exact />
            <Route path="/existencia" element={<Existencia />} exact />
            <Route path="/exist/create" element={<CrearExistencia />} exact />
            <Route path="/config" element={<Configuration2 />} exact />
            <Route path="/locales" element={<Locales />} exact />
            <Route path="/trabajadores" element={<Trabajadores />} exact />
            <Route path="/cont" element={<Gastos />} exact />
            <Route path="/" element={<Home />} exact />
            <Route path="/test" element={<Test titulo="Gastos" valor="4" />} exact/>
          </Routes>
        </Navbar>
        {/* <Routes>

            <Route path="/login" element={<Signin />} exact />
        </Routes> */}
      </Router>
    </div>
  );
}
export default App;
