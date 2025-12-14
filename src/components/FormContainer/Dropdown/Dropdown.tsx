import { Option } from '../Option/Option';
import type { GeoEntity } from '../../../types/geo';
import styles from './Dropdown.module.css';

type Props = {
    items: GeoEntity[];
    onSelect: (item: GeoEntity) => void;
};

export const Dropdown = ({ items, onSelect }: Props) => {
    return (
        <ul className={styles['dropdown-wrapper']}>
            {items.map((item) => (
                <Option
                    key={`${item.type}-${item.id}`}
                    item={item}
                    onSelect={onSelect}
                />
            ))}
        </ul>
    );
};
