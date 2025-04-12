
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

const locations = [
  "İstanbul (Atatürk Havalimanı)",
  "İstanbul (Sabiha Gökçen)",
  "Ankara (Esenboğa Havalimanı)",
  "İzmir (Adnan Menderes)",
  "Antalya Havalimanı",
  "Bodrum (Milas) Havalimanı",
  "Dalaman Havalimanı",
];

const hours = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", 
  "20:00", "20:30", "21:00", "21:30", "22:00"
];

const SearchForm = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState('');
  const [locationFocus, setLocationFocus] = useState(false);
  const [pickupDate, setPickupDate] = useState<Date | undefined>(new Date());
  const [dropoffDate, setDropoffDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [pickupTime, setPickupTime] = useState("10:00");
  const [dropoffTime, setDropoffTime] = useState("10:00");
  const [timeFocus, setTimeFocus] = useState<'pickup' | 'dropoff' | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location || !pickupDate || !dropoffDate) {
      return;
    }
    
    // Navigate to the car listing page with search params
    navigate('/araclar', { 
      state: { 
        location, 
        pickupDate, 
        dropoffDate,
        pickupTime,
        dropoffTime
      } 
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Araç Kiralama</h2>
      
      <form onSubmit={handleSearch} className="space-y-5">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Konum
          </label>
          <div className="relative">
            <MapPin 
              size={18} 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
            />
            <input
              type="text"
              placeholder="Alış yeri seçin"
              className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onFocus={() => setLocationFocus(true)}
              onBlur={() => setTimeout(() => setLocationFocus(false), 200)}
            />
          </div>
          
          {locationFocus && (
            <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {locations
                .filter(loc => 
                  loc.toLowerCase().includes(location.toLowerCase())
                )
                .map((loc, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                    onClick={() => {
                      setLocation(loc);
                      setLocationFocus(false);
                    }}
                  >
                    {loc}
                  </div>
                ))
              }
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alış Tarihi
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal pl-10 relative h-12 text-gray-800"
                >
                  <Calendar 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                  />
                  {pickupDate ? (
                    <span>{format(pickupDate, 'dd MMMM yyyy', { locale: tr })}</span>
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
              <div
                className="pl-10 pr-4 py-3 w-full h-12 rounded-lg border border-gray-300 flex items-center cursor-pointer text-gray-800 bg-white"
                onClick={() => setTimeFocus('pickup')}
              >
                {pickupTime}
              </div>
              
              {timeFocus === 'pickup' && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                      onClick={() => {
                        setPickupTime(hour);
                        setTimeFocus(null);
                      }}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              )}
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
                  className="w-full justify-start text-left font-normal pl-10 relative h-12 text-gray-800"
                >
                  <Calendar 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                  />
                  {dropoffDate ? (
                    <span>{format(dropoffDate, 'dd MMMM yyyy', { locale: tr })}</span>
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
              <div
                className="pl-10 pr-4 py-3 w-full h-12 rounded-lg border border-gray-300 flex items-center cursor-pointer text-gray-800 bg-white"
                onClick={() => setTimeFocus('dropoff')}
              >
                {dropoffTime}
              </div>
              
              {timeFocus === 'dropoff' && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                  {hours.map((hour) => (
                    <div
                      key={hour}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-gray-800"
                      onClick={() => {
                        setDropoffTime(hour);
                        setTimeFocus(null);
                      }}
                    >
                      {hour}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        <Button 
          type="submit" 
          className="w-full py-3 h-12 bg-carorange-500 hover:bg-carorange-600 text-white font-medium rounded-lg"
        >
          Araç Ara
        </Button>
      </form>
    </div>
  );
};

export default SearchForm;
