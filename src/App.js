import Navbar from "./Navbar";
import Analytics from "./pages/Analytics";
import Home from "./pages/Home";
import EmailEnterPage from "./ForgetPassword/EmailEnterPage";
import OTPEnterPage from "./ForgetPassword/OTPEnterPage";
import EnterNewPasswordPage from "./ForgetPassword/EnterNewPasswordPage";
import Login from "./pages/Login"
import Developers from "./pages/Developers";
import { Route, Routes } from "react-router-dom";
import ViewRecord from "./pages/ViewRecord";
import ViewRecordsTemp from "./pages/ViewRecordsTemp";

function App() {
  return (
    <>
      
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/developers" element={<Developers />} />
          <Route path = "/view_records" element = {<ViewRecord/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/validateEmail" element={<EmailEnterPage />} />
          <Route path="/otpValidation" element={<OTPEnterPage />} />
          <Route path="/changePassword/" element={<EnterNewPasswordPage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
