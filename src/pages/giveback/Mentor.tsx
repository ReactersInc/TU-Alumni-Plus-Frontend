import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Textarea, Label, Badge } from "@/components/FormFields";
import { Star, Briefcase, Award, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const Mentor = () => {
  // Map category keywords to icons
  const iconMap: Record<string, any> = {
    award: Award,
    star: Star,
    briefcase: Briefcase,
  };

  const [formData, setFormData] = useState({
    fullName: "",
    graduationYear: "",
    expertise: "",
    eligibility: "",
    category: "",
    description: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [mentors, setMentors] = useState<any[]>([]);
  const [loadingMentors, setLoadingMentors] = useState(true);
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
          graduationYear: data.user.graduationYear,
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);
  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/mentors");
        const data = await res.json();
        setMentors(data || []);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoadingMentors(false);
      }
    };
    fetchMentors();
  }, []);

  const getIcon = (category: string) => {
    if (!category) return Briefcase;
    const lower = category.toLowerCase();
    if (lower.includes("career")) return Briefcase;
    if (lower.includes("academic")) return Star;
    if (lower.includes("research")) return Award;
    return Star;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token"); // if using auth
    try {
      const response = await fetch("http://localhost:5000/api/mentors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!token) {
        setMessageType("error");
        setMessage(data.message || "You must be logged in to submit mentor form request.");
        return;
      }

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message || "Failed to submit mentor form");
      }

      setMessageType("success");
      setMessage("Mentor form shared successfully!");
      setFormData({
        fullName: "",
        graduationYear: "",
        expertise: "",
        eligibility: "",
        category: "",
        description: "",
        email: "",
      });

      const res = await fetch("http://localhost:5000/api/mentors");
      const updatedMentors = await res.json();
      setMentors(updatedMentors);
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Become a Mentor
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Share your expertise and guide students and alumni towards success
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mentor Submission Form */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="text-2xl text-navy flex items-center gap-2">
                <Plus className="h-6 w-6" />
                Submit Your Profile
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    readOnly={!!loggedInUser}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gradYear">Graduation Year</Label>
                  <Input
                    id="gradYear"
                    placeholder="e.g., 2015"
                    value={formData.graduationYear}
                    onChange={(e) =>
                      handleInputChange("graduationYear", e.target.value)
                    }
                    readOnly={!!loggedInUser}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="expertise">Expertise</Label>
                <Input
                  id="expertise"
                  placeholder="e.g., Business, AI, Arts"
                  value={formData.expertise}
                  onChange={(e) =>
                    handleInputChange("expertise", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="eligibility">Eligibility</Label>
                <Input
                  id="eligibility"
                  placeholder="Who can seek your mentorship?"
                  value={formData.eligibility}
                  onChange={(e) =>
                    handleInputChange("eligibility", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="e.g., Career, Academic, Personal Growth"
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your mentorship style, experience, and value..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    handleInputChange("email", e.target.value)
                  }
                  readOnly={!!loggedInUser}
                />
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
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
                  {loading ? "Submitting..." : "Submit Profile"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Featured Mentors */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-navy">Featured Mentors</h2>

            {loadingMentors ? (
              <p className="text-muted-foreground">Loading mentors...</p>
            ) : mentors.length === 0 ? (
              <p className="text-muted-foreground">No mentors available yet.</p>
            ) : (
              mentors.map((mentor: any) => {
                const Icon = getIcon(mentor.category);
                return (
                  <Card
                    key={mentor._id}
                    className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-navy">
                              {mentor.category || "General"}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Class of {mentor.graduationYear || "N/A"}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold text-navy mb-1">
                            {mentor.fullName}
                          </h3>
                          <h4 className="font-medium text-navy-light mb-3">
                            {mentor.expertise}
                          </h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {mentor.description}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Eligibility: {mentor.eligibility || "Anyone"}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}

            <Card className="bg-gradient-to-r from-navy/5 to-navy-light/5 border-dashed border-2 border-navy/20">
              <CardContent className="p-8 text-center">
                <Star className="h-12 w-12 text-navy/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy mb-2">
                  Become a Mentor
                </h3>
                <p className="text-muted-foreground mb-4">
                  Share your expertise and guide the community
                </p>
                <Button
                  variant="outline"
                  className="text-navy border-navy hover:bg-navy hover:text-white"
                >
                  Join as Mentor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mentor;
