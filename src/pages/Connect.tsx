import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Input, Textarea, Label, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/FormFields";
import { Mail, Phone, MapPin, MessageCircle, Users, Globe } from "lucide-react";

const Connect = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setInfoMessage(""); // Clear previous messages

    const token = localStorage.getItem("token");
    if (!token) {
      setInfoMessage("You must be logged in to send a message."); // Show message
      setIsLoading(false);
      return;
    }

    const formData = { firstName, lastName, email, graduationYear, subject, message };

    try {
      const res = await fetch("http://localhost:5000/api/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setInfoMessage("Message sent successfully!"); // Show success message
        // Reset form
        setFirstName("");
        setLastName("");
        setEmail("");
        setGraduationYear("");
        setSubject("");
        setMessage("");
      } else {
        setInfoMessage(data.message || "Failed to send message"); // Show server error
      }
    } catch (err) {
      console.error(err);
      setInfoMessage("Failed to send message"); // Show network/server error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Connect With Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get in touch with the alumni office or connect with fellow graduates
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="shadow-[var(--shadow-elegant)]">
            <CardHeader>
              <CardTitle className="text-2xl text-navy">Send us a Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="graduationYear">Graduation Year</Label>
                  <Select
                    value={graduationYear}
                    onValueChange={(value) => setGraduationYear(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select your graduation year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 30 }, (_, i) => 2024 - i).map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={subject}
                    onValueChange={(value) => setSubject(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What would you like to discuss?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="networking">Networking Opportunities</SelectItem>
                      <SelectItem value="mentorship">Mentorship Program</SelectItem>
                      <SelectItem value="events">Upcoming Events</SelectItem>
                      <SelectItem value="giving">Giving Back / Donations</SelectItem>
                      <SelectItem value="career">Career Services</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us how we can help you..."
                    className="min-h-[120px]"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {infoMessage && (
                  <p className="text-center text-sm text-red-600">{infoMessage}</p>
                )}

                <Button
                  type="submit"
                  variant="hero"
                  className="w-full"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Message"}
                </Button>
              </form>

            </CardContent>
          </Card>

          {/* Contact Information & Quick Actions */}
          <div className="space-y-8">
            {/* Contact Info */}
            <Card className="shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="text-2xl text-navy">Get in Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Email</h3>
                    <p className="text-muted-foreground">alumni@tezu.ernet.in</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Phone</h3>
                    <p className="text-muted-foreground">+91 37122 75305</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-navy to-navy-light rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy">Address</h3>
                    <p className="text-muted-foreground">Tezpur University<br />Alumni Assosiation<br />Napaam, Tezpur</p>
                  </div>
                </div>
              </CardContent>
            </Card>


            {/* Office Hours */}
            <Card className="shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="text-2xl text-navy">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>Closed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connect;