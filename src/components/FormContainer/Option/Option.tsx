import type { GeoEntity } from '../../../types/geo';
import styles from './Option.module.css';

type Props = {
    item: GeoEntity;
    onSelect: (item: GeoEntity) => void;
};

export const Option = ({ item, onSelect }: Props) => {
    return (
        <li className={styles.item} onClick={() => onSelect(item)}>
            {item.flag && <img src={item.flag} width={20} />}
            {item.img && <img src={item.img} width={30} />}
            <div>
                <div>{item.name}</div>
            </div>
        </li>
    );
};
