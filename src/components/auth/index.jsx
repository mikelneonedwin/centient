//@ts-nocheck

import { Link, useNavigate } from "react-router-dom";
import Field from "./field";
import Button from "./button";
import isEmail from "is-email";
import { sendPasswordResetEmail, confirmPasswordReset, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase";
import { useRef, useState } from "react";
import { Modal } from "materialize-css";

/**
 * Auth component for signup and login page
 * @typedef {object} props
 * @property {"sign-up" | "sign-in"} route
 * @param {props} param0 
 * @returns {React.JSX.Element}
 */
const Auth = ({ route }) => {

    const navigateTo = useNavigate();
    /** @type {App.Ref<HTMLDivElement>} */
    const modalRef = useRef(null);

    const [formData, setFormData] = useState({
        otp: "",
        email: "",
        password: "",
        displayName: "",
        passwordConfirm: ""
    })

    const noAuth = () => {
        localStorage.setItem('noAuth', 'true');
        navigateTo('/dashboard');
    }

    /**
     * @typedef {"confirm"} passwordReset
     * @typedef {React.Dispatch<React.SetStateAction<passwordReset>>} setPasswordReset
     * @type {[ passwordReset, setPasswordReset ]}
     */
    const [passwordReset, setPasswordReset] = useState(false);

    let isNotDisabled;

    if (passwordReset === true) {
        isNotDisabled = isEmail(formData.email);
    }
    else if (passwordReset === "confirm") {
        isNotDisabled = formData.otp && formData.password.length > 5
    }
    else {
        isNotDisabled =
            isEmail(formData.email) &&
            formData.password.length > 5

        if (route === "sign-up") {
            isNotDisabled =
                isNotDisabled &&
                formData.displayName.length > 2 &&
                formData.passwordConfirm.length > 5
        }
    }

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const showModal = () => {
        const instance = Modal.init(modalRef.current);
        instance.open();
    }

    /**
     * Handle state changes for the different input fields
     * @type {React.ChangeEventHandler<HTMLInputElement>}
     * @returns {void}
     */
    const handleChange = (event) =>
        setFormData((value) => ({
            ...value,
            [event.target.name]: event.target.value
        }))

    /**
     * Handle form submission
     * @type {React.FormEventHandler<HTMLFormElement>}
     */
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (route === "sign-up" && formData.password !== formData.passwordConfirm)
            return setError("Passwords don't match");

        setLoading(true);

        try {
            if (passwordReset === true) {
                await sendPasswordResetEmail(auth, formData.email);
                setLoading(false);
                return setPasswordReset("confirm");
            }
            if (passwordReset === "confirm") {
                await confirmPasswordReset(auth, formData.otp, formData.password);
            }
            if (route === "sign-up") {
                const { user } = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
                await updateProfile(user, {
                    displayName: formData.displayName
                })
            }
            if (route === "sign-in") {
                await signInWithEmailAndPassword(auth, formData.email, formData.password);
            }
            return navigateTo("/", { replace: true })
        }
        catch (err) {
            if (err instanceof Error)
                setError(err.message)
            else if (typeof err === "string")
                setError(err);
            else
                setError('Sorry, an error occured');
            console.error(err);
        }
    }

    return (
        <div className="container">
            <div ref={modalRef} className="modal">
                <div className="modal-content bg-subdark">
                    <h4>Are you sure?</h4>
                    <p>
                        If you don&apos;t continue with an account, you won&apos;t be able to sync your data between your devices
                    </p>
                </div>
                <div className="modal-footer !bg-subdark flex justify-end gap-4 items-center !px-[24px]">
                    <button 
                        onClick={noAuth}
                        className="modal-close font-medium"
                    >
                        Agree
                    </button>
                    <button className="modal-close font-medium text-secondary">
                        {route == "sign-in" ? "Sign In" : "Sign Up"}
                    </button>
                </div>
            </div>
            {!passwordReset && (
                <div onClick={showModal} className="fixed top-2 left-0 w-full text-right mt-4 px-4 text-sm font-medium tracking-wide text-shade">
                    Continue without an account?
                </div>
            )}
            <div className="flex h-screen justify-center items-center">
                <div className="container mx-6 flex flex-col gap-4">
                    <h2 className="font-bold text-4xl font-inter center">
                        {passwordReset === "confirm"
                            ? "Reset Password"
                            : passwordReset
                                ? "Forgot Password"
                                : route === "sign-in"
                                    ? "Sign In"
                                    : "Sign Up"
                        }
                    </h2>
                    <p className="text-center flex gap-1 items-center justify-center text-shade">
                        {error
                            ? <span className="font-semibold text-red-400">{error}</span>
                            : (!passwordReset
                                ? (
                                    <>
                                        <span>
                                            {route === "sign-in"
                                                ? "Don't have an account yet?"
                                                : "Already have an account?"
                                            }
                                        </span>
                                        <Link
                                            className="text-secondary font-semibold"
                                            to={route === "sign-in" ? "/signup" : "/login"}
                                        >
                                            {route === "sign-in" ? "Sign up" : "Sign in"}
                                        </Link>
                                    </>
                                ) : (
                                    <span>
                                        {passwordReset === "confirm"
                                            ? "Confirm new password and OTP"
                                            : "Enter email to get OTP"
                                        }
                                    </span>
                                )
                            )
                        }
                    </p>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        {route == "sign-up" && (
                            <Field
                                type="text"
                                value={formData.displayName}
                                onChange={handleChange}
                                name="displayName"
                                placeholder="John Doe"
                                title="Your Name"
                                minLength={3}
                            />
                        )}
                        {passwordReset !== "confirm" && (
                            <Field
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                name="email"
                                placeholder="john.doe@example.com"
                                title="Email"
                            />
                        )}
                        {passwordReset === "confirm" && (
                            <Field
                                type="text"
                                value={formData.otp}
                                onChange={handleChange}
                                name="otp"
                                placeholder="Enter OTP sent to your email"
                                title="Confirm OTP"
                            />
                        )}
                        {passwordReset !== true && (
                            <Field
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                name="password"
                                placeholder={"At least six characters"}
                                title={passwordReset === "confirm" ? "New Password" : "Password"}
                                minLength={6}
                            />
                        )}
                        {route == "sign-up" && (
                            <Field
                                type="password"
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                name="passwordConfirm"
                                placeholder="Also six characters long"
                                title="Confirm Password"
                                minLength={6}
                            />
                        )}
                        <div className="mt-4">
                            <Button
                                loading={loading}
                                disabled={!isNotDisabled}
                            >
                                {passwordReset
                                    ? "Get Email"
                                    : route == "sign-in"
                                        ? "Login"
                                        : "Register"
                                }
                            </Button>
                        </div>
                        {route === "sign-in" && !passwordReset && (
                            <div className="text-center text-secondary text-sm font-semibold">
                                <button
                                    type="button"
                                    onClick={() => setPasswordReset(true)}
                                >
                                    Forgot password?
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Auth;