import { Navigate } from "react-router";
import useAuthUser from '../hooks/useAuthUser';

const AccessControlRoute = ({ children }) => {
    const { isAdmin } = useAuthUser();

    if (isAdmin) {
        return children;
    }
    return <div>
        <Navigate to="/access-denied" />
    </div>;
};

export default AccessControlRoute;