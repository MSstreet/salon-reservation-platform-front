import { Link } from "react-router";
import { Calendar, Scissors, Star, Clock, MapPin } from "lucide-react";
import { Button } from "../components/ui/button";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[500px] flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl font-bold mb-4">당신의 스타일을 완성하세요</h1>
          <p className="text-xl mb-8">전문 스타일리스트가 함께하는 프리미엄 미용 서비스</p>
          <Link to="/booking">
            <Button size="lg" className="bg-white text-rose-600 hover:bg-gray-100 text-lg px-8 py-6">
              <Calendar className="w-5 h-5 mr-2" />
              지금 예약하기
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
              <MapPin className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">다양한 위치</h3>
            <p className="text-gray-600">
              서울 전역의 다양한 미용실 중 선택하세요
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
              <Scissors className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">전문 스타일리스트</h3>
            <p className="text-gray-600">
              경험이 풍부한 전문가들이 당신만의 스타일을 찾아드립니다
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
              <Star className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">프리미엄 서비스</h3>
            <p className="text-gray-600">
              고급 제품과 최신 기술로 최상의 결과를 제공합니다
            </p>
          </div>

          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-4">
              <Clock className="w-8 h-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">편리한 예약</h3>
            <p className="text-gray-600">
              온라인으로 간편하게 원하는 시간에 예약하세요
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">우리 미용실</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyJTIwc2Fsb24lMjBpbnRlcmlvciUyMG1vZGVybnxlbnwxfHx8fDE3NzMxMzI5Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="미용실 인테리어"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1541533848490-bc8115cd6522?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWlyc3R5bGlzdCUyMGN1dHRpbmclMjBoYWlyfGVufDF8fHx8MTc3MzE0MzYwOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="헤어 스타일링"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-64 rounded-lg overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1769029271977-6402c95daff2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGdldHRpbmclMjBoYWlyY3V0fGVufDF8fHx8MTc3MzA4OTAwMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="헤어컷 서비스"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">지금 바로 예약하세요</h2>
        <p className="text-gray-600 mb-8 text-lg">
          새로운 스타일로 당신의 매력을 발견하세요
        </p>
        <div className="flex gap-4 justify-center">
          <Link to="/salons">
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-rose-600 text-rose-600 hover:bg-rose-50">
              <MapPin className="w-5 h-5 mr-2" />
              미용실 보기
            </Button>
          </Link>
          <Link to="/booking">
            <Button size="lg" className="bg-rose-600 hover:bg-rose-700 text-white text-lg px-8 py-6">
              <Calendar className="w-5 h-5 mr-2" />
              바로 예약하기
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}