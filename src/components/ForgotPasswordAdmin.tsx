import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Label } from "@/components/FormFields";
import { Mail, Lock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const ForgotPasswordAdmin = () => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/password/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessageType("success");
        setMessage("Reset code sent! Check your email.");
        setStep(2);
      } else {
        setMessageType("error");
        setMessage(data.message || "Failed to send code");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/password/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessageType("success");
        setMessage("Code verified! Enter your new password.");
        setStep(3);
      } else {
        setMessageType("error");
        setMessage(data.message || "Invalid code");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessageType("error");
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/admin/password/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessageType("success");
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => navigate("/about/login"), 2000);
      } else {
        setMessageType("error");
        setMessage(data.message || "Reset failed");
      }
    } catch (err) {
      console.error(err);
      setMessageType("error");
      setMessage("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <Card className="shadow-[var(--shadow-hover)]">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-navy">
              Admin Forgot Password
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {step === 1 && "Enter your admin email to receive reset code"}
              {step === 2 && "Enter the code sent to your email"}
              {step === 3 && "Set a new password"}
            </p>
          </CardHeader>
          <CardContent>
            {/* STEP 1 */}
            {step === 1 && (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="email">Admin Email</Label>
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your admin email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                {message && (
                  <p
                    className={`text-center text-sm mt-2 ${
                      messageType === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Code"}
                </Button>
              </form>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="code">Reset Code</Label>
                  <Input
                    id="code"
                    type="number"
                    placeholder="Enter code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                  />
                </div>
                {message && (
                  <p
                    className={`text-center text-sm mt-2 ${
                      messageType === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify Code"}
                </Button>
              </form>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2 relative">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="pl-10"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2 relative">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="pl-10"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                {message && (
                  <p
                    className={`text-center text-sm mt-2 ${
                      messageType === "success" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {message}
                  </p>
                )}
                <Button type="submit" variant="hero" className="w-full" disabled={isLoading}>
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="text-center text-white/80 text-sm mt-4">
          Remembered your password?{" "}
          <Link to="/admin/login" className="underline hover:text-white">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordAdmin;
