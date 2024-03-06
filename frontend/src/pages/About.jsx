import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-32">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Welcome to <span className="text-blue-600">ShopScope</span>
        </h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          At <span className="font-semibold">ShopScope</span>, we believe in streamlining the process of catalog review for dealers, making it hassle-free and efficient. Our platform is designed to provide comprehensive reviews of catalogs, allowing dealers to effortlessly assess their offerings without the need for tedious manual work.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Efficiency Through Automation
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Gone are the days of sifting through catalogs manually. Our innovative platform automates the catalog review process, saving dealers valuable time and effort. With just a few clicks, dealers can submit their catalogs for review and receive detailed feedback and scoring in a timely manner.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Objective Evaluation and Ranking
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Our team of experts meticulously evaluates each catalog based on a set of predefined criteria. From product quality to presentation, every aspect is thoroughly examined to ensure objective and fair reviews. Each catalog is then assigned a score and provided with constructive feedback to help dealers improve their offerings.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Weekly Rankings
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          To recognize excellence and encourage continuous improvement, we publish weekly rankings of the top-performing catalogs. Dealers can track their progress and strive for higher rankings, driving competition and innovation in the industry.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Empowering Users
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          For consumers seeking the best products and deals, <span className="font-semibold">[Website Name]</span> provides a curated selection of top-ranked catalogs. Users can browse through a variety of offerings and easily connect with dealers to make informed purchasing decisions.
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Whether you're a dealer looking to showcase your products or a consumer searching for quality offerings, <span className="font-semibold">[Website Name]</span> welcomes you to join our growing community. Experience the convenience of hassle-free catalog review and discover the best products the market has to offer.
        </p>
        <div className="text-center">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300">Get Started Today</button>
        </div>
      </div>
    </div>
  );
};

export default About;