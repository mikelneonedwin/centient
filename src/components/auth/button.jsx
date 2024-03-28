import clsx from "clsx";

/**
 * @typedef {object} props
 * @property {boolean} disabled
 * @property {boolean} loading
 * @property {React.ReactNode} children
 * @param {props} param0 
 * @returns {React.JSX.Element}
 */
const Button = ({ disabled, loading, children }) => {
    return (
        <button
            disabled={disabled || loading}
            type="submit"
            className={
                clsx(
                    "w-full py-1.5 bg-secondary rounded-lg text-center capitalize disabled:cursor-not-allowed font-semibold text-xl md:text-2xl",
                    disabled ? "bg-secondary/50 text-gray-200" : "bg-secondary",
                    loading && "flex items-center justify-center py-2"
                )
            }
        >
            {loading ? (
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx={12}
                        cy={12}
                        r={10}
                        stroke="currentColor"
                        strokeWidth={4}
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            ) : children}
        </button>
    );
}

export default Button;