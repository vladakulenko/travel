import type React from 'react';

import { useGeoSearch } from '../../hooks/useGeoSearch';
import { useTourSearch } from '../../hooks/useTourSearch';
import { getCountryID } from '../../utils/getCountryId';
import { Input } from './Input/Input';
import { Dropdown } from './Dropdown/Dropdown';
import { SearchStatus } from '../SearchStatus/SearchStatus';
import { TourList } from '../TourList/TourList';

import styles from './FormContainer.module.css';

export const FormContainer = () => {
    const {
        value,
        items,
        isOpen,
        selected,
        openDropdown,
        onInputChange,
        onSelect,
    } = useGeoSearch();
    const { startSearch, state, error, results } = useTourSearch();
    const countryID = getCountryID(selected);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!countryID) return;

        startSearch(countryID);
    };

    return (
        <form onSubmit={onSubmit} className={styles['form-wrapper']}>
            <Input
                value={value}
                placeholder='Куди їдемо?'
                onClick={openDropdown}
                onChange={onInputChange}
            />

            {isOpen && <Dropdown items={items} onSelect={onSelect} />}

            <button className={styles.button} type='submit'>
                Знайти
            </button>

            <SearchStatus state={state} error={error} />

            {state === 'success' && <TourList results={results} />}
        </form>
    );
};
