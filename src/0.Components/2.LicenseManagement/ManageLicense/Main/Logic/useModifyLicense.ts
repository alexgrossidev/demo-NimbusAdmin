import { useCallback } from "react";

interface ManageLicenseHookProps {
  navigate: (path: string) => void;
}

const useModifyLicense = (props: ManageLicenseHookProps) => {
  const { navigate } = props;

  const onModifyPermissions = useCallback(
    (id: number) => {
      navigate(`/users/permissions?id=${id}`);
    },
    [navigate],
  );

  return { onModifyPermissions };
};

export default useModifyLicense;
