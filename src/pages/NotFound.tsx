import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function NotFound() {
    const params = useParams();
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5);

    useEffect(() => {
        seconds !== 0
            ? setTimeout(() => setSeconds(seconds - 1), 1000)
            : navigate("/");
    }, [seconds, params, navigate]);

    return (
        <div className="text-center">
            <span>Automatics back to home page after {seconds} sec...</span>
            <p className="text-red-500">Page not found!</p>
        </div>
    );
}

export default NotFound;
