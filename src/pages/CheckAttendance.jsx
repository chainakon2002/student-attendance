import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const CheckAttendance = () => {
  const { grade, room } = useParams();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      const list = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(student => student.grade === grade && student.room === room);
      setStudents(list);
    };
    fetchStudents();
  }, [grade, room]);

  const handleStatusChange = (id, status) => {
    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, status } : s))
    );
  };

  const handleSave = () => {
    // Save attendance to Firestore (not implemented)
    console.log("บันทึกเรียบร้อย");
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700">เช็คชื่อนักเรียน</h1>
      <p className="text-md text-blue-600 mb-4">
        ชั้น {grade} ห้อง {room}
      </p>

      <table className="w-full bg-white shadow rounded">
        <thead>
          <tr className="bg-blue-100">
            <th className="p-2">ชื่อ</th>
            <th className="p-2">สถานะ</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s.id} className="border-t">
              <td className="p-2">{s.name}</td>
              <td className="p-2">
              <select
              value={s.status || "มา"}
              onChange={(e) => handleStatusChange(s.id, e.target.value)}
              className="p-2 border rounded"
            >
              <option value="มา">มา</option>
              <option value="สาย">สาย</option>
              <option value="ลา">ลา</option>
              <option value="ขาด">ขาด</option>
            </select>
          </td>
        </tr>
      ))}
    </tbody>
  </table>

  <button
    onClick={handleSave}
    className="mt-4 p-2 bg-green-600 text-white rounded"
  >
    บันทึกการเช็คชื่อ
  </button>
</div>
);
};

export default CheckAttendance;