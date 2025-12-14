import type { GeoEntity } from '../types/geo';

export const getCountryID = (selected: GeoEntity | null): string | null => {
    if (!selected) return null;

    if (selected.type === 'country') {
        return String(selected.id);
    }

    // city | hotel
    return selected.countryId ?? null;
};
