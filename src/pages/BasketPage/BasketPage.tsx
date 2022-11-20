import { useAppSelector } from "../../hooks/redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import style from "./BasketPage.module.scss";

function BasketPage() {
    const { basket } = useAppSelector((state) => state.basket);

    if (!basket.length) return <p>Basket is Empty</p>;

    const SignupForm = () => {
        return (
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    notRobot: false,
                }}
                validationSchema={Yup.object({
                    firstName: Yup.string()
                        .min(2, "Must be at least 2 characters")
                        .max(15, "Must be 15 characters or less")
                        .required("Required"),
                    lastName: Yup.string()
                        .min(2, "Must be at least 2 characters")
                        .max(20, "Must be 20 characters or less")
                        .required("Required"),
                    email: Yup.string()
                        .email("Invalid email address")
                        .required("Required"),
                    notRobot: Yup.boolean().isTrue(
                        "Need to accept that you not robot"
                    ),
                })}
                onSubmit={(values) => {
                    alert(JSON.stringify(values, null, 2));
                }}>
                <Form className={style.form}>
                    <label htmlFor="firstName">
                        First Name
                        <Field name="firstName" type="text" />
                        <ErrorMessage name="firstName" component={"div"} />
                    </label>

                    <label htmlFor="lastName">
                        Last Name
                        <Field name="lastName" type="text" />
                        <ErrorMessage name="lastName" component={"div"} />
                    </label>

                    <label htmlFor="email">
                        Email Address
                        <Field name="email" type="text" />
                        <ErrorMessage name="email" component={"div"} />
                    </label>

                    <label htmlFor="notRobot">
                        <Field name="notRobot" type="checkbox" />
                        <ErrorMessage name="notRobot" component={"div"} />
                    </label>

                    <span>
                        <button type="submit">Submit</button>
                    </span>
                </Form>
            </Formik>
        );
    };

    return (
        <section>
            <article>
                <table>
                    <thead>
                        <tr>
                            <td>Title</td>
                            <td>Price per one</td>
                        </tr>
                    </thead>

                    {basket.map((item) => {
                        const { title, price } = item;
                        return (
                            <tbody key={title}>
                                <tr>
                                    <td className="p-1"> {title} </td>
                                    <td className="p-1"> {price} $</td>
                                </tr>
                            </tbody>
                        );
                    })}
                </table>
            </article>
            <article>
                <SignupForm />
            </article>
        </section>
    );
}

export default BasketPage;
