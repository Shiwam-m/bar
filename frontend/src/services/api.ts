import { MenuItem, Reservation, ReservationCreate, EventItem, ReviewItem } from '../types';

const API_BASE = '/api/v1';

export async function fetchMenu(category?: string): Promise<MenuItem[]> {
  const url = category ? `${API_BASE}/menu/?category=${encodeURIComponent(category)}` : `${API_BASE}/menu/`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch menu items');
  return res.json();
}

export async function fetchGroupedMenu(): Promise<Record<string, MenuItem[]>> {
  const res = await fetch(`${API_BASE}/menu/grouped`);
  if (!res.ok) throw new Error('Failed to fetch grouped menu');
  return res.json();
}

export async function fetchCategories(): Promise<string[]> {
  const res = await fetch(`${API_BASE}/menu/categories`);
  if (!res.ok) throw new Error('Failed to fetch menu categories');
  return res.json();
}

export async function createReservation(data: ReservationCreate): Promise<Reservation> {
  const res = await fetch(`${API_BASE}/reservations/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || 'Failed to submit reservation');
  }
  return res.json();
}

export async function fetchEvents(): Promise<EventItem[]> {
  const res = await fetch(`${API_BASE}/events/`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
}

export async function fetchReviews(): Promise<ReviewItem[]> {
  const res = await fetch(`${API_BASE}/reviews/`);
  if (!res.ok) throw new Error('Failed to fetch reviews');
  return res.json();
}

export async function submitReview(review: { author: string; text: string; rating: number }): Promise<ReviewItem> {
  const res = await fetch(`${API_BASE}/reviews/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error('Failed to submit review');
  return res.json();
}
