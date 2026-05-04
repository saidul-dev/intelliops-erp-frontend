import { Navigate } from "react-router";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const PublicRoute = ({ children }) => {
    const token = useAppSelector(selectCurrentToken);

    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
