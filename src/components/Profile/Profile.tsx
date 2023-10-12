import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useAppSelector } from "../../redux/store/hooks";

const Profile = () => {
    const { user, token } = useAppSelector((state) => state.auth);
    if (!token || !user) return <div>Not loggedIn</div>;

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                sx={{ height: 140 }}
                image={user.avatar}
                title="profile"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {user.email}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default Profile;
