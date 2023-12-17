import { paperStyle } from "../common/paperStyles";
import { useIsDesktop } from "./useIsDesktop";

const useFormStyle = () => {
    const isDesktop = useIsDesktop();
    let formStyle;
    if (isDesktop) {
        formStyle = {
            ...paperStyle,
            width: 600,
        };
    } else {
        formStyle = paperStyle;
    }
    return formStyle;
};

export default useFormStyle;
