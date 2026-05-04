import AdminDashboard from './admin/AdminDashboard';
import StaffDashboard from './staff/StaffDashboard';
import { selectCurrentUser } from '../../redux/features/auth/authSlice';
import { useAppSelector } from '../../redux/hooks';

const getUserRoles = (user) => {
    if (Array.isArray(user?.roles)) {
        return user.roles
            .map((role) => (typeof role === 'string' ? role : role?.name))
            .filter(Boolean);
    }

    return user?.role ? [user.role] : [];
};

const Dashboard = () => {
    const user = useAppSelector(selectCurrentUser);
    const isAdmin = getUserRoles(user).some((role) => role.toLowerCase() === 'admin');

    return (
        <div>
            {isAdmin ? (
                <AdminDashboard />
            ) : (
                <StaffDashboard />
            )}
        </div>
    );
};

export default Dashboard;
