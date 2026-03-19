import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Calendar, User, Scissors, Check, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner";

const services = [
  { id: "haircut", name: "헤어컷", duration: "40분", price: "30,000원" },
  { id: "coloring", name: "헤어 염색", duration: "90분", price: "80,000원" },
  { id: "perm", name: "펌", duration: "120분", price: "100,000원" },
  { id: "treatment", name: "트리트먼트", duration: "30분", price: "40,000원" },
  { id: "shampoo", name: "샴푸 & 블로우", duration: "30분", price: "20,000원" },
  { id: "clinic", name: "헤어 클리닉", duration: "60분", price: "60,000원" },
];

const salons = [
  { id: "gangnam", name: "강남 프리미엄 헤어", address: "서울시 강남구 강남대로 123" },
  { id: "hongdae", name: "홍대 모던 살롱", address: "서울시 마포구 홍익로 45" },
  { id: "itaewon", name: "이태원 글로벌 헤어", address: "서울시 용산구 이태원로 78" },
  { id: "jamsil", name: "잠실 패밀리 헤어", address: "서울시 송파구 올림픽로 234" },
];

const stylists = [
  {
    id: "kim",
    name: "김민지",
    specialty: "커트 & 펌 전문",
    experience: "10년차",
    image: "https://images.unsplash.com/photo-1737063935340-f9af0940c4c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyc3R5bGlzdCUyMHdvbWFufGVufDF8fHx8MTc3MzEzMzUzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "lee",
    name: "이준호",
    specialty: "염색 & 클리닉 전문",
    experience: "8년차",
    image: "https://images.unsplash.com/photo-1646825209987-6be8fe5f7403?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoYWlyc3R5bGlzdCUyMG1hbnxlbnwxfHx8fDE3NzMwODI3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
  {
    id: "park",
    name: "박서연",
    specialty: "올라운더",
    experience: "12년차",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWF1dHklMjBzYWxvbiUyMHN0eWxpc3R8ZW58MXx8fHwxNzczMTQ1MTk0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  },
];

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00", "19:00", "20:00",
];

export default function Booking() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [selectedSalon, setSelectedSalon] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedStylist, setSelectedStylist] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    const salonParam = searchParams.get("salon");
    if (salonParam) {
      setSelectedSalon(salonParam);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedSalon || !selectedService || !selectedStylist || !selectedDate || !selectedTime || !customerName || !customerPhone) {
      toast.error("모든 필드를 입력해주세요");
      return;
    }

    // 예약 정보를 로컬 스토리지에 저장
    const booking = {
      id: Date.now().toString(),
      salon: salons.find(s => s.id === selectedSalon)?.name,
      salonAddress: salons.find(s => s.id === selectedSalon)?.address,
      service: services.find(s => s.id === selectedService)?.name,
      stylist: stylists.find(s => s.id === selectedStylist)?.name,
      date: selectedDate,
      time: selectedTime,
      customerName,
      customerPhone,
      createdAt: new Date().toISOString(),
    };

    const existingBookings = JSON.parse(localStorage.getItem("bookings") || "[]");
    localStorage.setItem("bookings", JSON.stringify([...existingBookings, booking]));

    toast.success("예약이 완료되었습니다!", {
      description: `${selectedDate} ${selectedTime}에 뵙겠습니다.`,
    });

    setTimeout(() => {
      navigate("/my-bookings");
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Toaster />
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">예약하기</h1>
        <p className="text-gray-600 text-lg">
          원하시는 서비스와 시간을 선택해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* 미용실 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              미용실 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {salons.map((salon) => (
                <div
                  key={salon.id}
                  onClick={() => setSelectedSalon(salon.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedSalon === salon.id
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{salon.name}</h3>
                      <p className="text-sm text-gray-500">{salon.address}</p>
                    </div>
                    {selectedSalon === salon.id && (
                      <Check className="w-5 h-5 text-rose-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 서비스 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scissors className="w-5 h-5" />
              서비스 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedService === service.id
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-rose-600">{service.price}</p>
                      {selectedService === service.id && (
                        <Check className="w-5 h-5 text-rose-600 ml-auto mt-1" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 스타일리스트 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              스타일리스트 선택
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stylists.map((stylist) => (
                <div
                  key={stylist.id}
                  onClick={() => setSelectedStylist(stylist.id)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all ${
                    selectedStylist === stylist.id
                      ? "border-rose-500 bg-rose-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="relative h-48 rounded-lg overflow-hidden mb-3">
                    <ImageWithFallback
                      src={stylist.image}
                      alt={stylist.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedStylist === stylist.id && (
                      <div className="absolute top-2 right-2 bg-rose-600 rounded-full p-1">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                  <h3 className="font-semibold">{stylist.name}</h3>
                  <p className="text-sm text-gray-600">{stylist.specialty}</p>
                  <p className="text-xs text-gray-500 mt-1">{stylist.experience}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 날짜 및 시간 선택 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              날짜 및 시간 선택
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date">날짜</Label>
              <Input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="time">시간</Label>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="시간을 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 고객 정보 */}
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
                placeholder="010-1234-5678"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="mt-2"
              />
            </div>
          </CardContent>
        </Card>

        <Button type="submit" size="lg" className="w-full bg-rose-600 hover:bg-rose-700 text-lg py-6">
          <Check className="w-5 h-5 mr-2" />
          예약 완료하기
        </Button>
      </form>
    </div>
  );
}