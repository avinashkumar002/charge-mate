import { FC } from "react";
import Container from "@/components/Container/Container";
import AnimatedCarSection from "@/components/molecules/AnimatedCarSection";
import Image from "next/image";
import parkedCar from "@/assets/svgs/parked-car.svg"
import Typography from "@/components/Typography/Typography";
import Link from "next/link";
import Button from "@/components/Button/Button";

export const ThankYouPage: FC = () => {
    return (
        <>
            {/* herosection */}
            <section className="relative bg-[url('/find-bg.svg')] md:bg-[url('/find-bg-desk.svg')]  bg-cover bg-center bg-no-repeat">
                <Container>
                    <div className="flex flex-col items-center pt-8 pb-8 md:pb-[70px] gap-4 md:gap-8 max-w-[620px] mx-auto ">
                        <div className="relative w-15 h-15 md:w-[126px] md:h-[126px] ">
                            <Image
                                src="/ok.gif"
                                alt="My GIF"
                                fill
                                unoptimized
                                className="object-contain"
                            />
                        </div>

                        <div className="flex flex-col gap-4">
                            <Typography variant="h1" weight={700} letterSpacing={0.01} className="text-black-900 text-center">
                                <span className="text-blue-500"> You’re in.</span> Thanks for joining the ChargeMate waitlist.
                            </Typography>
                            <Typography variant="h4" weight={400} lineHeight={28} className="text-black-900 text-center">
                                ChargeMate helps you find verified, private parking — fast, safe, and hassle-free.We’ll send early access details soon.
                            </Typography>

                        </div>
                        <div className="">
                            <Link href="/">
                                <Button
                                    text="Back"
                                    variant="lg"
                                    bg="#2C7FFF"
                                    color="#FFFFFF"
                                    hoverBg="#101010"
                                    boxShadow="1px 2px 24px 0px #13245733"
                                    className="w-full md:w-auto"
                                />
                            </Link>
                        </div>
                    </div>
                </Container>
            </section>


            <section className="overflow-hidden ">
                <div className="hidden xl:flex">
                    <Container>
                        <AnimatedCarSection />
                    </Container>
                </div>
                <div className="flex xl:hidden">
                    <Container>
                        <div className="flex relative w-full h-full min-h-[122px] ">
                            <Image
                                src={parkedCar}
                                alt="parkedCar"
                                fill
                                className="object-contain"
                                sizes="100%"
                                priority
                            />
                        </div>
                    </Container>
                </div>
            </section>
        </>
    );
};
export default ThankYouPage;