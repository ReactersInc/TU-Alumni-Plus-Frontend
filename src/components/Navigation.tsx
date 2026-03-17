import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/Button";
import { ChevronDown, GraduationCap, Plus } from "lucide-react";
import { AuthContext } from "../pages/context/AuthContext";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const location = useLocation();
  const { isLoggedIn, user, setIsLoggedIn, setUser } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState(false);

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
    <div className="container mx-auto px-4 md:px-6 py-4">

      {/* TOP BAR */}
      <div className="flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <img
            src="/tulogo.png"
            alt="TU Logo"
            className="h-10 w-10 md:h-12 md:w-12 ml-2 object-contain rounded-full"
          />
          <span className="flex items-center text-lg md:text-xl font-bold text-navy">
            TU Alumni
            <Plus className="h-6 w-6 md:h-7 md:w-7 ml-1 text-navy group-hover:text-gold transition-colors" />
          </span>
        </Link>

        {/* ✅ Mobile Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">

          {/* ALL YOUR EXISTING CODE (UNCHANGED) */}
          {/* Home */}
          <Link to="/" className={`font-medium transition-colors hover:text-navy ${isActive('/') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}>
            Home
          </Link>

          <Link to="/about" className={`font-medium transition-colors hover:text-navy ${isActive('/about') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}>
            About
          </Link>

          <Link to="/alumni-family" className={`font-medium transition-colors hover:text-navy ${isActive('/alumni-family') ? 'text-navy border-b-2 border-navy' : 'text-foreground'}`}>
            Alumni Family
          </Link>

          {/* GiveBack */}
          <div className="relative group">
            <button className="flex items-center space-x-1 font-medium text-foreground hover:text-navy transition-colors">
              <span>GiveBack</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {giveBackItems.map(item => (
                <Link key={item.name} to={item.href} className="block px-4 py-2 hover:bg-secondary">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="relative group">
            <button className="flex items-center space-x-1 font-medium text-foreground hover:text-navy transition-colors">
              <span>Events</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              {eventsItems.map(item => (
                <Link key={item.name} to={item.href} className="block px-4 py-2 hover:bg-secondary">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <Link to="/gallery">Gallery</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/connect">Connect</Link>

          {/* Service */}
          <div className="relative group">
            <button className="flex items-center space-x-1 font-medium text-foreground hover:text-navy">
              Service <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible">
              <Link to="/service/transcript" className="block px-4 py-2 hover:bg-secondary">
                Transcript
              </Link>
            </div>
          </div>

          {/* Auth */}
          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setHoveredItem(prev => (prev === "user" ? null : "user"))}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-navy text-white"
              >
                {`${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`}
              </button>

              {hoveredItem === "user" && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border py-2">
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-secondary">Dashboard</Link>
                  <Link to="/settings" className="block px-4 py-2 hover:bg-secondary">Settings</Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50">
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

      {/* ✅ MOBILE MENU (NEW) */}
      {mobileOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white border-t pt-4 px-2">

          <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link to="/alumni-family" onClick={() => setMobileOpen(false)}>Alumni Family</Link>

          <div>
            <p className="font-semibold text-navy">GiveBack</p>
            {giveBackItems.map(item => (
              <Link key={item.name} to={item.href} className="block pl-3 py-1">
                {item.name}
              </Link>
            ))}
          </div>

          <div>
            <p className="font-semibold text-navy">Events</p>
            {eventsItems.map(item => (
              <Link key={item.name} to={item.href} className="block pl-3 py-1">
                {item.name}
              </Link>
            ))}
          </div>

          <Link to="/gallery">Gallery</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/connect">Connect</Link>

          <Link to="/service/transcript">Service - Transcript</Link>

          {isLoggedIn ? (
            <button onClick={handleLogout} className="text-left text-red-600">
              Logout
            </button>
          ) : (
            <Link to="/login">Login</Link>
          )}

        </div>
      )}

    </div>
  </nav>
);
};

export default Navigation;