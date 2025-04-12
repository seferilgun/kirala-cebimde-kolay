
export interface Car {
  id: number;
  name: string;
  category: string;
  fuelType: string;
  transmission: string;
  seats: number;
  luggage: number;
  pricePerDay: number;
  imageUrl: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}

export interface ReservationDetails {
  car: Car;
  location: string;
  pickupDate?: Date;
  dropoffDate?: Date;
  pickupTime: string;
  dropoffTime: string;
}
