import Link from "next/link";
import Image from "next/image";
import logo from "./header-img/header-logo.png";
import world from "./header-img/world.svg";
import Container from "@/components/Container/Container";
import Typography from "@/components/Typography/Typography";
import ScrollNavLink from "../ScrollNavLink/ScrollNavLink";
import MobileMenuToggle from "./MobileMenuToggle";
import Button from "../Button/Button";

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
                        <Link href="/" className="flex items-center gap-2 relative w-[166px] h-[50px]">
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
                                <div className="px-[19px] py-[9px] border border-[#727272] rounded-lg">
                                    <div className="flex gap-2 items-center">
                                        <div className="relative w-4 h-4">
                                            <Image src={world} alt="language" fill className="object-contain" sizes="100%" priority />
                                        </div>
                                        <Typography variant="para" weight={500} className="text-black-700">
                                            EN
                                        </Typography>
                                    </div>
                                </div>

                                {/* Login Button */}
                                <Link href="/login">
                                    <Button
                                        text="Login"
                                        bg="#FFFFFF"
                                        color="#101010"
                                        hoverBg="#F5F5F5"
                                        variant="sm"
                                    />
                                </Link>

                                {/* Sign Up Button */}
                                <Link href="/signup">
                                    <Button
                                        text="Sign Up"
                                        bg="#d9f99d"
                                        color="#101010"
                                        hoverBg="#bef264"
                                        variant="sm"
                                    />
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Header */}
                    <div className="flex lg:hidden items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-2 relative w-[126px] h-[38px]">
                            <Image src={logo} alt="ChargeMate Logo" fill className="object-contain" sizes="100%" priority />
                        </Link>

                        <MobileMenuToggle logo={logo} navItems={NAV_ITEMS} />
                    </div>
                </nav>
            </Container>
        </header>
    );
}