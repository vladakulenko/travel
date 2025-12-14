import type { Country } from '../types/geo';

export function getCountries(): Promise<Response>;

export function searchGeo(string: string): Promise<Response>;

export function startSearchPrices(countryID: string): Promise<Response>;

export function getSearchPrices(token: string): Promise<Response>;

export function getHotels(countryID: string): Promise<Response>;

export function getHotel(hotelId: number): Promise<Response>;

export type CountriesMap = Record<string, Country>;
