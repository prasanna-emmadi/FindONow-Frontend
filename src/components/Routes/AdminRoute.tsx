import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

interface Props {
    children: React.ReactNode;
}

const AdminRoute = ({ children }: Props) => {
    const { token, isAdmin } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token && !isAdmin) {
            navigate("/home");
        }
    }, [token, isAdmin, navigate]);

    return <>{children}</>;
};

export default AdminRoute;
