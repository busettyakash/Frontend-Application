"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

interface Slide {
  id: number
  title: string
  description: string
  points: string[]
  image: string
  color: string
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Academic Excellence",
    description: "Access your courses, assignments, and academic progress",
    points: ["View all courses", "Track assignments", "Monitor grades"],
    image: "/academic-excellence-university-classroom.jpg",
    color: "from-blue-600 to-blue-800",
  },
  {
    id: 2,
    title: "Grade Management",
    description: "View your grades, transcripts, and performance analytics",
    points: ["Real-time grades", "Transcript access", "Performance insights"],
    image: "/grade-management-analytics-dashboard.jpg",
    color: "from-indigo-600 to-indigo-800",
  },
  {
    id: 3,
    title: "Course Registration",
    description: "Register for courses and manage your semester schedule",
    points: ["Easy registration", "Schedule planning", "Course availability"],
    image: "/course-registration-schedule-planning.jpg",
    color: "from-purple-600 to-purple-800",
  },
  {
    id: 4,
    title: "Campus Community",
    description: "Connect with peers, join clubs, and stay updated",
    points: ["Join clubs", "Network with peers", "Campus events"],
    image: "/campus-community-students-networking.jpg",
    color: "from-pink-600 to-pink-800",
  },
  {
    id: 5,
    title: "Library Resources",
    description: "Access digital library, research materials, and databases",
    points: ["E-books access", "Research databases", "Study materials"],
    image: "/library-resources-digital-books.jpg",
    color: "from-green-600 to-green-800",
  },
  {
    id: 6,
    title: "Student Support",
    description: "Get help from academic advisors and support services",
    points: ["Academic advising", "Counseling services", "Career guidance"],
    image: "/student-support-counseling-services.jpg",
    color: "from-orange-600 to-orange-800",
  },
  {
    id: 7,
    title: "Financial Services",
    description: "Manage fees, scholarships, and financial aid",
    points: ["Fee management", "Scholarship info", "Financial aid"],
    image: "/financial-services-scholarships.jpg",
    color: "from-red-600 to-red-800",
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
              {/* Background Image */}
              <img
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover opacity-20"
              />

              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -ml-48 -mb-48"></div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-2xl">
                <h3 className="text-5xl font-sans font-bold text-white mb-4">{slide.title}</h3>
                <p className="text-lg text-white/90 leading-relaxed mb-8 font-sans">{slide.description}</p>

                <div className="flex flex-col gap-3 items-start justify-center max-w-sm mx-auto">
                  {slide.points.map((point, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-white/95 font-sans">
                      <CheckCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
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
      <div className="absolute top-8 right-8 z-20 text-white/80 text-sm font-medium backdrop-blur-sm bg-white/10 px-4 py-2 rounded-full font-sans">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  )
}
