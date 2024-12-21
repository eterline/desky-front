export const ErrorMessage = (props: ErrorMsg) => {

    return (
        <div className={`ErrorMessage err-${props.type}`}>
            <div>
                Error: {props.text}
            </div>
        </div>
    );
};