import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Calendar, Clock, User, Scissors, Loader2, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import {
  reservationsApi,
  Reservation,
  getReservationRefs,
  removeReservationRef,
} from "../api/reservations";

const STATUS_LABEL: Record<string, string> = {
  REQUESTED: "예약 요청",
  CONFIRMED: "예약 확정",
  COMPLETED: "완료",
  CANCELLED: "취소됨",
  NO_SHOW: "노쇼",
};

const STATUS_COLOR: Record<string, string> = {
  REQUESTED: "bg-yellow-50 text-yellow-700 border-yellow-200",
  CONFIRMED: "bg-blue-50 text-blue-700 border-blue-200",
  COMPLETED: "bg-green-50 text-green-700 border-green-200",
  CANCELLED: "bg-gray-50 text-gray-500 border-gray-200",
  NO_SHOW: "bg-red-50 text-red-600 border-red-200",
};

export default function MyBookings() {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const isLoggedIn = !!localStorage.getItem("accessToken");

  useEffect(() => {
    if (!isLoggedIn) return;
    loadReservations();
  }, []);

  const loadReservations = async () => {
    setLoading(true);
    const refs = getReservationRefs();
    if (refs.length === 0) {
      setLoading(false);
      return;
    }

    const results = await Promise.allSettled(
      refs.map((ref) => reservationsApi.getById(ref.storeId, ref.reservationId))
    );

    const loaded = results
      .filter((r): r is PromiseFulfilledResult<Reservation> => r.status === "fulfilled")
      .map((r) => r.value)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    setReservations(loaded);
    setLoading(false);
  };

  const handleCancel = async (reservation: Reservation) => {
    try {
      await reservationsApi.cancel(reservation.storeId, reservation.id, "고객 취소");
      removeReservationRef(reservation.id);
      setReservations((prev) =>
        prev.map((r) =>
          r.id === reservation.id ? { ...r, status: "CANCELLED" } : r
        )
      );
      toast.success("예약이 취소되었습니다");
    } catch {
      toast.error("예약 취소에 실패했습니다");
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Calendar className="w-24 h-24 text-gray-300" />
          <p className="text-xl font-semibold text-gray-700">로그인이 필요합니다</p>
          <p className="text-gray-500">예약 내역을 확인하려면 먼저 로그인해주세요</p>
          <Button onClick={() => navigate("/login")} className="mt-2 bg-rose-600 hover:bg-rose-700">
            로그인하기
          </Button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Toaster />
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">예약 내역</h1>
          <p className="text-gray-600 text-lg">현재 예약 내역이 없습니다</p>
        </div>
        <div className="flex flex-col items-center justify-center py-16">
          <Calendar className="w-24 h-24 text-gray-300 mb-4" />
          <p className="text-gray-500 mb-6">아직 예약하신 내역이 없습니다</p>
          <Button asChild className="bg-rose-600 hover:bg-rose-700">
            <Link to="/salons">미용실 목록 보기</Link>
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
        <p className="text-gray-600 text-lg">총 {reservations.length}개의 예약이 있습니다</p>
      </div>

      <div className="space-y-4">
        {reservations.map((r) => (
          <Card key={r.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start flex-wrap gap-2">
                <CardTitle className="flex items-center gap-2">
                  <Scissors className="w-5 h-5 text-rose-600" />
                  {r.menuName}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2 py-1 rounded-full border font-medium ${STATUS_COLOR[r.status] ?? ""}`}
                  >
                    {STATUS_LABEL[r.status] ?? r.status}
                  </span>
                  {(r.status === "REQUESTED" || r.status === "CONFIRMED") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCancel(r)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      취소
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 md:col-span-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">매장</p>
                    <p className="font-semibold">매장 #{r.storeId}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">디자이너</p>
                    <p className="font-semibold">{r.staffName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">예약자</p>
                    <p className="font-semibold">{r.customerName}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">날짜</p>
                    <p className="font-semibold">
                      {new Date(r.startAt).toLocaleDateString("ko-KR")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">시간</p>
                    <p className="font-semibold">
                      {new Date(r.startAt).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                      {" ~ "}
                      {new Date(r.endAt).toLocaleTimeString("ko-KR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <p className="text-xs text-gray-500">
                  예약일시: {new Date(r.createdAt).toLocaleString("ko-KR")}
                </p>
                {r.depositId && (
                  <Badge variant="secondary" className="text-xs">
                    예약금 #{r.depositId}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
