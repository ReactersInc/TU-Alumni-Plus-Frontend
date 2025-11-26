import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Textarea, Label, Badge } from "@/components/FormFields";
import { FileText, Briefcase, Plus, GraduationCap } from "lucide-react";

const Opportunities = () => {
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    type: "",
    description: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [fetching, setFetching] = useState(false);
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
          email: data.user.email,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

  const fetchOpportunities = async () => {
    try {
      setFetching(true);
      const response = await fetch("http://localhost:5000/api/opportunities");
      const data = await response.json();
      setOpportunities(data);
    } catch (err) {
      console.error("Failed to fetch opportunities:", err);
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchOpportunities();
  }, []);

  // Handle form inputs
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };

  // Submit new opportunity
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value as string);
      });
      if (file) form.append("document", file);

      const token = localStorage.getItem("token"); // if using auth
      const response = await fetch("http://localhost:5000/api/opportunities", {
        method: "POST",
        headers: {
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: form,
      });

      const data = await response.json();

      if (!token) {
        setMessageType("error");
        setMessage(data.message || "You must be logged in to submit opportunity form request.");
        return;
      }

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message || "Failed to submit opportunity form");
        return;
      }

      setMessageType("success");
      setMessage("Opportunity form shared successfully!");
      setFormData({
        title: "",
        organization: "",
        type: "",
        description: "",
        email: "",
      });
      setFile(null);

      // Refresh list
      fetchOpportunities();

    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };


  // Icon mapping
  const iconMap = { Briefcase, FileText, GraduationCap };

  const isFormValid =
    formData.title &&
    formData.organization &&
    formData.type &&
    formData.description &&
    formData.email;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Share Opportunities
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Post internships, jobs, or research opportunities for the alumni and student community
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Submission Form */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="text-2xl text-navy flex items-center gap-2">
                <Plus className="h-6 w-6" />
                Submit an Opportunity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Opportunity Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Software Engineer Internship"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization">Organization / Company</Label>
                  <Input
                    id="organization"
                    placeholder="e.g., Google, TCS, IIT Bombay"
                    value={formData.organization}
                    onChange={(e) => handleInputChange("organization", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Opportunity Type</Label>
                  <Input
                    id="type"
                    placeholder="e.g., Internship, Job, Fellowship"
                    value={formData.type}
                    onChange={(e) => handleInputChange("type", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide a detailed description about the opportunity..."
                    className="min-h-[120px]"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="document">Upload Document (optional)</Label>
                  <Input
                    id="document"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                  />
                  {file && (
                    <p className="text-sm text-muted-foreground">
                      Selected: <strong>{file.name}</strong>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    readOnly={!!loggedInUser}
                  />
                </div>

                {message && (
                  <p className={`text-center mt-2 ${messageType === "success" ? "text-green-600" : "text-red-600"}`}>
                    {message}
                  </p>
                )}
                {/* All your input fields here */}
                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit Opportunity"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Dynamic Opportunities */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-navy">Latest Opportunities</h2>

            {fetching ? (
              <p>Loading opportunities...</p>
            ) : opportunities.length === 0 ? (
              <p className="text-muted-foreground">No opportunities yet.</p>
            ) : (
              opportunities.map((opp, index) => {
                const Icon = iconMap.Briefcase;
                return (
                  <Card
                    key={opp._id || index}
                    className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-navy">{opp.type}</Badge>
                            <span className="text-sm text-muted-foreground">
                              {opp.organization}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-navy mb-1">{opp.title}</h3>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-2">
                            {opp.description}
                          </p>
                          {opp.document && (
                            <div className="mt-3">
                              <a className="hover:text-blue-500"
                                href={`http://localhost:5000${opp.document}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View Attached File
                              </a>

                            </div>
                          )}

                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Opportunities;
