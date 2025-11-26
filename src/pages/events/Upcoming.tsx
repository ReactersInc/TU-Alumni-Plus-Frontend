import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/FormFields";
import { Calendar, MapPin, Clock, ExternalLink } from "lucide-react";

const Upcoming = () => {
  const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/upcoming");
      const data = await res.json();
      setUpcomingEvents(data.events || []);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };
  fetchEvents();
}, []);


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-navy text-xl">
        Loading upcoming events...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Upcoming Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Don’t miss out on exciting opportunities to connect, learn, and celebrate with fellow alumni
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {upcomingEvents.map((event) => (
            <Card key={event._id} className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2">
              <div className="relative overflow-hidden">
                {/* ✅ Display Base64 image directly */}
                {event.imageBase64 && (
                  <img
                    src={event.imageBase64}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
              </div>

              <CardHeader>
                <CardTitle className="text-xl text-navy group-hover:text-navy-light transition-colors">
                  {event.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {event.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{event.time}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{event.venue}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    variant="hero"
                    className="flex-1"
                    onClick={() => window.open(event.registrationLink, "_blank")}
                  >
                    Register Now
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => window.open(event.registrationLink, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Upcoming;
