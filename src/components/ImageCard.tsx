function ImageCard({ picLink, styles }: { picLink: string | undefined, styles: string }) {
    return (
        <img className={styles} src={picLink} alt="product" />
    );
}
export default ImageCard;
