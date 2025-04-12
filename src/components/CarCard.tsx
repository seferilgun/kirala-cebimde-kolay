
import { Car } from '@/types';
import { Link } from 'react-router-dom';
import { Fuel, User, Settings, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CarCardProps {
  car: Car;
  featured?: boolean;
}

const CarCard = ({ car, featured = false }: CarCardProps) => {
  return (
    <div className={`bg-white rounded-lg overflow-hidden card-shadow ${featured ? 'border-t-4 border-carorange-500' : ''}`}>
      <div className="relative">
        <img
          src={car.imageUrl}
          alt={car.name}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-3 left-3 bg-carorange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            Öne Çıkan
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-white text-carblue-700 font-bold px-3 py-1 rounded-md">
          {car.pricePerDay} ₺/gün
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-lg">{car.name}</h3>
          <div className="text-sm text-gray-600">{car.category}</div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-y-2">
          <div className="flex items-center text-sm text-gray-700">
            <Fuel size={16} className="mr-2 text-carblue-500" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <User size={16} className="mr-2 text-carblue-500" />
            <span>{car.seats} Kişilik</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <Settings size={16} className="mr-2 text-carblue-500" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <ShoppingBag size={16} className="mr-2 text-carblue-500" />
            <span>{car.luggage} Bavul</span>
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <Link to={`/araclar/${car.id}`}>
            <Button variant="outline" className="text-carblue-700 border-carblue-200">
              Detaylar
            </Button>
          </Link>
          <Link to={`/rezervasyon/${car.id}`}>
            <Button className="bg-carorange-500 hover:bg-carorange-600">
              Hemen Kirala
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
