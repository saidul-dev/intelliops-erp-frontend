import { Navigate } from "react-router";
import { UserRole } from "../constants";


const AdminRoute = ({ children }) => {
    if (UserRole === 'admin') {
        return children;
    }
    return <div>
        <Navigate to="/denied-access" />
    </div>;
};

export default AdminRoute;