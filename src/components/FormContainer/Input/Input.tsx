import styles from './Input.module.css';

type Props = {
    value: string;
    placeholder?: string;
    onClick: () => void;
    onChange: (value: string) => void;
};

export const Input = ({ value, placeholder, onClick, onChange }: Props) => {
    return (
        <input
            className={styles.input}
            value={value}
            placeholder={placeholder}
            onClick={onClick}
            onChange={(e) => onChange(e.target.value)}
        />
    );
};
