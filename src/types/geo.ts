export type GeoType = 'country' | 'city' | 'hotel';

export interface GeoEntity {
    id: string | number;
    name: string;
    type: GeoType;

    flag?: string;
    img?: string;
    countryId?: string;
}

export type Country = {
    id: string;
    name: string;
    flag: string;
};
