import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Textarea, Label, Badge } from "@/components/FormFields";
import { Trophy, Award, Star, Briefcase, Plus } from "lucide-react";
import { useState, useEffect } from "react";

const Achievements = () => {
  const iconMap = {
    Award,
    Star,
    Trophy
  };

  const [formData, setFormData] = useState({
    fullName: "",
    graduationYear: "",
    achievementTitle: "",
    category: "",
    description: "",
    email: ""
  });
  const [loading, setLoading] = useState(false);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
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
    const fetchAchievements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/achievements");
        const data = await res.json();
        setAchievements(data.achievements || []);
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoadingAchievements(false);
      }
    };

    fetchAchievements();
  }, []);

  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "research":
        return Award;
      case "technology":
        return Trophy;
      case "arts":
        return Star;
      default:
        return Briefcase;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const token = localStorage.getItem("token"); // if using auth
    try {
      const response = await fetch("http://localhost:5000/api/achievements", {
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
        setMessage(data.message || "You must be logged in to share an achievement request.");
        return;
      }

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message || "Failed to submit achievement");
        return;
      }

      setMessageType("success");
      setMessage("Achievement shared successfully!");
      setFormData({
        fullName: "",
        graduationYear: "",
        achievementTitle: "",
        category: "",
        description: "",
        email: ""
      });
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
            Share Your Achievements
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Celebrate your success and inspire fellow alumni and current students
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Achievement Submission Form */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="text-2xl text-navy flex items-center gap-2">
                <Plus className="h-6 w-6" />
                Submit Your Achievement
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
                  <Input id="gradYear" placeholder="e.g., 2015" value={formData.graduationYear}
                    onChange={(e) => handleInputChange("graduationYear", e.target.value)} readOnly={!!loggedInUser} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="achievementTitle">Achievement Title</Label>
                <Input id="achievementTitle" placeholder="Brief title of your achievement" value={formData.achievementTitle}
                  onChange={(e) => handleInputChange("achievementTitle", e.target.value)} />

              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Input id="category" placeholder="e.g., Research, Business, Arts, Technology" value={formData.category}
                  onChange={(e) => handleInputChange("category", e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your achievement and its impact..."
                  className="min-h-[120px]" onChange={(e) => handleInputChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)} readOnly={!!loggedInUser} />
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
                  {loading ? "Submitting..." : "Submit Achievement"}
                </Button>
              </form>


            </CardContent>
          </Card>
          {/* Featured Achievements */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-navy">Featured Achievements</h2>

            {loadingAchievements ? (
              <p className="text-muted-foreground">Loading achievements...</p>
            ) : achievements.length === 0 ? (
              <p className="text-muted-foreground">No achievements yet.</p>
            ) : (
              achievements.map((achievement, index) => {
                const Icon = getIcon(achievement.category || "");
                return (
                  <Card key={index} className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge className="bg-navy">{achievement.category}</Badge>
                            <span className="text-sm text-muted-foreground">Class of {achievement.graduationYear}</span>
                          </div>
                          <h3 className="text-lg font-semibold text-navy mb-1">{achievement.fullName}</h3>
                          <h4 className="font-medium text-navy-light mb-3">{achievement.achievementTitle}</h4>
                          <p className="text-muted-foreground text-sm leading-relaxed">
                            {achievement.description}
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
                <Briefcase className="h-12 w-12 text-navy/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy mb-2">Your Achievement Could Be Here</h3>
                <p className="text-muted-foreground mb-4">
                  Share your success story and inspire the alumni community
                </p>
                <Button variant="outline" className="text-navy border-navy hover:bg-navy hover:text-white">
                  Share Your Story
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Achievements;