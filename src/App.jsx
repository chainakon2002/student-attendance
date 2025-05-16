import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import History from "./pages/History";
import ManageStudents from "./pages/ManageStudents";
import Navbar from "./components/Navbar";
import CheckAttendance from "./pages/CheckAttendance";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-blue-50 text-gray-800">
        <Navbar /> {/* เพิ่ม Navbar */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
          <Route path="/students" element={<ManageStudents />} />
          <Route path="/Check" element={<CheckAttendance />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;