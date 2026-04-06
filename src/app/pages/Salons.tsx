import { useState, useEffect } from "react";
import { Link } from "react-router";
import { MapPin, Clock, Phone, Calendar, Loader2, Search } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { storesApi, Store } from "../api/stores";

export default function Salons() {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    storesApi.getAll()
      .then(setStores)
      .catch(() => setError("매장 목록을 불러오지 못했습니다."))
      .finally(() => setLoading(false));
  }, []);

  const filtered = stores.filter(
    (s) =>
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.address?.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-2xl px-5 py-3 shadow-sm mb-8 max-w-lg mx-auto">
        <Search className="w-5 h-5 text-rose-400 flex-shrink-0" />
        <input
          type="text"
          placeholder="매장명 또는 주소로 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-400 text-sm"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-gray-300 hover:text-gray-500 text-lg leading-none">×</button>
        )}
      </div>

      {loading && (
        <div className="flex justify-center py-24">
          <Loader2 className="w-8 h-8 animate-spin text-rose-500" />
        </div>
      )}

      {error && (
        <div className="text-center py-24 text-gray-500">{error}</div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-24 text-gray-500">
          {query ? `"${query}"에 해당하는 매장이 없습니다.` : "등록된 매장이 없습니다."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((store) => (
          <Card key={store.id} className="hover:shadow-xl transition-shadow overflow-hidden">
            <CardHeader>
              <CardTitle>{store.name}</CardTitle>
              {store.description && (
                <p className="text-gray-600 text-sm">{store.description}</p>
              )}
            </CardHeader>

            <CardContent className="space-y-3">
              {store.address && (
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700 flex-1">{store.address}</span>
                  <a
                    href={`https://map.naver.com/search/${encodeURIComponent(store.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-rose-600 border border-rose-300 rounded px-2 py-0.5 hover:bg-rose-50 flex-shrink-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    길찾기
                  </a>
                </div>
              )}

              {store.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">{store.phone}</span>
                </div>
              )}

              {store.businessHours && (
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-500 flex-shrink-0" />
                  <span className="text-gray-700">영업시간: {store.businessHours}</span>
                </div>
              )}
            </CardContent>

            <CardFooter>
              <Link to={`/booking?storeId=${store.id}`} className="flex-1">
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
