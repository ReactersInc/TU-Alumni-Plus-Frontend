import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import {
  Menu,
  X,
  School,
  Building2,
  Calendar,
  LogOut,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";

const AdminDashboard = () => {
  const { setIsLoggedIn } = useContext(AuthContext);

  // UI States
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("school");
  const [message, setMessage] = useState("");

  // School states
  const [schoolName, setSchoolName] = useState("");
  const [schools, setSchools] = useState<any[]>([]);

  // Department states
  const [selectedSchool, setSelectedSchool] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  // Event states
  const [events, setEvents] = useState<any[]>([]);
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventRegistrationLink, setEventRegistrationLink] = useState("");
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [schoolDepartments, setSchoolDepartments] = useState<Record<string, any[]>>({});

  const [reports, setReports] = useState<any[]>([]);
  const fetchReports = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/reports", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      const formatted = (data.reports || []).map((report: any) => ({
        ...report,
        date: report.createdAt ? new Date(report.createdAt).toLocaleString() : "Unknown date",
      }));
      setReports(formatted);
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  };

  // Call it once on component mount
  useEffect(() => {
    fetchReports();
  }, []);

  // Fetch Schools
  const fetchSchools = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/schools", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setSchools(data);
    } catch (error) {
      console.error("Error fetching schools:", error);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);
  const fetchDepartmentsForAllSchools = async () => {
    const temp: Record<string, any[]> = {};
    for (const school of schools) {
      try {
        const res = await fetch(`http://localhost:5000/api/departments/${school._id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        temp[school._id] = data;
      } catch (err) {
        console.error(`Error fetching departments for ${school.name}:`, err);
        temp[school._id] = [];
      }
    }
    setSchoolDepartments(temp);
  };
  useEffect(() => {
    if (schools.length > 0) fetchDepartmentsForAllSchools();
  }, [schools]);
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/upcoming", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    window.location.replace("/");
  };

  // Add School
  const handleAddSchool = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!schoolName.trim()) return setMessage("⚠️ Please enter a school name.");
    try {
      const res = await fetch("http://localhost:5000/api/schools", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ name: schoolName }),
      });
      if (res.ok) {
        setMessage(`✅ School "${schoolName}" added successfully!`);
        setSchoolName("");
        fetchSchools();
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
          window.location.reload();
        }, 1500);
      } else setMessage("❌ Failed to add school.");
    } catch {
      setMessage("❌ Server error while adding school.");
    }
  };

  // Add Department
  const handleAddDepartment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSchool) return setMessage("⚠️ Select a school first.");
    if (!departmentName.trim())
      return setMessage("⚠️ Please enter a department name.");

    try {
      const res = await fetch("http://localhost:5000/api/departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: departmentName,
          schoolId: selectedSchool,
        }),
      });
      if (res.ok) {
        setMessage(`✅ Department "${departmentName}" added successfully!`);
        fetchDepartmentsForAllSchools();
        setDepartmentName("");
        setSelectedSchool("");
        setTimeout(() => {
          window.location.href = "/admin/dashboard";
          window.location.reload();
        }, 1500);
      } else setMessage("❌ Failed to add department.");
    } catch {
      setMessage("❌ Server error while adding department.");
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setEventImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  // Add Event
  const handleAddUpcomingEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !eventTitle ||
      !eventDescription ||
      !eventDate ||
      !eventTime ||
      !eventVenue ||
      !eventRegistrationLink ||
      !eventImage
    )
      return setMessage("⚠️ All event fields are required.");

    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64Image = reader.result;
      try {
        const res = await fetch("http://localhost:5000/api/upcoming", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            title: eventTitle,
            description: eventDescription,
            date: eventDate,
            time: eventTime,
            venue: eventVenue,
            registrationLink: eventRegistrationLink,
            imageBase64: base64Image,
          }),
        });

        if (res.ok) {
          setMessage("✅ Upcoming event added successfully!");
          setEventTitle("");
          setEventDescription("");
          setEventDate("");
          setEventTime("");
          setEventVenue("");
          setEventRegistrationLink("");
          setEventImage(null);
          setImagePreview(null);
          fetchEvents();
          setTimeout(() => {
            window.location.href = "/admin/dashboard";
            window.location.reload();
          }, 1500);
        } else setMessage("❌ Failed to add event.");
      } catch {
        setMessage("❌ Server error while adding event.");
      }
    };
    reader.readAsDataURL(eventImage);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed md:relative z-20 bg-navy text-white w-64 transform ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } transition-transform duration-300 h-screen p-4 flex flex-col`}
      >

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <UserCog className="h-5 w-5" /> Admin Panel
          </h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-white"
          >
            <X size={22} />
          </button>
        </div>

        <nav className="space-y-3 flex-1">

          <button
            onClick={() => setActiveSection("school")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === "school"
              ? "bg-navy-light text-white"
              : "hover:bg-navy-light/60"
              }`}
          >
            <School size={18} /> Add School
          </button>
          <button
            onClick={() => setActiveSection("department")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === "department"
              ? "bg-navy-light text-white"
              : "hover:bg-navy-light/60"
              }`}
          >
            <Building2 size={18} /> Add Department
          </button>
          <button
            onClick={() => setActiveSection("event")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === "event"
              ? "bg-navy-light text-white"
              : "hover:bg-navy-light/60"
              }`}
          >
            <Calendar size={18} /> Add Event
          </button>
          <button
            onClick={() => setActiveSection("reports")}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg ${activeSection === "reports"
              ? "bg-navy-light text-white"
              : "hover:bg-navy-light/60"
              }`}
          >
            <UserCog size={18} /> Reports
          </button>

        </nav>
        {/* Home Button */}
        <Button
          onClick={() => window.location.href = "/"}
          variant="hero"
          className="bg-blue-600 hover:bg-blue-700 text-white mb-2 flex items-center gap-2 justify-center"
        >
          <Building2 size={18} /> Home
        </Button>

        <Button
          onClick={handleLogout}
          variant="hero"
          className="bg-red-600 hover:bg-red-700 text-white mt-auto flex items-center gap-2 justify-center"
        >
          <LogOut size={18} /> Logout
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 md:p-10">
        {/* Hamburger for mobile */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="md:hidden mb-4 bg-navy text-white p-2 rounded-md"
        >
          <Menu size={22} />
        </button>

        <Card className="bg-white shadow-md p-6">
          <CardHeader>
            <CardTitle className="text-2xl text-navy">
              {activeSection === "school" && "Add School"}
              {activeSection === "department" && "Add Department"}
              {activeSection === "event" && "Add Upcoming Event"}
            </CardTitle>
          </CardHeader>

          <CardContent>
            {message && (
              <div className="text-center bg-green-50 border border-green-200 text-green-700 py-2 px-4 rounded-md mb-4">
                {message}
              </div>
            )}

            {/* Add School */}
            {activeSection === "school" && (
              <div className="flex flex-col gap-4 items-center w-full">
                <form
                  onSubmit={handleAddSchool}
                  className="flex flex-col sm:flex-row gap-3 items-center justify-center w-full"
                >
                  <input
                    type="text"
                    placeholder="Enter school name"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                  />
                  <Button type="submit" variant="hero">
                    Add School
                  </Button>
                </form>

                {/* Display existing schools */}
                <div className="w-full sm:w-2/3 mt-4">
                  <h3 className="text-lg font-semibold text-navy mb-2">Existing Schools:</h3>
                  {schools.length === 0 ? (
                    <p className="text-muted-foreground">No schools added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {schools.map((school) => (
                        <Card key={school._id} className="p-2 bg-gray-50 border border-gray-200">
                          <p className="text-navy font-medium">{school.name}</p>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Add Department */}
            {activeSection === "department" && (
              <div className="flex flex-col gap-6 items-center w-full">
                {/* Add Department Form */}
                <form
                  onSubmit={handleAddDepartment}
                  className="flex flex-col gap-3 items-center w-full sm:w-2/3"
                >
                  <select
                    value={selectedSchool}
                    onChange={(e) => setSelectedSchool(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  >
                    <option value="">Select School</option>
                    {schools.map((school) => (
                      <option key={school._id} value={school._id}>
                        {school.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    placeholder="Enter department name"
                    value={departmentName}
                    onChange={(e) => setDepartmentName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg"
                  />

                  <Button type="submit" variant="hero">
                    Add Department
                  </Button>
                </form>

                {/* Display Schools with Departments */}
                <div className="w-full sm:w-2/3">
                  <h2 className="text-lg font-semibold mb-2">Existing Departments</h2>
                  {schools.length === 0 ? (
                    <p className="text-gray-500">No schools added yet.</p>
                  ) : (
                    schools.map((school) => (
                      <div
                        key={school._id}
                        className="mb-4 p-3 border rounded-md bg-gray-50"
                      >
                        <p className="font-medium text-navy">{school.name}</p>
                        {schoolDepartments[school._id] &&
                          schoolDepartments[school._id].length > 0 ? (
                          <ul className="ml-4 list-disc">
                            {schoolDepartments[school._id].map((dept) => (
                              <li key={dept._id}>{dept.name}</li>
                            ))}
                          </ul>
                        ) : (
                          <p className="ml-4 text-sm text-gray-500">No departments yet.</p>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}


            {/* Add Event */}
            {/* Add Event */}
            {activeSection === "event" && (
              <div className="flex flex-col gap-4 items-center w-full">
                <form
                  onSubmit={handleAddUpcomingEvent}
                  className="flex flex-col gap-3 items-center w-full"
                >
                  <input
                    type="text"
                    placeholder="Event Title"
                    value={eventTitle}
                    onChange={(e) => setEventTitle(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Event Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="time"
                    value={eventTime}
                    onChange={(e) => setEventTime(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Venue"
                    value={eventVenue}
                    onChange={(e) => setEventVenue(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Registration Link"
                    value={eventRegistrationLink}
                    onChange={(e) => setEventRegistrationLink(e.target.value)}
                    className="w-full sm:w-2/3 px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full sm:w-2/3"
                  />
                  {imagePreview && (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-32 h-32 object-cover rounded-md mt-2"
                    />
                  )}
                  <Button type="submit" variant="hero">
                    Add Event
                  </Button>
                </form>

                {/* Display existing events */}
                <div className="w-full sm:w-2/3 mt-6">
                  <h2 className="text-lg font-semibold mb-2">Existing Events</h2>
                  {events.length === 0 ? (
                    <p className="text-gray-500">No events added yet.</p>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {events.map((event) => (
                        <Card key={event._id} className="p-3 bg-gray-50 border border-gray-200">
                          <p className="font-medium text-navy">{event.title}</p>
                          <p className="text-sm text-gray-700">{event.description}</p>
                          <p className="text-sm text-gray-600">
                            {event.date} at {event.time}
                          </p>
                          <p className="text-sm text-gray-600">{event.venue}</p>
                          <a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 text-sm underline"
                          >
                            Registration Link
                          </a>
                          {event.imageBase64 && (
                            <img
                              src={event.imageBase64}
                              alt={event.title}
                              className="w-full h-32 object-cover rounded-md mt-2"
                            />
                          )}
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reports Section */}
            {activeSection === "reports" && (
              <div className="overflow-x-auto w-full">
                {reports.length === 0 ? (
                  <p className="text-center text-muted-foreground">No reports found.</p>
                ) : (
                  <table className="min-w-full border border-gray-200 rounded-md">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 border">Post ID</th>
                        <th className="px-4 py-2 border">Reporter Name</th>
                        <th className="px-4 py-2 border">Email</th>
                        <th className="px-4 py-2 border">Reason</th>
                        <th className="px-4 py-2 border">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reports.map((report) => (
                        <tr key={report._id} className="hover:bg-gray-50">
                          <td className="px-4 py-2 border">{report.postId}</td>
                          <td className="px-4 py-2 border">{report.name}</td>
                          <td className="px-4 py-2 border">{report.email}</td>
                          <td className="px-4 py-2 border">{report.reason}</td>
                          <td className="px-4 py-2 border">{report.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
