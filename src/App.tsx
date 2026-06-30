import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HomeLoan from './pages/HomeLoan';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';
import BuildingEnquiry from './pages/BuildingEnquiry';
import ConstructionMaterial from './pages/ConstructionMaterial';
import Hospitals from './pages/Hospitals';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoanEnquiries from './pages/AdminLoanEnquiries';
import AdminBuildingEnquiries from './pages/AdminBuildingEnquiries';
import AdminBanks from './pages/AdminBanks';
import AdminConstructionMaterial from './pages/AdminConstructionMaterial';
import AdminHospitals from './pages/AdminHospitals';
import AdminTouristPlaces from './pages/AdminTouristPlaces';
import AdminEmergencyContacts from './pages/AdminEmergencyContacts';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/home-loan" element={<HomeLoan />} />
        <Route path="/building-enquiry" element={<BuildingEnquiry />} />
        <Route path="/emergency" element={<Emergency />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/construction-material" element={<ConstructionMaterial />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/loan-enquiries" element={<AdminLoanEnquiries />} />
        <Route path="/admin/building-enquiries" element={<AdminBuildingEnquiries />} />
        <Route path="/admin/banks" element={<AdminBanks />} />
        <Route path="/admin/construction-material" element={<AdminConstructionMaterial />} />
        <Route path="/admin/hospitals" element={<AdminHospitals />} />
        <Route path="/admin/tourist-places" element={<AdminTouristPlaces />} />
        <Route path="/admin/emergency-contacts" element={<AdminEmergencyContacts />} />
      </Routes>
    </Router>
  );
}

export default App;
