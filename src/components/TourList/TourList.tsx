type Props = {
    results: Array<{
        id: string;
        hotelName: string;
        price: number;
        currency: string;
        startDate: string;
        endDate: string;
    }>;
};

export const TourList = ({ results }: Props) => {
    if (!results.length) return <p>Немає результатів</p>;

    return (
        <ul>
            {results.map((tour) => (
                <li key={tour.id}>
                    <h4>{tour.hotelName}</h4>
                    <p>
                        Ціна: {tour.price} {tour.currency}
                    </p>
                    <p>
                        Дати: {tour.startDate} — {tour.endDate}
                    </p>
                </li>
            ))}
        </ul>
    );
};
