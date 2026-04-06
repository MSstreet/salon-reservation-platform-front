import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { Scissors, Calendar, Home, MapPin, LogIn, LogOut, Menu, X } from "lucide-react";

const navItems = [
  { to: "/", icon: Home, label: "홈", exact: true },
  { to: "/salons", icon: MapPin, label: "미용실" },
  { to: "/my-bookings", icon: Calendar, label: "예약 내역" },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("accessToken"));

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const linkClass = (path: string, exact?: boolean) =>
    `flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
      isActive(path, exact)
        ? "text-rose-600 bg-rose-50"
        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-rose-500" />
            <span className="text-xl font-semibold text-gray-900">미용실 예약</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-1">
            {navItems.map(({ to, icon: Icon, label, exact }) => (
              <Link key={to} to={to} className={linkClass(to, exact)}>
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Link>
            ))}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                <LogOut className="w-4 h-4" />
                <span>로그아웃</span>
              </button>
            ) : (
              <Link to="/login" className={linkClass("/login")}>
                <LogIn className="w-4 h-4" />
                <span>로그인</span>
              </Link>
            )}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:bg-gray-50"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="메뉴"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label, exact }) => (
            <Link
              key={to}
              to={to}
              className={linkClass(to, exact)}
              onClick={() => setMenuOpen(false)}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Link>
          ))}
          {isLoggedIn ? (
            <button
              onClick={() => { setMenuOpen(false); handleLogout(); }}
              className="flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-50 w-full"
            >
              <LogOut className="w-4 h-4" />
              <span>로그아웃</span>
            </button>
          ) : (
            <Link to="/login" className={linkClass("/login")} onClick={() => setMenuOpen(false)}>
              <LogIn className="w-4 h-4" />
              <span>로그인</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}