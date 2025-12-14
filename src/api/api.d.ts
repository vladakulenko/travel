import type { Country } from '../types/geo';

export function getCountries(): Promise<Response>;

export function searchGeo(string: string): Promise<Response>;

export type CountriesMap = Record<string, Country>;

