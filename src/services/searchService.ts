import { startSearchPrices } from '../api/api';

export type StartSearchResponse = {
    token: string;
    waitUntil: string;
};

export const startTourSearch = async (
    countryID: string
): Promise<StartSearchResponse> => {
    const response = await startSearchPrices(countryID);

    if (!response.ok) {
        const error = await response.json();
        throw error;
    }

    return response.json();
};
