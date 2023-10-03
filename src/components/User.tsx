import { useParams } from "react-router-dom";
import { useGetUserQuery } from "../features/api/apiSlice";

const User = () => {
    const { id } = useParams();
    const {
        data: user,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUserQuery(id);

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content = <div>{user.email}</div>
    } else if (isError) {
        content = <div>{error.toString()}</div>
    }
    return (
        <section className="user-list">
            <h2>user</h2>
            {content}
        </section>
    )
}
export default User;