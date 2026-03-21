import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { GraduationCap, Search } from "lucide-react";
import { apiFetch } from "@/lib/api";

interface School {
  _id: string;
  name: string;
}

interface Department {
  _id: string;
  name: string;
  schoolId: string;
}

interface Alumni {
  _id: string;
  firstName: string;
  lastName: string;
  programme: string;
  linkedin?: string;
}

const batches = [
  "2025", "2024", "2023", "2022", "2021", "2020",
  "2019", "2018", "2017", "2016", "2015"
];

const AlumniFamily = () => {

  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Record<string, Department[]>>({});
  const [alumniList, setAlumniList] = useState<Alumni[]>([]);

  const [selectedSchool, setSelectedSchool] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [selectedBatch, setSelectedBatch] = useState<string | null>(null);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [programmes, setProgrammes] = useState<string[]>([]);
  const [selectedProgramme, setSelectedProgramme] = useState<string | null>(null);

  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  /* ---------------- Fetch Schools ---------------- */

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await apiFetch("/schools");
        const data: School[] = await res.json();
        setSchools(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch schools.");
      }
    }

    fetchSchools();
  }, []);

  /* ---------------- Fetch Departments ---------------- */

  useEffect(() => {

    async function fetchDepartments() {

      if (!selectedSchool) return;

      try {

        const res = await apiFetch(`/departments/${selectedSchool}`);
        const data: Department[] = await res.json();

        setDepartments((prev) => ({
          ...prev,
          [selectedSchool]: data
        }));

      } catch (err) {

        console.error(err);
        setError("Failed to fetch departments.");

      }

    }

    fetchDepartments();

  }, [selectedSchool]);

  /* ---------------- Fetch Programme ---------------- */

  useEffect(() => {
    if (!selectedDepartment) return;

    async function fetchProgrammes() {
      try {
        const res = await apiFetch(`/programmes/${selectedDepartment}`);
        const data = await res.json();

        setProgrammes(data.map((p: any) => p.programme));
      } catch (err) {
        console.error(err);
        setError("Failed to fetch programmes.");
      }
    }

    fetchProgrammes();
  }, [selectedDepartment]);

  /* ---------------- Fetch Alumni ---------------- */

  useEffect(() => {

    async function fetchAlumni() {

      if (!selectedSchool || !selectedDepartment || !selectedBatch) return;

      try {

        setLoading(true);
        setSearch("");  //  reset search when filters change

        const res = await apiFetch(
          `/alumni/filter?school=${selectedSchool}&department=${selectedDepartment}&batch=${selectedBatch}`
        );

        const data = await res.json();

        // console.log("Alumni API response:", data); 

        setAlumniList(Array.isArray(data) ? data : []);

      } catch (err) {

        console.error(err);
        setError("Failed to fetch alumni.");

      } finally {

        setLoading(false);

      }

    }

    fetchAlumni();

  }, [selectedSchool, selectedDepartment, selectedBatch]);

  /* ---------------- Search Filter ---------------- */

  const filteredAlumni = alumniList.filter((alumni) => {

    const text = `
    ${alumni.firstName}
    ${alumni.lastName}
    ${alumni.programme}
  `.toLowerCase();

    return text.includes(search.toLowerCase());

  });

  return (

    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">

      <div className="container mx-auto px-6">

        {/* Header */}

        <div className="text-center mb-12">

          <GraduationCap className="h-16 w-16 text-navy mx-auto mb-4" />

          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Alumni Family
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Find and connect with alumni from your school, department, and batch
          </p>

        </div>

        {/* Step 1: School */}

        <Card className="mb-8">

          <CardHeader>

            <CardTitle className="text-2xl text-navy flex items-center gap-2">

              <span className="bg-navy text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                1
              </span>

              Select Your School

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

              {schools.map((school) => (

                <Card
                  key={school._id}
                  onClick={() => {
                    setSelectedSchool(school._id);
                    setSelectedDepartment(null);
                    setSelectedBatch(null);
                    setAlumniList([]);
                  }}
                  className={`cursor-pointer transition-all hover:shadow-lg ${selectedSchool === school._id
                    ? "ring-2 ring-navy bg-navy/5"
                    : "hover:bg-secondary/50"
                    }`}
                >

                  <CardContent className="p-4 text-center">

                    <h3 className="font-bold text-navy">
                      {school.name}
                    </h3>

                  </CardContent>

                </Card>

              ))}

            </div>

          </CardContent>

        </Card>

        {/* Step 2: Department */}

        {selectedSchool && (

          <Card className="mb-8">

            <CardHeader>

              <CardTitle className="text-2xl text-navy flex items-center gap-2">

                <span className="bg-navy text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  2
                </span>

                Select Your Department

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

                {departments[selectedSchool]?.map((dept) => (

                  <Button
                    key={dept._id}
                    variant={selectedDepartment === dept._id ? "hero" : "outline"}
                    onClick={() => {
                      setSelectedDepartment(dept._id);
                      setSelectedBatch(null);
                      setAlumniList([]);
                    }}
                    className="h-auto p-4 text-left justify-start"
                  >

                    {dept.name}

                  </Button>

                ))}

              </div>

            </CardContent>

          </Card>

        )}

        {/* Step 3: Programme */}

        {selectedDepartment && (

          <Card className="mb-8">

            <CardHeader>
              <CardTitle className="text-2xl text-navy flex items-center gap-2">
                <span className="bg-navy text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  3
                </span>
                Select Programme
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">

                {programmes.map((prog) => (
                  <Button
                    key={prog}
                    variant={selectedProgramme === prog ? "hero" : "outline"}
                    onClick={() => {
                      setSelectedProgramme(prog);
                      setSelectedBatch(null);
                      setAlumniList([]);
                    }}
                  >
                    {prog}
                  </Button>
                ))}

              </div>
            </CardContent>

          </Card>
        )}


        {/* Step 4: Batch */}

        {selectedProgramme && (

          <Card className="mb-8">

            <CardHeader>

              <CardTitle className="text-2xl text-navy flex items-center gap-2">

                <span className="bg-navy text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  4
                </span>

                Select Your Batch

              </CardTitle>

            </CardHeader>

            <CardContent>

              <div className="grid grid-cols-5 md:grid-cols-10 gap-3">

                {batches.map((batch) => (

                  <Button
                    key={batch}
                    variant={selectedBatch === batch ? "hero" : "outline"}
                    onClick={() => setSelectedBatch(batch)}
                    className="aspect-square"
                  >
                    {batch}
                  </Button>

                ))}

              </div>

            </CardContent>

          </Card>

        )}

        {/* Alumni Results */}

        {loading && (
          <p className="text-center text-navy mt-4">
            Loading alumni...
          </p>
        )}

        {error && (
          <p className="text-center text-red-600 mt-4">
            {error}
          </p>
        )}

        {!loading && alumniList.length > 0 && (

          <Card>

            <CardHeader>

              <CardTitle className="text-2xl text-navy">
                Alumni List ({filteredAlumni.length})
              </CardTitle>

            </CardHeader>

            <CardContent>

              {/* Search Bar */}

              <p className="text-sm text-muted-foreground mb-2">
                Search alumni by name in this batch
              </p>

              <div className="relative mb-4">

                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search alumni by name..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border rounded-md pl-10 pr-4 py-2 focus:ring-2 focus:ring-navy"
                />

              </div>

              <table className="min-w-full table-auto border-collapse border border-gray-300">

                <thead>

                  <tr className="bg-navy/10">

                    <th className="border px-4 py-2 text-left">Name</th>
                    <th className="border px-4 py-2 text-left">Programme</th>
                    <th className="border px-4 py-2 text-left">LinkedIn</th>

                  </tr>

                </thead>

                <tbody>

                  {filteredAlumni.map((alumni) => (

                    <tr key={alumni._id} className="hover:bg-navy/5">

                      <td className="border px-4 py-2">
                        {alumni.firstName} {alumni.lastName}
                      </td>

                      <td className="border px-4 py-2">
                        {alumni.programme}
                      </td>

                      <td className="border px-4 py-2">

                        {!isLoggedIn && (
                          <span className="text-muted-foreground">
                            Login to view
                          </span>
                        )}

                        {isLoggedIn && alumni.linkedin && (
                          <a
                            href={alumni.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                          >
                            View Profile
                          </a>
                        )}

                        {isLoggedIn && !alumni.linkedin && "N/A"}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </CardContent>

          </Card>

        )}

        {!loading && selectedBatch && filteredAlumni.length === 0 && (

          <p className="text-center text-muted-foreground mt-4">
            No alumni found for this selection.
          </p>

        )}

      </div>

    </div>
  );
};

export default AlumniFamily;