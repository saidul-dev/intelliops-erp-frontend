import React, { useEffect, useState } from "react";

const slides = [
    {
        title: "Welcome to ERP System",
        desc: "Manage your business operations efficiently with our modern ERP solution.",
        btn: "Get Started",
        bg: "from-slate-900 to-slate-700",
    },
    {
        title: "Track Your Projects",
        desc: "Monitor progress, tasks, and team performance in real time.",
        btn: "View Projects",
        bg: "from-indigo-900 to-slate-800",
    },
    {
        title: "Manage Users Easily",
        desc: "Control access, roles, and permissions with powerful admin tools.",
        btn: "Manage Users",
        bg: "from-emerald-900 to-slate-800",
    },
];

const Slider = () => {
    const [current, setCurrent] = useState(0);

    // Auto slide
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % slides.length);
    };

    return (
        <div className={`relative min-h-screen flex items-center justify-center bg-gradient-to-r ${slides[current].bg} text-white transition-all duration-700`}>
            
            {/* Content */}
            <div className="text-center max-w-2xl px-6">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    {slides[current].title}
                </h1>

                <p className="text-slate-200 text-sm md:text-lg mb-8">
                    {slides[current].desc}
                </p>

                <button className="px-6 py-3 bg-white text-slate-900 font-semibold rounded-xl shadow hover:bg-slate-200 transition">
                    {slides[current].btn}
                </button>
            </div>

            {/* Controls */}
            <button
                onClick={prevSlide}
                className="absolute left-5 md:left-10 bg-white/20 hover:bg-white/30 p-3 rounded-full"
            >
                ❮
            </button>

            <button
                onClick={nextSlide}
                className="absolute right-5 md:right-10 bg-white/20 hover:bg-white/30 p-3 rounded-full"
            >
                ❯
            </button>

            {/* Dots */}
            <div className="absolute bottom-8 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full transition ${
                            current === index ? "bg-white" : "bg-white/40"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slider;