import React, { useState, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Label } from "@/components/FormFields";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/TabsAndSeparator";
import { Mail, Lock, User, UserCog } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../pages/context/AuthContext";

const LoginAdmin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(AuthContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        setMessageType("success");
        setMessage("Login successful!");
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        setMessageType("error");
        setMessage(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (password !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match");
      setIsLoading(false);
      return;
    }

    const formData = {
      name: `${firstName} ${lastName}`,
      email,
      password,
    };

    try {
      const res = await fetch("http://localhost:5000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setMessageType("success");
        setMessage("Registration successful!");
        setTimeout(() => navigate("/about/login"), 1500);
      } else {
        setMessageType("error");
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center justify-center p-6">
      <div className="w-full max-w-md">
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
              <UserCog className="h-8 w-8 text-navy" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">TU Alumni Plus</h1>
          <p className="text-white/80">Welcome back, Admins</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Sign In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          {/* LOGIN */}
          <TabsContent value="login">
            <Card className="shadow-[var(--shadow-hover)]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-navy">
                  Sign In
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Access your admin account
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

                  {message && (
                    <p
                      className={`text-center text-sm ${
                        messageType === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message}
                    </p>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <Link
                      to="/admin/forgot-password"
                      className="text-navy hover:text-navy-light underline"
                    >
                      Forgot password?
                    </Link>
                  </div>

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

          {/* REGISTER */}
          <TabsContent value="register">
            <Card className="shadow-[var(--shadow-hover)]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center text-navy">
                  Join the Network
                </CardTitle>
                <p className="text-center text-muted-foreground">
                  Create your admin account
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="firstName"
                          placeholder="First Name"
                          className="pl-10"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="registerEmail">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerEmail"
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
                    <Label htmlFor="registerPassword">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="registerPassword"
                        type="password"
                        placeholder="Create a password"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="pl-10"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  {message && (
                    <p
                      className={`text-center text-sm ${
                        messageType === "success"
                          ? "text-green-600"
                          : "text-red-600"
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
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
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

export default LoginAdmin;
