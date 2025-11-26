import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/Button";
import { ChevronDown, GraduationCap, Plus } from "lucide-react";
import { AuthContext } from "../pages/context/AuthContext";

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  const giveBackItems = [
    { name: "Share Achievement", href: "/giveback/achievements" },
    { name: "Be A Mentor", href: "/giveback/mentor" },
    { name: "Share Opportunity", href: "/giveback/opportunities" },
    { name: "PayBack", href: "/giveback/payback" }
  ];

  const eventsItems = [
    { name: "Upcoming Events", href: "/events/upcoming" },
    { name: "Past Events", href: "/events/past" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/95 backdrop-blur-md shadow-[var(--shadow-elegant)] sticky top-0 z-50 border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            {/* Text + Plus + University Logo */}
            {/* University Logo (bigger than icons) */}
            <img
              src="/tulogo.png"
              alt="TU Logo"
              className="h-12 w-12 ml-2 object-contain rounded-full"
            />
            <span className="flex items-center text-xl font-bold text-navy">
              TU Alumni
              <Plus className="h-7 w-7 ml-1 text-navy group-hover:text-gold transition-colors" />
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-medium transition-colors hover:text-navy ${isActive('/') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`font-medium transition-colors hover:text-navy ${isActive('/about') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}
            >
              About
            </Link>

            <Link
              to="/alumni-family"
              className={`font-medium transition-colors hover:text-navy ${isActive('/alumni-family') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}
            >
              Alumni Family
            </Link>

            {/* GiveBack Dropdown */}
            <div
              className="relative group"
            >
              <button className="flex items-center space-x-1 font-medium text-foreground hover:text-navy transition-colors">
                <span>GiveBack</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                {giveBackItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-navy transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Events Dropdown */}
            <div
              className="relative group"
            >
              <button className="flex items-center space-x-1 font-medium text-foreground hover:text-navy transition-colors">
                <span>Events</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                {eventsItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-navy transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/gallery"
              className={`font-medium transition-colors hover:text-navy ${isActive('/gallery') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}
            >
              Gallery
            </Link>

            <Link
              to="/blog"
              className={`font-medium transition-colors hover:text-navy ${isActive('/blog') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}
            >
              Blog
            </Link>

            <Link
              to="/connect"
              className={`font-medium transition-colors hover:text-navy ${isActive('/connect') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}
            >
              Connect
            </Link>

            {/* Service Dropdown */}
            <div
              className="relative group"
            >
              <button className="flex items-center space-x-1 font-medium text-foreground hover:text-navy transition-colors">
                <span>Service</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
                <Link
                  to="/service/transcript"
                  className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-navy transition-colors"
                >
                  Transcript
                </Link>
              </div>
            </div>

            {/* Login / Logout */}
            {isLoggedIn && user ? (
              <div className="relative">
                <button
                  onClick={() => setHoveredItem(prev => (prev === "user" ? null : "user"))}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white font-semibold"
                >
                  {`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`}
                </button>

                {hoveredItem === "user" && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-border py-2 z-50">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-navy transition-colors"
                      onClick={() => setHoveredItem(null)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-foreground hover:bg-secondary hover:text-navy transition-colors"
                      onClick={() => setHoveredItem(null)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setHoveredItem(null);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      Logout
                    </button>

                  </div>
                )}
              </div>
            ) : (
              <Button variant="hero" asChild>
                <Link to="/login">Login</Link>
              </Button>
            )}



          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;