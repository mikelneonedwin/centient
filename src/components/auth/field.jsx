/**
 * Wrapper for HTML inputs
 * @typedef {object} props
 * @property {string} name
 * @property {string} value
 * @property {React.ChangeEventHandler<HTMLInputElement>} onChange
 * @property {"text" | "password" | "email"} type
 * @property {string} title
 * @property {string} placeholder
 * @property {number=} minLength
 * @param {props} param0 
 * @returns {React.JSX.Element}
 */
const Field = ({
    name,
    value,
    onChange,
    type,
    title,
    placeholder,
    minLength
}) => {
    
    /**
     * Specify an auto complete attribute for the HTML Input fields
     * @returns {React.HTMLInputAutoCompleteAttribute}
     */
    const autoComplete = () => {
        if (type === "password")
            return "new-password webauthn";

        else if (type === "email")
            return "email webauthn";

        else return "off";
    }

    return (
        <div className="flex flex-col gap-0">
            <label htmlFor={name}>{title}</label>
            <input
                name={name}
                value={value}
                onChange={onChange}
                type={type}
                placeholder={placeholder}
                minLength={minLength}
                required={true}
                autoComplete={autoComplete()}
                className="focus:outline-none focus:!border-b-primary/85 placeholder:italic"
            />
        </div>
    );
}

export default Field;