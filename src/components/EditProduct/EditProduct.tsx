import { FormEvent, ChangeEvent, createRef, MouseEvent } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import useInput from "../../hooks/useInput";
import useTextArea from "../../hooks/useTextArea";
import { changeProduct } from "../../store/actions/productsActions";

import classnames from "classnames";
import { FaDownload, FaImage } from "react-icons/fa";

import styles from "./EditProduct.module.css";

interface EditProductProps {
    isOpen: boolean;
    setIsDialog: any;
}

function EditProduct({ isOpen, setIsDialog }: EditProductProps) {
    const { product } = useAppSelector((state) => state.products);

    const dispatch = useAppDispatch();

    const title = useInput(product.title);
    const price = useInput(String(product.price));
    const category = useInput(product.category);
    const description = useTextArea(product.category);
    const inputFile = createRef<HTMLInputElement>();

    const image = useInput(String(product.image));

    function submitHandler(event: FormEvent) {
        event.preventDefault();
        updateProduct();
    }

    function onImageChange(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files[0]) {
            image.changeValue(URL.createObjectURL(event.target.files[0]));
        }
    }

    function updateProduct() {
        let imageFile: any;
        if (inputFile.current && inputFile.current.files) {
            imageFile = inputFile?.current?.files[0];
        }

        const updatedProduct = new FormData();

        updatedProduct.append("title", title.value);
        updatedProduct.append("price", price.value);
        updatedProduct.append("category", category.value);
        updatedProduct.append("description", description.textAreaValue);
        updatedProduct.append("image", imageFile);
        updatedProduct.append("_id", String(product._id));

        dispatch(changeProduct(updatedProduct));
        setIsDialog(false);
    }

    function onBgClick() {
        setIsDialog(false);
    }

    function onContentClick(event: MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    function onBtnResetCLick() {
        title.changeValue(product.title);
        price.changeValue(String(product.price));
        category.changeValue(product.category);
        description.changeValue(product.description);
        image.changeValue(String(product.image));
    }

    return (
        <dialog
            open={isOpen}
            onClick={onBgClick}
            className={styles.containerDialog}>
            <div className={styles.wrapperContent} onClick={onContentClick}>
                <form
                    onSubmit={submitHandler}
                    className="flex flex-col items-start">
                    <label className={styles.label} htmlFor="title">
                        Title
                        <input
                            required
                            type="text"
                            name="title"
                            id="title"
                            value={title.value}
                            onChange={title.onChange}
                            className={styles.input}
                        />
                    </label>

                    <label className={styles.label} htmlFor="price">
                        Price
                        <input
                            required
                            type="text"
                            name="price"
                            id="price"
                            value={price.value}
                            onChange={price.onChange}
                            className={styles.input}
                        />
                    </label>

                    <label className={styles.label} htmlFor="category">
                        Category
                        <input
                            required
                            type="text"
                            name="category"
                            id="category"
                            value={category.value}
                            onChange={category.onChange}
                            className={styles.input}
                        />
                    </label>

                    <label className={styles.label} htmlFor="description">
                        Description
                        <textarea
                            required
                            className={classnames(
                                styles.input,
                                styles.areaInput
                            )}
                            name="description"
                            id="description"
                            value={description.textAreaValue}
                            onChange={description.onChangeTextarea}
                        />
                    </label>

                    <label className={styles.inputFIle} htmlFor="image">
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
                    <div className={styles.imgPreview}>
                        {image ? (
                            <img
                                className="max-w-contain max-h-full "
                                src={image.value}
                                alt="Preview"
                            />
                        ) : (
                            <span className="flex flex-col items-center">
                                Preview image
                                <FaImage />
                            </span>
                        )}
                    </div>

                    <div className={styles.btnContainer}>
                        <button className={styles.submitBtn} type="submit">
                            Update
                        </button>
                        <button
                            className={styles.cancelBtn}
                            onClick={onBtnResetCLick}
                            type="button">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}

export default EditProduct;
