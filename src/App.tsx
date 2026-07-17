import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import HomeLoan from './pages/HomeLoan';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';
import BuildingEnquiry from './pages/BuildingEnquiry';
import ConstructionMaterial from './pages/ConstructionMaterial';
import Hospitals from './pages/Hospitals';
import BloodDonors from './pages/BloodDonors';

// New super app pages
import BottomNavLayout from './components/BottomNavLayout';
import Services from './pages/Services';
import Explore from './pages/Explore';
import BusinessDirectory from './pages/BusinessDirectory';
import GovernmentSchemes from './pages/GovernmentSchemes';
import Notices from './pages/Notices';
import Hotels from './pages/Hotels';
import Restaurants from './pages/Restaurants';
import ImportantContacts from './pages/ImportantContacts';
import EventsAndFestivals from './pages/EventsAndFestivals';
import Gallery from './pages/Gallery';
import WeatherPage from './pages/WeatherPage';
import Jobs from './pages/Jobs';
import Feedback from './pages/Feedback';
import Schools from './pages/Schools';
import Colleges from './pages/Colleges';
import GovtOffices from './pages/GovtOffices';
import Parks from './pages/Parks';
import SportsPlaces from './pages/SportsPlaces';

// Admin pages
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminLoanEnquiries from './pages/AdminLoanEnquiries';
import AdminBuildingEnquiries from './pages/AdminBuildingEnquiries';
import AdminBanks from './pages/AdminBanks';
import AdminConstructionMaterial from './pages/AdminConstructionMaterial';
import AdminHospitals from './pages/AdminHospitals';
import AdminTouristPlaces from './pages/AdminTouristPlaces';
import AdminEmergencyContacts from './pages/AdminEmergencyContacts';
import AdminBloodDonors from './pages/AdminBloodDonors';

// New admin pages
import AdminNotices from './pages/AdminNotices';
import AdminGallery from './pages/AdminGallery';
import AdminEvents from './pages/AdminEvents';
import AdminJobs from './pages/AdminJobs';
import AdminSchemes from './pages/AdminSchemes';
import AdminBusinesses from './pages/AdminBusinesses';
import AdminSettings from './pages/AdminSettings';
import AdminHotels from './pages/AdminHotels';
import AdminRestaurants from './pages/AdminRestaurants';
import AdminImportantContacts from './pages/AdminImportantContacts';
import AdminSchools from './pages/AdminSchools';
import AdminColleges from './pages/AdminColleges';
import AdminGovtOffices from './pages/AdminGovtOffices';
import AdminParks from './pages/AdminParks';
import AdminSportsPlaces from './pages/AdminSportsPlaces';

function App() {
  return (
    <Router>
      <Routes>
        {/* User super app client layout */}
        <Route element={<BottomNavLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/directory" element={<BusinessDirectory />} />
          <Route path="/about" element={<About />} />
          <Route path="/home-loan" element={<HomeLoan />} />
          <Route path="/building-enquiry" element={<BuildingEnquiry />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/construction-material" element={<ConstructionMaterial />} />
          <Route path="/hospitals" element={<Hospitals />} />
          <Route path="/blood-donors" element={<BloodDonors />} />
          <Route path="/government-schemes" element={<GovernmentSchemes />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/important-contacts" element={<ImportantContacts />} />
          <Route path="/events" element={<EventsAndFestivals />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/schools" element={<Schools />} />
          <Route path="/colleges" element={<Colleges />} />
          <Route path="/govt-offices" element={<GovtOffices />} />
          <Route path="/parks" element={<Parks />} />
          <Route path="/sports-places" element={<SportsPlaces />} />
        </Route>

        {/* Admin panel routes */}
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/loan-enquiries" element={<AdminLoanEnquiries />} />
          <Route path="/admin/building-enquiries" element={<AdminBuildingEnquiries />} />
          <Route path="/admin/banks" element={<AdminBanks />} />
          <Route path="/admin/construction-material" element={<AdminConstructionMaterial />} />
          <Route path="/admin/hospitals" element={<AdminHospitals />} />
          <Route path="/admin/tourist-places" element={<AdminTouristPlaces />} />
          <Route path="/admin/emergency-contacts" element={<AdminEmergencyContacts />} />
          <Route path="/admin/blood-donors" element={<AdminBloodDonors />} />
          <Route path="/admin/notices" element={<AdminNotices />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/jobs" element={<AdminJobs />} />
          <Route path="/admin/schemes" element={<AdminSchemes />} />
          <Route path="/admin/businesses" element={<AdminBusinesses />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/hotels" element={<AdminHotels />} />
          <Route path="/admin/restaurants" element={<AdminRestaurants />} />
          <Route path="/admin/important-contacts" element={<AdminImportantContacts />} />
          <Route path="/admin/schools" element={<AdminSchools />} />
          <Route path="/admin/colleges" element={<AdminColleges />} />
          <Route path="/admin/govt-offices" element={<AdminGovtOffices />} />
          <Route path="/admin/parks" element={<AdminParks />} />
          <Route path="/admin/sports-places" element={<AdminSportsPlaces />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
