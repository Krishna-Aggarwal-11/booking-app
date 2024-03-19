import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Layout from './Layout';
import Register from "./pages/Register";
import axios from "axios";
import ProfilePage from "./pages/ProfilePage";
import Places from "./pages/Places";
import PlaceForm from "./components/PlaceForm";
import SinglePlace from "./pages/SinglePlace";
import Booking from "./pages/Booking";
import Bookings from "./pages/Bookings";


axios.defaults.withCredentials = true

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<ProfilePage />} />
          <Route path="/account/places" element={<Places />} />
          <Route path="/account/places/new" element={<PlaceForm />} />
          <Route path="/account/places/:id" element={<PlaceForm />} />
          <Route path="/place/:id" element={<SinglePlace />} />
          <Route path="/account/bookings" element={<Bookings />} />
          <Route path="/account/bookings/:id" element={<Booking />} />
          
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
