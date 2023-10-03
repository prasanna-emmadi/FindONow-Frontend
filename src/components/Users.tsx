
import { List } from "@mui/material";
import { useGetUsersQuery } from "../features/api/apiSlice"
import { Link } from "react-router-dom";
import { User } from "../types/userType";


const UserList = () => {
    const {
        data: users,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetUsersQuery()

    let content

    if (isLoading) {
        content = <div>Loading...</div>
    } else if (isSuccess) {
        content =
            <List>{users.map((user: User) => {
                const to = "/users/" + user.id
                return (<Link to={to} key={user.id}>
                    <div>{user.email} </div>
                </Link>)
            })}
            </List>

    } else if (isError) {
        content = <div>{error.toString()}</div>
    }

    return (
        <section className="users-list">
            <h2>users</h2>
            {content}
        </section>
    )
}
export default UserList