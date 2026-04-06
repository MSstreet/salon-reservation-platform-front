import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Calendar, User, Scissors, Check, MapPin, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";
import { storesApi, Store } from "../api/stores";
import { designersApi, Designer, Menu } from "../api/designers";
import { timeSlotsApi, TimeSlot } from "../api/timeSlots";
import { reservationsApi, saveReservationRef } from "../api/reservations";
import { paymentsApi } from "../api/payments";
import CalendarPicker from "../components/CalendarPicker";

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 데이터
  const [stores, setStores] = useState<Store[]>([]);
  const [designers, setDesigners] = useState<Designer[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // 선택값
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);
  const [selectedDesignerId, setSelectedDesignerId] = useState<number | null>(null);
  const [selectedMenuId, setSelectedMenuId] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlotId, setSelectedSlotId] = useState<number | null>(null);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  // 로딩 상태
  const [loadingStores, setLoadingStores] = useState(true);
  const [loadingDesigners, setLoadingDesigners] = useState(false);
  const [loadingMenus, setLoadingMenus] = useState(false);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // 매장 목록 로드
  useEffect(() => {
    storesApi.getAll()
      .then((data) => {
        setStores(data);
        const paramStoreId = searchParams.get("storeId");
        if (paramStoreId) {
          const id = Number(paramStoreId);
          if (data.find((s) => s.id === id)) setSelectedStoreId(id);
        }
      })
      .catch(() => toast.error("매장 목록을 불러오지 못했습니다"))
      .finally(() => setLoadingStores(false));
  }, []);

  // 매장 선택 시 디자이너 로드
  useEffect(() => {
    if (!selectedStoreId) return;
    setDesigners([]);
    setSelectedDesignerId(null);
    setMenus([]);
    setSelectedMenuId(null);
    setTimeSlots([]);
    setSelectedSlotId(null);

    setLoadingDesigners(true);
    designersApi.getByStore(selectedStoreId)
      .then(setDesigners)
      .catch(() => toast.error("디자이너 목록을 불러오지 못했습니다"))
      .finally(() => setLoadingDesigners(false));
  }, [selectedStoreId]);

  // 디자이너 선택 시 메뉴 로드
  useEffect(() => {
    if (!selectedStoreId || !selectedDesignerId) return;
    setMenus([]);
    setSelectedMenuId(null);
    setTimeSlots([]);
    setSelectedSlotId(null);

    setLoadingMenus(true);
    designersApi.getMenus(selectedStoreId, selectedDesignerId)
      .then(setMenus)
      .catch(() => toast.error("메뉴를 불러오지 못했습니다"))
      .finally(() => setLoadingMenus(false));
  }, [selectedDesignerId]);

  // 날짜 또는 메뉴 변경 시 타임슬롯 로드
  useEffect(() => {
    if (!selectedStoreId || !selectedDesignerId || !selectedDate) return;
    setTimeSlots([]);
    setSelectedSlotId(null);

    setLoadingSlots(true);
    timeSlotsApi.getAvailable(selectedStoreId, {
      date: selectedDate,
      staffId: selectedDesignerId as number,
      menuId: selectedMenuId ?? undefined,
      status: "OPEN",
    })
      .then(slots => setTimeSlots([...slots].sort((a, b) => a.startAt.localeCompare(b.startAt))))
      .catch(() => toast.error("예약 가능 시간을 불러오지 못했습니다"))
      .finally(() => setLoadingSlots(false));
  }, [selectedDate, selectedMenuId, selectedDesignerId]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (!selectedStoreId || !selectedDesignerId || !selectedMenuId || !selectedSlotId) {
      toast.error("매장, 디자이너, 메뉴, 시간을 모두 선택해주세요");
      return;
    }
    if (!customerName || !customerPhone) {
      toast.error("고객 정보를 입력해주세요");
      return;
    }

    setSubmitting(true);
    try {
      // 예약 생성
      const reservation = await reservationsApi.create(selectedStoreId, {
        staffId: selectedDesignerId,
        menuId: selectedMenuId,
        slotId: selectedSlotId,
        customerName,
        customerPhone,
      });

      // 예약 참조 저장
      saveReservationRef({ storeId: selectedStoreId, reservationId: reservation.id });

      // 예약금 결제
      if (reservation.depositId) {
        await paymentsApi.payDeposit(reservation.depositId, `pg-${Date.now()}`);
      }

      toast.success("예약이 완료되었습니다!", {
        description: `${selectedDate} 예약이 확정되었습니다.`,
      });

      setTimeout(() => navigate("/my-bookings"), 1500);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "예약에 실패했습니다";
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Toaster />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">예약하기</h1>
        <p className="text-gray-600 text-lg">원하시는 서비스와 시간을 선택해주세요</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ① 매장 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              매장 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loadingStores ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stores.map((store) => (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedStoreId === store.id
                        ? "border-rose-500 bg-rose-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{store.name}</h3>
                        <p className="text-sm text-gray-500">{store.address}</p>
                      </div>
                      {selectedStoreId === store.id && (
                        <Check className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* ② 디자이너 선택 */}
        {selectedStoreId && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                디자이너 선택
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingDesigners ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                </div>
              ) : designers.length === 0 ? (
                <p className="text-gray-500 text-center py-4">등록된 디자이너가 없습니다</p>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {designers.map((designer) => (
                    <div
                      key={designer.staffId}
                      onClick={() => setSelectedDesignerId(designer.staffId)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDesignerId === designer.staffId
                          ? "border-rose-500 bg-rose-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="relative">
                          {designer.profileImageUrl ? (
                            <img
                              src={designer.profileImageUrl}
                              alt={designer.name}
                              className="w-20 h-20 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                              <User className="w-8 h-8 text-gray-400" />
                            </div>
                          )}
                          {selectedDesignerId === designer.staffId && (
                            <div className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 rounded-full flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-sm">{designer.name}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ③ 메뉴 선택 */}
        {selectedDesignerId && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scissors className="w-5 h-5" />
                메뉴 선택
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loadingMenus ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-rose-500" />
                </div>
              ) : menus.length === 0 ? (
                <p className="text-gray-500 text-center py-4">등록된 메뉴가 없습니다</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {menus.map((menu) => (
                    <div
                      key={menu.menuId}
                      onClick={() => setSelectedMenuId(menu.menuId)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedMenuId === menu.menuId
                          ? "border-rose-500 bg-rose-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{menu.menuName}</h3>
                          <p className="text-sm text-gray-500">{menu.durationMin}분</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-rose-600">
                            {menu.price.toLocaleString()}원
                          </p>
                          {selectedMenuId === menu.menuId && (
                            <Check className="w-5 h-5 text-rose-600 ml-auto mt-1" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ④ 날짜 및 타임슬롯 선택 */}
        {selectedDesignerId && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                날짜 및 시간 선택
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <CalendarPicker value={selectedDate} onChange={setSelectedDate} />
              </div>

              {selectedDate && (
                <div>
                  <Label>예약 가능 시간</Label>
                  {loadingSlots ? (
                    <div className="flex justify-center py-4">
                      <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
                    </div>
                  ) : timeSlots.length === 0 ? (
                    <p className="text-gray-500 text-sm mt-2">
                      선택한 날짜에 예약 가능한 시간이 없습니다
                    </p>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 mt-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlotId(slot.id)}
                          className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                            selectedSlotId === slot.id
                              ? "border-rose-500 bg-rose-500 text-white"
                              : "border-gray-200 hover:border-rose-300 hover:bg-rose-50"
                          }`}
                        >
                          {new Date(slot.startAt).toLocaleTimeString("ko-KR", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* ⑤ 고객 정보 */}
        {selectedSlotId && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                고객 정보
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">이름</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="홍길동"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="phone">전화번호</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="01012345678"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {selectedSlotId && (
          <Button
            type="submit"
            size="lg"
            disabled={submitting}
            className="w-full bg-rose-600 hover:bg-rose-700 text-lg py-6"
          >
            {submitting ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <Check className="w-5 h-5 mr-2" />
            )}
            {submitting ? "예약 처리 중..." : "예약 완료하기"}
          </Button>
        )}
      </form>
    </div>
  );
}
