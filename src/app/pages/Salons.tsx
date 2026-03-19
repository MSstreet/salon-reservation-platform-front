import { Link } from "react-router";
import { MapPin, Star, Clock, Phone, Calendar } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const salons = [
  {
    id: "gangnam",
    name: "강남 프리미엄 헤어",
    description: "최고급 서비스와 최신 트렌드를 선도하는 프리미엄 미용실",
    image: "https://images.unsplash.com/photo-1760243875237-3f8baa774a8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBoYWlyJTIwc2Fsb24lMjBzdG9yZWZyb250fGVufDF8fHx8MTc3MzE0NTM3Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "서울시 강남구 강남대로 123",
    phone: "02-1234-5678",
    rating: 4.9,
    reviewCount: 248,
    hours: "10:00 - 21:00",
    tags: ["프리미엄", "최신 트렌드", "전문가"],
  },
  {
    id: "hongdae",
    name: "홍대 모던 살롱",
    description: "젊고 트렌디한 스타일링과 합리적인 가격의 미용실",
    image: "https://images.unsplash.com/photo-1759142235060-3191ee596c81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiZWF1dHklMjBzYWxvbiUyMGludGVyaW9yfGVufDF8fHx8MTc3MzA2ODIyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "서울시 마포구 홍익로 45",
    phone: "02-2345-6789",
    rating: 4.7,
    reviewCount: 189,
    hours: "11:00 - 22:00",
    tags: ["트렌디", "합리적", "젊은 감각"],
  },
  {
    id: "itaewon",
    name: "이태원 글로벌 헤어",
    description: "다양한 국적의 스타일리스트가 있는 글로벌 미용실",
    image: "https://images.unsplash.com/photo-1767890024182-bfcdd858c6cc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwaGFpciUyMHNhbG9ufGVufDF8fHx8MTc3MzA1MjIyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "서울시 용산구 이태원로 78",
    phone: "02-3456-7890",
    rating: 4.8,
    reviewCount: 167,
    hours: "09:00 - 20:00",
    tags: ["글로벌", "다국어", "개성있는"],
  },
  {
    id: "jamsil",
    name: "잠실 패밀리 헤어",
    description: "가족 모두가 편안하게 이용할 수 있는 따뜻한 미용실",
    image: "https://images.unsplash.com/photo-1769646620931-1a42ce01c174?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cmJhbiUyMGhhaXIlMjBzYWxvbnxlbnwxfHx8fDE3NzMxNDUzNzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    address: "서울시 송파구 올림픽로 234",
    phone: "02-4567-8901",
    rating: 4.6,
    reviewCount: 312,
    hours: "09:30 - 20:30",
    tags: ["가족 친화적", "주차 가능", "친절"],
  },
];

export default function Salons() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">미용실 찾기</h1>
        <p className="text-gray-600 text-lg">
          가까운 곳에서 나에게 맞는 미용실을 선택하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {salons.map((salon) => (
          <Card key={salon.id} className="hover:shadow-xl transition-shadow overflow-hidden">
            <div className="relative h-56">
              <ImageWithFallback
                src={salon.image}
                alt={salon.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{salon.rating}</span>
                <span className="text-sm text-gray-500">({salon.reviewCount})</span>
              </div>
            </div>

            <CardHeader>
              <CardTitle>{salon.name}</CardTitle>
              <p className="text-gray-600 text-sm">{salon.description}</p>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{salon.address}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-700">{salon.phone}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-700">영업시간: {salon.hours}</span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {salon.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="bg-rose-50 text-rose-700 hover:bg-rose-100">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>

            <CardFooter className="gap-2">
              <Link to={`/booking?salon=${salon.id}`} className="flex-1">
                <Button className="w-full bg-rose-600 hover:bg-rose-700">
                  <Calendar className="w-4 h-4 mr-2" />
                  예약하기
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
