import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from "@mui/material";

const Profile = () => {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia sx={{ height: 140 }} image="" title="profile" />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    Profile
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Name</Button>
                <Button size="small">E-mail</Button>
            </CardActions>
        </Card>
    );
};

export default Profile;
