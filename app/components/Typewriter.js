"use client";
import { useEffect, useState } from "react";

export default function Typewriter({
    phrases = [
        "Full-Stack Developer",
        "MERN & Next.js Expert",
        "APIs • Auth • Deployment",
        "Clean • Modern • Scalable Code"
    ],
    typingSpeed = 60,
    deleteSpeed = 35,
    pauseBeforeDelete = 1400,
}) {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setReducedMotion(true);
        }
    }, []);

    useEffect(() => {
        if (reducedMotion) return;

        const currentPhrase = phrases[index];
        let timeout;

        if (!isDeleting && subIndex === currentPhrase.length) {
            timeout = setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        } else if (isDeleting && subIndex === 0) {
            setIsDeleting(false);
            setIndex((prev) => (prev + 1) % phrases.length);
        } else {
            timeout = setTimeout(() => {
                setSubIndex((prev) => prev + (isDeleting ? -1 : 1));
            }, isDeleting ? deleteSpeed : typingSpeed);
        }

        return () => clearTimeout(timeout);
    }, [subIndex, isDeleting, index, reducedMotion]);

    return (
        <div
            aria-live="polite"
            className="flex items-center justify-center mt-3 text-xl sm:text-2xl font-medium text-[#C7D2FE] tracking-wide"
        >
            {reducedMotion ? (
                <span>{phrases[0]}</span>
            ) : (
                <>
                    <span>{phrases[index].substring(0, subIndex)}</span>
                    <span
                        className="ml-1 inline-block w-[2px] bg-[#3B82F6] animate-blink"
                        aria-hidden="true"
                    ></span>
                </>
            )}

            <style jsx>{`
        @keyframes blink {
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }
      `}</style>
        </div>
    );
}
