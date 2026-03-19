import { useState, useEffect } from "react";
import { Calendar, Clock, User, Scissors, Trash2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

interface Booking {
  id: string;
  salon?: string;
  salonAddress?: string;
  service: string;
  stylist: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
  createdAt: string;
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = () => {
    const storedBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    // 최신 순으로 정렬
    const sortedBookings = storedBookings.sort((a: Booking, b: Booking) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    setBookings(sortedBookings);
  };

  const handleDeleteBooking = (id: string) => {
    const updatedBookings = bookings.filter((booking) => booking.id !== id);
    localStorage.setItem("bookings", JSON.stringify(updatedBookings));
    setBookings(updatedBookings);
    toast.success("예약이 취소되었습니다");
  };

  if (bookings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Toaster />
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">예약 내역</h1>
          <p className="text-gray-600 text-lg">
            현재 예약 내역이 없습니다
          </p>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <Calendar className="w-24 h-24 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-6">아직 예약하신 내역이 없습니다</p>
          <Button asChild className="bg-rose-600 hover:bg-rose-700">
            <a href="/booking">지금 예약하기</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Toaster />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">예약 내역</h1>
        <p className="text-gray-600 text-lg">
          총 {bookings.length}개의 예약이 있습니다
        </p>
      </div>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <Card key={booking.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-rose-600" />
                  {booking.service}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteBooking(booking.id)}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  취소
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {booking.salon && (
                  <div className="flex items-center gap-2 md:col-span-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-500">미용실</p>
                      <p className="font-semibold">{booking.salon}</p>
                      {booking.salonAddress && (
                        <p className="text-xs text-gray-500">{booking.salonAddress}</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">스타일리스트</p>
                    <p className="font-semibold">{booking.stylist}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">예약자</p>
                    <p className="font-semibold">{booking.customerName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">날짜</p>
                    <p className="font-semibold">{booking.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">시간</p>
                    <p className="font-semibold">{booking.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:col-span-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">연락처</p>
                    <p className="font-semibold">{booking.customerPhone}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  예약일시: {new Date(booking.createdAt).toLocaleString('ko-KR')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}