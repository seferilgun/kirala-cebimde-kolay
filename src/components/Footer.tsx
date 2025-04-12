
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-carblue-900 text-white pt-12 pb-6">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">KiralaCebimde</h3>
            <p className="text-gray-300 mb-4">
              Kolay, hızlı ve güvenilir araç kiralama hizmeti sunuyoruz. 7/24 müşteri desteğimizle her zaman yanınızdayız.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-carorange-400">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white hover:text-carorange-400">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white hover:text-carorange-400">
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/araclar" className="text-gray-300 hover:text-white">Araçlar</Link>
              </li>
              <li>
                <Link to="/hakkimizda" className="text-gray-300 hover:text-white">Hakkımızda</Link>
              </li>
              <li>
                <Link to="/iletisim" className="text-gray-300 hover:text-white">İletişim</Link>
              </li>
              <li>
                <Link to="/sss" className="text-gray-300 hover:text-white">Sıkça Sorulan Sorular</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">İletişim</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 flex-shrink-0 text-carorange-400" />
                <span className="text-gray-300">
                  Atatürk Cad. No:123, Beşiktaş, İstanbul, Türkiye
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-2 flex-shrink-0 text-carorange-400" />
                <a href="tel:+902121234567" className="text-gray-300 hover:text-white">+90 212 123 45 67</a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-2 flex-shrink-0 text-carorange-400" />
                <a href="mailto:info@kiralacebimde.com" className="text-gray-300 hover:text-white">info@kiralacebimde.com</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Mobil Uygulama</h3>
            <p className="text-gray-300 mb-4">
              Mobil uygulamamızı indirin, araç kiralamayı daha da kolaylaştırın.
            </p>
            <div className="space-y-3">
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
        </div>
        
        <div className="border-t border-gray-700 pt-6 mt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} KiralaCebimde. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6">
              <Link to="/gizlilik-politikasi" className="text-gray-400 text-sm hover:text-white">
                Gizlilik Politikası
              </Link>
              <Link to="/kullanim-sartlari" className="text-gray-400 text-sm hover:text-white">
                Kullanım Şartları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
