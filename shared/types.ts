export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
// Minimal real-world chat example types (shared by frontend and worker)
export interface User {
  id: string;
  name: string;
}
export interface Chat {
  id: string;
  title: string;
}
export interface ChatMessage {
  id: string;
  chatId: string;
  userId: string;
  text: string;
  ts: number; // epoch millis
}
// SerenityScheduler Types
export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  image: string;
}
export interface Booking {
  serviceId: string;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone?: string;
}