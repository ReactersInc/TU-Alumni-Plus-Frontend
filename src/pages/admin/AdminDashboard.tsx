import { useState } from "react";
import AdminSidebar from "./components/AdminSidebar";
import SchoolManager from "./components/SchoolManager";
import DepartmentManager from "./components/DepartmentManager";
import EventManager from "./components/EventManager";
import ReportsManager from "./components/ReportsManager";

const AdminDashboard = () => {

  const [activeSection, setActiveSection] = useState("school");

  const renderSection = () => {

    switch (activeSection) {

      case "school":
        return <SchoolManager />

      case "department":
        return <DepartmentManager />

      case "event":
        return <EventManager />

      case "reports":
        return <ReportsManager />

      default:
        return null
    }
  }

  return (

    <div className="flex min-h-screen bg-gray-100">

      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <div className="flex-1 p-6">

        {renderSection()}

      </div>

    </div>
  )
}

export default AdminDashboard