
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CarCard from '@/components/CarCard';
import { Car } from '@/types';
import { Filter, Check, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';

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
  {
    id: 5,
    name: 'Volkswagen Golf',
    category: 'Orta Sınıf',
    fuelType: 'Dizel',
    transmission: 'Otomatik',
    seats: 5,
    luggage: 2,
    pricePerDay: 480,
    imageUrl: '/cars/volkswagen-golf.jpg'
  },
  {
    id: 6,
    name: 'Fiat Egea',
    category: 'Ekonomik',
    fuelType: 'Dizel',
    transmission: 'Manuel',
    seats: 5,
    luggage: 3,
    pricePerDay: 380,
    imageUrl: '/cars/fiat-egea.jpg'
  },
  {
    id: 7,
    name: 'BMW 3 Serisi',
    category: 'Lüks',
    fuelType: 'Benzin',
    transmission: 'Otomatik',
    seats: 5,
    luggage: 3,
    pricePerDay: 1200,
    imageUrl: '/cars/bmw-3.jpg'
  },
  {
    id: 8,
    name: 'Hyundai i20',
    category: 'Ekonomik',
    fuelType: 'Benzin',
    transmission: 'Manuel',
    seats: 5,
    luggage: 2,
    pricePerDay: 330,
    imageUrl: '/cars/hyundai-i20.jpg'
  },
];

const CarListing = () => {
  const location = useLocation();
  const searchParams = location.state || {};
  
  // Filter states
  const [cars, setCars] = useState<Car[]>(allCars);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1500]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Extract unique values for filters
  const categories = [...new Set(allCars.map(car => car.category))];
  const fuelTypes = [...new Set(allCars.map(car => car.fuelType))];
  const transmissions = [...new Set(allCars.map(car => car.transmission))];
  
  // Min and max price
  const minPrice = Math.min(...allCars.map(car => car.pricePerDay));
  const maxPrice = Math.max(...allCars.map(car => car.pricePerDay));

  // Apply filters
  useEffect(() => {
    let filtered = [...allCars];
    
    // Filter by price
    filtered = filtered.filter(car => 
      car.pricePerDay >= priceRange[0] && car.pricePerDay <= priceRange[1]
    );
    
    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(car => selectedCategories.includes(car.category));
    }
    
    // Filter by fuel type
    if (selectedFuelTypes.length > 0) {
      filtered = filtered.filter(car => selectedFuelTypes.includes(car.fuelType));
    }
    
    // Filter by transmission
    if (selectedTransmissions.length > 0) {
      filtered = filtered.filter(car => selectedTransmissions.includes(car.transmission));
    }
    
    setCars(filtered);
  }, [priceRange, selectedCategories, selectedFuelTypes, selectedTransmissions]);

  // Toggle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  // Toggle fuel type selection
  const toggleFuelType = (fuelType: string) => {
    setSelectedFuelTypes(prev => 
      prev.includes(fuelType)
        ? prev.filter(f => f !== fuelType)
        : [...prev, fuelType]
    );
  };
  
  // Toggle transmission selection
  const toggleTransmission = (transmission: string) => {
    setSelectedTransmissions(prev => 
      prev.includes(transmission)
        ? prev.filter(t => t !== transmission)
        : [...prev, transmission]
    );
  };
  
  // Reset all filters
  const resetFilters = () => {
    setPriceRange([minPrice, maxPrice]);
    setSelectedCategories([]);
    setSelectedFuelTypes([]);
    setSelectedTransmissions([]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Araç Kiralama</h1>
          
          {searchParams.location && (
            <div className="mb-6 p-4 bg-carblue-50 rounded-lg border border-carblue-100">
              <p className="font-medium">
                <span className="text-carblue-700">Konum:</span> {searchParams.location}
                {searchParams.pickupDate && (
                  <>
                    <span className="mx-2">|</span>
                    <span className="text-carblue-700">Alış:</span> {new Date(searchParams.pickupDate).toLocaleDateString('tr-TR')} {searchParams.pickupTime}
                  </>
                )}
                {searchParams.dropoffDate && (
                  <>
                    <span className="mx-2">|</span>
                    <span className="text-carblue-700">İade:</span> {new Date(searchParams.dropoffDate).toLocaleDateString('tr-TR')} {searchParams.dropoffTime}
                  </>
                )}
              </p>
            </div>
          )}
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Mobile filters button */}
            <div className="lg:hidden mb-4">
              <Button 
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="w-full flex justify-between items-center"
                variant="outline"
              >
                <span className="flex items-center">
                  <Filter size={18} className="mr-2" />
                  Filtreler
                </span>
                <ChevronDown 
                  size={18}
                  className={`transition-transform ${mobileFiltersOpen ? "transform rotate-180" : ""}`}
                />
              </Button>
            </div>
            
            {/* Filters sidebar */}
            <div 
              className={`lg:w-1/4 bg-white p-5 rounded-lg shadow-sm ${
                mobileFiltersOpen ? 'block' : 'hidden lg:block'
              }`}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filtreler</h2>
                <Button 
                  onClick={resetFilters} 
                  variant="ghost" 
                  size="sm"
                  className="text-carblue-600 hover:text-carblue-800"
                >
                  Temizle
                </Button>
              </div>
              
              {/* Price range filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Fiyat Aralığı</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[minPrice, maxPrice]}
                    min={minPrice}
                    max={maxPrice}
                    step={50}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>{priceRange[0]} ₺</span>
                    <span>{priceRange[1]} ₺</span>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Category filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Araç Sınıfı</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <Checkbox 
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`category-${category}`}
                        className="text-sm cursor-pointer"
                      >
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Fuel type filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Yakıt Tipi</h3>
                <div className="space-y-2">
                  {fuelTypes.map(fuelType => (
                    <div key={fuelType} className="flex items-center">
                      <Checkbox 
                        id={`fuel-${fuelType}`}
                        checked={selectedFuelTypes.includes(fuelType)}
                        onCheckedChange={() => toggleFuelType(fuelType)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`fuel-${fuelType}`}
                        className="text-sm cursor-pointer"
                      >
                        {fuelType}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator className="my-4" />
              
              {/* Transmission filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Vites</h3>
                <div className="space-y-2">
                  {transmissions.map(transmission => (
                    <div key={transmission} className="flex items-center">
                      <Checkbox 
                        id={`transmission-${transmission}`}
                        checked={selectedTransmissions.includes(transmission)}
                        onCheckedChange={() => toggleTransmission(transmission)}
                        className="mr-2"
                      />
                      <label 
                        htmlFor={`transmission-${transmission}`}
                        className="text-sm cursor-pointer"
                      >
                        {transmission}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Car listing */}
            <div className="lg:w-3/4">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
                <p><span className="font-bold">{cars.length}</span> araç bulundu</p>
                <div className="flex items-center">
                  <span className="mr-2 text-sm text-gray-600">Sırala:</span>
                  <select 
                    className="border-gray-300 rounded-md text-sm px-2 py-1"
                    defaultValue="price-asc"
                  >
                    <option value="price-asc">Fiyat (Artan)</option>
                    <option value="price-desc">Fiyat (Azalan)</option>
                    <option value="name-asc">İsim (A-Z)</option>
                    <option value="name-desc">İsim (Z-A)</option>
                  </select>
                </div>
              </div>
              
              {cars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {cars.map(car => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <X size={32} className="text-gray-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Araç Bulunamadı</h3>
                  <p className="text-gray-600 mb-4">
                    Seçtiğiniz kriterlere uygun araç bulunamadı. Lütfen filtrelerinizi değiştirin.
                  </p>
                  <Button 
                    onClick={resetFilters}
                    className="bg-carblue-600 hover:bg-carblue-700"
                  >
                    Filtreleri Temizle
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CarListing;
