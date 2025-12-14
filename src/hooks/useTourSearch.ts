import { useState, useMemo } from 'react';
import { startSearchPrices, getSearchPrices, getHotels } from '../api/api';
import { waitUntil } from '../utils/wait';
import type { SearchState } from '../types/search';

const MAX_RETRIES = 2;

export type PriceItem = {
    id: string;
    amount: number;
    currency: string;
    startDate: string;
    endDate: string;
    hotelID: number;
};

export type TourResult = {
    id: string;
    hotelName: string;
    price: number;
    currency: string;
    startDate: string;
    endDate: string;
};

type Hotel = {
    id: number;
    name: string;
    img: string;
    cityId: number;
    cityName: string;
    countryId: string;
    countryName: string;
};

export const useTourSearch = () => {
    const [state, setState] = useState<SearchState>('idle');
    const [error, setError] = useState<string | null>(null);
    const [rawResults, setRawResults] = useState<Record<
        string,
        PriceItem
    > | null>(null);
    const [hotels, setHotels] = useState<Record<number, Hotel>>({});

    const startSearch = async (countryID: string) => {
        let retries = 0;

        try {
            setError(null);
            setRawResults(null);
            setState('loading');

            const startResponse = await startSearchPrices(countryID);
            const { token, waitUntil: waitTime } = await startResponse.json();

            setState('waiting');
            await waitUntil(waitTime);

            while (true) {
                try {
                    setState('loading');

                    const response = await getSearchPrices(token);
                    const data: { prices: Record<string, PriceItem> } =
                        await response.json();

                    // Fetch hotels for the country to use synchronously
                    const hotelsResponse = await getHotels(countryID);
                    const hotelsData: Record<number, Hotel> =
                        await hotelsResponse.json();
                    setHotels(hotelsData);

                    setRawResults(data.prices);
                    setState('success');
                    break;
                } catch (err) {
                    const errorResponse =
                        err instanceof Response
                            ? err
                            : new Response(
                                  JSON.stringify({
                                      code: 500,
                                      message: 'Unknown error',
                                  }),
                                  { status: 500 }
                              );
                    const errorData = await errorResponse.json();

                    if (errorData.code === 425) {
                        setState('waiting');
                        await waitUntil(errorData.waitUntil);
                        continue;
                    }

                    retries += 1;

                    if (retries > MAX_RETRIES) {
                        throw new Error(errorData.message || 'Search failed');
                    }
                }
            }
        } catch (e) {
            setState('error');
            setError((e as Error).message);
        }
    };

    const results = useMemo((): TourResult[] => {
        if (!rawResults) return [];

        return Object.values(rawResults).map((item) => {
            const hotel = hotels[item.hotelID];
            return {
                id: item.id,
                hotelName: hotel?.name || 'Unknown Hotel',
                price: item.amount,
                currency: item.currency,
                startDate: item.startDate,
                endDate: item.endDate,
            };
        });
    }, [rawResults, hotels]);

    return {
        startSearch,
        state,
        error,
        rawResults,
        results,
    };
};
