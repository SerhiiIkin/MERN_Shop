import { FormEvent, useState } from "react";
import axios from "../../axios";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useAppDispatch } from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import useTextArea from "../../hooks/useTextArea";
import { IProducts } from "../../models/models";
import { addProduct } from "../../store/actions/productsActions";
import style from "./AddProduct.module.css";
import classnames from "classnames";

function AddProduct() {
    const title = useInput();
    const price = useInput();
    const category = useInput();
    const description = useTextArea();
    const image = useTextArea();

    const [isError, setIsError] = useState(false);
    const dispatch = useAppDispatch();

    function submitHandler(event: FormEvent) {
        event.preventDefault();
        createProduct();
    }

    async function createProduct() {
        setIsError(false);
        
        const newProduct: IProducts = {
            title: title.value,
            price: +price.value,
            category: category.value,
            description: description.textAreaValue,
            image: image.textAreaValue,
        };

        try {
            const response = await axios.post("/products", newProduct);

            title.clearInput()
            price.clearInput()
            category.clearInput()
            description.clearTextAreaValue()
            image.clearTextAreaValue()
            dispatch(addProduct(response.data));
        } catch (error) {
            console.log(error);

            setIsError(true);
        }
    }

    return (
        <>
            <form
                onSubmit={submitHandler}
                className="flex flex-col items-start">
                <label className={style.label} htmlFor="title">
                    Title
                    <input
                        type="text"
                        name="title"
                        id="title"
                        value={title.value}
                        onChange={title.onChange}
                        className={style.input}
                    />
                </label>

                <label className={style.label} htmlFor="price">
                    Price
                    <input
                        type="text"
                        name="price"
                        id="price"
                        value={price.value}
                        onChange={price.onChange}
                        className={style.input}
                    />
                </label>

                <label className={style.label} htmlFor="category">
                    Category
                    <input
                        type="text"
                        name="category"
                        id="category"
                        value={category.value}
                        onChange={category.onChange}
                        className={style.input}
                    />
                </label>

                <label className={style.label} htmlFor="description">
                    Description
                    <textarea
                        className={classnames(style.input, style.areaInput)}
                        name="description"
                        id="description"
                        value={description.textAreaValue}
                        onChange={description.onChangeTextarea}
                    />
                </label>

                <label className={style.label} htmlFor="image">
                    Image URL
                    <textarea
                        name="image"
                        className={classnames(style.input, style.areaInput)}
                        onChange={image.onChangeTextarea}
                        value={image.textAreaValue}
                        id="image"
                    />
                </label>

                <button
                    className={style.submitBtn}
                    type="submit">
                    Send
                </button>
            </form>
            {isError && (
                <ErrorMessage style={style.error} error={isError ? "Cant add product" : "Product was added"} />
            )}
        </>
    );
}

export default AddProduct;
