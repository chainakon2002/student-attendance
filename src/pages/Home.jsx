import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Home = () => {
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState("ป.1");
  const [subject, setSubject] = useState("ภาษาไทย");
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data(), status: "" }))
        .filter(s => s.grade === grade);
      setStudents(list);
    };
    fetchStudents();
  }, [grade]);

  const handleStatusChange = (id, status) => {
    setStudents(prev => prev.map(s => (s.id === id ? { ...s, status } : s)));
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, "attendance"), {
        date,
        grade,
        subject,
        records: students,
        createdAt: Timestamp.now()
      });
      Swal.fire("บันทึกเรียบร้อย", "", "success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto animate-fade-in">
      <h1 className="text-4xl font-bold text-blue-700 mb-2">ระบบเช็คชื่อนักเรียน</h1>
      <p className="text-md text-blue-500 mb-6">โรงเรียนบ้านนาเจียง</p>

      <div className="mb-6 flex gap-4">
        <Link
          to="/students"
          className="transition-transform transform hover:scale-105 bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
        >
          จัดการนักเรียน
        </Link>
        <Link
          to="/history"
          className="transition-transform transform hover:scale-105 bg-indigo-500 text-white px-4 py-2 rounded shadow hover:bg-indigo-600"
        >
          ดูประวัติ
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <input
          type="date"
          className="p-3 border border-gray-300 rounded shadow focus:ring focus:ring-blue-200"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <select
          className="p-3 border border-gray-300 rounded shadow focus:ring focus:ring-blue-200"
          value={grade}
          onChange={e => setGrade(e.target.value)}
        >
          {["ป.1", "ป.2", "ป.3", "ป.4", "ป.5", "ป.6"].map(g => (
            <option key={g}>{g}</option>
          ))}
        </select>
        <select
          className="p-3 border border-gray-300 rounded shadow focus:ring focus:ring-blue-200"
          value={subject}
          onChange={e => setSubject(e.target.value)}
        >
          {["ภาษาไทย", "คณิตศาสตร์", "วิทยาศาสตร์", "สังคมศึกษา", "ประวัติศาสตร์", "ภาษาอังกฤษ", "ศิลปะ", "พลศึกษา", "สุขศึกษา", "การงานอาชีพ"].map(s => (
            <option key={s}>{s}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded overflow-hidden">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-3 text-left text-sm font-semibold">ชื่อ</th>
              <th className="p-3 text-sm font-semibold">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {students.map(s => (
              <tr key={s.id} className="border-t hover:bg-blue-50 transition-colors">
                <td className="p-3 text-gray-700">{s.name}</td>
                <td className="p-3">
                  {["มา", "สาย", "ลา", "ขาด"].map(status => (
                    <label key={status} className="mr-4 text-sm text-gray-600">
                      <input
                        type="radio"
                        name={`status-${s.id}`}
                        value={status}
                        checked={s.status === status}
                        onChange={() => handleStatusChange(s.id, status)}
                        className="mr-1 accent-blue-600"
                      />
                      {status}
                    </label>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={handleSave}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition duration-200 transform hover:scale-105"
      >
        บันทึก
      </button>
    </div>
  );
};

export default Home;
