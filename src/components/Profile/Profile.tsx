import EditIcon from "@mui/icons-material/Edit";
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Grid,
    Paper,
    Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/store/hooks";
import { paperStyle } from "../styles";

const loginPaperStyle = {
    ...paperStyle,
    width: 400,
};

const Profile = () => {
    const { user, token } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    if (!token || !user) return <div>Not loggedIn</div>;

    const onEditClick = () => {
        navigate("/users/edit");
    };

    return (
        <Paper elevation={1} style={loginPaperStyle}>
            <Grid
                alignItems="center"
                justifyContent="center"
                style={{ textAlign: "center" }}
            >
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
                        <Typography variant="body2" color="text.secondary">
                            {user.role}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <Button
                            color="primary"
                            onClick={onEditClick}
                            startIcon={<EditIcon />}
                        >
                            Edit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Paper>
    );
};

export default Profile;
