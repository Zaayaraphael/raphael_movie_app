import React from "react";
import Hero from "../component/Hero";
import CardList from "../component/CardList";
import Footer from "../component/Footer";

const Homepage = () => {
  return (
    <div className="p-5">
      <Hero />
      <CardList title="Now Playing" category="now_playing" />
      <CardList title="Top Rated" category="top_rated" />
      <CardList title="Popular" category="popular" />
      <CardList title="Upcoming" category="upcoming" />
      <Footer />
    </div>
  );
};

export default Homepage;
