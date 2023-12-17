import { Box, Grid, Paper, Skeleton } from "@mui/material";
import useFormStyle from "../hooks/useFormStyle";
import { UserType } from "../../types/userType";
import profileBackground from "./profileBackground.jpg";
import { useAppSelector } from "../../redux/store/hooks";
import CenterDiv from "../common/CenterDiv";
//import absentProfile from "./absentProfile.jpg";
import absentProfile from "./defaultprofile.jpg";

interface Props {
    user: UserType;
}

const Content = ({ user }: Props) => {
    const loginPaperStyle = useFormStyle();

    let avatar = <Skeleton />;
    if (user?.avatar?.length > 0) {
        avatar = (
            <img
                src={absentProfile}
                alt={user.name}
                className="users-profile-container-avatar-img-container"
            />
        );
    } else {
        avatar = (
            <CenterDiv>
                <img
                    src={absentProfile}
                    alt={user.name}
                    className="users-profile-container-avatar-img-container"
                />
            </CenterDiv>
        );
    }

    const content = (
        <Box>
            <img
                src={profileBackground}
                alt="profile background"
                className="users-profile-container-avatar-img-backgroud"
            />
            {avatar}
            <CenterDiv>
                <p>{user.name}</p>
            </CenterDiv>
            <CenterDiv>
                <p>{user.email}</p>
            </CenterDiv>
        </Box>
    );
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                height: "100%",
                width: "100%",
            }}
        >
            <Paper elevation={2} style={loginPaperStyle} square={false}>
                {content}
            </Paper>
        </Box>
    );
};

const Profile = () => {
    const { user, token } = useAppSelector((state) => state.auth);

    if (!token || !user) return <div>Not loggedIn</div>;

    return <Content user={user} />;
};

export default Profile;
