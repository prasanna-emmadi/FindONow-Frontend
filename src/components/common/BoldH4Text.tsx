import { Typography, Box } from "@mui/material";

interface BoldTextProps {
    text: string;
}

const BoldH4Text = ({ text }: BoldTextProps) => {
    return (
        <Typography variant={"h4"}>
            <Box sx={{ fontWeight: "bold", m: 1 }}>{text}</Box>
        </Typography>
    );
};

export default BoldH4Text;