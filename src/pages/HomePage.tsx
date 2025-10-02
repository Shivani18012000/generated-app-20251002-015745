import { motion } from 'framer-motion';
import { Scissors, Sparkles, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/lib/data';
import { BookingDialog } from '@/components/BookingDialog';
import { useBookingDialog } from '@/hooks/useBookingStore';
import { Toaster } from 'sonner';
const HeroSection = () => {
  const openBookingDialog = useBookingDialog();
  return (
    <section className="relative w-full h-[70vh] md:h-[80vh] flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-black/50 z-10" />
      <motion.img
        src="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?q=80&w=2070&auto=format&fit=crop"
        alt="Luxurious salon interior"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: 'easeInOut' }}
      />
      <div className="relative z-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience Serenity, Embrace Beauty
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Your personal oasis for luxury hair and beauty services. Step in and let us pamper you to perfection.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-10"
        >
          <Button
            size="lg"
            onClick={() => openBookingDialog(services[0])}
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg font-semibold rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Book Your Appointment
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
const ServicesSection = () => {
  const openBookingDialog = useBookingDialog();
  return (
    <section id="services" className="w-full bg-background py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium services, designed to rejuvenate and inspire.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="overflow-hidden">
                  <img src={service.image} alt={service.name} className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <CardHeader>
                  <CardTitle className="font-display text-xl">{service.name}</CardTitle>
                  <p className="text-lg font-semibold text-primary">${service.price}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button onClick={() => openBookingDialog(service)} className="w-full transition-all duration-300 active:scale-95">
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <Scissors className="h-6 w-6 text-primary" />
          <span className="text-xl font-display font-bold">SerenityScheduler</span>
        </div>
        <p className="text-muted-foreground">123 Beauty Lane, Serene City, 12345</p>
        <p className="text-muted-foreground mt-2">© {new Date().getFullYear()} SerenityScheduler. All rights reserved.</p>
        <p className="text-sm text-muted-foreground/80 mt-6">Built with ��️ at Cloudflare</p>
      </div>
    </footer>
  );
};
export function HomePage() {
  return (
    <div className="bg-background font-sans">
      <main>
        <HeroSection />
        <ServicesSection />
      </main>
      <Footer />
      <BookingDialog />
      <Toaster richColors position="top-center" />
    </div>
  );
}