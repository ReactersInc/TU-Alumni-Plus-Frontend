import { useEffect, useState } from "react";
import { Card } from "@/components/Card";
import { Button } from "@/components/Button";
import { apiFetch } from "@/lib/api";
import { toast } from "sonner";

interface School {
  _id: number;
  name: string;
}

const SchoolManager = () => {

  const [schools, setSchools] = useState<School[]>([]);
  const [schoolName, setSchoolName] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  /* ---------- Fetch Schools ---------- */

  const fetchSchools = async () => {

    try {

      const res = await apiFetch("/schools");
      const data = await res.json();

      console.log("Schools from API:", data);

      setSchools(data);

    } catch {
      toast.error("Failed to fetch schools");
    }

  };

  useEffect(() => {
    fetchSchools();
  }, []);

  /* ---------- Add / Update School ---------- */

  const handleAddSchool = async () => {

    if (!schoolName.trim()) {
      toast.warning("Enter school name");
      return;
    }

    try {

      let res;

      if (editingId) {

        res = await apiFetch(`/schools/${editingId}`, {
          method: "PUT",
          body: JSON.stringify({ name: schoolName }),
        });

      } else {

        res = await apiFetch("/schools", {
          method: "POST",
          body: JSON.stringify({ name: schoolName }),
        });

      }

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success(
        editingId
          ? "School updated successfully"
          : "School added successfully"
      );

      setSchoolName("");
      setEditingId(null);

      fetchSchools();

    } catch {
      toast.error("Server error");
    }

  };

  /* ---------- Delete School ---------- */

  const handleDeleteSchool = async (id: number) => {

    if (!confirm("Delete this school?")) return;

    try {

      const res = await apiFetch(`/schools/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      toast.success("School deleted");

      fetchSchools();

    } catch {
      toast.error("Failed to delete school");
    }

  };

  /* ---------- Edit School ---------- */

  const handleEdit = (school: School) => {

    setSchoolName(school.name);
    setEditingId(school._id);

  };

  return (

    <Card className="p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Manage Schools
      </h2>

      {/* Add / Update Form */}

      <div className="flex gap-3 mb-6">

        <input
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          placeholder="School name"
          className="border rounded px-3 py-2 w-64"
        />

        <Button onClick={handleAddSchool}>
          {editingId ? "Update School" : "Add School"}
        </Button>

      </div>

      {/* School List */}

      <div className="space-y-2">

        {schools.map((school) => (

          <div
            key={school._id}
            className="flex justify-between items-center border p-3 rounded"
          >

            <span>{school.name}</span>

            <div className="flex gap-4">

              <button
                onClick={() => handleEdit(school)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteSchool(school._id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </Card>

  );

};

export default SchoolManager;