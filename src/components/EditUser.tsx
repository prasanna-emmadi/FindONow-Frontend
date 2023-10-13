import { useAppSelector } from "../redux/store/hooks";
import CreateUpdateUser from "./CreateUpdateUser";
import ErrorPage from "./ErrorPage";

const EditUser = () => {
    const auth = useAppSelector((state) => state.auth);
    if (auth?.user === undefined) {
        return <ErrorPage />;
    }

    return <CreateUpdateUser defaultValues={{ ...auth.user }} />;
};

export default EditUser;
