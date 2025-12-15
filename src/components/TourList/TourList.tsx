import { TourCard } from '../TourCard/TourCard';
import type { TourResult } from '../../hooks/useTourSearch';

import styles from './TourList.module.css';

type Props = {
    results: TourResult[];
};

export const TourList = ({ results }: Props) => {
    if (!results.length) return <p>Немає результатів</p>;

    return (
        <div className={styles['tour-list-wrapper']}>
            {results.map((tour) => (
                <TourCard
                    key={tour.id}
                    hotelName={tour.hotelName}
                    hotelImg={tour.hotelImg}
                    country={tour.countryName || ''}
                    countryFlag={tour.countryFlag || ''}
                    city={tour.cityName || ''}
                    startDate={tour.startDate}
                    price={tour.price}
                    currency={tour.currency}
                />
            ))}
        </div>
    );
};
