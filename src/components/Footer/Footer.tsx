import { FC } from "react";
import Link from "next/link";
import Container from "../Container/Container";
import Typography from "@/components/Typography/Typography";
import Image from "next/image";
import globe from "./footer-img/globe.svg"
import twitter from "./footer-img/twitter.svg"
import fb from "./footer-img/fb.svg"
import insta from "./footer-img/insta.svg"
import logo from "../Header/header-img/header-logo.png";
import ScrollNavLink from "@/components/ScrollNavLink/ScrollNavLink";

const Footer: FC = () => {
    return (
        <footer className="w-full">
            <div className="flex flex-col">
                <div className="bg-[#ecfccb] py-8 lg:py-12.5 ">
                    <Container>
                        <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">
                            <div className="flex flex-col gap-3 max-w-full lg:max-w-[320px]">
                                <div className="flex items-center relative w-34 h-10">
                                    <Image
                                        src={logo}
                                        alt="world"
                                        fill
                                        className="object-contain"
                                        sizes="100%"
                                        priority
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <Typography variant="body" weight={600} lineHeight={34} letterSpacing={0.01} className="text-[#132457]">
                                        Claim your charging spot first.
                                    </Typography>
                                    <Typography variant="para" weight={500} className="text-[#434343]">
                                        Smart, verified charging stations from locals near events.
                                    </Typography>
                                </div>
                            </div>
                            <div className="flex justify-between lg:justify-start lg:gap-[124px]">
                                <div className="flex flex-col gap-5">
                                    <div className="">
                                        <Typography variant="para" weight={600} className="text-[#132457]">
                                            Company
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <ScrollNavLink
                                            label="How it Works"
                                            target="how-it-works"
                                            typographyClassName="text-[#2B2B2B] cursor-pointer"
                                        />
                                        <ScrollNavLink
                                            label="Features"
                                            target="features-view"
                                            typographyClassName="text-[#2B2B2B] cursor-pointer"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-5">
                                    <div className="">
                                        <Typography variant="para" weight={600} className="text-[#132457]">
                                            Support
                                        </Typography>
                                    </div>
                                    <div className="flex flex-col gap-3">
                                        <Link href="">
                                            <Typography variant="para" weight={500} className="text-[#2B2B2B] cursor-pointer">
                                                Help Center
                                            </Typography>
                                        </Link>
                                        <Link href="">
                                            <Typography variant="para" weight={500} className="text-[#2B2B2B] cursor-pointer">
                                                Safety Issues
                                            </Typography>
                                        </Link>
                                        <Link href="">
                                            <Typography variant="para" weight={500} className="text-[#2B2B2B] cursor-pointer">
                                                Cancellation Option
                                            </Typography>
                                        </Link>
                                        <Link href="">
                                            <Typography variant="para" weight={500} className="text-[#2B2B2B] cursor-pointer">
                                                Report Concern
                                            </Typography>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                <div className="py-4 lg:py-5">
                    <Container>
                        <div className="flex flex-col gap-4 lg:flex-row lg:justify-between">
                            <div className="flex gap-8 lg:gap-10">
                                <Typography variant="para" weight={600} className="text-[#132457]">
                                    © 2025 ChargeMate
                                </Typography>

                                <Link href="">
                                    <Typography variant="para" weight={500} className="text-[#2B2B2B] cursor-pointer">
                                        Privacy
                                    </Typography>
                                </Link>

                                <Link href="">
                                    <Typography variant="para" weight={500} className="text-[#2B2B2B] cursor-pointer">
                                        Terms & Conditions
                                    </Typography>
                                </Link>
                            </div>
                            <div className="flex gap-8 lg:gap-10 justify-center">
                                <div className="flex gap-3 items-center">
                                    <div className="flex items-center relative w-4 lg:w-5 h-4 lg:h-5">
                                        <Image
                                            src={globe}
                                            alt="world"
                                            fill
                                            className="object-contain"
                                            sizes="100%"
                                            priority
                                        />
                                    </div>
                                    <Typography variant="body" weight={500} className="text-[#2B2B2B]">
                                        English
                                    </Typography>
                                </div>

                                <div className="flex gap-6 lg:gap-8 items-center">
                                    <Link href="https://twitter.com" target="_blank">
                                        <div className="flex items-center gap-2 relative w-5 h-5 lg:w-6 lg:h-6 cursor-pointer">
                                            <Image
                                                src={twitter}
                                                alt="twitter"
                                                fill
                                                className="object-contain"
                                                sizes="100%"
                                                priority
                                            />
                                        </div>
                                    </Link>

                                    <Link href="https://facebook.com" target="_blank">
                                        <div className="flex items-center gap-2 relative w-5 h-5 lg:w-6 lg:h-6 cursor-pointer">
                                            <Image
                                                src={fb}
                                                alt="facebook"
                                                fill
                                                className="object-contain"
                                                sizes="100%"
                                                priority
                                            />
                                        </div>
                                    </Link>

                                    <Link href="https://instagram.com" target="_blank">
                                        <div className="flex items-center gap-2 relative w-5 h-5 lg:w-6 lg:h-6 cursor-pointer">
                                            <Image
                                                src={insta}
                                                alt="instagram"
                                                fill
                                                className="object-contain"
                                                sizes="100%"
                                                priority
                                            />
                                        </div>
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </footer>
    )
}

export default Footer;