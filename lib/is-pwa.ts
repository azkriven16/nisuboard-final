import { useEffect, useState } from "react";

export const useIsPWA = () => {
    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
        const isPwa = window.matchMedia("(display-mode: standalone)").matches;
        setIsPWA(isPwa);
    }, []);

    return isPWA;
};
