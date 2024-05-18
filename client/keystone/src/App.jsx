import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/LoginPage/Login";
import Landing from "./Pages/LandingPage/Landing";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/landing" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
