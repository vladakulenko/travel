import { getCountries } from '../api/api';
import type { GeoEntity } from '../types/geo';

type CountryData = {
    id: string;
    name: string;
    flag: string;
};

export const fetchCountries = async (): Promise<GeoEntity[]> => {
    const response = await getCountries();
    const data: Record<string, CountryData> = await response.json();

    return Object.values(data).map((country) => ({
        ...country,
        type: 'country' as const,
    }));
};
