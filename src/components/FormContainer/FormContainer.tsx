import { useGeoSearch } from '../../hooks/useGeoSearch';
import { Input } from './Input/Input';
import { Dropdown } from './Dropdown/Dropdown';
import type React from 'react';

import styles from './FormContainer.module.css';

export const FormContainer = () => {
    const { value, items, isOpen, openDropdown, onInputChange, onSelect } =
        useGeoSearch();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // здесь дальше будет реальный поиск туров
        console.log('SUBMIT SEARCH:', value);
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
        </form>
    );
};
