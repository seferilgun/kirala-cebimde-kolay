
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Contact = () => {
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
                <Link to="/" className="text-sm font-medium hover:underline">Ana Sayfa</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>İletişim</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact form */}
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h1 className="text-2xl font-bold mb-2">Bize Ulaşın</h1>
              <p className="text-gray-600 mb-6">
                Sorularınız için formu doldurun, en kısa sürede size dönüş yapacağız.
              </p>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                      Ad Soyad
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                      placeholder="Adınız Soyadınız"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-posta
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                      placeholder="ornek@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                    placeholder="05XX XXX XX XX"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Konu
                  </label>
                  <select
                    id="subject"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                    required
                  >
                    <option value="">Konu Seçin</option>
                    <option value="reservation">Rezervasyon</option>
                    <option value="cancel">İptal / İade</option>
                    <option value="support">Teknik Destek</option>
                    <option value="complaint">Şikayet</option>
                    <option value="suggestion">Öneri</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesajınız
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                    placeholder="Mesajınızı buraya yazın..."
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full py-3 h-12 bg-carblue-600 hover:bg-carblue-700"
                >
                  <Send size={18} className="mr-2" />
                  Gönder
                </Button>
              </form>
            </div>
            
            {/* Contact information */}
            <div className="flex flex-col">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-xl font-bold mb-6">İletişim Bilgileri</h2>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="text-carblue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium">Merkez Ofis</h3>
                      <p className="text-gray-700">
                        Atatürk Cad. No:123, Beşiktaş<br />
                        İstanbul, Türkiye
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Phone className="text-carblue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium">Telefon</h3>
                      <p className="text-gray-700">
                        <a href="tel:+902121234567" className="hover:text-carblue-600">+90 212 123 45 67</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Mail className="text-carblue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium">E-posta</h3>
                      <p className="text-gray-700">
                        <a href="mailto:info@kiralacebimde.com" className="hover:text-carblue-600">info@kiralacebimde.com</a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="text-carblue-600 mr-4 mt-1" />
                    <div>
                      <h3 className="font-medium">Çalışma Saatleri</h3>
                      <p className="text-gray-700">
                        Pazartesi - Cumartesi: 09:00 - 20:00<br />
                        Pazar: 10:00 - 18:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <h2 className="text-xl font-bold mb-4">Sosyal Medya</h2>
                <p className="text-gray-600 mb-4">
                  Sosyal medya hesaplarımızdan bizi takip edin, fırsat ve kampanyalardan ilk siz haberdar olun.
                </p>
                
                <div className="flex space-x-4">
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-carblue-100">
                    <Facebook className="text-carblue-600" />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-carblue-100">
                    <Instagram className="text-carblue-600" />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-carblue-100">
                    <Twitter className="text-carblue-600" />
                  </a>
                  <a href="#" className="bg-gray-100 p-3 rounded-full hover:bg-carblue-100">
                    <Linkedin className="text-carblue-600" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          {/* Map */}
          <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Konum</h2>
            <div className="w-full h-80 bg-gray-200 rounded-lg">
              {/* Replace with actual Google Maps iframe */}
              <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
                <p className="text-gray-600">Google Harita buraya eklenecek</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
