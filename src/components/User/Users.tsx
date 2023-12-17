import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetUsersQuery } from "../../redux/apiSlice";
import { UserType } from "../../types/userType";
import Suspense from "../common/Suspense";

interface Props {
    data: UserType[];
}

const InnerUserList = ({ data }: Props) => {
    const users = data;
    const navigate = useNavigate();
    return (
        <TableContainer component={Paper}>
            <Table
                sx={{ minWidth: 650 }}
                size="small"
                aria-label="a dense table"
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell align="right">Email</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}
                            onClick={() => {
                                navigate("/users/" + user._id);
                            }}
                        >
                            <TableCell component="th" scope="row">
                                {user._id}
                            </TableCell>
                            <TableCell align="right">{user.email}</TableCell>
                            <TableCell align="right">{user.name}</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const UserList = () => {
    const { data, isLoading, isSuccess, isError, error } = useGetUsersQuery();

    let content = (
        <Suspense
            data={data}
            isLoading={isLoading}
            isSuccess={isSuccess}
            isError={isError}
            error={error}
            Component={InnerUserList}
        />
    );

    return <section className="users-list">{content}</section>;
};
export default UserList;
