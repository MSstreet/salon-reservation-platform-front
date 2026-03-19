import { Link, useLocation } from "react-router";
import { Scissors, Calendar, List, Home, MapPin } from "lucide-react";

export default function Header() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <Scissors className="w-8 h-8 text-rose-500" />
            <span className="text-xl font-semibold text-gray-900">미용실 예약</span>
          </Link>

          <nav className="flex gap-6">
            <Link
              to="/"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/") && location.pathname === "/"
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Home className="w-4 h-4" />
              <span>홈</span>
            </Link>
            <Link
              to="/salons"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/salons")
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>미용실</span>
            </Link>
            <Link
              to="/services"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/services")
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <List className="w-4 h-4" />
              <span>서비스</span>
            </Link>
            <Link
              to="/booking"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/booking")
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>예약하기</span>
            </Link>
            <Link
              to="/my-bookings"
              className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                isActive("/my-bookings")
                  ? "text-rose-600 bg-rose-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>예약 내역</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}