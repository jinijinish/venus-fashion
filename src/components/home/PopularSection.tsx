"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
  image: string;
  alt?: string;
  slug: string;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Pendant",
    slug: "pendant",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&auto=format",
    alt: "Elegant pendant necklace",
  },
  {
    id: 2,
    name: "Rings",
    slug: "rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
    alt: "Beautiful rings collection",
  },
  {
    id: 3,
    name: "Necklaces",
    slug: "necklaces",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&auto=format",
    alt: "Stylish necklaces",
  },
  {
    id: 4,
    name: "Bracelets",
    slug: "bracelets",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&auto=format",
    alt: "Fashion bracelets",
  },
  {
    id: 5,
    name: "Earrings",
    slug: "earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&auto=format",
    alt: "Trendy earrings",
  },
  {
    id: 6,
    name: "Charm & Bangles",
    slug: "charm-bangles",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&auto=format",
    alt: "Charming bangles collection",
  },
  {
    id: 7,
    name: "Anklets",
    slug: "anklets",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&auto=format",
    alt: "Beautiful anklets",
  },
  {
    id: 8,
    name: "Brooches",
    slug: "brooches",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&auto=format",
    alt: "Elegant brooches",
  },
  {
    id: 9,
    name: "Cufflinks",
    slug: "cufflinks",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&auto=format",
    alt: "Classic cufflinks",
  },
  {
    id: 10,
    name: "Hair Jewelry",
    slug: "hair-jewelry",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&auto=format",
    alt: "Stylish hair accessories",
  },
  {
    id: 11,
    name: "Toe Rings",
    slug: "toe-rings",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=400&fit=crop&auto=format",
    alt: "Traditional toe rings",
  },
  {
    id: 12,
    name: "Watch Charms",
    slug: "watch-charms",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&auto=format",
    alt: "Watch charm accessories",
  },
];

// ─── Scroll progress hook ──────────────────────────────────────────────────────
// Fixed: Accept RefObject with null type and handle null check internally
function useScrollProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setProgress(max > 0 ? scrollLeft / max : 0);
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < max - 10);
  }, [ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update, ref]);

  return { progress, canScrollLeft, canScrollRight };
}

// ─── Component ────────────────────────────────────────────────────────────────
const PopularSection: React.FC = () => {
  // Fixed: Type assertion to match the hook's expected type
  const scrollRef = useRef<HTMLDivElement>(null);
  const { progress, canScrollLeft, canScrollRight } = useScrollProgress(scrollRef);
  const router = useRouter();

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = Math.floor(el.clientWidth * 0.75);
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
  };

  const handleCategoryClick = (slug: string) => {
    router.push(`/collections/${slug}`);
  };

  return (
    <section className="popular-section">
      {/* ── Header ── */}
      <header className="popular-header">
        <div className="popular-eyebrow">
          <span className="eyebrow-line" />
          <span className="eyebrow-text">Curated for you</span>
          <span className="eyebrow-line" />
        </div>
        <h2 className="popular-title">Popular Categories</h2>
        <p className="popular-subtitle">
          Handcrafted collections for every occasion
        </p>
      </header>

      {/* ── Carousel ── */}
      <div className="carousel-wrapper">
        {/* Edge fades */}
        <div
          className="carousel-fade carousel-fade--left"
          style={{ opacity: canScrollLeft ? 1 : 0 }}
          aria-hidden="true"
        />
        <div
          className="carousel-fade carousel-fade--right"
          style={{ opacity: canScrollRight ? 1 : 0 }}
          aria-hidden="true"
        />

        {/* Nav buttons */}
        <NavButton
          direction="left"
          visible={canScrollLeft}
          onClick={() => scroll("left")}
        />
        <NavButton
          direction="right"
          visible={canScrollRight}
          onClick={() => scroll("right")}
        />

        {/* Track */}
        <div ref={scrollRef} className="carousel-track" role="list">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.id}
              category={cat}
              index={i}
              onClick={() => handleCategoryClick(cat.slug)}
            />
          ))}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div className="progress-bar-track" aria-hidden="true">
        <div
          className="progress-bar-fill"
          style={{ width: `${Math.round(progress * 100)}%` }}
        />
      </div>

      <style jsx>{`
        /* ── Section ── */
        .popular-section {
          background: #faf8f5;
          padding: 80px 0 64px;
          overflow: hidden;
        }

        /* ── Header ── */
        .popular-header {
          text-align: center;
          padding: 0 24px;
          margin-bottom: 52px;
        }
        .popular-eyebrow {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 16px;
        }
        .eyebrow-line {
          display: block;
          width: 40px;
          height: 1px;
          background: #c9a84c;
        }
        .eyebrow-text {
          font-family: 'Cormorant Garamond', 'Georgia', serif;
          font-size: 13px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #c9a84c;
          font-style: italic;
        }
        .popular-title {
          font-family: 'Cormorant Garamond', 'Playfair Display', Georgia, serif;
          font-size: clamp(32px, 4vw, 52px);
          font-weight: 600;
          color: #1a1a1a;
          letter-spacing: -0.01em;
          line-height: 1.1;
          margin: 0 0 12px;
        }
        .popular-subtitle {
          font-family: 'Jost', 'Helvetica Neue', sans-serif;
          font-size: 15px;
          color: #888;
          letter-spacing: 0.04em;
          margin: 0;
          font-weight: 300;
        }

        /* ── Carousel wrapper ── */
        .carousel-wrapper {
          position: relative;
        }

        /* Edge fades */
        .carousel-fade {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 120px;
          z-index: 10;
          pointer-events: none;
          transition: opacity 0.3s ease;
        }
        .carousel-fade--left {
          left: 0;
          background: linear-gradient(to right, #faf8f5 20%, transparent);
        }
        .carousel-fade--right {
          right: 0;
          background: linear-gradient(to left, #faf8f5 20%, transparent);
        }

        /* ── Track ── */
        .carousel-track {
          display: flex;
          gap: 28px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 16px 48px 24px;
        }
        .carousel-track::-webkit-scrollbar {
          display: none;
        }

        /* ── Progress bar ── */
        .progress-bar-track {
          width: 120px;
          height: 2px;
          background: #e8e0d0;
          border-radius: 2px;
          margin: 24px auto 0;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          background: #c9a84c;
          border-radius: 2px;
          transition: width 0.15s ease;
          min-width: 12%;
        }
      `}</style>
    </section>
  );
};

// ─── Nav Button ───────────────────────────────────────────────────────────────
interface NavButtonProps {
  direction: "left" | "right";
  visible: boolean;
  onClick: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ direction, visible, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Scroll ${direction}`}
    style={{
      position: "absolute",
      [direction]: "8px",
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 20,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "44px",
      height: "44px",
      borderRadius: "50%",
      border: "1px solid #e0d5c0",
      background: "#fff",
      cursor: "pointer",
      opacity: visible ? 1 : 0,
      pointerEvents: visible ? "auto" : "none",
      transition: "opacity 0.25s ease, transform 0.2s ease, background 0.2s ease, border-color 0.2s ease",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.background = "#fdf6e8";
      el.style.borderColor = "#c9a84c";
      el.style.transform = "translateY(-50%) scale(1.08)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.background = "#fff";
      el.style.borderColor = "#e0d5c0";
      el.style.transform = "translateY(-50%) scale(1)";
    }}
  >
    {direction === "left" ? (
      <ChevronLeft size={18} color="#5a4a2a" />
    ) : (
      <ChevronRight size={18} color="#5a4a2a" />
    )}
  </button>
);

// ─── Category Card ────────────────────────────────────────────────────────────
interface CategoryCardProps {
  category: Category;
  index: number;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      role="listitem"
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flexShrink: 0,
        width: "clamp(140px, 18vw, 188px)",
        scrollSnapAlign: "start",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "14px",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
        animationDelay: `${index * 60}ms`,
      }}
    >
      {/* Image ring */}
      <div
        style={{
          position: "relative",
          width: "clamp(110px, 14vw, 148px)",
          height: "clamp(110px, 14vw, 148px)",
        }}
      >
        {/* Gold ring — shows on hover */}
        <div
          style={{
            position: "absolute",
            inset: "-5px",
            borderRadius: "50%",
            border: "1.5px solid #c9a84c",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "scale(1)" : "scale(0.88)",
            transition: "opacity 0.3s ease, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
          aria-hidden="true"
        />

        {/* Image circle */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            overflow: "hidden",
            border: `2px solid ${hovered ? "#e8d9b4" : "#ede8df"}`,
            transition: "border-color 0.3s ease, box-shadow 0.3s ease",
            boxShadow: hovered
              ? "0 12px 32px rgba(180, 140, 60, 0.18)"
              : "0 4px 16px rgba(0,0,0,0.07)",
          }}
        >
          <img
            src={category.image}
            alt={category.alt || category.name}
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.55s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              display: "block",
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div style={{ textAlign: "center" }}>
        <p
          style={{
            fontFamily: "'Jost', 'Helvetica Neue', sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: hovered ? "#8a6520" : "#3a3228",
            transition: "color 0.25s ease",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {category.name}
        </p>

        {/* Animated underline */}
        <div
          style={{
            height: "1px",
            background: "#c9a84c",
            marginTop: "5px",
            width: hovered ? "100%" : "0%",
            transition: "width 0.3s ease",
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default PopularSection;