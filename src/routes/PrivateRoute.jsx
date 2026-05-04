import { Navigate, useLocation } from "react-router";
import { selectCurrentToken } from "../redux/features/auth/authSlice";
import { useAppSelector } from "../redux/hooks";

const PrivateRoute = ({ children }) => {
    const token = useAppSelector(selectCurrentToken);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;
