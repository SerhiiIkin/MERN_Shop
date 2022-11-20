import { FormEvent, useState, ChangeEvent, createRef } from "react";
import { useAppDispatch } from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import useTextArea from "../../hooks/useTextArea";
import { addProduct } from "../../store/actions/productsActions";

import classnames from "classnames";
import { FaDownload, FaImage } from "react-icons/fa";

import style from "./AddProduct.module.css";

function AddProduct() {
    const title = useInput("");
    const price = useInput("");
    const category = useInput("");
    const description = useTextArea("");
    const dispatch = useAppDispatch();
    const [image, setImage] = useState("");
    const inputFile = createRef<HTMLInputElement>();

    function submitHandler(event: FormEvent) {
        event.preventDefault();
        createProduct();
    }

    function onImageChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    function createProduct() {
        let imageFile: any;
        if (inputFile.current && inputFile.current.files) {
            imageFile = inputFile?.current?.files[0];
        }
        const newProduct = new FormData();
        newProduct.append("title", title.value);
        newProduct.append("price", price.value);
        newProduct.append("category", category.value);
        newProduct.append("description", description.textAreaValue);
        newProduct.append("image", imageFile);

        dispatch(addProduct(newProduct));

        title.clearInput();
        price.clearInput();
        category.clearInput();
        description.clearTextAreaValue();
        setImage("");
    }

    return (
        <form onSubmit={submitHandler} className="flex flex-col items-start">
            <label className={style.label} htmlFor="title">
                Title
                <input
                    required
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
                    required
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
                    required
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
                    required
                    className={classnames(style.input, style.areaInput)}
                    name="description"
                    id="description"
                    value={description.textAreaValue}
                    onChange={description.onChangeTextarea}
                />
            </label>

            <label
                className="flex items-center rounded outline outline-dashed p-2 mb-2"
                htmlFor="image">
                Download image
                <FaDownload className="ml-2" />
                <input
                    type="file"
                    name="image"
                    id="image"
                    className="hidden"
                    ref={inputFile}
                    onChange={onImageChange}
                />
            </label>
            <div className="w-[16rem] h-[16rem] mb-2 flex items-center justify-center">
                {image ? (
                    <img
                        className="max-w-contain max-h-full "
                        src={image}
                        alt="Preview"
                    />
                ) : (
                    <span className="flex flex-col items-center">
                        Preview image
                        <FaImage />
                    </span>
                )}
            </div>

            <button className={style.submitBtn} type="submit">
                Send
            </button>
        </form>
    );
}

export default AddProduct;
