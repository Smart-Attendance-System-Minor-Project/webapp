import Navbar from "./Navbar";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import Downloads from "./pages/Downloads";
import Login from "./pages/Login"
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
