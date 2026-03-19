import { Link } from "react-router";
import { Scissors, Droplet, Sparkles, Palette } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";

const services = [
  {
    id: 1,
    icon: Scissors,
    name: "헤어컷",
    description: "전문 스타일리스트가 당신에게 어울리는 스타일을 제안하고 완성합니다",
    duration: "40분",
    price: "30,000원",
  },
  {
    id: 2,
    icon: Palette,
    name: "헤어 염색",
    description: "다양한 컬러와 최신 트렌드를 반영한 염색 서비스",
    duration: "90분",
    price: "80,000원",
  },
  {
    id: 3,
    icon: Droplet,
    name: "펌",
    description: "자연스러운 웨이브부터 볼륨 펌까지 다양한 스타일",
    duration: "120분",
    price: "100,000원",
  },
  {
    id: 4,
    icon: Sparkles,
    name: "트리트먼트",
    description: "손상된 모발을 케어하는 프리미엄 트리트먼트",
    duration: "30분",
    price: "40,000원",
  },
  {
    id: 5,
    icon: Scissors,
    name: "샴푸 & 블로우",
    description: "깨끗한 두피와 볼륨있는 스타일링",
    duration: "30분",
    price: "20,000원",
  },
  {
    id: 6,
    icon: Sparkles,
    name: "헤어 클리닉",
    description: "두피와 모발을 위한 집중 케어 프로그램",
    duration: "60분",
    price: "60,000원",
  },
];

export default function Services() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">서비스 안내</h1>
        <p className="text-gray-600 text-lg">
          다양한 헤어 서비스로 당신의 아름다움을 완성하세요
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => {
          const Icon = service.icon;
          return (
            <Card key={service.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-rose-100 mb-4">
                  <Icon className="w-6 h-6 text-rose-600" />
                </div>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">소요 시간</p>
                    <p className="font-semibold">{service.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">가격</p>
                    <p className="font-semibold text-rose-600">{service.price}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Link to="/booking" className="w-full">
                  <Button className="w-full bg-rose-600 hover:bg-rose-700">
                    예약하기
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
