import { useEffect } from "react";

const useGoToTop = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
};

export default useGoToTop;
