"use client";
import { useRef, useState } from "react";
import Typography from "@/components/Typography/Typography";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const illustrations = [
  // Sarah — map pin + bolt
  <svg key="sarah" width="200" height="220" viewBox="0 0 200 220" fill="none">
    <ellipse cx="100" cy="200" rx="55" ry="12" fill="#d9f99d" opacity="0.5"/>
    <path d="M100 20C75 20 54 42 54 68C54 102 100 160 100 160C100 160 146 102 146 68C146 42 125 20 100 20Z" fill="#d9f99d" stroke="#65a30d" strokeWidth="2"/>
    <path d="M100 20C75 20 54 42 54 68C54 102 100 160 100 160C100 160 146 102 146 68C146 42 125 20 100 20Z" fill="#365314" opacity="0.06"/>
    <circle cx="100" cy="68" r="24" fill="#f0fdf4" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M104 54L94 70H101L97 86L110 68H103L104 54Z" fill="#365314"/>
    <circle cx="140" cy="36" r="14" fill="#bef264" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M143 29L137 38H142L139 47L148 37H143L143 29Z" fill="#365314"/>
    <circle cx="60" cy="42" r="8" fill="#bef264" stroke="#65a30d" strokeWidth="1" opacity="0.7"/>
    <path d="M62 38L59 43H61.5L60 47L64 42H61.5L62 38Z" fill="#365314"/>
  </svg>,

  // Mark — house + coins
  <svg key="mark" width="200" height="220" viewBox="0 0 200 220" fill="none">
    <ellipse cx="100" cy="205" rx="55" ry="11" fill="#d9f99d" opacity="0.5"/>
    <polygon points="36,95 100,40 164,95" fill="#d9f99d" stroke="#65a30d" strokeWidth="2" strokeLinejoin="round"/>
    <polygon points="36,95 100,40 164,95" fill="#365314" opacity="0.06"/>
    <rect x="44" y="95" width="112" height="90" rx="4" fill="#f0fdf4" stroke="#65a30d" strokeWidth="1.5"/>
    <rect x="78" y="118" width="44" height="67" rx="3" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.2"/>
    <circle cx="155" cy="78" r="18" fill="#bef264" stroke="#65a30d" strokeWidth="1.5"/>
    <text x="155" y="84" textAnchor="middle" fontSize="18" fill="#365314" fontWeight="700">₹</text>
    <circle cx="168" cy="104" r="13" fill="#bef264" stroke="#65a30d" strokeWidth="1.2" opacity="0.85"/>
    <text x="168" y="109" textAnchor="middle" fontSize="14" fill="#365314" fontWeight="700">₹</text>
    <circle cx="148" cy="122" r="9" fill="#bef264" stroke="#65a30d" strokeWidth="1" opacity="0.65"/>
    <text x="148" y="126" textAnchor="middle" fontSize="10" fill="#365314" fontWeight="700">₹</text>
  </svg>,

  // Daniel — road + car
  <svg key="daniel" width="200" height="220" viewBox="0 0 200 220" fill="none">
    <ellipse cx="100" cy="200" rx="55" ry="11" fill="#d9f99d" opacity="0.4"/>
    <path d="M16 155 Q100 70 184 155" stroke="#d9f99d" strokeWidth="22" fill="none" strokeLinecap="round"/>
    <path d="M16 155 Q100 70 184 155" stroke="#65a30d" strokeWidth="2" fill="none" strokeDasharray="6 5"/>
    <rect x="62" y="96" width="76" height="40" rx="10" fill="#d9f99d" stroke="#365314" strokeWidth="1.5"/>
    <rect x="70" y="103" width="22" height="14" rx="3" fill="#93c5fd" opacity="0.85"/>
    <rect x="100" y="103" width="22" height="14" rx="3" fill="#93c5fd" opacity="0.85"/>
    <circle cx="78" cy="138" r="9" fill="#365314"/>
    <circle cx="122" cy="138" r="9" fill="#365314"/>
    <path d="M92 97L100 80L108 97" fill="#bef264" stroke="#65a30d" strokeWidth="1.2"/>
    <circle cx="154" cy="56" r="16" fill="#bef264" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M150 50L160 56L150 62" stroke="#365314" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,

  // Emily — shield + check
  <svg key="emily" width="200" height="220" viewBox="0 0 200 220" fill="none">
    <ellipse cx="100" cy="205" rx="52" ry="11" fill="#d9f99d" opacity="0.4"/>
    <path d="M100 18L46 44V84C46 118 70 152 100 164C130 152 154 118 154 84V44L100 18Z" fill="#d9f99d" stroke="#65a30d" strokeWidth="2"/>
    <path d="M100 18L46 44V84C46 118 70 152 100 164C130 152 154 118 154 84V44L100 18Z" fill="#365314" opacity="0.06"/>
    <circle cx="100" cy="92" r="30" fill="#f0fdf4" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M84 92L95 104L117 76" stroke="#365314" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="146" cy="34" r="16" fill="#bef264" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M138 34L143 39L154 27" stroke="#365314" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>,

  // James — community
  <svg key="james" width="200" height="220" viewBox="0 0 200 220" fill="none">
    <ellipse cx="100" cy="205" rx="55" ry="11" fill="#d9f99d" opacity="0.4"/>
    <circle cx="66" cy="70" r="28" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.5"/>
    <circle cx="134" cy="70" r="28" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M38 128C38 110 50 102 66 102H134C150 102 162 110 162 128V168H38V128Z" fill="#f0fdf4" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M80 102C80 102 86 116 100 116C114 116 120 102 120 102" stroke="#65a30d" strokeWidth="1.5" fill="none"/>
    <path d="M66 138L100 154L134 138" stroke="#bef264" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="66" cy="70" r="7" fill="#365314"/>
    <circle cx="134" cy="70" r="7" fill="#365314"/>
  </svg>,

  // Olivia — calendar + bolt
  <svg key="olivia" width="200" height="220" viewBox="0 0 200 220" fill="none">
    <ellipse cx="100" cy="205" rx="52" ry="11" fill="#d9f99d" opacity="0.4"/>
    <rect x="36" y="44" width="120" height="130" rx="10" fill="#f0fdf4" stroke="#65a30d" strokeWidth="1.5"/>
    <rect x="36" y="44" width="120" height="32" rx="10" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.5"/>
    <line x1="68" y1="30" x2="68" y2="58" stroke="#365314" strokeWidth="3" strokeLinecap="round"/>
    <line x1="132" y1="30" x2="132" y2="58" stroke="#365314" strokeWidth="3" strokeLinecap="round"/>
    <line x1="36" y1="88" x2="156" y2="88" stroke="#bef264" strokeWidth="1.5"/>
    <circle cx="64" cy="108" r="9" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.2"/>
    <circle cx="100" cy="108" r="9" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.2"/>
    <circle cx="64" cy="136" r="9" fill="#d9f99d" stroke="#65a30d" strokeWidth="1.2"/>
    <path d="M118 96L108 112H116L112 130L126 112H118L118 96Z" fill="#365314"/>
    <circle cx="150" cy="32" r="16" fill="#bef264" stroke="#65a30d" strokeWidth="1.5"/>
    <path d="M152 24L146 33H151L148 42L158 32H153L152 24Z" fill="#365314"/>
  </svg>,
];

const items = [
  {
    id: 1,
    stars: 5,
    title: '"Reliable Charging Right When I Needed It."',
    comment: "I was low on battery and needed a charger near my office. I booked a nearby home charger in minutes. Smooth experience, clear directions, and no waiting time at all.",
    author: "– Sarah M., EV Driver",
  },
  {
    id: 2,
    stars: 5,
    title: '"Earning from My Home Charger Was Effortless."',
    comment: "I had an EV charger sitting idle most of the day. Listing it as a host was simple, and now I earn passive income while helping other EV drivers charge conveniently.",
    author: "– Mark K., Charger Host",
  },
  {
    id: 3,
    stars: 4,
    title: '"Perfect for Long Trips and City Driving."',
    comment: "Public charging stations are often crowded. Booking a private charger ahead of time gives me peace of mind, especially during long drives or busy days.",
    author: "– Daniel P., EV Owner",
  },
  {
    id: 4,
    stars: 5,
    title: '"Safe, Secure, and Well-Maintained Chargers."',
    comment: "As a driver, I appreciate knowing exactly where I'm charging and what type of charger I'll get. Every booking so far has been smooth and reliable.",
    author: "– Emily R., Daily EV Commuter",
  },
  {
    id: 5,
    stars: 4,
    title: '"Great Way to Support the EV Community."',
    comment: "Hosting a charger feels good. I'm helping other EV users while covering my electricity costs and more. The platform handles everything.",
    author: "– James L., Home Charger Host",
  },
  {
    id: 6,
    stars: 5,
    title: '"No More Range Anxiety."',
    comment: "Being able to book chargers in advance has completely changed how I plan my trips. Charging is predictable, affordable, and stress-free.",
    author: "– Olivia T., EV Road Tripper",
  },
];

export default function TestimonialsBook() {
  const isMd = useMediaQuery("(min-width: 768px)");
  const [current, setCurrent] = useState(0);
  const [flipping, setFlipping] = useState(false);
  const [flipClass, setFlipClass] = useState("");
  const [flipFrontIdx, setFlipFrontIdx] = useState(0);
  const [flipBackIdx, setFlipBackIdx] = useState(1);
  const flipWrapRef = useRef<HTMLDivElement>(null);

  const starsStr = (n: number) => "★".repeat(n) + "☆".repeat(5 - n);

  const flipPage = (dir: 1 | -1) => {
    if (flipping) return;
    const next = current + dir;
    if (next < 0 || next >= items.length) return;

    setFlipping(true);

    if (dir === 1) {
      setFlipFrontIdx(current);
      setFlipBackIdx(next);
      setFlipClass("flip-fwd");
    } else {
      setFlipFrontIdx(current);
      setFlipBackIdx(next);
      setFlipClass("flip-bck");
    }

    setTimeout(() => {
      setCurrent(next);
      setFlipClass("");
      setFlipping(false);
    }, 750);
  };

  return (
    <>
      <style>{`
        .book-flip-wrap {
          position: absolute;
          top: 0;
          left: 50%;
          width: 50%;
          height: 100%;
          transform-origin: left center;
          transform-style: preserve-3d;
          z-index: -1;
        }
        .book-flip-wrap.flip-fwd {
          z-index: 5;
          animation: bookFlipFwd 0.75s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        .book-flip-wrap.flip-bck {
          z-index: 5;
          animation: bookFlipBck 0.75s cubic-bezier(0.4,0,0.2,1) forwards;
        }
        @keyframes bookFlipFwd {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(-180deg); }
        }
        @keyframes bookFlipBck {
          0% { transform: rotateY(-180deg); }
          100% { transform: rotateY(0deg); }
        }
        .flip-face {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          overflow: hidden;
          border-radius: 0 12px 12px 0;
          border: 0.5px solid #d9f99d;
          border-left: none;
        }
        .flip-face-back {
          transform: rotateY(180deg);
        }
      `}</style>

      <div style={{ perspective: "1400px" }} className="flex justify-center">
        <div className="flex flex-col gap-6 items-center w-full max-w-2xl">

          {/* Book */}
          <div
            className="relative w-full"
            style={{ height: isMd ? "340px" : "420px", transformStyle: "preserve-3d" }}
          >
            {/* Left page — illustration */}
            <div
              className="absolute top-0 left-0 w-1/2 h-full rounded-l-xl border border-[#d9f99d] border-r-0 bg-[#ffffff] flex items-center justify-center overflow-hidden"
            >
              <div className="flex items-center justify-center w-full h-full p-4">
                {illustrations[current]}
              </div>
            </div>

            {/* Right page — text */}
            <div
              className="absolute top-0 right-0 w-1/2 h-full rounded-r-xl border border-[#d9f99d] border-l-0 bg-[#fffef5] flex flex-col justify-between p-5 md:p-6 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                <span className="text-[#d9f99d] text-5xl leading-none font-serif">"</span>
                <p className="text-[#65a30d] text-sm tracking-widest -mt-2">
                  {starsStr(items[current].stars)}
                </p>
                <Typography
                  variant="para"
                  weight={600}
                  lineHeight={isMd ? 22 : 20}
                  className="text-[#1a2e05]"
                >
                  {items[current].title}
                </Typography>
                <Typography
                  variant="para"
                  weight={400}
                  lineHeight={isMd ? 22 : 20}
                  className="text-black-600"
                >
                  {items[current].comment}
                </Typography>
              </div>
              <div className="flex flex-col gap-1 border-t border-[#d9f99d] pt-3">
                <Typography
                  variant="para"
                  weight={500}
                  lineHeight={18}
                  className="text-[#365314]"
                >
                  {items[current].author}
                </Typography>
                {/* <Typography
                  variant="para"
                  weight={400}
                  lineHeight={16}
                  className="text-black-400 text-right text-[10px]"
                >
                  pg. {current + 1} of {items.length}
                </Typography> */}
              </div>
            </div>

            {/* Flipping page */}
            <div
              ref={flipWrapRef}
              className={`book-flip-wrap ${flipClass}`}
            >
              {/* Front — outgoing text page */}
              <div
                className="flip-face bg-[#fffef5] flex flex-col justify-between p-5 md:p-6"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[#d9f99d] text-5xl leading-none font-serif">"</span>
                  <p className="text-[#65a30d] text-sm tracking-widest -mt-2">
                    {starsStr(items[flipFrontIdx].stars)}
                  </p>
                  <Typography variant="para" weight={600} lineHeight={22} className="text-[#1a2e05]">
                    {items[flipFrontIdx].title}
                  </Typography>
                  <Typography variant="para" weight={400} lineHeight={22} className="text-black-600">
                    {items[flipFrontIdx].comment}
                  </Typography>
                </div>
                <div className="flex flex-col gap-1 border-t border-[#d9f99d] pt-3">
                  <Typography variant="para" weight={500} lineHeight={18} className="text-[#365314]">
                    {items[flipFrontIdx].author}
                  </Typography>
                </div>
              </div>

              {/* Back — incoming illustration */}
              <div
                className="flip-face flip-face-back bg-[#f0fdf4] flex items-center justify-center p-4"
              >
                {illustrations[flipBackIdx]}
              </div>
            </div>

            {/* Spine */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-full bg-[#365314] z-10 rounded-sm"
              style={{ boxShadow: "2px 0 10px rgba(0,0,0,0.18)" }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#bef264] z-11 opacity-50" />
          </div>

          {/* Book shadow */}
          <div
            className="w-full max-w-xl h-3 rounded-full"
            style={{ background: "radial-gradient(ellipse at center, rgba(54,83,20,0.14) 0%, transparent 70%)" }}
          />

          {/* Navigation */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => flipPage(-1)}
              disabled={current === 0 || flipping}
              className="w-9 h-9 rounded-full bg-[#365314] text-[#d9f99d] flex items-center justify-center disabled:bg-[#d0d0d0] hover:bg-[#101010] transition-colors text-lg"
            >
              ←
            </button>

            <div className="flex gap-2 items-center">
              {items.map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full border border-[#65a30d] transition-colors"
                  style={{ background: i === current ? "#365314" : "#d9f99d" }}
                />
              ))}
            </div>

            <button
              onClick={() => flipPage(1)}
              disabled={current === items.length - 1 || flipping}
              className="w-9 h-9 rounded-full bg-[#365314] text-[#d9f99d] flex items-center justify-center disabled:bg-[#d0d0d0] hover:bg-[#101010] transition-colors text-lg"
            >
              →
            </button>
          </div>

        </div>
      </div>
    </>
  );
}