/**
 * Назначение файла: Описание интерфейса Мероприятия (Event).
 * Зависимости: Нет.
 * Особенности: Используется для отображения дегустаций, праздников и других событий.
 */

export interface Event {
    id: string; // UUID
    title: string;
    slug: string; // For URL routing
    date: string; // ISO date string or formatted date
    time: string;
    location: string;
    description: string;

    // Booking details
    spots: number; // Changed from string to number for logic
    price: number; // Changed from string to number for calculations

    // Media
    image: string;

    // Classification
    category: 'Weinfest' | 'Weinprobe' | 'Kellerblicke' | 'Weintreff' | 'Afterwork' | 'Weinwanderung' | 'Sonstiges';

    // Flags for specific UI handling if needed, though category covers most
    isFull?: boolean;
}