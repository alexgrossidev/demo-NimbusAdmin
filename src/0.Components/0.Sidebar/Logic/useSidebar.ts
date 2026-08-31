import { useAuth } from "@/2.Context/useAuth";
import useNavigation from "@/4.Routing/useNavigation"

const useSidebar = () => {

    const { navigate } = useNavigation();
    const { logout } = useAuth();
    const handleLogout = () => {
        logout();
        navigate("/signin", true);
    }

    return {
        handleLogout
    }
}

export default useSidebar