import classNames from "classnames";
import { FormEvent, MouseEvent, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login, register } from "../../store/actions/authActions";
import { AuthData } from "../../models/models";

import style from "./Authorization.module.css";

function Authorization() {
    const inputName = useRef<HTMLInputElement>(null);
    const inputPas = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const { error, token } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [inputNameError, setInputNameError] = useState(false);
    const [inputPassError, setInputPassError] = useState(false);

    useEffect(() => {
        if (token) {
            toast("You successfully login in system!");
            navigate("/");
        }
        error ? setErrorText(error) : setErrorText("");
    }, [token, navigate, error]);

    function isFormValid(inputName: string, inputPas: string) {
        if (!inputName.trim().length && !inputPas.trim().length) {
            setInputNameError(true);
            setInputPassError(true);
            return "Username and password are required!";
        }
        if (!inputName.trim().length) {
            setInputNameError(true);
            setInputPassError(false);
            return "Username are required!";
        }
        if (!inputPas.trim().length) {
            setInputNameError(false);
            setInputPassError(true);
            return "Password are required!";
        } else {
            setErrorText("");
            setInputNameError(false);
            setInputPassError(false);
            return {
                username: inputName,
                password: inputPas,
            };
        }
    }

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setErrorText("");

        if (inputName.current && inputPas.current) {
            const inputsUserData: string | AuthData = isFormValid(
                inputName.current.value,
                inputPas.current.value
            );

            if (typeof inputsUserData !== "string") {
                dispatch(login(inputsUserData));
                if (error) {
                    setIsError(true);
                    setErrorText(error);
                }
            } else {
                setIsError(true);
                setErrorText(inputsUserData);
            }
        }
    }

    function onBtnRegisterClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        setErrorText("");

        if (inputName.current && inputPas.current) {
            const inputsUserData: string | AuthData = isFormValid(
                inputName.current.value,
                inputPas.current.value
            );

            if (typeof inputsUserData !== "string") {
                dispatch(register(inputsUserData));
                if (error) {
                    setIsError(true);
                    setErrorText(error);
                }
            } else {
                setIsError(true);
                setErrorText(inputsUserData);
            }
        }
    }

    return (
        <form onSubmit={submitHandler} className={style.list}>
            <label htmlFor="username" className="pb-2">
                Username:
                <input
                    className={classNames(
                        style.inputStyle,
                        " p-1 ml-2",
                        inputNameError ? style.errorStyleBtn : ""
                    )}
                    type="text"
                    id="username"
                    autoFocus
                    ref={inputName}
                />
            </label>

            <label htmlFor="password" className="pb-2">
                Password:
                <span
                    className={classNames(
                        style.inputStyle,
                        "relative ml-3.5",
                        inputPassError ? style.errorStyleBtn : ""
                    )}>
                    <input
                        className="focus:outline-none p-1"
                        type={showPassword ? "password" : "text"}
                        id="password"
                        autoComplete=""
                        ref={inputPas}
                    />

                    <button
                        type="button"
                        className="absolute right-2 top-1/2 translate-y-[-50%]"
                        onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                    </button>
                </span>
            </label>

            <div>
                <button
                    className={classNames(style.btn, " bg-blue-400")}
                    type="submit">
                    Login
                </button>
                <button
                    onClick={onBtnRegisterClick}
                    type="button"
                    className={classNames(style.btn, " bg-green-400")}>
                    Register
                </button>
            </div>

            {isError && <ErrorMessage style={style.error} error={errorText} />}
        </form>
    );
}
export default Authorization;
