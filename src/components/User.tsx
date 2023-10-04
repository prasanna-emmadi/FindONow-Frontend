import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../features/api/apiSlice";
import { User as UserType } from "../types/userType"
import Suspense from "./Suspense";

interface Props {
    data: UserType | undefined
}

const InnerUser = ({ data }: Props) => {
    if (!data) return <div />;
    return <div>{data.email}</div>
}

const User = () => {
    const { id } = useParams();
    const {
        data,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery(id);

    let content = <Suspense
        data={data}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        error={error}
        Component={InnerUser} />

    return (
        <section className="user-list">
            <h2>User</h2>
            {content}
        </section>
    )
}
export default User;