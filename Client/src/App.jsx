import { BrowserRouter, Routes, Route } from "react-router-dom";

import UploadPage from "./pages/UploadPage";
import HistoryPage from "./pages/HistoryPage";
import DashboardPage from "./pages/DashboardPage";

import Navbar from "./components/layout/Navbar";

// Main application routing
function App() {
  return (
    <BrowserRouter>
      {/* Global Navigation */}
      <Navbar />

      {/* Application Routes */}
      <Routes>
        <Route path="/" element={<UploadPage />} />

        <Route path="/history" element={<HistoryPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
