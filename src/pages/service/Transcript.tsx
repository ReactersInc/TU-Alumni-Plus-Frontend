import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Textarea } from "@/components/FormFields";
import { FileText, Download, CheckCircle } from "lucide-react";

const Transcript = () => {
  const [schools, setSchools] = useState<{ _id: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ _id: string; name: string }[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch("http://localhost:5000/api/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch user");
        const data = await res.json();
        setLoggedInUser(data.user);

        setFormData(prev => ({
          ...prev,
          fullName: `${data.user.firstName} ${data.user.lastName}`,
          email: data.user.email,
          phone: data.user.phone,
          graduationYear: data.user.graduationYear,
          degreeType: data.user.programme,
          school: data.user.schoolId,
          department: data.user.departmentId
        }));

        setSelectedSchool(data.user.schoolId);
        setSelectedDepartment(data.user.departmentId);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/schools");
        const data = await res.json();
        setSchools(data);
      } catch (err) {
        console.error("Error fetching schools:", err);
      }
    };
    fetchSchools();
  }, []);
  useEffect(() => {
    if (!selectedSchool) {
      setDepartments([]);
      return;
    }
    const fetchDepartments = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/departments/${selectedSchool}`);
        const data = await res.json();
        setDepartments(data);
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };
    fetchDepartments();
  }, [selectedSchool]);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { message: "Please log in to request transcripts." } });

    }
  }, [navigate]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    graduationYear: "",
    school: "",
    department: "",
    degreeType: "",
    email: "",
    phone: "",
    deliveryAddress: "",
    transcriptType: "official", // official or unofficial
    copies: "1",
    purpose: "",
    additionalRequirements: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      setMessageType("error");
      setMessage("You must be logged in to submit a transcript request.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/transcript", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message || "Failed to submit request");
        return;
      }

      setMessageType("success");
      setMessage("Transcript request submitted successfully!");
      setFormData({
        fullName: "",
        rollNumber: "",
        graduationYear: "",
        school: "",
        department: "",
        degreeType: "",
        email: "",
        phone: "",
        deliveryAddress: "",
        transcriptType: "official",
        copies: "1",
        purpose: "",
        additionalRequirements: ""
      });
      setSelectedSchool("");
      setSelectedDepartment("");

    } catch (error) {
      console.error("Error submitting request:", error);
      setMessageType("error");
      setMessage("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const transcriptTypes = [
    { value: "official", label: "Official Transcript", description: "Sealed and stamped by university" },
    { value: "unofficial", label: "Unofficial Transcript", description: "Digital copy for personal use" }
  ];

  const purposes = [
    "Higher Education Application",
    "Job Application",
    "Visa Application",
    "Professional Certification",
    "Personal Records",
    "Other"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 text-navy mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Transcript Request
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Request official or unofficial transcripts for your academic records
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-navy">Transcript Request Form</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Academic Information */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Academic Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Full Name (as per university records)</label>
                      <Input
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        required
                        readOnly={!!loggedInUser}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Roll Number</label>
                      <Input
                        placeholder="Enter your university roll number"
                        value={formData.rollNumber}
                        onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Graduation Year</label>
                      <Input
                        placeholder="e.g., 2020"
                        value={formData.graduationYear}
                        onChange={(e) => handleInputChange("graduationYear", e.target.value)}
                        required
                        readOnly={!!loggedInUser}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground mb-2">School</label>
                      <select 
                        className="w-full border rounded px-3 py-2"
                        value={selectedSchool}
                        onChange={(e) => {
                          setSelectedSchool(e.target.value);
                          handleInputChange("school", e.target.value);
                          setSelectedDepartment("");
                        }}
                        disabled={!!loggedInUser}
                        required
                      >
                        <option value="">Select your school</option>
                        {schools.map((s) => (
                          <option key={s._id} value={s._id}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-foreground mb-2">Department</label>
                      <select
                        className="w-full border rounded px-3 py-2"
                        value={selectedDepartment}
                        onChange={(e) => {
                          setSelectedDepartment(e.target.value);
                          handleInputChange("department", e.target.value);
                        }}
                        disabled={!!loggedInUser} 
                        required
                      >

                        <option value="">Select your department</option>
                        {departments.map((d) => (
                          <option key={d._id} value={d._id}>{d.name}</option>
                        ))}
                      </select>
                    </div>

                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">Programme Type</label>
                    <Input
                      placeholder="e.g., B.Tech, MBA, LLB, B.Pharma"
                      value={formData.degreeType}
                      onChange={(e) => handleInputChange("degreeType", e.target.value)}
                      required
                      readOnly={!!loggedInUser}
                    />
                  </div>
                </div>

                {/* Transcript Type Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Transcript Type</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {transcriptTypes.map((type) => (
                      <Card
                        key={type.value}
                        className={`cursor-pointer transition-all duration-200 ${formData.transcriptType === type.value ? 'ring-2 ring-navy bg-navy/5' : 'hover:bg-secondary/50'
                          }`}
                        onClick={() => handleInputChange("transcriptType", type.value)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle className={`h-5 w-5 mt-0.5 ${formData.transcriptType === type.value ? 'text-navy' : 'text-muted-foreground'
                              }`} />
                            <div>
                              <h4 className="font-semibold text-navy">{type.label}</h4>
                              <p className="text-sm text-muted-foreground">{type.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Request Details */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Request Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Number of Copies
                      </label>
                      <select
                        value={formData.copies}
                        onChange={(e) => handleInputChange("copies", e.target.value)}
                        className="w-full p-3 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-navy focus:border-transparent"
                      >
                        {[1, 2, 3, 4, 5].map(num => (
                          <option key={num} value={num.toString()}>{num}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Purpose
                      </label>
                      <select
                        value={formData.purpose}
                        onChange={(e) => handleInputChange("purpose", e.target.value)}
                        className="w-full p-3 border border-border rounded-md bg-background text-foreground focus:ring-2 focus:ring-navy focus:border-transparent"
                        required
                      >
                        <option value="">Select purpose</option>
                        {purposes.map(purpose => (
                          <option key={purpose} value={purpose}>{purpose}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-navy mb-4">Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                      <Input
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        readOnly={!!loggedInUser}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                      <Input
                        placeholder="+91 9876543210"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        readOnly={!!loggedInUser}
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-foreground mb-2">Delivery Address (for official transcripts)</label>
                    <Textarea
                      placeholder="Enter complete address for courier delivery"
                      value={formData.deliveryAddress}
                      onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                      className="min-h-20"
                      required={formData.transcriptType === "official"}
                    />
                  </div>
                </div>

                {/* Additional Requirements */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Additional Requirements (Optional)</label>
                  <Textarea
                    placeholder="Any special instructions or requirements"
                    value={formData.additionalRequirements}
                    onChange={(e) => handleInputChange("additionalRequirements", e.target.value)}
                    className="min-h-20"
                  />
                </div>
                {message && (
                  <p className={`text-center mt-2 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message}
                  </p>
                )}

                <div className="flex gap-4 pt-6">

                  <Button type="submit" variant="hero" size="lg" disabled={loading}>
                    {loading ? "Submitting..." : (
                      <>
                        <Download className="mr-2 h-5 w-5" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Processing Information */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl text-navy">Processing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-navy mb-2">Official Transcripts</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Processing time: 7-10 business days</li>
                    <li>• Fee: ₹500 per copy</li>
                    <li>• Sealed and stamped by university</li>
                    <li>• Courier delivery included</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-navy mb-2">Unofficial Transcripts</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Processing time: 2-3 business days</li>
                    <li>• Fee: ₹200 per copy</li>
                    <li>• Digital delivery via email</li>
                    <li>• For personal use only</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Transcript;