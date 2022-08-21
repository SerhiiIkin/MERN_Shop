import { FormEvent, MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import useInput from "../../hooks/useInput";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { login, register } from "../../store/actions/authActions";
import style from "./Authorization.module.css";

function Authorization() {
    const inputName = useInput();
    const inputPas = useInput();
    const dispatch = useAppDispatch();
    const { error, token, message } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        token && navigate("/shop");
        message && setIsError(true)
    }, [token, navigate, message]);

    function isFormValid() {
        return inputName.value.trim().length && inputPas.value.trim().length;
    }

    function submitHandler(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const inputsUserData = {
            username: inputName.value,
            password: inputPas.value,
        };
        
        isFormValid() ? dispatch(login(inputsUserData)) : setIsError(true);
    }

    function onBtnRegisterClick(event: MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const inputsUserData = {
            username: inputName.value,
            password: inputPas.value,
        };

        isFormValid() ? dispatch(register(inputsUserData)) : setIsError(true);
    }

    return (
        <form onSubmit={submitHandler}>
            <ul className="flex flex-col items-center relative pb-6">
                <li className="pb-2">
                    <label htmlFor="username">Username:</label>
                    <input
                        className="ml-2 p-1 rounded border border-grey-800"
                        type="text"
                        id="username"
                        {...inputName}
                    />
                </li>
                <li className="pb-2">
                    <label htmlFor="password">Password:</label>
                    <input
                        className="ml-2 p-1 rounded border border-grey-800"
                        type="password"
                        id="password"
                        autoComplete=""
                        {...inputPas}
                    />
                </li>
                <li>
                    <button
                        className="mr-2 border border-grey-400 rounded px-2 py-1 bg-blue-400"
                        type="submit">
                        Login
                    </button>
                    <button
                        onClick={onBtnRegisterClick}
                        className="mr-2 border border-grey-400 rounded px-2 py-1 bg-green-400"
                        >
                        Register
                    </button>
                </li>
                {(error || isError) && (
                    <ErrorMessage
                        style={style.error}
                        error={error || message}
                    />
                )}
            </ul>

            
        </form>
    );
}
export default Authorization;
