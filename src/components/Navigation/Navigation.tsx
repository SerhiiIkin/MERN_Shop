import { MouseEvent, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { authSlice } from "../../store/slices/authSlice";
import classNames from "classnames";
import style from "./Navigation.module.css";

function Navigation() {
    const { isAuth, username, role } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [active, setActive] = useState(false);

    function logoutHandler(event: MouseEvent<HTMLButtonElement>) {
        dispatch(authSlice.actions.logout());
    }

    function menuBurgerHandler(event: MouseEvent<HTMLDivElement>) {
        document.body.style.overflow = active ? "" : "hidden";
        setActive((prev) => !prev);
        event.stopPropagation();
    }

    function onClickMenuCurtain(event: MouseEvent<HTMLDivElement>) {
        setActive(false);
        document.body.style.overflow = "";
    }

    return (
        <nav className={style.nav}>
            <Link className={style.link} to={"/"}>
                Shop
            </Link>

            <div
                onClick={onClickMenuCurtain}
                className={classNames(
                    active ? style.box__menu : "",
                    style.box
                )}>
                <div
                    className={classNames(
                        style.menu,
                        active ? style.active : ""
                    )}>
                    {role === "ADMIN" && (
                        <Link className={style.link} to={"/addProduct"}>
                            Add product
                        </Link>
                    )}

                    <Link className={style.link} to={"/"}>
                        Products
                    </Link>
                    {!isAuth && (
                        <Link className={style.link} to={"/authorization"}>
                            Authorization
                        </Link>
                    )}
                    {isAuth && (
                        <>
                            <span className="font-bold px-1">{username}</span>
                            <button
                                className={style.link}
                                onClick={logoutHandler}>
                                Logout
                            </button>
                        </>
                    )}
                </div>
                <div
                    onClick={menuBurgerHandler}
                    className={classNames(
                        style.burger,
                        active ? style.burger__open : ""
                    )}>
                    <span></span>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
