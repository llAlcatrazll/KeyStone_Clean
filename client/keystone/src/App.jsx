import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/Login";
import Landing from "./LandingPage/Landing";
import BookingsPage from "./SidebarPages/BookingsPage";
import UserManagement from "./SidebarPages/UserManagement";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/landing/BookingsPage" element={<BookingsPage />} />
        <Route path="/landing/UserManagement" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
