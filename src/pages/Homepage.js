import React, { useState, useEffect } from "react";
import DefaultLayout from "./../components/DefaultLayout";
import axios from "axios";
import { useDispatch } from "react-redux";
import ItemList from "../components/ItemList";
import Header from "../components/Header";
import Footer from "../components/Footer";

const TICKER_ITEMS = [
  "🚗 Drive Better with Premium Car Accessories",
  "💰 Best Prices, Guaranteed",
  "⭐ High-Quality Products",
  "🚘 Wide Range of Accessories",
  "🛡️ Customer Satisfaction First",
  "🚚 Fast & Reliable Delivery",
];

const REVIEWS = [
  {
    initials: "RM",
    name: "Rajesh Mehta",
    date: "2 weeks ago",
    text: "Excellent quality auto parts! The delivery was fast and the packaging was perfect. The items arrived in perfect condition. Highly recommend this store to all vehicle owners.",
  },
  {
    initials: "PS",
    name: "Priya Singh",
    date: "1 month ago",
    text: "Great collection and competitive prices. Customer service is very responsive and helpful. Already recommended them to my friends. Keep up the good work!",
  },
  {
    initials: "AK",
    name: "Arjun Kumar",
    date: "3 weeks ago",
    text: "Outstanding service and quality. Found exactly what I needed for my car. The prices are reasonable and the checkout process was smooth. Will definitely order again!",
  },
  {
    initials: "VP",
    name: "Vikram Patel",
    date: "10 days ago",
    text: "Amazing experience! Fast delivery, authentic products, and excellent communication throughout. This is my go-to shop for all auto parts now. Highly satisfied!",
  },
  {
    initials: "NS",
    name: "Neha Sharma",
    date: "5 days ago",
    text: "Professional team, genuine products, and fantastic deals! I've been using their services for 6 months now and never had any issues. Truly a trusted brand!",
  },
];

const Homepage = () => {
  const [itemsData, setItemsData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selecedCategory, setSelecedCategory] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({ type: "SHOW_LOADING" });
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/items/get-item`
        );
        setItemsData(data);
        dispatch({ type: "HIDE_LOADING" });
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/api/categories/get-categories`
        );
        setCategories(data);
        if (data.length > 0) {
          setSelecedCategory(data[0].name);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategories();
    getAllItems();
  }, [dispatch]);

  const filteredItems = itemsData.filter((i) => i.category === selecedCategory);
  const tickerContent = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];
  // Duplicate reviews for seamless loop
  const reviewContent = [...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <>
      <Header />

      {/* ── TICKER STRIP ── */}
      <div className="hp-ticker-outer">
        <div className="hp-ticker-track">
          {tickerContent.map((text, idx) => (
            <span key={idx} className="hp-ticker-item">
              {text}
              <span className="hp-ticker-sep" aria-hidden="true">|</span>
            </span>
          ))}
        </div>
      </div>

      <DefaultLayout>
        <style>{`
          /* ===== TICKER ===== */
          .hp-ticker-outer {
            width: 100%;
            background: #111;
            overflow: hidden;
            white-space: nowrap;
            padding: 10px 0;
            position: relative;
          }
          .hp-ticker-outer::before,
          .hp-ticker-outer::after {
            content: '';
            position: absolute;
            top: 0;
            width: 60px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          .hp-ticker-outer::before { left: 0; background: linear-gradient(to right, #111, transparent); }
          .hp-ticker-outer::after  { right: 0; background: linear-gradient(to left, #111, transparent); }
          .hp-ticker-track {
            display: inline-flex;
            align-items: center;
            animation: hp-ticker-scroll 30s linear infinite;
            will-change: transform;
          }
          .hp-ticker-outer:hover .hp-ticker-track { animation-play-state: paused; }
          @keyframes hp-ticker-scroll {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-33.333%); }
          }
          .hp-ticker-item {
            display: inline-flex;
            align-items: center;
            gap: 16px;
            font-family: 'Inter', 'DM Sans', sans-serif;
            font-size: clamp(11px, 2.5vw, 13px);
            font-weight: 600;
            color: #ffffff;
            letter-spacing: 0.3px;
            padding: 0 8px;
            white-space: nowrap;
          }
          .hp-ticker-sep {
            color: #c8f000;
            font-size: 16px;
            font-weight: 300;
            margin-left: 8px;
            opacity: 0.7;
          }

          /* ===== PAGE ===== */
          .hp-wrapper {
            background: #f0f0f0;
            min-height: 100vh;
            padding: 0 0 40px 0;
            font-family: 'Inter', sans-serif;
          }

          /* ===== HERO ===== */
          .hp-hero {
            background: #e8e8e8;
            border-radius: 24px;
            margin: -8px 0 24px 0;
            padding: 40px 24px 32px;
            text-align: center;
            background-image:
              linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px);
            background-size: 28px 28px;
            position: relative;
            overflow: hidden;
          }
          .hp-hero-icon-wrap {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            background: #c8f000;
            border-radius: 20px;
            width: 72px;
            height: 72px;
            margin: 0 auto 20px;
            font-size: 34px;
          }
          .hp-hero-title {
            font-size: clamp(28px, 6vw, 40px);
            font-weight: 900;
            color: #111;
            line-height: 1.15;
            margin-bottom: 10px;
          }
          .hp-hero-sub {
            font-size: clamp(13px, 4vw, 15px);
            color: #666;
            margin-bottom: 24px;
          }
          .hp-hero-btn {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            background: #7c3aed;
            color: #fff;
            border: none;
            border-radius: 50px;
            padding: 14px 28px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            transition: background 0.2s, transform 0.2s;
          }
          .hp-hero-btn:hover { background: #6d28d9; transform: translateY(-2px); }
          .hp-hero-btn-dot {
            width: 10px; height: 10px;
            background: #c8f000;
            border-radius: 50%;
            display: inline-block;
          }

          /* ===== SECTION TITLE ===== */
          .hp-section-title {
            font-size: clamp(18px, 5vw, 20px);
            font-weight: 900;
            color: #111;
            margin-bottom: 16px;
            padding: 0 4px;
          }

          /* ===== CATEGORIES ===== */
          .hp-category-scroll {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            scrollbar-width: none;
            -ms-overflow-style: none;
            margin-bottom: 24px;
            padding: 0 0 8px 0;
            -webkit-overflow-scrolling: touch;
          }
          .hp-category-scroll::-webkit-scrollbar { display: none; }
          .hp-cat-card {
            flex-shrink: 0;
            width: 120px;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
            border-radius: 20px;
            overflow: hidden;
            border: 3px solid transparent;
            transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
            background: #fff;
            margin-right: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.08);
          }
          .hp-cat-card:hover {
            transform: translateY(-3px);
            border-color: #c8f000;
            box-shadow: 0 0 16px rgba(200,240,0,0.5), 0 6px 16px rgba(0,0,0,0.12);
          }
          .hp-cat-card.active { border-color: #111; }
          .hp-cat-img { width: 100%; height: 90px; object-fit: cover; display: block; }
          .hp-cat-label {
            width: 100%;
            padding: 10px 6px;
            text-align: center;
            font-size: clamp(11px, 2vw, 13px);
            font-weight: 700;
            color: #111;
            background: #fff;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            border-top: 1px solid #f0f0f0;
          }
          .hp-cat-card.active .hp-cat-label { background: #c8f000; }

          /* ===== ITEMS GRID ===== */
          .hp-items-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 16px;
            padding: 0 4px;
          }
          .hp-empty {
            text-align: center;
            padding: clamp(40px, 10vw, 60px) 20px;
            background: #fff;
            border-radius: 20px;
            color: #aaa;
            font-size: clamp(13px, 3vw, 15px);
          }

          /* ===== REVIEWS — AUTO-SCROLL MARQUEE ===== */
          .hp-reviews-section {
            margin-top: 48px;
            padding-top: 40px;
            border-top: 2px solid #e0e0e0;
          }
          .hp-reviews-header { text-align: center; margin-bottom: 32px; }
          .hp-reviews-title {
            font-size: clamp(24px, 6vw, 28px);
            font-weight: 900;
            color: #111;
            margin-bottom: 8px;
          }
          .hp-reviews-subtitle { font-size: clamp(12px, 3vw, 14px); color: #888; }

          /* Outer container clips the overflow and adds fade edges */
          .hp-reviews-marquee-outer {
            position: relative;
            overflow: hidden;
            /* fade left and right edges */
          }
          .hp-reviews-marquee-outer::before,
          .hp-reviews-marquee-outer::after {
            content: '';
            position: absolute;
            top: 0;
            width: 80px;
            height: 100%;
            z-index: 2;
            pointer-events: none;
          }
          .hp-reviews-marquee-outer::before {
            left: 0;
            background: linear-gradient(to right, #f0f0f0, transparent);
          }
          .hp-reviews-marquee-outer::after {
            right: 0;
            background: linear-gradient(to left, #f0f0f0, transparent);
          }

          /* The scrolling track — left to right means we animate from negative to 0 */
          .hp-reviews-marquee-track {
            display: flex;
            align-items: stretch;   /* all cards same height — stretch to tallest */
            gap: 16px;
            width: max-content;
            animation: hp-reviews-scroll 35s linear infinite;
            will-change: transform;
            padding: 8px 4px 12px;
          }

          /* Pause on hover */
          .hp-reviews-marquee-outer:hover .hp-reviews-marquee-track {
            animation-play-state: paused;
          }

          /* Left-to-right: start off-screen left, move right (positive direction) */
          @keyframes hp-reviews-scroll {
            0%   { transform: translateX(-33.333%); }
            100% { transform: translateX(0%); }
          }

          /* ── REVIEW CARD ── */
          .hp-review-card {
            background: #fff;
            border-radius: 20px;
            padding: 24px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.06);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            display: flex;
            flex-direction: column;
            gap: 14px;
            width: 280px;
            flex-shrink: 0;
            /* height is governed by align-items: stretch on the parent */
          }
          .hp-review-card:hover {
            transform: translateY(-6px);
            box-shadow: 0 10px 28px rgba(0,0,0,0.13);
          }

          .hp-review-header { display: flex; align-items: flex-start; gap: 12px; }
          .hp-review-avatar {
            width: 46px; height: 46px;
            border-radius: 50%;
            background: linear-gradient(135deg, #c8f000, #7c3aed);
            display: flex; align-items: center; justify-content: center;
            color: #fff; font-weight: 900; font-size: 16px; flex-shrink: 0;
          }
          .hp-review-info { flex: 1; }
          .hp-review-name { font-size: 14px; font-weight: 800; color: #111; margin-bottom: 3px; }
          .hp-review-date { font-size: 11px; color: #aaa; }
          .hp-review-stars { display: flex; gap: 3px; font-size: 15px; }
          .hp-review-stars .star { color: #ffd700; }
          .hp-review-text {
            font-size: 13px;
            line-height: 1.65;
            color: #666;
            flex: 1;  /* pushes footer to the bottom — key for equal height feel */
          }
          .hp-review-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 12px;
            border-top: 1px solid #f0f0f0;
            margin-top: auto;  /* always at the bottom */
          }
          .hp-review-rating-label {
            font-size: 11px; font-weight: 700; color: #c8f000;
            text-transform: uppercase; letter-spacing: 0.5px;
          }
          .hp-review-helpful button {
            background: none; border: none; color: #888;
            cursor: pointer; font-size: 11px; transition: color 0.2s;
          }
          .hp-review-helpful button:hover { color: #c8f000; }

          /* ===== RESPONSIVE ===== */
          @media (max-width: 1024px) {
            .hp-items-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap: 14px; }
            .hp-review-card { width: 250px; padding: 20px; }
          }

          @media (max-width: 768px) {
            .hp-ticker-outer { padding: 8px 0; }
            .hp-ticker-item { font-size: 11px; gap: 12px; }
            .hp-wrapper { padding: 0 0 30px 0; }
            .hp-hero { margin: -8px 0 20px 0; padding: 30px 20px 24px; border-radius: 18px; }
            .hp-hero-icon-wrap { width: 60px; height: 60px; font-size: 28px; margin-bottom: 16px; }
            .hp-hero-btn { display: flex; width: 100%; justify-content: center; padding: 12px 24px; font-size: 14px; }
            .hp-cat-card { width: 100px; }
            .hp-cat-img { height: 75px; }
            .hp-items-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px; padding: 0 4px; }
            .hp-reviews-section { margin-top: 40px; padding-top: 30px; }
            .hp-review-card { width: 230px; padding: 18px; }
            .hp-reviews-marquee-track { gap: 12px; }
          }

          @media (max-width: 600px) {
            .hp-ticker-item { font-size: 10.5px; gap: 10px; padding: 0 4px; }
            .hp-hero { padding: 24px 16px 20px; margin: -8px 0 18px 0; }
            .hp-hero-btn { width: 100%; justify-content: center; padding: 11px 20px; }
            .hp-cat-card { width: 90px; margin-right: 10px; }
            .hp-cat-img { height: 65px; }
            .hp-items-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px; padding: 0 2px; }
            .hp-review-card { width: 200px; padding: 16px; }
          }

          @media (max-width: 480px) {
            .hp-ticker-outer { padding: 7px 0; }
            .hp-ticker-item { font-size: 10px; gap: 8px; }
            .hp-ticker-sep { font-size: 13px; margin-left: 6px; }
            .hp-wrapper { padding: 0 0 25px 0; }
            .hp-hero { padding: 20px 14px 18px; margin: -8px 0 16px 0; border-radius: 16px; }
            .hp-hero-icon-wrap { width: 52px; height: 52px; font-size: 24px; margin-bottom: 12px; }
            .hp-hero-btn { width: 100%; justify-content: center; }
            .hp-cat-card { width: 80px; margin-right: 8px; }
            .hp-cat-img { height: 55px; }
            .hp-items-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 8px; padding: 0 2px; }
            .hp-review-card { width: 175px; padding: 14px; gap: 10px; }
            .hp-review-avatar { width: 38px; height: 38px; font-size: 13px; }
            .hp-reviews-marquee-track { gap: 10px; }
            .hp-reviews-marquee-outer::before,
            .hp-reviews-marquee-outer::after { width: 40px; }
          }

          @media (max-width: 360px) {
            .hp-hero { padding: 16px 12px 16px; margin: -8px 0 14px 0; }
            .hp-hero-btn { width: 100%; justify-content: center; }
            .hp-cat-card { width: 70px; margin-right: 6px; }
            .hp-items-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 6px; padding: 0 1px; }
            .hp-review-card { width: 155px; padding: 12px; gap: 8px; }
          }

          @media (prefers-reduced-motion: reduce) {
            .hp-ticker-track,
            .hp-reviews-marquee-track { animation: none; }
          }
        `}</style>

        <div className="hp-wrapper">

          {/* Hero */}
          <div className="hp-hero">
            <div className="hp-hero-icon-wrap">🚗</div>
            <div className="hp-hero-title">Smart Gear.<br />Smarter Prices.</div>
            <p className="hp-hero-sub">
              Experience Top-Notch Service and Results with a Team You Can Rely On
            </p>
            <button
              className="hp-hero-btn"
              onClick={() => document.querySelector(".hp-category-scroll")?.scrollIntoView({ behavior: "smooth" })}
            >
              Shop Now <span className="hp-hero-btn-dot" />
            </button>
          </div>

          {/* Categories */}
          <div className="hp-section-title">Shop by Need</div>
          <div className="hp-category-scroll">
            {categories.map((category) => {
              const getImageUrl = () => {
                if (!category.image) return 'https://via.placeholder.com/80?text=No+Image';
                let url = category.image;
                url = url.replace(/^(https?):\/+/, '$1://');
                if (url.startsWith('http://') || url.startsWith('https://')) return url;
                if (url.startsWith('/')) return `${process.env.REACT_APP_SERVER_URL}${url}`;
                return `${process.env.REACT_APP_SERVER_URL}/${url}`;
              };
              return (
                <div
                  key={category._id}
                  className={`hp-cat-card ${selecedCategory === category.name ? "active" : ""}`}
                  onClick={() => setSelecedCategory(category.name)}
                >
                  <img
                    className="hp-cat-img"
                    src={getImageUrl()}
                    alt={category.name}
                    onError={(e) => {
                      if (!e.target.src.includes('placeholder'))
                        e.target.src = 'https://via.placeholder.com/80?text=' + category.name;
                    }}
                  />
                  <div className="hp-cat-label">{category.name}</div>
                </div>
              );
            })}
          </div>

          {/* Items */}
          <div className="hp-section-title">{selecedCategory || "Items"}</div>
          {filteredItems.length > 0 ? (
            <div className="hp-items-grid">
              {filteredItems.map((item) => (
                <ItemList key={item._id} item={item} />
              ))}
            </div>
          ) : (
            <div className="hp-empty">No items found in this category.</div>
          )}

          {/* ── REVIEWS MARQUEE ── */}
          <div className="hp-reviews-section">
            <div className="hp-reviews-header">
              <h2 className="hp-reviews-title">What Our Customers Say</h2>
              <p className="hp-reviews-subtitle">Real reviews from real customers</p>
            </div>

            <div className="hp-reviews-marquee-outer">
              <div className="hp-reviews-marquee-track">
                {reviewContent.map((review, idx) => (
                  <div className="hp-review-card" key={idx}>
                    <div className="hp-review-header">
                      <div className="hp-review-avatar">{review.initials}</div>
                      <div className="hp-review-info">
                        <div className="hp-review-name">{review.name}</div>
                        <div className="hp-review-date">{review.date}</div>
                      </div>
                    </div>
                    <div className="hp-review-stars">
                      <span className="star">★</span><span className="star">★</span>
                      <span className="star">★</span><span className="star">★</span><span className="star">★</span>
                    </div>
                    <p className="hp-review-text">{review.text}</p>
                    <div className="hp-review-footer">
                      <span className="hp-review-rating-label">Verified Purchase</span>
                      <div className="hp-review-helpful"><button>👍 Helpful</button></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        <Footer />
      </DefaultLayout>
    </>
  );
};

export default Homepage;