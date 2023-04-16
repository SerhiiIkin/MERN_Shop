import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import style from "./DataFrom.module.scss";

function DataForm() {
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
                    Email
                    <Field name="email" type="text" />
                    <ErrorMessage name="email" component={"div"} />
                </label>

                <label htmlFor="notRobot">
                    <Field name="notRobot" type="checkbox" />
                    <ErrorMessage name="notRobot" component={"div"} />
                </label>

                <button type="submit">Check out</button>
            </Form>
        </Formik>
    );
}

export default DataForm;
