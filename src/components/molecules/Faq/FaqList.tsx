"use client";

import { useState } from "react";
import FaqCard from "./FaqCard";

interface FaqListProps {
    showCount?: number;
}

const faqData = [
    {
        question: "What is ChargeMate?",
        answer:
            "ChargeMate is a smart, verified EV charging platform that connects EV drivers with private or public chargers nearby. It helps you find, book, or list chargers through an easy-to-use app."
    },
    {
        question: "How does ChargeMate verify charging stations?",
        answer:
            "Before a charging station goes live, ChargeMate uses a thorough verification process.",
        points: [
            "Confirming the station's address and ownership",
            "Verifying the host’s identity",
            "Checking the type and compatibility of the charger",
            "Approving photos and descriptions"
        ]
    },
    {
        question: "Can I list my private charging station?",
        answer:
            "Yes. If you own a home or business EV charger, you can earn extra income by listing it on ChargeMate. Upload photos, set your availability, and add your price — ChargeMate handles the rest."
    },
    {
        question: "Are there any listing or booking fees?",
        answer:
            "Listing a charger is free. ChargeMate charges a small service fee on each booking to support payment processing, verification, and customer support."
    },
    {
        question: "Can I cancel my booking?",
        answer:
            "Yes. Drivers and hosts can cancel bookings directly through the app. Cancellation rules depend on the host’s policy and are shown at checkout."
    },
    {
        question: "Is my payment information secure?",
        answer:
            "Yes. All payments are processed through secure, PCI-compliant providers. Your financial information is fully encrypted and never stored on ChargeMate servers."
    },
    {
        question: "What happens if a charger is unavailable?",
        answer:
            "If a driver arrives and the reserved charger is unavailable, ChargeMate support will contact the host, help find a nearby alternative if possible, and provide a refund or credit if needed. Hosts who repeatedly violate guidelines may be removed."
    },
    {
        question: "When do hosts get paid?",
        answer:
            "Hosts receive payouts 24 to 48 hours after a charging session begins. Payments go directly to the host’s selected payout method."
    }
];

export default function FaqList({ showCount }: FaqListProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleToggle = (index: number) => {
        setActiveIndex(prev => (prev === index ? -1 : index));
    };

    const faqsToShow = showCount ? faqData.slice(0, showCount) : faqData;

    return (
        <div className="flex flex-col gap-4 md:gap-5">
            {faqsToShow.map((faq, index) => (
                <FaqCard
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    points={faq.points}     
                    isActive={activeIndex === index}
                    onToggle={() => handleToggle(index)}
                />
            ))}
        </div>
    );
}
