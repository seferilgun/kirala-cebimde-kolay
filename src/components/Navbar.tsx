
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AlignRight, User, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom flex justify-between items-center py-4">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-bold text-2xl text-carblue-700">Kirala<span className="text-carorange-500">Cebimde</span></span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-gray-700 hover:text-carblue-600 font-medium">Ana Sayfa</Link>
          <Link to="/araclar" className="text-gray-700 hover:text-carblue-600 font-medium">Araçlar</Link>
          <Link to="/hakkimizda" className="text-gray-700 hover:text-carblue-600 font-medium">Hakkımızda</Link>
          <Link to="/iletisim" className="text-gray-700 hover:text-carblue-600 font-medium">İletişim</Link>
          <Link to="/sss" className="text-gray-700 hover:text-carblue-600 font-medium">SSS</Link>
        </nav>
        
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/giris">
            <Button variant="outline" size="sm" className="flex items-center">
              <User size={16} className="mr-2" />
              Giriş Yap
            </Button>
          </Link>
          <Link to="/kayit">
            <Button className="bg-carblue-600 hover:bg-carblue-700">Üye Ol</Button>
          </Link>
        </div>
        
        <button 
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <AlignRight size={24} />}
        </button>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-fade-in">
          <div className="container-custom py-4 space-y-4">
            <Link to="/" className="block py-2 text-gray-700 hover:text-carblue-600 font-medium" onClick={() => setIsOpen(false)}>
              Ana Sayfa
            </Link>
            <Link to="/araclar" className="block py-2 text-gray-700 hover:text-carblue-600 font-medium" onClick={() => setIsOpen(false)}>
              Araçlar
            </Link>
            <Link to="/hakkimizda" className="block py-2 text-gray-700 hover:text-carblue-600 font-medium" onClick={() => setIsOpen(false)}>
              Hakkımızda
            </Link>
            <Link to="/iletisim" className="block py-2 text-gray-700 hover:text-carblue-600 font-medium" onClick={() => setIsOpen(false)}>
              İletişim
            </Link>
            <Link to="/sss" className="block py-2 text-gray-700 hover:text-carblue-600 font-medium" onClick={() => setIsOpen(false)}>
              SSS
            </Link>
            <div className="flex space-x-4 pt-4 border-t border-gray-100">
              <Link to="/giris" className="w-1/2">
                <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                  Giriş Yap
                </Button>
              </Link>
              <Link to="/kayit" className="w-1/2">
                <Button className="w-full bg-carblue-600 hover:bg-carblue-700" onClick={() => setIsOpen(false)}>
                  Üye Ol
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
