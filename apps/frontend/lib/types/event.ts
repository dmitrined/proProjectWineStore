/**
 * Назначение файла: Описание интерфейса Мероприятия (Event).
 * Зависимости: Нет.
 * Особенности: Используется для отображения дегустаций, праздников и других событий.
 */

export interface Event {
    id: string; // UUID (from backend Long)
    title: string;
    slug: string; // For URL routing
    date: string; // ISO date string "YYYY-MM-DD"
    time: string;
    location: string;
    description: string;

    // Booking details
    spots: number; // Total spots
    booked_spots?: number; // Added from backend
    price: number; // price_per_person

    // Media
    image: string; // image_url

    // Classification
    category: 'Weinfest' | 'Weinprobe' | 'Kellerblicke' | 'Weintreff' | 'Afterwork' | 'Weinwanderung' | 'Sonstiges';

    // Flags
    isFull?: boolean; // is_full
}