"use client";

import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

export default function Home(): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const [noCount, setNoCount] = useState<number>(0);
  const [showYes, setShowYes] = useState<boolean>(false);
  const [celebrate, setCelebrate] = useState<boolean>(false);
  const [musicStarted, setMusicStarted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<string>("");
  const [showFloating, setShowFloating] = useState<boolean>(false);

  const paragraph = `Happy Birthday to the man who makes my life brighter just by existing. 
You are my safe place, my strength, my laughter, and my favorite person all in one. 
Every day with you feels special, and I’m so grateful for every memory we share. 
I hope this year brings you happiness, success, peace, and everything your heart dreams of. 
No matter where life takes us or which universe we’re in, I’d always choose you — again and again. ❤️`;

  const floatingMessages = [
    "You're my hero 🕷️",
    "Love you forever ❤️",
    "Best Spider-Man partner 🕸️",
    "You make me smile 😘",
    "My favorite person 🕷️💖",
    "You are amazing ✨",
    "Forever yours 🕸️❤️",
    "You + me = 🕷️❤️",
  ];

  const startMusic = (): void => {
    if (!musicStarted && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setMusicStarted(true))
        .catch((err) => console.log("Music blocked:", err));
    }
  };

  useEffect(() => {
    const target = new Date("2026-01-27T00:00:00").getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft("🎉 It's your birthday! 🎉");
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleNo = (): void => {
    startMusic();
    const next = noCount + 1;
    setNoCount(next);
    if (next >= 5) setShowYes(true);

    if (noButtonRef.current) {
      const btn = noButtonRef.current;
      const maxShift = 60;
      const offsetX = Math.floor(Math.random() * maxShift) - maxShift / 2;
      const offsetY = Math.floor(Math.random() * (maxShift / 2)) - maxShift / 4;

      btn.style.position = "relative";
      btn.style.left = `${offsetX}px`;
      btn.style.top = `${offsetY}px`;
      btn.style.transition = "all 0.3s ease";
    }
  };

  const handleYes = (): void => {
    startMusic();
    if (showYes) {
      setCelebrate(true);
      setTimeout(() => setShowFloating(true), 1000);
      confetti({
        particleCount: 300,
        spread: 160,
        origin: { y: 0.6 },
      });
    }
  };

  return (
    <main className="min-h-screen relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0B1C2D] via-black to-[#E10600] text-white overflow-hidden">

      {/* Music */}
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/birthday_music.mp3" type="audio/mp3" />
      </audio>

      {/* Countdown */}
      <div className="mb-6 text-center text-lg font-semibold text-pink-200 z-10">
        {timeLeft}
      </div>
      {/* Big Spider-Man floating on left & right corners */}
{celebrate && (
  <>
    {/* Left corner */}
    <img
      src="/images/bg.png"
      alt="Big Spider-Man Left"
      className="absolute bottom-0 left-0 w-64 md:w-96 opacity-50 animate-float-bg pointer-events-none z-0"
    />

    {/* Right corner */}
    <img
      src="/images/bg.png"
      alt="Big Spider-Man Right"
      className="absolute bottom-0 right-0 w-64 md:w-96 opacity-50 animate-float-bg pointer-events-none z-0"
    />
  </>
)}




      {/* Main card */}
      <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-center relative z-10">

        {!celebrate ? (
          <>
            <h1 className="text-2xl font-bold mb-4">🕷️ Do you love me?</h1>

            {noCount > 0 && (
              <p className="text-sm text-pink-300 mb-3">
                {noCount === 1 && "Hmm… rude. I felt that 😐"}
                {noCount === 2 && "Okay but I adore you 🕸️"}
                {noCount === 3 && "Why are you testing me 🙄"}
                {noCount === 4 && "Last chance. Choose wisely 😤"}
                {noCount >= 5 && "Fine. Multiverse override 💥"}
              </p>
            )}

            <div className="flex justify-center gap-4 mt-4 relative">
              <button
                ref={noButtonRef}
                onClick={handleNo}
                className="px-6 py-2 rounded-full bg-[#0B1C2D] border border-white hover:scale-105 transition z-10"
              >
                No
              </button>

              <button
                onClick={handleYes}
                disabled={!showYes}
                className={`px-6 py-2 rounded-full bg-[#E10600] ${
                  showYes ? "animate-bounce" : "opacity-50 cursor-not-allowed"
                } z-10`}
              >
                Yes ❤️
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-3xl font-extrabold mb-4 text-pink-200">🎉 Happy Birthday My Love 🎂</h1>

            <img
              src="/images/him.jpg"
              alt="My Favorite Person"
              className="w-40 h-40 mx-auto rounded-2xl object-cover border-4 border-pink-300 shadow-lg mb-4 z-10"
            />

            {/* Paragraph + spider & love icons */}
            <p className="text-sm leading-relaxed text-white/90 whitespace-pre-wrap mb-4">
              {paragraph}
              <span className="block mt-2 text-base font-semibold italic text-pink-300">
                I love you to the moon and back 🌙❤️
              </span>
              <span className="block mt-1 text-xl text-red-400">🕷️❤️🕷️</span>
            </p>

            <div className="text-4xl mt-6 animate-pulse z-10">🕷️❤️🎉🎂</div>

            {/* Mini Spider-Man hanging */}
           {/* Mini Spider-Man hanging on the right */}
<div className="absolute top-0 right-4 z-20 flex flex-col items-center">
  {/* Thread */}
  <div className="w-[2px] h-20 bg-white/60"></div>
  <img
    src="/images/image.png"
    alt="Mini Spider-Man Swinging"
    className="w-16 h-16 object-contain animate-swing"
  />
</div>

          </>
        )}
      </div>

      {/* Floating messages */}
      {celebrate && showFloating && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
          {floatingMessages.map((msg, i) => (
            <div
              key={i}
              className="absolute text-white/70 text-sm animate-float-slow"
              style={{
                left: `${Math.random() * 90}%`,
                top: `${Math.random() * 90}%`,
                animationDuration: `${5 + Math.random() * 5}s`,
              }}
            >
              {msg}
            </div>
          ))}
        </div>
      )}

      {/* Spider-webs in corners */}
      {celebrate && (
        <>
          <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-white/40 rounded-bl-[50%] animate-fadein" />
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-white/40 rounded-br-[50%] animate-fadein" />
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-white/40 rounded-tl-[50%] animate-fadein" />
          <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-white/40 rounded-tr-[50%] animate-fadein" />
        </>
      )}

      <style jsx>{`
        @keyframes float-slow {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-100vh); opacity: 0; }
        }
        .animate-float-slow {
          animation-name: float-slow;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        @keyframes fadein {
          0% { opacity: 0; }
          100% { opacity: 0.4; }
        }
        .animate-fadein {
          animation: fadein 3s ease forwards;
        }

        @keyframes swing {
          0% { transform: rotate(-15deg); }
          25% { transform: rotate(15deg); }
          50% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
          100% { transform: rotate(-15deg); }
        }
        .animate-swing {
          animation: swing 3s ease-in-out infinite;
          transform-origin: top center;
        }

        @keyframes float-bg {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
          50% { opacity: 0.25; }
          100% { transform: translateY(-50px) rotate(5deg); opacity: 0.2; }
        }
        .animate-float-bg {
          animation: float-bg 20s ease-in-out infinite alternate;
        }
      `}</style>
    </main>
  );
}
