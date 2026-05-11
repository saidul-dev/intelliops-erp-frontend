import { Navigate } from "react-router";
import useAuthUser from '../hooks/useAuthUser';

const AdminRoute = ({ children }) => {
    const { isAdmin } = useAuthUser();

    if (isAdmin) {
        return children;
    }
    return <div>
        <Navigate to="/denied-access" />
    </div>;
};

export default AdminRoute;