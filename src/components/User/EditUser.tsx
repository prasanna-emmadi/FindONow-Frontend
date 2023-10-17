import { useAppSelector } from "../../redux/store/hooks";
import ErrorPage from "../ErrorPage";
import CreateUpdateUser from "./CreateUpdateUser";

const EditUser = () => {
    const auth = useAppSelector((state) => state.auth);
    if (auth?.user === undefined) {
        return <ErrorPage />;
    }

    return <CreateUpdateUser defaultValues={{ ...auth.user }} />;
};

export default EditUser;
