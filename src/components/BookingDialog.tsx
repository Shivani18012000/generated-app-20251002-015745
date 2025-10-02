import { useState, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format, startOfDay } from 'date-fns';
import { Check, Loader2 } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { getAvailableTimes } from '@/lib/data';
import { useBookingStore, BookingStep } from '@/hooks/useBookingStore';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  phone: z.string().optional(),
});

const StepDate = () => {
  const { selectedDate, setSelectedDate, setStep } = useBookingStore();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center space-y-6">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => date < startOfDay(new Date()) || date.getDay() === 0}
        className="rounded-md border"
      />
      <Button onClick={() => setStep('time')} disabled={!selectedDate} className="w-full">
        Select Time
      </Button>
    </motion.div>
  );
};

const StepTime = () => {
  const { selectedDate, selectedTime, setSelectedTime, setStep } = useBookingStore();
  const availableTimes = useMemo(() => selectedDate ? getAvailableTimes(selectedDate) : [], [selectedDate]);
  if (!selectedDate) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <p className="text-center font-medium">Available slots for {format(selectedDate, 'PPP')}</p>
      {availableTimes.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {availableTimes.map((time) => (
            <Button
              key={time}
              variant={selectedTime === time ? 'default' : 'outline'}
              onClick={() => setSelectedTime(time)}
              className="transition-all duration-200"
            >
              {time}
            </Button>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">No available slots for this day. Please select another date.</p>
      )}
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setStep('date')} className="w-full">Back</Button>
        <Button onClick={() => setStep('details')} disabled={!selectedTime} className="w-full">
          Enter Details
        </Button>
      </div>
    </motion.div>
  );
};

const StepDetails = () => {
  const { setStep } = useBookingStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', email: '', phone: '' },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep('confirmed');
    }, 1500);
  }
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl><Input placeholder="Jane Doe" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl><Input placeholder="jane.doe@example.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number (Optional)</FormLabel>
              <FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <div className="flex gap-4 pt-4">
            <Button variant="outline" onClick={() => setStep('time')} className="w-full" disabled={isSubmitting}>Back</Button>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Booking
            </Button>
          </div>
        </form>
      </Form>
    </motion.div>
  );
};

const StepConfirmed = () => {
    const { reset, selectedService, selectedDate, selectedTime } = useBookingStore();
    useEffect(() => {
        toast.success('Appointment Confirmed!', {
            description: `We look forward to seeing you for your ${selectedService?.name.toLowerCase()} on ${format(selectedDate!, 'PPP')} at ${selectedTime}.`,
        });
    }, [selectedService, selectedDate, selectedTime]);
    return (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center text-center space-y-6 p-8">
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                <Check className="w-12 h-12 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold font-display">Booking Confirmed!</h2>
            <p className="text-muted-foreground">
                Your appointment for a <span className="font-semibold text-foreground">{selectedService?.name}</span> on <span className="font-semibold text-foreground">{format(selectedDate!, 'PPP')}</span> at <span className="font-semibold text-foreground">{selectedTime}</span> has been successfully booked.
            </p>
            <p className="text-sm text-muted-foreground">A confirmation email has been sent to you.</p>
            <Button onClick={reset} className="w-full mt-4">
                Book Another Appointment
            </Button>
        </motion.div>
    );
};

export function BookingDialog() {
  const { isOpen, step, selectedService, reset } = useBookingStore();
  const STEPS: Record<BookingStep, { title: string; description: string; component: React.ReactNode }> = {
    date: { title: 'Select a Date', description: 'Choose a day for your appointment.', component: <StepDate /> },
    time: { title: 'Select a Time', description: 'Choose an available time slot.', component: <StepTime /> },
    details: { title: 'Your Details', description: 'Please provide your contact information.', component: <StepDetails /> },
    confirmed: { title: '', description: '', component: <StepConfirmed /> },
  };
  const currentStep = STEPS[step];
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && reset()}>
      <DialogContent className="sm:max-w-[425px] transition-all duration-300">
        {step !== 'confirmed' && (
            <DialogHeader>
            <DialogTitle className="font-display text-2xl">{selectedService?.name}</DialogTitle>
            <DialogDescription>{currentStep.description}</DialogDescription>
            </DialogHeader>
        )}
        <div className="py-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -30, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {currentStep.component}
            </motion.div>
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
//