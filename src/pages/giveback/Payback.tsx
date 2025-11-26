import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Textarea, Label, Badge } from "@/components/FormFields";
import { Heart, Gift, Coins, Plus, Upload } from "lucide-react";
import { useState, useEffect } from "react";
const Payback = () => {
  const iconMap = {
    Heart,
    Gift,
    Coins,
  };
  const [file, setFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    amount: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
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
        }));
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value as string);
      });
      if (file) form.append("document", file);

      const token = localStorage.getItem("token"); 
      const response = await fetch("http://localhost:5000/api/paybacks", {
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
        setMessage(data.message || "You must be logged in to donate form request.");
        return;
      }

      if (!response.ok) {
        setMessageType("error");
        setMessage(data.message || "Failed to submit contribution");
        return;
      }
setMessageType("success");
      setMessage("Donation given successfully!");
      setFormData({ fullName: "", email: "", amount: "", message: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Something went wrong while submitting.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  };
  const [paybacks, setPaybacks] = useState<any[]>([]);
  const [loadingPaybacks, setLoadingPaybacks] = useState(true);

  useEffect(() => {
    const fetchPaybacks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/paybacks");
        const data = await res.json();
        setPaybacks(data);
      } catch (err) {
        console.error("Error fetching paybacks:", err);
      } finally {
        setLoadingPaybacks(false);
      }
    };

    fetchPaybacks();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Give Back to Your Alma Mater
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Contribute towards scholarships, campus development, and student initiatives
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Payback Submission Form */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="text-2xl text-navy flex items-center gap-2">
                <Plus className="h-6 w-6" />
                Contribute Now
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Donor Details */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Your full name" value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)} readOnly={!!loggedInUser}/>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="your.email@example.com" value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)} readOnly={!!loggedInUser} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (INR)</Label>
                  <Input id="amount" type="number" placeholder="Enter amount to contribute" value={formData.amount}
                    onChange={(e) => handleInputChange("amount", e.target.value)} />
                </div>

                {/* Upload Screenshot */}
                <div className="space-y-2">
                  <Label htmlFor="screenshot">Upload Payment Screenshot</Label>
                  <div className="flex items-center gap-2">
                    <Input id="screenshot" type="file" accept="image/*" className="cursor-pointer" onChange={handleFileChange} />
                    <Upload className="h-5 w-5 text-navy opacity-70" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Please upload the transaction receipt or screenshot (JPG, PNG, PDF).
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Share your thoughts or purpose of contribution..."
                    className="min-h-[100px]" value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                  />
                </div>

                {/* Bank Account Details */}
                <div className="border border-navy/20 rounded-lg p-4 bg-navy/5">
                  <h3 className="text-lg font-semibold text-navy mb-2">Bank Account Details</h3>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li><strong>Account Holder:</strong> Tezpur University Alumni Association</li>
                    <li><strong>Bank Name:</strong> State Bank of India</li>
                    <li><strong>Branch:</strong> Tezpur University Branch, Napaam, Tezpur, Assam</li>
                    <li><strong>IFS Code:</strong> SBIN0014259</li>
                    <li><strong>Account Number:</strong> 10501586524</li>
                  </ul>
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
                  {loading ? "Submitting..." : "Submit Form"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Featured Contributors */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-navy">Featured Contributors</h2>

            {loadingPaybacks ? (
              <p className="text-muted-foreground">Loading contributions...</p>
            ) : paybacks.length === 0 ? (
              <p className="text-muted-foreground">No contributions yet.</p>
            ) : (
              paybacks.map((donor) => (
                <Card key={donor._id} className="group hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Heart className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge className="bg-navy">{new Date(donor.createdAt).getFullYear()}</Badge>
                          <span className="text-sm text-muted-foreground">{donor.amount} INR</span>
                        </div>
                        <h3 className="text-lg font-semibold text-navy mb-1">{donor.name}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-1">{donor.message}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}


            {/* CTA */}
            <Card className="bg-gradient-to-r from-navy/5 to-navy-light/5 border-dashed border-2 border-navy/20">
              <CardContent className="p-8 text-center">
                <Heart className="h-12 w-12 text-navy/40 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-navy mb-2">
                  Every Contribution Matters
                </h3>
                <p className="text-muted-foreground mb-4">
                  Your support helps us build a stronger alumni network and empower students
                </p>
                <Button
                  variant="outline"
                  className="text-navy border-navy hover:bg-navy hover:text-white"
                >
                  Contribute Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payback;
