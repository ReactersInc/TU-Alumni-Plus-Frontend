import { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/Button";
import { ChevronDown, Plus, Menu, X } from "lucide-react";
import { AuthContext } from "../pages/context/AuthContext";

const Navigation = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, user } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleMobileClick = () => {
    setMobileOpen(false);
  };

  // ✅ Auto close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

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
    <>
      {/* 🔥 BACKDROP (when mobile menu open) */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 border-b border-white/20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">

          <div className="flex items-center justify-between">

            {/* 🔵 LEFT: LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/tulogo.png" className="h-10 w-10 rounded-full" />
              <span className="flex items-center text-lg font-semibold text-navy">
                TU Alumni
                <Plus className="h-5 w-5 ml-1" />
              </span>
            </Link>

            {/* 🟢 CENTER: NAV */}
            <div className="hidden md:flex items-center gap-8">

              <Link to="/" className={isActive("/") ? "text-navy font-semibold" : "text-gray-600"}>
                Home
              </Link>

              <Link to="/about" className={isActive("/about") ? "text-navy font-semibold" : "text-gray-600"}>
                About
              </Link>

              <Link to="/alumni-family" className={isActive("/alumni-family") ? "text-navy font-semibold" : "text-gray-600"}>
                Alumni
              </Link>

              <div className="h-5 w-px bg-gray-300"></div>

              {/* GiveBack */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-navy">
                  GiveBack <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  {giveBackItems.map(item => (
                    <Link key={item.name} to={item.href} className="block px-4 py-2 hover:bg-gray-100">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Events */}
              <div className="relative group">
                <button className="flex items-center gap-1 text-gray-600 hover:text-navy">
                  Events <ChevronDown size={16} />
                </button>
                <div className="absolute top-full left-0 mt-3 w-56 bg-white rounded-xl shadow-lg border py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  {eventsItems.map(item => (
                    <Link key={item.name} to={item.href} className="block px-4 py-2 hover:bg-gray-100">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-5 w-px bg-gray-300"></div>

              <Link to="/gallery">Gallery</Link>
              <Link to="/blog">Blog</Link>
              <Link to="/connect">Connect</Link>
            </div>

            {/* 🔴 RIGHT: ACTIONS */}
            <div className="hidden md:flex items-center gap-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                >
                  Logout
                </button>
              ) : (
                <Button variant="hero" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>

            {/* 📱 MOBILE BUTTON */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>

          </div>

          {/* 📱 MOBILE MENU */}
          <div
            className={`md:hidden transition-all duration-300 ${
              mobileOpen ? "max-h-[600px] mt-4" : "max-h-0 overflow-hidden"
            }`}
          >
            <div className="bg-white rounded-2xl shadow-xl border p-4 flex flex-col gap-3 relative z-50">

              <p className="font-semibold text-navy">Main</p>
              <Link to="/" onClick={handleMobileClick}>Home</Link>
              <Link to="/about" onClick={handleMobileClick}>About</Link>
              <Link to="/alumni-family" onClick={handleMobileClick}>Alumni</Link>

              <hr />

              <p className="font-semibold text-navy">GiveBack</p>
              {giveBackItems.map(item => (
                <Link key={item.name} to={item.href} onClick={handleMobileClick}>
                  {item.name}
                </Link>
              ))}

              <hr />

              <p className="font-semibold text-navy">Events</p>
              {eventsItems.map(item => (
                <Link key={item.name} to={item.href} onClick={handleMobileClick}>
                  {item.name}
                </Link>
              ))}

              <hr />

              <p className="font-semibold text-navy">Explore</p>
              <Link to="/gallery" onClick={handleMobileClick}>Gallery</Link>
              <Link to="/blog" onClick={handleMobileClick}>Blog</Link>
              <Link to="/connect" onClick={handleMobileClick}>Connect</Link>

              <hr />

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    handleMobileClick();
                  }}
                  className="text-red-600 text-left"
                >
                  Logout
                </button>
              ) : (
                <Link to="/login" onClick={handleMobileClick}>Login</Link>
              )}

            </div>
          </div>

        </div>
      </nav>
    </>
  );
};

export default Navigation;