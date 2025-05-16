import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold">
          ระบบการศึกษา
        </Link>

        <div className="space-x-6">
          <Link
            to="/"
            className="text-white hover:text-blue-200 transition duration-300"
          >
            หน้าหลัก
          </Link>
          <Link
            to="/students"
            className="text-white hover:text-blue-200 transition duration-300"
          >
            จัดการนักเรียน
          </Link>
          <Link
            to="/history"
            className="text-white hover:text-blue-200 transition duration-300"
          >
            ประวัติการเรียน
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
