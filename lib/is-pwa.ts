import { useEffect, useState } from "react";

export const useIsPWA = () => {
    const [isPWA, setIsPWA] = useState(false);

    useEffect(() => {
        const updateIsPWA = () => {
            const isPwa = window.matchMedia(
                "(display-mode: standalone)"
            ).matches;
            setIsPWA(isPwa);
            if (isPwa) {
                window.location.reload();
            }
        };

        const mediaQueryList = window.matchMedia("(display-mode: standalone)");
        mediaQueryList.addEventListener("change", updateIsPWA);
        updateIsPWA();

        return () => {
            mediaQueryList.removeEventListener("change", updateIsPWA);
        };
    }, []);

    return isPWA;
};
