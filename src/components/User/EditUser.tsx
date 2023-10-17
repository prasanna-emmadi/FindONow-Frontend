import { useAppSelector } from "../../redux/store/hooks";
import ErrorPage from "../Common/ErrorPage";
import SignUp from "./SignUp";

const EditUser = () => {
    const auth = useAppSelector((state) => state.auth);
    if (auth?.user === undefined) {
        return <ErrorPage />;
    }

    return <SignUp defaultValues={{ ...auth.user }} />;
};

export default EditUser;
