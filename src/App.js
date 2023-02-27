import Navbar from "./Navbar";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";

import Login from "./pages/Login"
import Developers from "./pages/Developers";
import { Route, Routes } from "react-router-dom";
import ViewRecord from "./pages/ViewRecord";

function App() {
  return (
    <>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/developers" element={<Developers />} />
          <Route path = "view_records" element = {<ViewRecord/>}/>
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
