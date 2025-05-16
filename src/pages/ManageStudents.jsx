import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("ป.1");

  useEffect(() => {
    const fetch = async () => {
      const snapshot = await getDocs(collection(db, "students"));
      setStudents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetch();
  }, []);

  const addStudent = async () => {
    if (!newName) return;
    await addDoc(collection(db, "students"), { name: newName, grade: newGrade });
    setNewName("");
    setNewGrade("ป.1");
    location.reload();
  };

  const removeStudent = async (id) => {
    await deleteDoc(doc(db, "students", id));
    location.reload();
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-blue-700">จัดการรายชื่อนักเรียน</h2>
      <div className="flex gap-2 mt-4">
        <input className="border p-2 rounded flex-1" placeholder="ชื่อนักเรียน" value={newName} onChange={e => setNewName(e.target.value)} />
        <select className="border p-2 rounded" value={newGrade} onChange={e => setNewGrade(e.target.value)}>
          {["ป.1", "ป.2", "ป.3", "ป.4", "ป.5", "ป.6"].map(g => <option key={g}>{g}</option>)}
        </select>
        <button onClick={addStudent} className="bg-blue-500 text-white px-4 rounded">เพิ่ม</button>
      </div>
      <ul className="mt-4">
        {students.map(s => (
          <li key={s.id} className="flex justify-between items-center border-b py-2">
            <span>{s.name} - <span className="text-sm text-gray-600">{s.grade}</span></span>
            <button onClick={() => removeStudent(s.id)} className="text-red-500">ลบ</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageStudents;
