import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Skeleton,
    Typography,
} from "@mui/material";
import { useGetUsersQuery } from "../../redux/apiSlice";
import { UserType } from "../../types/userType";
import Suspense from "../common/Suspense";

interface Props {
    data: UserType[];
}

const Content = ({ data }: Props) => {
    const users = data;
    const list = (
        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
            {users.map((user) => {
                let avatar = <Skeleton />;
                if (user?.avatar?.length > 0) {
                    avatar = <img src={user.avatar} alt={user.name} />;
                }

                return (
                    <Box key={user._id}>
                        <ListItem key={user._id}>
                            <ListItemAvatar>
                                <Avatar>{avatar}</Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={user.name}
                                secondary={user.email}
                                secondaryTypographyProps={{
                                    textOverflow: "ellipsis",
                                    overflow: "hidden",
                                }}
                                style={{
                                    maxWidth: "400px",
                                    wordBreak: "break-all",
                                }}
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </Box>
                );
            })}
        </List>
    );

    return list;
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
            Component={Content}
        />
    );

    return (
        <section className="users-list">
            <Typography
                variant="h3"
                color="text.primary"
                style={{ textAlign: "center" }}
                pb={2}
            >
                Users List
            </Typography>

            {content}
        </section>
    );
};
export default UserList;
