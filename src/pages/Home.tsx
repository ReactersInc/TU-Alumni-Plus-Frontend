import { Button } from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { ArrowRight, Users, Award, Calendar, BookOpen, MapPin, Trophy, Star, Briefcase, Badge } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "/images/TU-gate.png";
import CampusSlider from "@/components/CampusSlider";
import alumniStoriesData from "@/data/alumniStories.json";
import ZubeenTribute from "../components/ZubeenTribute";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

const Home = () => {
  const features = [
    {
      icon: Users,
      title: "Connect & Network",
      description: "Build meaningful connections with fellow alumni across the globe"
    },
    {
      icon: Award,
      title: "Share Achievements",
      description: "Celebrate your success and inspire the next generation"
    },
    {
      icon: Calendar,
      title: "Join Events",
      description: "Participate in reunions, workshops, and networking events"
    },
    {
      icon: BookOpen,
      title: "Give Back",
      description: "Mentor students and contribute to the university community"
    }
  ];

  const [events, setEvents] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);
  const alumniStories = alumniStoriesData;
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/upcoming"); // your backend endpoint
        const data = await res.json();
        setEvents(data.events || []); // save all events
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    };
    fetchEvents();
  }, []);
  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/achievements");
        const data = await res.json();
        setAchievements(data.achievements || []);
      } catch (err) {
        console.error("Error fetching achievements:", err);
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
  return (
    <div className="min-h-screen">
      {/* Hero Section */}

<section className="mx-4 sm:mx-6 lg:mx-0">

  {/* Wrapper */}
  <div className="relative h-[60vh] sm:h-[65vh] lg:h-[70vh] flex items-center justify-center overflow-hidden 
  rounded-[2.5rem] sm:rounded-[3rem] lg:rounded-none 
  shadow-xl lg:shadow-none border border-white/10 lg:border-none">

    {/* Background */}
    <div
      className="absolute inset-0 bg-cover bg-center scale-105 lg:scale-110 lg:blur-sm 
      rounded-[2.5rem] sm:rounded-[3rem] lg:rounded-none"
      style={{ backgroundImage: `url(${heroImage})` }}
    ></div>

    {/* Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r 
      from-midnight-blue/85 
      via-dusty-blue/70 
      to-midnight-blue/85 
      lg:from-midnight-blue/75 
      lg:via-dusty-blue/60 
      lg:to-midnight-blue/75
      rounded-[2.5rem] sm:rounded-[3rem] lg:rounded-none">
    </div>

    {/* Main Image */}
    <div className="relative z-10 flex items-center justify-center w-full h-full px-4">
      <img
        src={heroImage}
        alt="Tezpur University Campus"
        className="max-h-[70%] sm:max-h-[75%] lg:max-h-full object-contain 
        rounded-[1.5rem] sm:rounded-[2rem] lg:rounded-none 
        p-3 sm:p-4 lg:p-0 
        shadow-xl lg:shadow-none"
      />
    </div>

    {/* Desktop Left */}
    <div className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 text-white w-1/3 justify-center">
      <div className="text-center max-w-xs">
        <h3 className="text-2xl font-bold mb-4 text-vintage-gold">Discover</h3>
        <p className="text-sm mb-4">
          Explore the rich heritage and vibrant community that continues to shape minds and futures.
        </p>
        <div className="w-16 h-1 bg-vintage-gold mx-auto"></div>
      </div>
    </div>

    {/* Desktop Right */}
    <div className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 text-white w-1/3 justify-center">
      <div className="text-center max-w-xs">
        <h3 className="text-2xl font-bold mb-4 text-vintage-gold">Connect</h3>
        <p className="text-sm mb-4">
          Join a network of accomplished graduates making their mark across industries and continents.
        </p>
        <div className="w-16 h-1 bg-vintage-gold mx-auto"></div>
      </div>
    </div>

    {/* Mobile + Tablet Text */}
    <div className="lg:hidden absolute bottom-6 text-center text-white px-4 z-10">
      <h2 className="text-lg sm:text-xl font-bold text-vintage-gold mb-2">
        Discover • Connect
      </h2>
      <p className="text-xs sm:text-sm max-w-md mx-auto">
        Explore your alumni network and stay connected with your alma mater.
      </p>
    </div>

  </div>
</section>

      {/* Welcome Section */}
      <section className="py-16 bg-gradient-to-b from-powder-blue/20 to-lavender-mist/30">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-midnight-blue">
              Welcome Back to
              <span className="block text-vintage-gold">Your Alma Mater</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed">
              Connect with fellow graduates, share your journey, and give back to the community that shaped your future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="alumni" size="lg" asChild>
                <Link to="/login">
                  Join the Network <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/gallery">Relive Memories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>


      {/* Zubeen Tribute Section */}
      <ZubeenTribute />


      {/* Campus Slider Section */}
      <CampusSlider />

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-powder-blue/30 to-lavender-mist/20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-midnight-blue mb-6">
              Why Reconnect with Your Alumni Family?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the endless possibilities when you stay connected with your alma mater
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-[var(--shadow-memory)] transition-all duration-500 hover:-translate-y-2 bg-gradient-to-br from-pearl-white to-powder-blue/50 border-memory-blue/20">
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-midnight-blue to-dusty-blue text-white rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-midnight-blue mb-4">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Upcoming & Recent Events
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay connected with exciting events and activities from our alumni community
            </p>
          </div>
          {/* Display two events from database */}
          <div className="grid md:grid-cols-2 gap-8">
            {events.slice(0, 2).map((event) => (
              <Card key={event._id} className="hover:shadow-[var(--shadow-hover)] transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {event.imageBase64 && (
                      <img
                        src={event.imageBase64}
                        alt={event.title}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    )}
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-navy mb-2">{event.title}</h4>
                      <p className="text-muted-foreground mb-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        {event.date && (
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>{event.date}</span>
                          </div>
                        )}
                        {event.venue && (
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>


          <div className="text-center mt-12">
            <Button variant="hero" size="lg" asChild>
              <Link to="/events/upcoming">
                View All Events <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Achievements Preview */}
      <section className="py-20 bg-gradient-to-b from-secondary/30 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-navy mb-6">
              Featured Achievements
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Celebrate the success of our alumni and get inspired
            </p>
          </div>

          {loadingAchievements ? (
            <p className="text-center text-muted-foreground">Loading achievements...</p>
          ) : achievements.length === 0 ? (
            <p className="text-center text-muted-foreground">No achievements yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.slice(0, 3).map((achievement, index) => {
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
                            <span className="text-sm text-muted-foreground">
                              Class of {achievement.graduationYear}
                            </span>
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
              })}
            </div>
          )}
        </div>
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
            <Link to="/giveback/achievements">
              Read All Achievements <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>



      <Footer />

    </div>
  );
};

export default Home;