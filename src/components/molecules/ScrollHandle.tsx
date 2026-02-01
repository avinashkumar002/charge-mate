import { FC, useEffect } from "react";
import useScrollTo from "@/hooks/useScrollTo";
import { useSearchParams } from "next/navigation";


const ScrollHandler: FC = () => {
    const scrollTo = useScrollTo();
    const searchParams = useSearchParams();

    useEffect(() => {
        const section = searchParams.get("scroll");
        if (section) {
            setTimeout(() => scrollTo(section), 200);
        }
    }, [scrollTo, searchParams]);

    return null;
};
export default ScrollHandler;