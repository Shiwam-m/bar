export interface MenuItem {
  id: number;
  category: string;
  name: string;
  description: string;
  price: number;
  image_url?: string;
  is_special?: boolean;
  dietary?: string;
}

export interface Reservation {
  id: number;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
  status: string;
  created_at: string;
}

export interface ReservationCreate {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes?: string;
}

export interface EventItem {
  id: number;
  title: string;
  timing: string;
  description: string;
  image_url?: string;
  is_active: boolean;
}

export interface ReviewItem {
  id: number;
  author: string;
  text: string;
  rating: number;
  source: string;
  created_at: string;
}

export interface GalleryItem {
  id: number;
  type: 'photo' | 'video';
  url: string;
  videoUrl?: string;
  title: string;
  duration?: string;
}
