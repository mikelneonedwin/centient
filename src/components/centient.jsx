import clsx from "clsx";

/**
 * Centient's brand text
 * @typedef {object} props
 * @property {string=} className
 * @param {props} param0 
 * @returns {JSX.Element}
 */
const Centient = ({ className }) => {
    return (
        <b className={
            clsx(
                "px-8 inline-flex items-center rounded-tl-full rounded-br-full italic text-3xl md:text-4xl pt-1.5 pb-2 bg-primary/95 font-rubik tracking-wider font-bold",
                className
            )
        }>
            Centient
        </b>
    );
}

export default Centient;