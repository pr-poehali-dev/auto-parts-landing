import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const mockParts = [
    {
      id: 1,
      name: 'Масляный фильтр',
      oem: 'OE-123456',
      analogs: ['WIX-51515', 'MANN-W712/73', 'MAHLE-OC90'],
      price: 850,
      compatibility: ['BMW 3-Series E90', 'BMW 5-Series F10', 'BMW X3 F25'],
      inStock: true,
      image: '🔩'
    },
    {
      id: 2,
      name: 'Тормозные колодки',
      oem: 'OE-789012',
      analogs: ['BREMBO-P06020', 'ATE-13.0460-7201.2', 'TRW-GDB1330'],
      price: 3200,
      compatibility: ['Audi A4 B8', 'Audi A6 C7', 'VW Passat B7'],
      inStock: true,
      image: '🔧'
    },
    {
      id: 3,
      name: 'Воздушный фильтр',
      oem: 'OE-345678',
      analogs: ['MANN-C27003', 'MAHLE-LX1780', 'BOSCH-1457433529'],
      price: 650,
      compatibility: ['Mercedes C-Class W204', 'Mercedes E-Class W212'],
      inStock: false,
      image: '⚙️'
    },
    {
      id: 4,
      name: 'Свечи зажигания',
      oem: 'OE-901234',
      analogs: ['NGK-BKR6E', 'DENSO-K20TT', 'BOSCH-0242229659'],
      price: 450,
      compatibility: ['Toyota Camry XV50', 'Toyota RAV4 XA40', 'Lexus ES XV60'],
      inStock: true,
      image: '⚡'
    }
  ];

  const filteredParts = searchQuery
    ? mockParts.filter(part => 
        part.oem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.analogs.some(analog => analog.toLowerCase().includes(searchQuery.toLowerCase())) ||
        part.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockParts;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Wrench" size={28} className="text-primary" />
            <span className="text-2xl font-bold">ТАКТИКА</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <a href="#catalog" className="hover:text-primary transition-colors">Каталог</a>
            <a href="#delivery" className="hover:text-primary transition-colors">Доставка</a>
            <a href="#payment" className="hover:text-primary transition-colors">Оплата</a>
            <a href="#warranty" className="hover:text-primary transition-colors">Гарантия</a>
            <a href="#contacts" className="hover:text-primary transition-colors">Контакты</a>
          </nav>
          <Button variant="outline" size="sm">
            <Icon name="Phone" size={16} className="mr-2" />
            +7 (800) 555-35-35
          </Button>
        </div>
      </header>

      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
        <div className="container mx-auto relative z-10 max-w-4xl text-center">
          <div className="inline-block mb-4">
            <Badge variant="secondary" className="text-sm px-4 py-1">
              <Icon name="Zap" size={14} className="mr-1" />
              Оригинал и аналоги в наличии
            </Badge>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            Запчасти для вашего автомобиля
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            Поиск по артикулу OEM с отображением совместимых аналогов. Гарантия качества и быстрая доставка.
          </p>
          
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-lg p-6 shadow-xl animate-slide-up">
            <div className="flex gap-2 mb-3">
              <div className="relative flex-1">
                <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Введите артикул OEM или название детали..."
                  className="pl-10 h-12 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button size="lg" className="px-6">
                <Icon name="Search" size={20} className="mr-2" />
                Найти
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
              <span>Примеры:</span>
              <button onClick={() => setSearchQuery('OE-123456')} className="text-primary hover:underline mono">OE-123456</button>
              <button onClick={() => setSearchQuery('MANN')} className="text-primary hover:underline mono">MANN-C27003</button>
              <button onClick={() => setSearchQuery('BREMBO')} className="text-primary hover:underline mono">BREMBO-P06020</button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold mb-2 text-center">Каталог запчастей</h2>
          <p className="text-center text-muted-foreground mb-12">
            {searchQuery ? `Найдено деталей: ${filteredParts.length}` : 'Популярные позиции в наличии'}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {filteredParts.map((part) => (
              <Card 
                key={part.id} 
                className="hover:shadow-lg transition-all duration-300 hover:border-primary/50 cursor-pointer group"
                onClick={() => setSelectedPart(selectedPart === part.oem ? null : part.oem)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-5xl">{part.image}</div>
                    <Badge variant={part.inStock ? "default" : "secondary"}>
                      {part.inStock ? 'В наличии' : 'Под заказ'}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {part.name}
                  </CardTitle>
                  <CardDescription className="mono text-base">
                    OEM: {part.oem}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                        <Icon name="Package" size={14} />
                        Аналоги ({part.analogs.length}):
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {part.analogs.map((analog, idx) => (
                          <Badge key={idx} variant="outline" className="mono text-xs">
                            {analog}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {selectedPart === part.oem && (
                      <div className="animate-accordion-down border-t border-border pt-4">
                        <p className="text-sm text-muted-foreground mb-2 flex items-center gap-2">
                          <Icon name="Car" size={14} />
                          Совместимость:
                        </p>
                        <div className="space-y-1">
                          {part.compatibility.map((car, idx) => (
                            <div key={idx} className="flex items-center gap-2 text-sm">
                              <Icon name="CheckCircle2" size={14} className="text-primary" />
                              {car}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-2xl font-bold">{part.price} ₽</p>
                      </div>
                      <Button variant={selectedPart === part.oem ? "default" : "outline"}>
                        <Icon name="ShoppingCart" size={16} className="mr-2" />
                        В корзину
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="delivery" className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Условия работы</h2>
          
          <Tabs defaultValue="delivery" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
              <TabsTrigger value="payment">Оплата</TabsTrigger>
              <TabsTrigger value="warranty">Гарантия</TabsTrigger>
            </TabsList>

            <TabsContent value="delivery" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Icon name="Truck" size={32} className="text-primary mb-2" />
                    <CardTitle>По России</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Доставка в любой регион транспортными компаниями. Срок 3-7 дней.</p>
                    <p className="font-bold mt-4">От 350 ₽</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Icon name="MapPin" size={32} className="text-primary mb-2" />
                    <CardTitle>Самовывоз</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Заберите заказ со склада в удобное для вас время.</p>
                    <p className="font-bold mt-4">Бесплатно</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Icon name="Zap" size={32} className="text-primary mb-2" />
                    <CardTitle>Курьером</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Доставка курьером по городу в день заказа.</p>
                    <p className="font-bold mt-4">От 500 ₽</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="payment" className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <Icon name="CreditCard" size={32} className="text-primary mb-2" />
                    <CardTitle>Банковской картой</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Принимаем все виды карт: Visa, Mastercard, МИР.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Icon name="Wallet" size={32} className="text-primary mb-2" />
                    <CardTitle>Наличными</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Оплата наличными при получении заказа.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <Icon name="Building2" size={32} className="text-primary mb-2" />
                    <CardTitle>Безналичный расчёт</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Для юридических лиц с НДС и без.</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="warranty" className="space-y-6">
              <Card>
                <CardHeader>
                  <Icon name="Shield" size={48} className="text-primary mb-4" />
                  <CardTitle className="text-2xl">Гарантия качества</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Оригинальные запчасти</p>
                      <p className="text-muted-foreground">Работаем только с проверенными поставщиками. Все детали имеют сертификаты.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Гарантийный срок</p>
                      <p className="text-muted-foreground">На все запчасти предоставляется гарантия от 6 до 24 месяцев.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Icon name="CheckCircle2" size={20} className="text-primary mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold mb-1">Возврат и обмен</p>
                      <p className="text-muted-foreground">Возможность вернуть или обменять товар в течение 14 дней.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="contacts" className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Контакты</h2>
          <p className="text-muted-foreground mb-12">Свяжитесь с нами удобным способом</p>

          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Icon name="Phone" size={32} className="text-primary mb-2 mx-auto" />
                <CardTitle>Телефон</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">+7 (800) 555-35-35</p>
                <p className="text-sm text-muted-foreground mt-2">Пн-Пт: 9:00 - 20:00<br />Сб-Вс: 10:00 - 18:00</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="Mail" size={32} className="text-primary mb-2 mx-auto" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">info@autoparts.ru</p>
                <p className="text-sm text-muted-foreground mt-2">Ответим в течение 1 часа</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Icon name="MapPin" size={32} className="text-primary mb-2 mx-auto" />
                <CardTitle>Адрес</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">г. Москва</p>
                <p className="text-sm text-muted-foreground mt-2">ул. Автомобильная, 15<br />БЦ "Мотор", офис 301</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Button size="lg" className="px-8">
              <Icon name="MessageCircle" size={20} className="mr-2" />
              Написать в поддержку
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Wrench" size={24} className="text-primary" />
              <span className="font-bold">ТАКТИКА</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 ТАКТИКА. Все права защищены.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;