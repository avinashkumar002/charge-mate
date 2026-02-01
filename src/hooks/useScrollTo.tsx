import { useCallback } from "react";


const useScrollTo = () => {
  const scrollTo = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({
      behavior: "smooth", //behaiour in the scroll 
      block: "start", 
    });
  }, []);

  return scrollTo;
};

export default useScrollTo;

