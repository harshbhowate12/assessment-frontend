import React, { useState, useEffect } from "react"; 
import axios from "axios";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsersWithScores = async () => {
      try {
        const response = await axios.get("http://localhost:5001/api/admin/responses");
        const usersWithScores = await Promise.all(
          response.data.map(async (user) => {
            const scoreRes = await axios.get(`http://localhost:5001/api/admin/score/${user.userId}`);
            return {
              ...user,
              score: scoreRes.data.score,
            };
          })
        );
        setUsers(usersWithScores);
      } catch (error) {
        console.error("Error fetching user data with scores:", error);
      }
    };

    fetchUsersWithScores();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>
      {users.map((user, idx) => (
        <div key={idx} className="mb-4 border p-3 rounded shadow">
          <p><strong>User ID:</strong> {user.userId}</p>
          <p><strong>Submitted At:</strong> {new Date(user.submittedAt).toLocaleString()}</p>
          <p><strong>Score:</strong> {user.score}</p>
          <p className="mt-2"><strong>Answers:</strong></p>
          <ul className="ml-4 list-disc">
            {user.answers.map((ans, i) => (
              <li key={i}>Q{ans.questionId}: {ans.selectedOption || "Not answered"}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;
