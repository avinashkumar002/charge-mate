import Link from "next/link";
import Image from "next/image";
import logo from "./header-img/header-logo.png";
import Container from "@/components/Container/Container";
import MobileMenuToggle from "./MobileMenuToggle";
import AuthButtons from "./AuthButtons";

const NAV_ITEMS = [
    { label: "How it Works", href: "/how-it-works" },
    { label: "Features", href: "/features" },
    { label: "FAQ", href: "/faq" },
] as const;

export default function Header() {
    return (
        <header className="w-full fixed top-0 z-1000 backdrop-blur-[20px] shadow-lg bg-white/80">
            <Container>
                <nav>
                    {/* Desktop Header */}
                    <div className="hidden lg:flex items-center justify-between py-2">
                        <Link href="/" className="flex items-center gap-2 relative w-50 h-20">
                            <Image src={logo} alt="EvSetu Logo" fill className="object-contain" sizes="100%" priority />
                        </Link>

                        <div className="flex gap-10 items-center">
                            <div className="flex gap-1 items-center">
                                {NAV_ITEMS.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="px-4 py-2 text-black-700 hover:text-[#365314] transition-colors font-medium text-md rounded-lg hover:bg-[#f5f9f0]"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>

                            {/* Auth Buttons */}
                            <AuthButtons />

                        </div>
                    </div>

                    {/* Mobile Header */}
                    <div className="flex lg:hidden items-center justify-between py-4">
                        <Link href="/" className="flex items-center gap-2 relative w-31.5 h-9.5">
                            <Image src={logo} alt="EvSetu Logo" fill className="object-contain" sizes="100%" priority />
                        </Link>

                        <MobileMenuToggle logo={logo} navItems={NAV_ITEMS} />
                    </div>
                </nav>
            </Container>
        </header>
    );
}