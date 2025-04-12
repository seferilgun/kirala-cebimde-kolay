
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-8">
        <div className="container-custom">
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink as={Link} to="/">Ana Sayfa</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>Hakkımızda</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-64 md:h-80">
              <img
                src="/about-hero.jpg"
                alt="Hakkımızda"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h1 className="text-white text-3xl md:text-4xl font-bold">Hakkımızda</h1>
              </div>
            </div>
            
            <div className="p-6 md:p-10">
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Şirketimiz</h2>
                <p className="text-gray-700 mb-6">
                  KiralaCebimde, 2015 yılında Türkiye'nin araç kiralama sektöründeki hizmet kalitesini artırmak ve müşterilerine daha kolay ve erişilebilir bir kiralama deneyimi sunmak amacıyla kurulmuştur. İstanbul merkezli şirketimiz, bugün Türkiye'nin 20 farklı şehrinde 45'in üzerinde ofisiyle hizmet vermektedir.
                </p>
                <p className="text-gray-700">
                  Müşteri memnuniyetini her zaman ön planda tutan KiralaCebimde, yenilikçi teknolojileri kullanarak araç kiralama süreçlerini basitleştirmekte ve her kesimden müşterilerine kaliteli hizmet sunmaktadır. Geniş araç filomuz, rekabetçi fiyatlarımız ve profesyonel ekibimiz ile sektörde fark yaratmaktayız.
                </p>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Misyonumuz</h2>
                <p className="text-gray-700">
                  Türkiye'nin dört bir yanında müşterilerimize en uygun fiyatlarla, en kaliteli araçları en hızlı şekilde sunmak ve sektördeki standartları sürekli yükseltmek. Her müşterimizin ihtiyacına uygun çözümler üreterek, araç kiralama deneyimini keyifli ve sorunsuz hale getirmek için çalışıyoruz.
                </p>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Vizyonumuz</h2>
                <p className="text-gray-700">
                  Türkiye'nin en güvenilir ve tercih edilen araç kiralama markası olmak. Teknolojik yenilikleri takip ederek sektörde öncü olmak ve hizmet kalitemizi sürekli geliştirerek müşteri memnuniyetini en üst düzeyde tutmak. Uluslararası standartlarda hizmet sunarak global bir marka haline gelmek.
                </p>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Değerlerimiz</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Müşteri Odaklılık</h3>
                    <p className="text-gray-700">
                      Müşterilerimizin memnuniyeti bizim için her şeyden önce gelir. Onların ihtiyaçlarını anlamak ve beklentilerini aşmak için çalışırız.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Güvenilirlik</h3>
                    <p className="text-gray-700">
                      Verdiğimiz tüm sözleri tutarız ve müşterilerimize her zaman şeffaf ve dürüst davranırız.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Yenilikçilik</h3>
                    <p className="text-gray-700">
                      Sektördeki gelişmeleri yakından takip eder, en yeni teknolojileri kullanarak hizmetlerimizi sürekli geliştiririz.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Kalite</h3>
                    <p className="text-gray-700">
                      Sunduğumuz her hizmetin ve her aracın en yüksek kalite standartlarında olması için çalışırız.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Sürdürülebilirlik</h3>
                    <p className="text-gray-700">
                      Çevreye duyarlı yaklaşımlarla filomuzda çevre dostu araçlara öncelik veriyoruz.
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-5 rounded-lg">
                    <h3 className="font-bold text-lg mb-2">Ekip Ruhu</h3>
                    <p className="text-gray-700">
                      Başarının ancak takım çalışması ile mümkün olduğuna inanır, birbirimize destek olarak daha iyiye ulaşmak için çalışırız.
                    </p>
                  </div>
                </div>
              </section>
              
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Ekibimiz</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
                      <img
                        src="/team/team1.jpg"
                        alt="Ahmet Yılmaz"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">Ahmet Yılmaz</h3>
                    <p className="text-carblue-600">CEO</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
                      <img
                        src="/team/team2.jpg"
                        alt="Zeynep Kaya"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">Zeynep Kaya</h3>
                    <p className="text-carblue-600">Operasyon Müdürü</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
                      <img
                        src="/team/team3.jpg"
                        alt="Mustafa Demir"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">Mustafa Demir</h3>
                    <p className="text-carblue-600">Pazarlama Direktörü</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="mb-4 rounded-full overflow-hidden w-32 h-32 mx-auto">
                      <img
                        src="/team/team4.jpg"
                        alt="Elif Şahin"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-lg">Elif Şahin</h3>
                    <p className="text-carblue-600">Müşteri Hizmetleri Müdürü</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-bold mb-6">Başarılarımız</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-carorange-500 mb-2">100,000+</div>
                    <p className="text-center text-gray-700">Mutlu Müşteri</p>
                  </div>
                  
                  <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-carorange-500 mb-2">1,500+</div>
                    <p className="text-center text-gray-700">Araç Filosu</p>
                  </div>
                  
                  <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg">
                    <div className="text-3xl font-bold text-carorange-500 mb-2">45+</div>
                    <p className="text-center text-gray-700">Türkiye Genelinde Ofis</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
