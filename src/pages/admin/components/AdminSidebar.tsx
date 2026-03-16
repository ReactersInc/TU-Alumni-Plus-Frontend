import { School, Building2, Calendar, UserCog } from "lucide-react"

interface Props {
  activeSection: string
  setActiveSection: (section: string) => void
}

const AdminSidebar = ({ activeSection, setActiveSection }: Props) => {

  return (

    <div className="w-64 bg-navy text-white p-5 flex flex-col">

      <h2 className="text-xl font-bold mb-6">
        Admin Panel
      </h2>

      <button
        onClick={() => setActiveSection("school")}
        className={`flex items-center gap-2 p-2 rounded ${
          activeSection === "school" ? "bg-navy-light" : ""
        }`}
      >
        <School size={18}/> Schools
      </button>

      <button
        onClick={() => setActiveSection("department")}
        className={`flex items-center gap-2 p-2 rounded ${
          activeSection === "department" ? "bg-navy-light" : ""
        }`}
      >
        <Building2 size={18}/> Departments
      </button>

      <button
        onClick={() => setActiveSection("event")}
        className={`flex items-center gap-2 p-2 rounded ${
          activeSection === "event" ? "bg-navy-light" : ""
        }`}
      >
        <Calendar size={18}/> Events
      </button>

      <button
        onClick={() => setActiveSection("reports")}
        className={`flex items-center gap-2 p-2 rounded ${
          activeSection === "reports" ? "bg-navy-light" : ""
        }`}
      >
        <UserCog size={18}/> Reports
      </button>

    </div>

  )
}

export default AdminSidebar