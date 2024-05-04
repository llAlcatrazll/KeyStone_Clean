import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage/Login";
import Landing from "./LandingPage/Landing";
import BookingsPage from "./SidebarPages/BookingsPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/landing/BookingsPage" element={<BookingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
