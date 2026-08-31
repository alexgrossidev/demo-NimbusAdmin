import { useNavigate, useLocation, useRouter } from "@tanstack/react-router";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const router = useRouter();

  const getParams = () => {
    const searchParams = new URLSearchParams(location.search);
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  return {
    navigate: (to: string, replace = false) =>
      navigate({ to, replace, from: "/" }),
    goBack: () => router.history.back(),
    pathname: location.pathname,
    isActive: (path: string) => location.pathname.startsWith(path),
    getParams,
  };
};

export default useNavigation;
