interface ErrorMsg {
    text: string
    type: "alert" | "notice" | "warning"
}

export const ErrorMessage = (props: ErrorMsg) => {

    return (
        <div className={`ErrorMessage err-${props.type}`}>
            <div>
                Error: {props.text}
            </div>
        </div>
    );
};