
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow bg-gray-50 py-12">
        <div className="container-custom max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold">Üye Ol</h1>
              <p className="text-gray-600 mt-2">
                Hesabınızı oluşturun ve araç kiralama kolaylığını yaşayın
              </p>
            </div>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    Ad
                  </label>
                  <div className="relative">
                    <User 
                      size={18} 
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                    />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Adınız"
                      className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Soyad
                  </label>
                  <div className="relative">
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Soyadınız"
                      className="pl-4 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  E-posta
                </label>
                <div className="relative">
                  <Mail 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Telefon
                </label>
                <div className="relative">
                  <Phone 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                  />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Şifre
                </label>
                <div className="relative">
                  <Lock 
                    size={18} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" 
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Şifreniz (en az 8 karakter)"
                    className="pl-10 pr-10 py-3 w-full rounded-lg border border-gray-300 focus:border-carblue-500 focus:ring focus:ring-carblue-200 focus:ring-opacity-50"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <div className="flex items-center">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-carblue-600 focus:ring-carblue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  <span>
                    <a href="#" className="text-carblue-600 hover:text-carblue-800">Kullanım Şartları</a>
                    {' '}ve{' '}
                    <a href="#" className="text-carblue-600 hover:text-carblue-800">Gizlilik Politikası</a>
                    'nı kabul ediyorum
                  </span>
                </label>
              </div>
              
              <Button
                type="submit"
                className="w-full py-3 h-12 bg-carblue-600 hover:bg-carblue-700"
              >
                Üye Ol
              </Button>
            </form>
            
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>
            
            <button
              type="button"
              className="flex items-center justify-center w-full py-3 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Google ile Üye Ol
            </button>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Zaten üye misiniz? 
                <Link to="/giris" className="ml-1 text-carblue-600 hover:text-carblue-800 font-medium">
                  Giriş Yapın
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
