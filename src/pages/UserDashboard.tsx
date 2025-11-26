import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {Building2,} from "lucide-react";
import { Button } from "@/components/Button";

const UserDashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await fetch("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [navigate]);



  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-navy text-white flex flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
        <nav className="flex flex-col space-y-4">
           <Button
          onClick={() => window.location.href = "/"}
          variant="hero"
          className="bg-blue-600 hover:bg-blue-700 text-white mb-2 flex items-center gap-2 justify-center"
        >
          <Building2 size={18} /> Home
        </Button>

        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <h1 className="text-3xl font-semibold mb-4">
          Welcome, {user ? user.firstName + " " + user.lastName : "Loading..."}
        </h1>
        <p className="text-gray-600">
          This is your personal dashboard. You can add features here later.
        </p>
      </main>
    </div>
  );
};

export default UserDashboard;
