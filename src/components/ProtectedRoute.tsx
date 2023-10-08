import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { useEffect } from "react";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { token } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/home");
        }
    }, [token, navigate]);

    return <>{children}</>;
};

export default ProtectedRoute;
