function ImageCard({ picLink, imgCard }: { picLink: string | undefined, imgCard: string }) {
    return (
        <img className={imgCard} src={picLink} alt="product" />
    );
}
export default ImageCard;
