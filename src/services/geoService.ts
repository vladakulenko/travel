import { searchGeo } from '../api/api';
import type { GeoEntity } from '../types/geo';

export const searchGeoEntities = async (
    query: string
): Promise<GeoEntity[]> => {
    const response = await searchGeo(query);
    const data = await response.json();

    return Object.values(data);
};
