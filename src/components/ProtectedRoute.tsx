import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
    const { token } = useAuthContext();
    const location = useLocation();

    if (!token) {
        return <Navigate to="/home" replace state={{ from: location }} />;
    }

    return children;
};

export default ProtectedRoute;
