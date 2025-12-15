import styles from './TourCard.module.css';

type Props = {
    hotelName: string;
    hotelImg?: string;
    country: string;
    countryFlag: string;
    city: string;
    startDate: string;
    price: number;
    currency: string;
    onOpenPrice?: () => void;
};

export const TourCard = ({
    hotelName,
    hotelImg,
    country,
    countryFlag,
    city,
    startDate,
    price,
    currency,
    onOpenPrice,
}: Props) => {
    const formattedDate = new Date(startDate).toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });

    const formattedPrice = price.toLocaleString('uk-UA');

    return (
        <div className={styles.card}>
            <img
                src={hotelImg || '/fallback-hotel.png'}
                alt={hotelName}
                className={styles.image}
            />
            <div className={styles.content}>
                <h3 className={styles.hotelName}>{hotelName}</h3>
                <p className={styles.location}>
                    <img
                        src={countryFlag || '/fallback-flag.png'}
                        alt={country}
                        className={styles.countryFlag}
                    />{' '}
                    {country}, {city}
                </p>
                <p className={styles.startDate}>
                    Старт туру
                    <span>{formattedDate}</span>
                </p>
                <p className={styles.price}>
                    {formattedPrice} {currency}
                </p>
                <a
                    href={'#'}
                    className={styles.openPrice}
                    onClick={onOpenPrice}
                >
                    Відкрити ціну
                </a>
            </div>
        </div>
    );
};
