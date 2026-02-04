import Link from "next/link";
import Image from "next/image";
import logo from "./header-img/header-logo.png";
import world from "./header-img/world.svg";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import ScrollNavLink from "../ScrollNavLink/ScrollNavLink";
import MobileMenuToggle from "./MobileMenuToggle";
import AuthButtons from "./AuthButtons";

const NAV_ITEMS = [
    { label: "How it Works", target: "how-it-works" },
    { label: "Features", target: "features-view" },
    { label: "FAQ", target: "faq-view" }
] as const;

export default function Header() {
    return (
        <header className="w-full fixed top-0 z-1000 backdrop-blur-[20px] shadow-lg bg-white/80">
            <Container>
                <nav>
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between py-2">
                        <Link href="/" className="flex items-center gap-2 relative w-41.5 h-12.5">
                            <Image src={logo} alt="ChargeMate Logo" fill className="object-contain" sizes="100%" priority />
                        </Link>

                        <div className="flex gap-10">
                            <div className="flex gap-3 items-center">
                                {NAV_ITEMS.map((item) => (
                                    <ScrollNavLink
                                        key={item.target}
                                        label={item.label}
                                        target={item.target}
                                        className="px-2.5 py-4"
                                    />
                                ))}
                            </div>

                            <div className="flex gap-3 items-center">
                                {/* Language Selector */}
                                <div className="px-4.75 py-2.25 border border-[#727272] rounded-lg">
                                    <div className="flex gap-2 items-center">
                                        <div className="relative w-4 h-4">
                                            <Image src={world} alt="language" fill className="object-contain" sizes="100%" priority />
                                        </div>
                                        <Typography variant="para" weight={500} className="text-black-700">
                                            EN
                                        </Typography>
                                    </div>
                                </div>

                                {/* Auth Buttons */}
                                <AuthButtons />
                            </div>
                        </div>
                    </div>

                    {/* Mobile Header */}
                    <div className="flex lg:hidden items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-2 relative w-31.5 h-9.5">
                            <Image src={logo} alt="ChargeMate Logo" fill className="object-contain" sizes="100%" priority />
                        </Link>

                        <MobileMenuToggle logo={logo} navItems={NAV_ITEMS} />
                    </div>
                </nav>
            </Container>
        </header>
    );
}