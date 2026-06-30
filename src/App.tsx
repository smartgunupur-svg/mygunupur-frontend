import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HomeLoan from './pages/HomeLoan';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';
import BuildingEnquiry from './pages/BuildingEnquiry';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoanEnquiries from './pages/AdminLoanEnquiries';
import AdminBuildingEnquiries from './pages/AdminBuildingEnquiries';

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
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/loan-enquiries" element={<AdminLoanEnquiries />} />
        <Route path="/admin/building-enquiries" element={<AdminBuildingEnquiries />} />
      </Routes>
    </Router>
  );
}

export default App;
