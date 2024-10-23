import { useCallback } from "react";

const useCommon = () => {
  // Reload function
  const reload = useCallback(() => {
    window.location.reload();
  }, []);

  return {
    reload,
  };
};

export default useCommon;
