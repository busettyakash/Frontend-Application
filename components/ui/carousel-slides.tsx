"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  id: number
  title: string
  description: string
  icon: string
  color: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Academic Excellence",
    description: "Access your courses, assignments, and academic progress in one place",
    icon: "📚",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    title: "Grade Management",
    description: "View your grades, transcripts, and academic performance analytics",
    icon: "📊",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    id: 3,
    title: "Course Registration",
    description: "Register for courses, manage your schedule, and plan your semester",
    icon: "📝",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: 4,
    title: "Campus Community",
    description: "Connect with peers, join clubs, and stay updated with university news",
    icon: "🎓",
    color: "from-slate-600 to-slate-800",
  },
]

export function CarouselSlides() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  useEffect(() => {
    if (!isAutoPlay) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlay])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlay(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlay(false)
  }

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Slides Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-700 ease-out transform ${
              index === currentSlide
                ? "opacity-100 scale-100"
                : index < currentSlide
                  ? "opacity-0 -translate-x-full scale-95"
                  : "opacity-0 translate-x-full scale-95"
            }`}
          >
            <div
              className={`w-full h-full bg-gradient-to-br ${slide.color} flex flex-col items-center justify-center p-8 relative overflow-hidden`}
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-md">
                <div className="text-7xl mb-6 animate-bounce">{slide.icon}</div>
                <h3 className="text-4xl font-serif font-bold text-white mb-4">{slide.title}</h3>
                <p className="text-lg text-white/90 leading-relaxed">{slide.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between z-20">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dot Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "w-8 bg-white" : "w-2 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-white/20 hover:bg-white/30 text-white transition-all duration-300 transform hover:scale-110 backdrop-blur-sm"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Slide Counter */}
      <div className="absolute top-8 right-8 z-20 text-white/80 text-sm font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}
