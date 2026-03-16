import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface School {
  _id: string;
  name: string;
}

interface Department {
  _id: string;
  name: string;
  schoolId: string;
}

const DepartmentManager = () => {

  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Record<string, Department[]>>({});

  const [selectedSchool, setSelectedSchool] = useState("");
  const [departmentName, setDepartmentName] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  /* ---------------- Fetch Schools ---------------- */

  const fetchSchools = async () => {

    try {

      const res = await apiFetch("/schools");
      const data = await res.json();

      setSchools(data);

    } catch {
      toast.error("Failed to fetch schools");
    }
  };

  /* ---------------- Fetch Departments ---------------- */

  const fetchDepartments = async () => {

    const temp: Record<string, Department[]> = {};

    for (const school of schools) {

      try {

        const res = await apiFetch(`/departments/${school._id}`);
        const data = await res.json();

        temp[school._id] = data;

      } catch {
        temp[school._id] = [];
      }

    }

    setDepartments(temp);
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  useEffect(() => {
    if (schools.length > 0) {
      fetchDepartments();
    }
  }, [schools]);

  /* ---------------- Add / Update Department ---------------- */

  const handleSubmit = async () => {

    if (!selectedSchool) {
      toast.warning("Select a school first");
      return;
    }

    if (!departmentName.trim()) {
      toast.warning("Enter department name");
      return;
    }

    try {

      if (editingId) {

        const res = await apiFetch(`/departments/${editingId}`, {
          method: "PUT",
          body: JSON.stringify({
            name: departmentName,
            schoolId: selectedSchool,
          }),
        });

        if (res.ok) {
          toast.success("Department updated");
        }

      } else {

        const res = await apiFetch("/departments", {
          method: "POST",
          body: JSON.stringify({
            name: departmentName,
            schoolId: selectedSchool,
          }),
        });

        if (res.ok) {
          toast.success("Department added");
        }

      }

      setDepartmentName("");
      setSelectedSchool("");
      setEditingId(null);

      fetchDepartments();

    } catch {
      toast.error("Server error");
    }
  };

  /* ---------------- Delete Department ---------------- */

  const handleDelete = async (id: string) => {

    if (!confirm("Delete this department?")) return;

    try {

      const res = await apiFetch(`/departments/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Department deleted");
        fetchDepartments();
      }

    } catch {
      toast.error("Failed to delete department");
    }
  };

  /* ---------------- Edit Department ---------------- */

  const handleEdit = (dept: Department) => {

    setDepartmentName(dept.name);
    setSelectedSchool(dept.schoolId);
    setEditingId(dept._id);

  };

  return (

    <Card className="p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Manage Departments
      </h2>

      {/* Add Department */}

      <div className="flex flex-col md:flex-row gap-3 mb-6">

        <select
          value={selectedSchool}
          onChange={(e)=>setSelectedSchool(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option value="">Select School</option>

          {schools.map((school)=>(
            <option key={school._id} value={school._id}>
              {school.name}
            </option>
          ))}

        </select>

        <input
          value={departmentName}
          onChange={(e)=>setDepartmentName(e.target.value)}
          placeholder="Department name"
          className="border rounded px-3 py-2"
        />

        <Button onClick={handleSubmit}>
          {editingId ? "Update Department" : "Add Department"}
        </Button>

      </div>

      {/* Display Departments */}

      <div className="space-y-6">

        {schools.map((school)=> (

          <div key={school._id}>

            <h3 className="font-semibold mb-2">
              {school.name}
            </h3>

            {departments[school._id]?.length === 0 && (
              <p className="text-gray-500 text-sm">
                No departments yet
              </p>
            )}

            <div className="space-y-2">

              {departments[school._id]?.map((dept)=> (

                <div
                  key={dept._id}
                  className="flex justify-between items-center border p-3 rounded"
                >

                  <span>{dept.name}</span>

                  <div className="flex gap-3">

                    <button
                      onClick={()=>handleEdit(dept)}
                      className="text-blue-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={()=>handleDelete(dept._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </Card>
  );
};

export default DepartmentManager;