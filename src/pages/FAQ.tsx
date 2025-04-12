
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQ from '@/components/FAQ';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

const faqItems = {
  general: [
    {
      question: 'Araç kiralamak için hangi belgeler gerekiyor?',
      answer: 'Araç kiralamak için geçerli bir ehliyet (en az 1 yıllık), kimlik veya pasaport ve kredi kartı gerekmektedir. Bazı araç sınıfları için ek belgeler veya şartlar istenebilir.'
    },
    {
      question: 'Minimum araç kiralama yaşı nedir?',
      answer: 'Minimum araç kiralama yaşı 21\'dir. Ancak, bazı lüks ve prestij araçlar için minimum yaş 25 veya 30 olabilir.'
    },
    {
      question: 'Kiralanan araç farklı bir şehirde teslim edilebilir mi?',
      answer: 'Evet, farklı şehir teslimatı mümkündür, ancak bu durumda ek ücret talep edilir. Detaylar için rezervasyon sırasında bilgi verilmektedir.'
    },
    {
      question: 'Kiraladığım araç için kilometre sınırı var mı?',
      answer: 'Günlük 300 km sınırı vardır. Aşım durumunda km başına 1,5 ₺ ek ücret alınır. Sınırsız kilometre opsiyonu için rezervasyon sırasında ek ücretle seçim yapabilirsiniz.'
    },
    {
      question: 'Araç kiralarken depozito alınıyor mu?',
      answer: 'Evet, kiralama sırasında kredi kartınızdan belirli bir depozito tutarı blokede tutulur ve araç hasarsız iade edildiğinde bu tutar serbest bırakılır.'
    },
  ],
  reservation: [
    {
      question: 'Nasıl rezervasyon yapabilirim?',
      answer: 'Rezervasyon yapmak için web sitemizi, mobil uygulamamızı kullanabilir veya müşteri hizmetlerimizi arayabilirsiniz. Online rezervasyonlarda daha uygun fiyatlar sunulmaktadır.'
    },
    {
      question: 'Rezervasyon iptali durumunda ücret iadesi yapılıyor mu?',
      answer: 'Alış tarihinden 48 saat öncesine kadar yapılan iptallerde tam iade yapılır. Daha sonra yapılan iptallerde ise ödemenin %50\'si iade edilir.'
    },
    {
      question: 'Rezervasyonumu değiştirebilir miyim?',
      answer: 'Evet, alış tarihinden en az 24 saat önce rezervasyonunuzu değiştirebilirsiniz. Değişiklik durumunda fiyat farkı ödemeniz veya iade almanız gerekebilir.'
    },
    {
      question: 'Minimum kiralama süresi ne kadardır?',
      answer: 'Minimum kiralama süresi 1 gündür. Bazı araç sınıflarında ve yoğun dönemlerde minimum kiralama süresi daha uzun olabilir.'
    },
    {
      question: 'Kiralamayı ne kadar önceden yapmam gerekir?',
      answer: 'Müsaitlik durumuna göre aynı gün bile kiralama yapabilirsiniz, ancak daha iyi fiyatlar ve araç seçenekleri için en az birkaç gün önceden rezervasyon yapmanızı öneririz.'
    },
  ],
  payment: [
    {
      question: 'Hangi ödeme yöntemlerini kabul ediyorsunuz?',
      answer: 'Kredi kartı, banka kartı ve nakit ödeme kabul ediyoruz. Ancak, depozito için her durumda kredi kartı gereklidir.'
    },
    {
      question: 'Ödemeyi ne zaman yapmalıyım?',
      answer: 'Online rezervasyon sırasında ön ödeme veya tamamını ödeme seçeneklerine sahipsiniz. Aracı teslim alırken de ödeme yapabilirsiniz.'
    },
    {
      question: 'Araç ücretine neler dahildir?',
      answer: 'Araç ücretine standart sigorta, KDV ve belirli bir kilometre limiti dahildir. Ekstra sigortalar, bebek koltuğu, GPS gibi ek hizmetler ve km aşım ücretleri ayrıca faturalandırılır.'
    },
    {
      question: 'İndirim kuponları nasıl kullanılır?',
      answer: 'İndirim kuponlarını rezervasyon sırasında "İndirim Kodu" alanına girerek kullanabilirsiniz. Bazı kuponlar belirli şartlarda ve tarihlerde geçerlidir.'
    },
  ],
  insurance: [
    {
      question: 'Kiralık araçlar sigortalı mıdır?',
      answer: 'Evet, tüm araçlarımız zorunlu trafik sigortası ve kasko ile teslim edilir. Standart sigorta, belirli bir muafiyet tutarı içerebilir.'
    },
    {
      question: 'Ek sigorta seçenekleri nelerdir?',
      answer: 'Cam-far-ayna sigortası, lastik sigortası, mini hasar sigortası ve süper kasko gibi ek sigorta seçeneklerimiz bulunmaktadır. Bu sigortalar muafiyet tutarlarını azaltabilir veya tamamen kaldırabilir.'
    },
    {
      question: 'Kaza durumunda ne yapmalıyım?',
      answer: 'Kaza durumunda öncelikle yetkili mercilere (polis, jandarma) haber verin ve kaza tespit tutanağı hazırlatın. Ardından 7/24 hizmet veren acil yardım hattımızı arayın. Tüm bilgileri ve belgeleri size iletilen adreslere gönderin.'
    },
    {
      question: 'Araç arızası durumunda ne yapmalıyım?',
      answer: 'Araç arızası durumunda 7/24 hizmet veren yol yardım hattımızı arayın. Size en kısa sürede yardımcı olacak ve gerekirse aracı değiştirecek ekiplerimiz yönlendirilecektir.'
    },
  ],
  rules: [
    {
      question: 'Kiralık araç yurtdışına çıkarılabilir mi?',
      answer: 'Hayır, araçlarımız yurtdışına çıkarılamaz. Özel izin gerektiren durumlar için müşteri hizmetlerimizle iletişime geçin.'
    },
    {
      question: '24 yaşından küçüğüm, araç kiralayabilir miyim?',
      answer: '21-24 yaş arasındaysanız, genç sürücü ek ücreti ödeyerek belirli araç sınıflarını kiralayabilirsiniz. 21 yaşından küçükseniz maalesef araç kiralayamazsınız.'
    },
    {
      question: 'Araç teslimi ve iadesi nasıl yapılır?',
      answer: 'Araç teslimi ve iadesi ofislerimizde yapılır. Ek ücretle adresinize teslim ve adresinizden iade hizmeti de verilmektedir.'
    },
    {
      question: 'Araçta sigara içilebilir mi?',
      answer: 'Hayır, tüm araçlarımız sigara içilmez olarak hizmet vermektedir. Araçta sigara içilmesi durumunda özel temizlik ücreti tahsil edilir.'
    },
    {
      question: 'Kiralık araçla evcil hayvan taşınabilir mi?',
      answer: 'Evcil hayvan taşıması önceden bildirilmesi gereken bir durumdur ve özel temizlik ücreti uygulanabilir. Taşıma kafesi kullanılması zorunludur.'
    },
  ],
};

const FAQPage = () => {
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
                <BreadcrumbLink>Sıkça Sorulan Sorular</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 md:p-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Sıkça Sorulan Sorular</h1>
                <p className="text-gray-600">
                  Araç kiralama hakkında en çok sorulan soruların cevaplarını burada bulabilirsiniz.
                </p>
              </div>
              
              <Tabs defaultValue="general" className="max-w-4xl mx-auto">
                <div className="mb-6 overflow-x-auto">
                  <TabsList className="w-full md:w-auto">
                    <TabsTrigger value="general">Genel</TabsTrigger>
                    <TabsTrigger value="reservation">Rezervasyon</TabsTrigger>
                    <TabsTrigger value="payment">Ödeme</TabsTrigger>
                    <TabsTrigger value="insurance">Sigorta</TabsTrigger>
                    <TabsTrigger value="rules">Kurallar</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="general">
                  <FAQ items={faqItems.general} />
                </TabsContent>
                
                <TabsContent value="reservation">
                  <FAQ items={faqItems.reservation} />
                </TabsContent>
                
                <TabsContent value="payment">
                  <FAQ items={faqItems.payment} />
                </TabsContent>
                
                <TabsContent value="insurance">
                  <FAQ items={faqItems.insurance} />
                </TabsContent>
                
                <TabsContent value="rules">
                  <FAQ items={faqItems.rules} />
                </TabsContent>
              </Tabs>
              
              <div className="mt-12 text-center">
                <p className="text-gray-700 mb-4">
                  Başka sorularınız mı var? Müşteri hizmetlerimiz size yardımcı olmaktan memnuniyet duyacaktır.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link to="/iletisim">
                    <Button className="bg-carblue-600 hover:bg-carblue-700">
                      Bize Ulaşın
                    </Button>
                  </Link>
                  <a href="tel:+902121234567">
                    <Button variant="outline">
                      <Phone size={16} className="mr-2" />
                      +90 212 123 45 67
                    </Button>
                  </a>
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

export default FAQPage;
