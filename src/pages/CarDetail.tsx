
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Car } from '@/types';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Fuel, 
  User, 
  Settings, 
  ShoppingBag,
  Shield,
  Check,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Sample car data
const allCars: Car[] = [
  {
    id: 1,
    name: 'Renault Clio',
    category: 'Ekonomik',
    fuelType: 'Benzin',
    transmission: 'Manuel',
    seats: 5,
    luggage: 2,
    pricePerDay: 350,
    imageUrl: '/cars/renault-clio.jpg'
  },
  {
    id: 2,
    name: 'Toyota Corolla',
    category: 'Orta Sınıf',
    fuelType: 'Dizel',
    transmission: 'Otomatik',
    seats: 5,
    luggage: 3,
    pricePerDay: 450,
    imageUrl: '/cars/toyota-corolla.jpg'
  },
  {
    id: 3,
    name: 'Ford Focus',
    category: 'Orta Sınıf',
    fuelType: 'Dizel',
    transmission: 'Manuel',
    seats: 5,
    luggage: 3,
    pricePerDay: 420,
    imageUrl: '/cars/ford-focus.jpg'
  },
  {
    id: 4,
    name: 'Mercedes C180',
    category: 'Lüks',
    fuelType: 'Benzin',
    transmission: 'Otomatik',
    seats: 5,
    luggage: 4,
    pricePerDay: 950,
    imageUrl: '/cars/mercedes-c.jpg'
  },
];

const hours = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

const locations = [
  "İstanbul (Atatürk Havalimanı)",
  "İstanbul (Sabiha Gökçen)",
  "Ankara (Esenboğa Havalimanı)",
  "İzmir (Adnan Menderes)",
  "Antalya Havalimanı",
];

const CarDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [mainImage, setMainImage] = useState<string>('');
  
  // Booking states
  const [location, setLocation] = useState(locations[0]);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [timeFocus, setTimeFocus] = useState<'pickup' | 'dropoff' | null>(null);

  useEffect(() => {
    // Find car by id from our static data
    const foundCar = allCars.find(c => c.id === Number(id));
    if (foundCar) {
      setCar(foundCar);
      setMainImage(foundCar.imageUrl);
    }

    window.scrollTo(0, 0);
  }, [id]);

  // Calculate total price
  const calculateTotalDays = () => {
    if (!pickupDate || !dropoffDate) return 1;
    
    const startDate = new Date(pickupDate);
    const endDate = new Date(dropoffDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays || 1; // Minimum 1 day
  };

  const totalDays = calculateTotalDays();
  const totalPrice = car ? car.pricePerDay * totalDays : 0;

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Araç bulunamadı.</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate gallery images (we would normally have multiple images per car)
  const galleryImages = [
    car.imageUrl,
    car.imageUrl.replace('.jpg', '-interior.jpg'),
    car.imageUrl.replace('.jpg', '-back.jpg'),
    car.imageUrl.replace('.jpg', '-side.jpg'),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Ana Sayfa</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/araclar">Araçlar</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{car.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Car details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h1 className="text-3xl font-bold mb-2 sm:mb-0">{car.name}</h1>
                    <div className="flex items-center">
                      <span className="text-sm bg-carblue-100 text-carblue-800 px-3 py-1 rounded-full">
                        {car.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Image gallery */}
                  <div className="mb-8">
                    <div className="mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={mainImage} 
                        alt={car.name}
                        className="w-full h-64 sm:h-80 object-cover"
                      />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {galleryImages.map((img, index) => (
                        <div 
                          key={index}
                          className={`cursor-pointer rounded-md overflow-hidden ${
                            mainImage === img ? 'ring-2 ring-carblue-500' : ''
                          }`}
                          onClick={() => setMainImage(img)}
                        >
                          <img 
                            src={img} 
                            alt={`${car.name} - Görüntü ${index + 1}`}
                            className="w-full h-16 object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Car details tabs */}
                  <Tabs defaultValue="specs">
                    <TabsList className="w-full mb-6">
                      <TabsTrigger value="specs" className="flex-1">Özellikler</TabsTrigger>
                      <TabsTrigger value="extras" className="flex-1">Ekstralar</TabsTrigger>
                      <TabsTrigger value="rules" className="flex-1">Kiralama Şartları</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="specs">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                          <Fuel size={24} className="text-carblue-600 mb-1" />
                          <span className="text-sm font-medium">Yakıt</span>
                          <span className="text-sm">{car.fuelType}</span>
                        </div>
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                          <Settings size={24} className="text-carblue-600 mb-1" />
                          <span className="text-sm font-medium">Vites</span>
                          <span className="text-sm">{car.transmission}</span>
                        </div>
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                          <User size={24} className="text-carblue-600 mb-1" />
                          <span className="text-sm font-medium">Kapasite</span>
                          <span className="text-sm">{car.seats} Kişilik</span>
                        </div>
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                          <ShoppingBag size={24} className="text-carblue-600 mb-1" />
                          <span className="text-sm font-medium">Bagaj</span>
                          <span className="text-sm">{car.luggage} Bavul</span>
                        </div>
                        
                        {/* Additional specs */}
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-carblue-600 mb-1">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 6v6l4 2" />
                          </svg>
                          <span className="text-sm font-medium">Yaş</span>
                          <span className="text-sm">2022</span>
                        </div>
                        <div className="flex flex-col items-center bg-gray-50 p-3 rounded-lg">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-carblue-600 mb-1">
                            <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                            <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                          </svg>
                          <span className="text-sm font-medium">Klima</span>
                          <span className="text-sm">Var</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <h3 className="text-lg font-bold mb-2">Araç Hakkında</h3>
                        <p className="text-gray-700">
                          {car.name}, konforlu iç mekanı ve ekonomik yakıt tüketimi ile her yolculuğunuzda size keyifli bir sürüş deneyimi sunacak. Modern tasarımı ve güvenlik özellikleri ile hem şehir içi hem de şehirler arası yolculuklarınız için ideal bir seçim.
                        </p>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="extras">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Shield className="text-carblue-600 mr-3" />
                            <div>
                              <h4 className="font-medium">Tam Kasko</h4>
                              <p className="text-sm text-gray-600">Herhangi bir hasar durumunda tam koruma</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">+75 ₺/gün</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-carblue-600 mr-3">
                              <path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1" />
                              <polygon points="12 15 17 21 7 21 12 15" />
                            </svg>
                            <div>
                              <h4 className="font-medium">Navigasyon</h4>
                              <p className="text-sm text-gray-600">Gelişmiş GPS sistemli navigasyon</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">+30 ₺/gün</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-carblue-600 mr-3">
                              <path d="M19 12H5" />
                              <path d="M19 6H5" />
                              <path d="M19 18H5" />
                            </svg>
                            <div>
                              <h4 className="font-medium">Bebek Koltuğu</h4>
                              <p className="text-sm text-gray-600">0-3 yaş arası için güvenli koltuk</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">+50 ₺/gün</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-carblue-600 mr-3">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <div>
                              <h4 className="font-medium">İlave Sürücü</h4>
                              <p className="text-sm text-gray-600">Ek sürücü kaydı</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">+40 ₺/gün</p>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="rules">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-bold mb-2">Kiralama Koşulları</h3>
                          <ul className="list-disc pl-5 space-y-1 text-gray-700">
                            <li>En az 21 yaşında olmak</li>
                            <li>En az 1 yıllık ehliyete sahip olmak</li>
                            <li>Geçerli bir kimlik veya pasaport</li>
                            <li>Kredi kartı sahibi olmak (Bloke için)</li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="font-bold mb-2">Yakıt Politikası</h3>
                          <p className="text-gray-700">
                            Araçlar dolu yakıt deposu ile teslim edilir ve dolu yakıt deposu ile iade edilmelidir.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-bold mb-2">Kilometre Sınırı</h3>
                          <p className="text-gray-700">
                            Günlük 300 km sınırı vardır. Aşım durumunda km başına 1,5 ₺ ek ücret alınır.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="font-bold mb-2">İptal Politikası</h3>
                          <p className="text-gray-700">
                            48 saat öncesine kadar yapılan iptallerde tam iade yapılır. 48 saatten az kalan iptallerde ödemenin %50'si iade edilir.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
            
            {/* Booking panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6 text-center">{car.name} Kirala</h2>
                
                <div className="space-y-6">
                  {/* Location selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Alış/İade Yeri
                    </label>
                    <div className="relative">
                      <MapPin 
                        size={18} 
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                      />
                      <select
                        className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      >
                        {locations.map((loc, index) => (
                          <option key={index} value={loc}>
                            {loc}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  {/* Date selection */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alış Tarihi
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal pl-10 relative h-12"
                          >
                            <Calendar 
                              size={18} 
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />
                            {pickupDate ? (
                              <span>{format(pickupDate, 'dd MMM', { locale: tr })}</span>
                            ) : (
                              <span>Tarih seçin</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={pickupDate}
                            onSelect={setPickupDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Alış Saati
                      </label>
                      <div className="relative">
                        <Clock 
                          size={18} 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                        />
                        <select
                          className="pl-10 pr-2 py-3 w-full h-12 rounded-lg border border-gray-300"
                          value={pickupTime}
                          onChange={(e) => setPickupTime(e.target.value)}
                        >
                          {hours.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        İade Tarihi
                      </label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal pl-10 relative h-12"
                          >
                            <Calendar 
                              size={18} 
                              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                            />
                            {dropoffDate ? (
                              <span>{format(dropoffDate, 'dd MMM', { locale: tr })}</span>
                            ) : (
                              <span>Tarih seçin</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={dropoffDate}
                            onSelect={setDropoffDate}
                            initialFocus
                            disabled={(date) => pickupDate ? date < pickupDate : date < new Date()}
                            className="p-3 pointer-events-auto"
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        İade Saati
                      </label>
                      <div className="relative">
                        <Clock 
                          size={18} 
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                        />
                        <select
                          className="pl-10 pr-2 py-3 w-full h-12 rounded-lg border border-gray-300"
                          value={dropoffTime}
                          onChange={(e) => setDropoffTime(e.target.value)}
                        >
                          {hours.map((hour) => (
                            <option key={hour} value={hour}>
                              {hour}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  {/* Price summary */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span>Günlük fiyat:</span>
                      <span className="font-medium">{car.pricePerDay} ₺</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Kiralama süresi:</span>
                      <span className="font-medium">{totalDays} gün</span>
                    </div>
                    <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold">
                      <span>Toplam:</span>
                      <span>{totalPrice} ₺</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-start">
                      <Info size={14} className="mr-1 flex-shrink-0 mt-0.5" />
                      <span>Fiyata KDV dahildir. Ekstra hizmetler rezervasyon sırasında seçilebilir.</span>
                    </div>
                  </div>
                  
                  {/* Booking button */}
                  <Link to={`/rezervasyon/${car.id}`} state={{ 
                    car, location, pickupDate, dropoffDate, pickupTime, dropoffTime 
                  }}>
                    <Button 
                      className="w-full py-3 h-12 bg-carorange-500 hover:bg-carorange-600 text-white font-medium rounded-lg"
                    >
                      Rezervasyon Yap
                    </Button>
                  </Link>
                  
                  {/* Features */}
                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="font-medium mb-3">Kiralama Avantajları</h3>
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Check size={16} className="text-carblue-500 mr-2 mt-0.5" />
                        <span className="text-sm">Ücretsiz iptal (48 saat öncesine kadar)</span>
                      </div>
                      <div className="flex items-start">
                        <Check size={16} className="text-carblue-500 mr-2 mt-0.5" />
                        <span className="text-sm">Hızlı araç teslimi</span>
                      </div>
                      <div className="flex items-start">
                        <Check size={16} className="text-carblue-500 mr-2 mt-0.5" />
                        <span className="text-sm">7/24 yol yardımı</span>
                      </div>
                      <div className="flex items-start">
                        <Check size={16} className="text-carblue-500 mr-2 mt-0.5" />
                        <span className="text-sm">Tam bakımlı araçlar</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarDetail;
