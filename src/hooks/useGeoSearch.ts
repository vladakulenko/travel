import { useState } from 'react';
import { fetchCountries } from '../services/countryService';
import { searchGeoEntities } from '../services/geoService';
import type { GeoEntity } from '../types/geo';

export const useGeoSearch = () => {
    const [value, setValue] = useState('');
    const [items, setItems] = useState<GeoEntity[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<GeoEntity | null>(null);

    const openDropdown = async () => {
        setIsOpen(true);

        if (selected?.type === 'country') {
            setItems(await fetchCountries());
        }

        if (selected && selected.type !== 'country') {
            setItems(await searchGeoEntities(value));
        }

        if (!selected) {
            setItems(await fetchCountries());
        }
    };

    const onInputChange = async (val: string) => {
        setValue(val);
        setIsOpen(true);

        if (!val) {
            setItems(await fetchCountries());
        } else {
            setItems(await searchGeoEntities(val));
        }
    };

    const onSelect = (item: GeoEntity) => {
        setSelected(item);
        setValue(item.name);
        setIsOpen(false);
    };

    return {
        value,
        items,
        isOpen,
        selected,
        openDropdown,
        onInputChange,
        onSelect,
    };
};
