type Props = {
    message: string;
};

export const ErrorMessage = ({ message }: Props) => {
    return (
        <div role='alert'>
            <strong>Не вдалося виконати пошук</strong>
            <p>{message}</p>
            <p>Спробуйте пізніше</p>
        </div>
    );
};
