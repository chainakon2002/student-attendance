import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const History = () => {
  const [groupedByDate, setGroupedByDate] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const snapshot = await getDocs(collection(db, "attendance"));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const grouped = {};
      data.forEach(record => {
        const date = record.date;
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push(record);
      });

      setGroupedByDate(grouped);

      // เตรียมข้อมูลสำหรับกราฟ
      const chartFormatted = Object.entries(grouped).map(([date, records]) => ({
        date,
        count: records.reduce((sum, r) => sum + r.records.length, 0),
      }));

      // เรียงวันที่ก่อน
      chartFormatted.sort((a, b) => new Date(a.date) - new Date(b.date));

      setChartData(chartFormatted);
    };

    fetchHistory();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">ประวัติการเช็คชื่อ</h2>

      {/* กราฟยอดรวม */}
      <div className="bg-white rounded-xl p-6 shadow mb-10">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">จำนวนคนเช็คชื่อในแต่ละวัน</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#4F46E5" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* การ์ดตามวัน */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedByDate).map(([date, records]) => {
          const total = records.reduce((sum, r) => sum + r.records.length, 0);
          return (
            <div key={date} className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-md text-gray-500 font-semibold">วันที่</h3>
                  <p className="text-lg font-bold text-gray-700">{date}</p>
                </div>
                
              </div>
              <div className="mt-4">
                {records.map((r, idx) => (
                  <div key={idx} className="text-sm text-gray-600">
                    📚 {r.subject} - ชั้นปี {r.grade} ({r.records.length} คน)
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default History;
