import { useSelector } from 'react-redux';
import { selectCurrentUser, selectCurrentToken } from '../redux/features/auth/authSlice';

const useAuth = () => {
    const user = useSelector(selectCurrentUser);
    const token = useSelector(selectCurrentToken);

    const isAuthenticated = !!token;
    const isAdmin = user?.roles?.some(r => r.name === 'admin');
    const isStaff = user?.roles?.some(r => r.name === 'staff');
    const isHr = user?.roles?.some(r => r.name === 'hr');

    return {
        user,
        token,
        isAuthenticated,
        isAdmin,
        isStaff,
        isHr,
    };
};

export default useAuth;