import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HomeLoan from './pages/HomeLoan';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';
import BuildingEnquiry from './pages/BuildingEnquiry';

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
      </Routes>
    </Router>
  );
}

export default App;
