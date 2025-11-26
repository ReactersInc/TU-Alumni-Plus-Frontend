import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { Button } from "@/components/Button";
import { Badge } from "@/components/FormFields";
import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const Past = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/upcoming"); 
        const data = await res.json();
        setEvents(data.events || []);
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
        Loading events...
      </div>
    );
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      "Formal": "bg-navy",
      "Conference": "bg-navy-light",
      "Networking": "bg-gold",
      "Workshop": "bg-navy/80"
    };
    return colors[category as keyof typeof colors] || "bg-navy";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30 py-20">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy mb-6">
            Past Events
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Take a look back at our memorable alumni gatherings, conferences, and celebrations.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {events.map((event) => (
            <Card
              key={event._id}
              className="group overflow-hidden hover:shadow-[var(--shadow-hover)] transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                {event.imageBase64 && (
                  <img
                    src={event.imageBase64}
                    alt={event.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(event.category)} text-white`}>
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Badge variant="secondary" className="bg-white/90 text-navy">
                    {event.date}
                  </Badge>
                </div>
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
                  <Button variant="outline" className="flex-1">
                    View Gallery
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

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-navy to-navy-light text-white shadow-[var(--shadow-hover)]">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Relive the Moments</h2>
              <p className="text-white/90 mb-6">
                Browse our event gallery and see how our alumni community continues to grow stronger together.
              </p>
              <Button variant="alumni" size="lg">
                <Link to="/gallery">View Photo Gallery</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Past;
