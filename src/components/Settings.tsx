import React, { useState, } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Label } from "@/components/FormFields";
import { Eye, EyeOff } from "lucide-react"; 
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [step, setStep] = useState<"email" | "verify" | "reset">("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPass, setShowNewPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendCode = async () => {
    if (!email) return setMessage("⚠️ Please enter your email");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/password/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("verify");
        setMessage("✅ OTP sent to your email!");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code) return setMessage("⚠️ Please enter the code");
    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/password/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });
      const data = await res.json();
      if (res.ok) {
        setStep("reset");
        setMessage("✅ Code verified. You can now reset your password.");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword)
      return setMessage("⚠️ Passwords do not match!");
    if (!newPassword) return setMessage("⚠️ Please enter a new password");

    setLoading(true);
    setMessage("");
    try {
      const res = await fetch("/api/password/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password reset successful! You can now log in.");
        setStep("email");
        setEmail("");
        setCode("");
        setNewPassword("");
        setConfirmPassword("");
        navigate("/dashboard") 
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch {
      setMessage("❌ Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl font-semibold">
            Change Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {message && (
            <div
              className={`text-center text-sm ${
                message.startsWith("✅") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}

          {step === "email" && (
            <>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button className="w-full" onClick={handleSendCode} disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </Button>
            </>
          )}

          {step === "verify" && (
            <>
              <Label>Enter OTP Code</Label>
              <Input
                type="text"
                placeholder="6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <Button className="w-full" onClick={handleVerifyCode} disabled={loading}>
                {loading ? "Verifying..." : "Verify Code"}
              </Button>
            </>
          )}

          {step === "reset" && (
            <>
              <Label>New Password</Label>
              <div className="relative">
                <Input
                  type={showNewPass ? "text" : "password"}
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPass((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showNewPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Label>Confirm New Password</Label>
              <div className="relative">
                <Input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPass((prev) => !prev)}
                  className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button className="w-full" onClick={handleResetPassword} disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
