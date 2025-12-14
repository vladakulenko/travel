import type { SearchState } from '../../types/search';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

type Props = {
    state: SearchState;
    error: string | null;
};

export const SearchStatus = ({ state, error }: Props) => {
    if (state === 'idle') return null;

    if (state === 'waiting') {
        return <p>Очікуємо готовність результатів…</p>;
    }

    if (state === 'loading') {
        return <p>Завантаження…</p>;
    }

    if (state === 'error' && error) {
        return <ErrorMessage message={error} />;
    }

    return null;
};
