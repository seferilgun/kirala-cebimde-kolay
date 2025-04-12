
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchForm from '@/components/SearchForm';
import CarCard from '@/components/CarCard';
import TestimonialCard from '@/components/TestimonialCard';
import FeatureCard from '@/components/FeatureCard';
import FAQ from '@/components/FAQ';
import { Car, Testimonial } from '@/types';
import { 
  Car as CarIcon, 
  ShieldCheck, 
  Clock, 
  CreditCard, 
  HeadphonesIcon, 
  ThumbsUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample data
const featuredCars: Car[] = [
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

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Mehmet Yılmaz',
    avatarUrl: '/testimonials/avatar1.jpg',
    rating: 5,
    comment: 'Çok hızlı teslimat ve temiz araçlar. Kesinlikle tekrar tercih edeceğim.',
    date: '2023-03-15',
    location: 'İstanbul'
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    avatarUrl: '/testimonials/avatar2.jpg',
    rating: 4,
    comment: 'Fiyat performans açısından çok iyi. Rezervasyon süreci de oldukça kolaydı.',
    date: '2023-04-22',
    location: 'Ankara'
  },
  {
    id: 3,
    name: 'Ali Kaya',
    avatarUrl: '/testimonials/avatar3.jpg',
    rating: 5,
    comment: 'Müşteri hizmetleri çok ilgili. Yaşadığım küçük sorun hemen çözüldü.',
    date: '2023-02-10',
    location: 'İzmir'
  },
];

const faqItems = [
  {
    question: 'Araç kiralamak için hangi belgeler gerekiyor?',
    answer: 'Araç kiralamak için geçerli bir ehliyet (en az 1 yıllık), kimlik veya pasaport ve kredi kartı gerekmektedir.'
  },
  {
    question: 'Kiralanan araç için depozito alınıyor mu?',
    answer: 'Evet, kiralama sırasında kredi kartınızdan belirli bir depozito tutarı blokede tutulur ve araç hasarsız iade edildiğinde bu tutar serbest bırakılır.'
  },
  {
    question: 'Rezervasyon iptali durumunda ücret iadesi yapılıyor mu?',
    answer: 'Alış tarihinden 48 saat öncesine kadar yapılan iptallerde tam iade yapılır. Daha sonra yapılan iptallerde ise ödemenin %50\'si iade edilir.'
  },
  {
    question: 'Minimum kiralama süresi ne kadardır?',
    answer: 'Minimum kiralama süresi 1 gündür, ancak bazı araç sınıflarında ve yoğun dönemlerde bu süre değişebilir.'
  },
  {
    question: 'Kiralanan araç farklı bir şehirde teslim edilebilir mi?',
    answer: 'Evet, farklı şehir teslimatı mümkündür, ancak bu durumda ek ücret talep edilir. Detaylar için rezervasyon sırasında bilgi verilmektedir.'
  },
];

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-carblue-700 text-white py-16 md:py-24">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="/hero-bg.jpg" 
            alt="Araba kiralama" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="container-custom relative grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Türkiye'nin En Kolay Araç Kiralama Platformu
            </h1>
            <p className="text-xl mb-6 text-gray-200">
              İhtiyacınıza uygun aracı seçin, birkaç tıkla rezervasyon yapın ve yolculuğun keyfini çıkarın.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/araclar">
                <Button size="lg" className="bg-carorange-500 hover:bg-carorange-600">
                  Araçları Keşfet
                </Button>
              </Link>
              <Link to="/hakkimizda">
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-carblue-700">
                  Bizi Tanıyın
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="animate-slide-in">
            <SearchForm />
          </div>
        </div>
      </section>
      
      {/* Featured Cars Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Öne Çıkan Araçlarımız</h2>
            <p className="text-gray-600">En popüler ve en çok tercih edilen araçları keşfedin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCars.map((car, index) => (
              <CarCard key={car.id} car={car} featured={index === 0} />
            ))}
          </div>
          
          <div className="text-center mt-10">
            <Link to="/araclar">
              <Button className="bg-carblue-600 hover:bg-carblue-700">
                Tüm Araçları Görüntüle
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Neden Bizi Seçmelisiniz?</h2>
            <p className="text-gray-600">Araç kiralama deneyimini sizin için mükemmel hale getiriyoruz</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
              icon={CarIcon} 
              title="Geniş Araç Filosu" 
              description="Ekonomik, orta sınıf ve lüks araçlardan oluşan geniş filomuz ile her ihtiyaca uygun seçenekler sunuyoruz."
            />
            <FeatureCard 
              icon={ShieldCheck} 
              title="Tam Sigorta" 
              description="Tüm araçlarımız kapsamlı sigorta ile korunmaktadır. Güvenliğiniz bizim için önceliktir."
            />
            <FeatureCard 
              icon={Clock} 
              title="7/24 Hizmet" 
              description="İhtiyaç duyduğunuz her an hizmetinizdeyiz. Gece veya gündüz, her zaman yanınızdayız."
            />
            <FeatureCard 
              icon={CreditCard} 
              title="Uygun Fiyatlar" 
              description="Rekabetçi fiyatlarımız ve özel indirimlerimiz ile bütçenize uygun araç kiralama seçenekleri sunuyoruz."
            />
            <FeatureCard 
              icon={HeadphonesIcon} 
              title="Müşteri Desteği" 
              description="Profesyonel müşteri destek ekibimiz tüm sorularınızı yanıtlamak için her zaman hazır."
            />
            <FeatureCard 
              icon={ThumbsUp} 
              title="Kolay Rezervasyon" 
              description="Birkaç tıkla online rezervasyon yapabilir, zaman ve emekten tasarruf edebilirsiniz."
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Müşterilerimiz Ne Diyor?</h2>
            <p className="text-gray-600">Memnun müşterilerimizin deneyimlerini okuyun</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Mobile App Section */}
      <section className="py-16 bg-carblue-700 text-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Mobil Uygulamamızı İndirin</h2>
            <p className="text-xl mb-6">
              KiralaCebimde mobil uygulaması ile araç kiralama artık daha kolay! Hemen indirin ve avantajlardan yararlanmaya başlayın.
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center">
                <div className="bg-carorange-500 rounded-full p-1 mr-3">
                  <ShieldCheck size={16} className="text-white" />
                </div>
                <span>Daha hızlı rezervasyon</span>
              </li>
              <li className="flex items-center">
                <div className="bg-carorange-500 rounded-full p-1 mr-3">
                  <ShieldCheck size={16} className="text-white" />
                </div>
                <span>Özel kampanya bildirimleri</span>
              </li>
              <li className="flex items-center">
                <div className="bg-carorange-500 rounded-full p-1 mr-3">
                  <ShieldCheck size={16} className="text-white" />
                </div>
                <span>Rezervasyon takibi</span>
              </li>
              <li className="flex items-center">
                <div className="bg-carorange-500 rounded-full p-1 mr-3">
                  <ShieldCheck size={16} className="text-white" />
                </div>
                <span>7/24 destek</span>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <a href="#" className="block bg-black rounded-lg px-4 py-2 flex items-center hover:bg-gray-900">
                <div className="mr-3">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M17.9 19.9l.1-1v-14A2 2 0 0016 3H8a2 2 0 00-2 1.9V18c0 1 .9 2 1.9 2h8a2 2 0 002-1.9zm-8-16.9h4v1h-4v-1zm2 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">Android için</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </a>
              
              <a href="#" className="block bg-black rounded-lg px-4 py-2 flex items-center hover:bg-gray-900">
                <div className="mr-3">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M17.6 12a5 5 0 01-2.5 4.4l1.5 2.5a9 9 0 004-6.9 9 9 0 00-4-7l-1.5 2.6a5 5 0 012.5 4.4zm-9.7 5.2l1.4-2.5a5 5 0 01-2.4-4.4 5 5 0 012.4-4.4L8 3.5a9 9 0 00-4 7 9 9 0 004 6.9v-.2zm4-13.2c2 0 3.8 1.5 3.8 3.6 0 2-1.7 3.7-3.8 3.7-2 0-3.7-1.7-3.7-3.7 0-2 1.7-3.6 3.7-3.6zm0 16c-2 0-3.7-1.6-3.7-3.7s1.7-3.7 3.7-3.7 3.8 1.6 3.8 3.7c0 2-1.7 3.7-3.8 3.7z"></path>
                  </svg>
                </div>
                <div>
                  <div className="text-xs">iPhone için</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </a>
            </div>
          </div>
          
          <div className="flex justify-center">
            <img 
              src="/mobile-app.png" 
              alt="KiralaCebimde Mobil Uygulama" 
              className="max-w-full h-auto md:max-w-xs"
            />
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Sıkça Sorulan Sorular</h2>
            <p className="text-gray-600">Merak ettiklerinize hızlı cevaplar</p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <FAQ items={faqItems} />
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600 mb-4">Başka sorularınız mı var?</p>
            <Link to="/iletisim">
              <Button className="bg-carblue-600 hover:bg-carblue-700">
                Bize Ulaşın
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
