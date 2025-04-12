
import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Car, ReservationDetails } from '@/types';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Check, CreditCard, User, MapPin, Calendar, Clock, Car as CarIcon, ChevronRight, Shield, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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

const Reservation = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Reservation steps
  const steps = ['Rezervasyon Detayları', 'Kişisel Bilgiler', 'Ek Hizmetler', 'Ödeme'];
  const [currentStep, setCurrentStep] = useState(0);
  
  // Form state
  const [reservationDetails, setReservationDetails] = useState<ReservationDetails | null>(null);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    driverLicense: '',
    licenseIssueDate: '',
  });
  
  const [extras, setExtras] = useState({
    fullInsurance: false,
    navigation: false,
    childSeat: false,
    additionalDriver: false,
  });
  
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });
  
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if navigating from car detail page with state
    if (location.state && location.state.car) {
      setReservationDetails({
        car: location.state.car,
        location: location.state.location || '',
        pickupDate: location.state.pickupDate ? new Date(location.state.pickupDate) : undefined,
        dropoffDate: location.state.dropoffDate ? new Date(location.state.dropoffDate) : undefined,
        pickupTime: location.state.pickupTime || "10:00",
        dropoffTime: location.state.dropoffTime || "10:00",
      });
    } else if (id) {
      // If no state but we have an ID, try to find the car
      const car = allCars.find(c => c.id === Number(id));
      if (car) {
        const today = new Date();
        const returnDate = new Date();
        returnDate.setDate(today.getDate() + 3);
        
        setReservationDetails({
          car,
          location: 'İstanbul (Atatürk Havalimanı)',
          pickupDate: today,
          dropoffDate: returnDate,
          pickupTime: "10:00",
          dropoffTime: "10:00",
        });
      } else {
        // If car not found, redirect to car listing
        navigate('/araclar');
      }
    } else {
      // If no state and no ID, redirect to car listing
      navigate('/araclar');
    }
  }, [id, location.state, navigate]);

  const calculateTotalDays = () => {
    if (!reservationDetails || !reservationDetails.pickupDate || !reservationDetails.dropoffDate) return 1;
    
    const startDate = new Date(reservationDetails.pickupDate);
    const endDate = new Date(reservationDetails.dropoffDate);
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays || 1; // Minimum 1 day
  };

  const calculateExtrasPrice = () => {
    let extrasTotal = 0;
    if (extras.fullInsurance) extrasTotal += 75 * calculateTotalDays();
    if (extras.navigation) extrasTotal += 30 * calculateTotalDays();
    if (extras.childSeat) extrasTotal += 50 * calculateTotalDays();
    if (extras.additionalDriver) extrasTotal += 40 * calculateTotalDays();
    return extrasTotal;
  };

  const calculateTotal = () => {
    if (!reservationDetails) return 0;
    const carTotal = reservationDetails.car.pricePerDay * calculateTotalDays();
    const extrasTotal = calculateExtrasPrice();
    return carTotal + extrasTotal;
  };

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Rezervasyon tamamlandı!",
        description: "Rezervasyon detayları e-posta adresinize gönderildi.",
      });
      navigate('/');
    }, 1500);
  };

  if (!reservationDetails) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p>Yükleniyor...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <Link to="/" className="text-sm font-medium hover:underline">Ana Sayfa</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to="/araclar" className="text-sm font-medium hover:underline">Araçlar</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Link to={`/araclar/${reservationDetails.car.id}`} className="text-sm font-medium hover:underline">{reservationDetails.car.name}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Rezervasyon</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          {/* Page Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Araç Rezervasyonu</h1>
            <p className="text-gray-600 mt-2">
              {reservationDetails.car.name} kiralama işleminizi tamamlamak için bilgilerinizi giriniz.
            </p>
          </div>
          
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center items-center">
              {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${
                      index <= currentStep 
                        ? "bg-carblue-600 text-white" 
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {index < currentStep ? <Check size={16} /> : index + 1}
                  </div>
                  <span 
                    className={`hidden md:inline-block ml-2 ${
                      index <= currentStep 
                        ? "text-carblue-600 font-medium" 
                        : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                  {index < steps.length - 1 && (
                    <div className="w-8 md:w-16 h-1 mx-2 bg-gray-200">
                      <div 
                        className={`h-full ${
                          index < currentStep ? "bg-carblue-600" : ""
                        }`}
                        style={{ 
                          width: index < currentStep ? "100%" : "0%"
                        }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form Steps */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Reservation Details */}
                  {currentStep === 0 && (
                    <div className="space-y-6" id="step-reservation-details">
                      <h2 className="text-xl font-semibold">Rezervasyon Detayları</h2>
                      
                      <div className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="md:w-1/3">
                          <img 
                            src={reservationDetails.car.imageUrl} 
                            alt={reservationDetails.car.name} 
                            className="w-full h-auto rounded-lg"
                          />
                        </div>
                        <div className="md:w-2/3">
                          <h3 className="text-lg font-bold">{reservationDetails.car.name}</h3>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="text-xs bg-carblue-100 text-carblue-800 px-2 py-1 rounded-full">
                              {reservationDetails.car.category}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                              {reservationDetails.car.transmission}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
                              {reservationDetails.car.fuelType}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="flex items-center">
                              <MapPin size={16} className="text-gray-500 mr-2" />
                              <span className="text-sm">{reservationDetails.location}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar size={16} className="text-gray-500 mr-2" />
                              <span className="text-sm">
                                {reservationDetails.pickupDate ? 
                                  format(reservationDetails.pickupDate, 'dd MMM', { locale: tr }) 
                                  : 'N/A'
                                }
                              </span>
                            </div>
                            <div className="flex items-center">
                              <Clock size={16} className="text-gray-500 mr-2" />
                              <span className="text-sm">{reservationDetails.pickupTime}</span>
                            </div>
                            <div className="flex items-center">
                              <Calendar size={16} className="text-gray-500 mr-2" />
                              <span className="text-sm">
                                {reservationDetails.dropoffDate ? 
                                  format(reservationDetails.dropoffDate, 'dd MMM', { locale: tr }) 
                                  : 'N/A'
                                }
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end pt-4">
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className="bg-carblue-600 hover:bg-carblue-700"
                        >
                          Devam Et
                          <ChevronRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 2: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6" id="step-personal-info">
                      <h2 className="text-xl font-semibold">Kişisel Bilgiler</h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ad
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                            value={personalInfo.firstName}
                            onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Soyad
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                            value={personalInfo.lastName}
                            onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            E-posta
                          </label>
                          <input
                            type="email"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                            value={personalInfo.email}
                            onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Telefon
                          </label>
                          <input
                            type="tel"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                            value={personalInfo.phone}
                            onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                            required
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Adres
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                            value={personalInfo.address}
                            onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ehliyet Numarası
                          </label>
                          <input
                            type="text"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                            value={personalInfo.driverLicense}
                            onChange={(e) => setPersonalInfo({...personalInfo, driverLicense: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ehliyet Verilme Tarihi
                          </label>
                          <input
                            type="date"
                            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                            value={personalInfo.licenseIssueDate}
                            onChange={(e) => setPersonalInfo({...personalInfo, licenseIssueDate: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          variant="outline"
                          className="border-gray-300"
                        >
                          Geri
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className="bg-carblue-600 hover:bg-carblue-700"
                        >
                          Devam Et
                          <ChevronRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 3: Extra Services */}
                  {currentStep === 2 && (
                    <div className="space-y-6" id="step-extras">
                      <h2 className="text-xl font-semibold">Ek Hizmetler</h2>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <Shield className="text-carblue-600 mr-3" />
                            <div>
                              <h4 className="font-medium">Tam Kasko</h4>
                              <p className="text-sm text-gray-600">Herhangi bir hasar durumunda tam koruma</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-bold">+75 ₺/gün</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={extras.fullInsurance}
                                onChange={() => setExtras({...extras, fullInsurance: !extras.fullInsurance})}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-carblue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carblue-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
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
                          <div className="flex items-center gap-4">
                            <p className="font-bold">+30 ₺/gün</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={extras.navigation}
                                onChange={() => setExtras({...extras, navigation: !extras.navigation})}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-carblue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carblue-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
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
                          <div className="flex items-center gap-4">
                            <p className="font-bold">+50 ₺/gün</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={extras.childSeat}
                                onChange={() => setExtras({...extras, childSeat: !extras.childSeat})}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-carblue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carblue-600"></div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center">
                            <User className="text-carblue-600 mr-3" />
                            <div>
                              <h4 className="font-medium">İlave Sürücü</h4>
                              <p className="text-sm text-gray-600">Ek sürücü kaydı</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <p className="font-bold">+40 ₺/gün</p>
                            <label className="relative inline-flex items-center cursor-pointer">
                              <input 
                                type="checkbox" 
                                checked={extras.additionalDriver}
                                onChange={() => setExtras({...extras, additionalDriver: !extras.additionalDriver})}
                                className="sr-only peer" 
                              />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-carblue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-carblue-600"></div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          variant="outline"
                          className="border-gray-300"
                        >
                          Geri
                        </Button>
                        <Button
                          type="button"
                          onClick={handleNextStep}
                          className="bg-carblue-600 hover:bg-carblue-700"
                        >
                          Devam Et
                          <ChevronRight className="ml-2" size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {/* Step 4: Payment */}
                  {currentStep === 3 && (
                    <div className="space-y-6" id="step-payment">
                      <h2 className="text-xl font-semibold">Ödeme Bilgileri</h2>
                      
                      <div className="p-4 bg-gray-50 rounded-lg mb-4">
                        <div className="flex items-center space-x-2 mb-4">
                          <CreditCard className="text-carblue-600" />
                          <h3 className="font-medium">Kredi/Banka Kartı ile Ödeme</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kart Numarası
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                              placeholder="1234 5678 9012 3456"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Kart Üzerindeki İsim
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                              value={paymentInfo.cardHolder}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cardHolder: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Son Kullanma Tarihi
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                              placeholder="AA/YY"
                              value={paymentInfo.expiryDate}
                              onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              CVV
                            </label>
                            <input
                              type="text"
                              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                              placeholder="123"
                              value={paymentInfo.cvv}
                              onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-start mb-4">
                        <div className="flex items-center h-5">
                          <input
                            id="terms"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-carblue-300"
                            checked={agreeTerms}
                            onChange={() => setAgreeTerms(!agreeTerms)}
                            required
                          />
                        </div>
                        <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-700">
                          Kiralama şartları ve koşullarını okudum ve kabul ediyorum
                        </label>
                      </div>
                      
                      <div className="flex justify-between pt-4">
                        <Button
                          type="button"
                          onClick={handlePrevStep}
                          variant="outline"
                          className="border-gray-300"
                        >
                          Geri
                        </Button>
                        <Button
                          type="submit"
                          className="bg-carorange-500 hover:bg-carorange-600"
                          disabled={isSubmitting || !agreeTerms}
                        >
                          {isSubmitting ? "İşleniyor..." : "Rezervasyonu Tamamla"}
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
            
            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
                <h3 className="font-bold text-lg mb-4">Rezervasyon Özeti</h3>
                
                <div className="flex items-center mb-4">
                  <CarIcon className="text-carblue-600 mr-3" />
                  <div>
                    <h4 className="font-medium">{reservationDetails.car.name}</h4>
                    <p className="text-sm text-gray-600">{reservationDetails.car.category}</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">{reservationDetails.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">
                      {reservationDetails.pickupDate && reservationDetails.dropoffDate ? 
                        `${format(reservationDetails.pickupDate, 'dd MMM', { locale: tr })} - ${format(reservationDetails.dropoffDate, 'dd MMM', { locale: tr })}` 
                        : 'N/A'
                      }
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={16} className="text-gray-500 mr-2" />
                    <span className="text-sm">
                      {reservationDetails.pickupTime} - {reservationDetails.dropoffTime}
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Günlük fiyat:</span>
                    <span>{reservationDetails.car.pricePerDay} ₺</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Kiralama süresi:</span>
                    <span>{calculateTotalDays()} gün</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Araç toplam:</span>
                    <span>{reservationDetails.car.pricePerDay * calculateTotalDays()} ₺</span>
                  </div>
                  
                  {calculateExtrasPrice() > 0 && (
                    <>
                      <div className="border-t border-gray-200 my-2 pt-2">
                        <span className="font-medium">Ek hizmetler:</span>
                      </div>
                      {extras.fullInsurance && (
                        <div className="flex justify-between text-sm mb-1">
                          <span>Tam Kasko (75 ₺/gün):</span>
                          <span>{75 * calculateTotalDays()} ₺</span>
                        </div>
                      )}
                      {extras.navigation && (
                        <div className="flex justify-between text-sm mb-1">
                          <span>Navigasyon (30 ₺/gün):</span>
                          <span>{30 * calculateTotalDays()} ₺</span>
                        </div>
                      )}
                      {extras.childSeat && (
                        <div className="flex justify-between text-sm mb-1">
                          <span>Bebek Koltuğu (50 ₺/gün):</span>
                          <span>{50 * calculateTotalDays()} ₺</span>
                        </div>
                      )}
                      {extras.additionalDriver && (
                        <div className="flex justify-between text-sm mb-1">
                          <span>İlave Sürücü (40 ₺/gün):</span>
                          <span>{40 * calculateTotalDays()} ₺</span>
                        </div>
                      )}
                      <div className="flex justify-between text-sm font-medium mb-2">
                        <span>Ek hizmetler toplamı:</span>
                        <span>{calculateExtrasPrice()} ₺</span>
                      </div>
                    </>
                  )}
                  
                  <div className="border-t border-gray-300 my-2 pt-2 flex justify-between font-bold">
                    <span>Toplam Tutar:</span>
                    <span>{calculateTotal()} ₺</span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mt-1 flex items-start">
                    <Info size={14} className="mr-1 flex-shrink-0 mt-0.5" />
                    <span>Fiyata KDV dahildir.</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-medium mb-2">Kiralama Avantajları</h4>
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

export default Reservation;
