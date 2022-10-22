function ErrorMessage({ error,style }: { error: string, style: string }) {
    return <div className={style}>{error}</div>;
}
export default ErrorMessage;
