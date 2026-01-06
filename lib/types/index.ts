import { Wine } from './wine';
import { Event } from './event';

export * from './wine';
export * from './event';

export type UnifiedProduct = Wine | Event;
