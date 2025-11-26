import React, { useState, useContext, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Label } from "@/components/FormFields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/TabsAndSeparator";
import { GraduationCap, Lock, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [programme, setProgramme] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [schools, setSchools] = useState<{ _id: string; name: string }[]>([]);
  const [departments, setDepartments] = useState<{ _id: string; name: string }[]>([]);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);

  // reset messages on tab change
  const handleTabChange = () => {
    setMessage("");
    setMessageType("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setMessageType("success");
        setMessage("✅ Login successful!");
        setTimeout(() => {
          navigate("/") 
          window.location.reload();   
        }, 1500);
      } else {
        setMessageType("error");
        setMessage(data.message || "❌ Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("⚠️ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    const form = e.currentTarget;

    const formData = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      email: form.registerEmail.value,
      phone: form.phone.value,
      graduationYear: form.graduationYear.value,
      linkedin: form.linkedin.value,
      password: form.registerPassword.value,
      confirmPassword: form.confirmPassword.value,
      schoolId: selectedSchool,
      departmentId: selectedDepartment,
      programme: form.programme.value,
    };

    if (formData.password !== formData.confirmPassword) {
      setMessageType("error");
      setMessage("⚠️ Passwords do not match!");
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessageType("success");
        setMessage("✅ Registration successful!");
        setTimeout(() => navigate("/"), 1500);
      } else {
        setMessageType("error");
        setMessage(data.message || data.error || "❌ Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("⚠️ Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch schools
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

  // Fetch departments based on selected school
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4 gap-4">
            <Link to="/">
              <img
                src="/tulogo.png"
                alt="TU Logo"
                className="w-16 h-16 object-contain rounded-full"
              />
            </Link>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-[var(--shadow-glow)]">
              <GraduationCap className="h-8 w-8 text-navy" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">TU Alumni Plus</h1>
          <p className="text-white/80">Welcome back to your community</p>
        </div>

        {/* Tabs for Login / Register */}
        <Tabs defaultValue="login" className="w-full" onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* LOGIN TAB */}
          <TabsContent value="login">
            <Card className="shadow-[var(--shadow-hover)]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-navy">Sign In</CardTitle>
                <p className="text-center text-muted-foreground">
                  Access your alumni account
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <Link to="/forgot-password" className="text-navy hover:text-navy-light underline">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Message */}
                  {message && (
                    <p
                      className={`text-center text-sm mt-2 ${messageType === "success" ? "text-green-600" : "text-red-600"
                        }`}
                    >
                      {message}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="hero"
                    className="w-full"
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* REGISTER TAB */}
          <TabsContent value="register">
            <Card className="shadow-[var(--shadow-hover)] h-[80vh] flex flex-col">
              <CardHeader className="space-y-1 flex-shrink-0">
                <CardTitle className="text-2xl text-center text-navy">Join the Network</CardTitle>
                <p className="text-center text-muted-foreground"> Create your alumni account </p>
              </CardHeader>
              {/* Scrollable form content */}
              <CardContent className="overflow-y-auto px-4 pb-6">

                <form onSubmit={handleRegister} className="space-y-4 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email Address</Label>
                    <Input id="registerEmail" type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                  </div>
                  {/* School Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="school">School</Label>
                    <select id="school" className="w-full border rounded px-3 py-2" value={selectedSchool} onChange={(e) => setSelectedSchool(e.target.value)} required >
                      <option value="">Select your school</option>
                      {schools.map((s) => (<option key={s._id} value={s._id}>{s.name}</option>))}
                    </select>
                  </div>
                  {/* Department Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <select id="department" className="w-full border rounded px-3 py-2" value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} required disabled={!selectedSchool} >
                      <option value="">Select your department</option>
                      {departments.map((d) => (<option key={d._id} value={d._id}>{d.name}</option>))}
                    </select>
                  </div>
                  {/* Programme Input */}
                  <div className="space-y-2">
                    <Label htmlFor="programme">Programme</Label>
                    <Input id="programme" type="text" placeholder="e.g., B.Tech, M.Tech" value={programme} onChange={(e) => setProgramme(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="graduationYear">Graduation Year</Label>
                    <Input id="graduationYear" type="number" placeholder="2020" min="1950" max="2025" value={graduationYear} onChange={(e) => setGraduationYear(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="linkedin">LinkedIn Profile (optional)</Label>
                    <Input id="linkedin" type="url" placeholder="https://www.linkedin.com/in/yourprofile" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="registerPassword">Password</Label>
                    <Input id="registerPassword" type="password" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                  {message && (
                    <p
                      className={`text-center text-sm ${messageType === "success"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {message}
                    </p>
                  )}
                  <Button type="submit" variant="hero" className="w-full" size="lg" disabled={isLoading} > {isLoading ? "Creating Account..." : "Create Account"} </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="text-center text-white/80 text-sm mt-6">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-white">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
