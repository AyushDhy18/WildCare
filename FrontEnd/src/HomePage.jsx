import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import HowItWorks from "./HowItWorks";
import CategoryHighlights from "./CategoryHighlights";
import {Heart, AlertCircle, Leaf } from 'lucide-react';


const HomePage = () => {
  let admin = false;
  return (
    <div>
      <Navbar/>
<div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/BirdInHand.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/70 via-emerald-800/60 to-teal-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
          <Leaf className="w-5 h-5 text-emerald-300" />
          <span className="text-white/90 text-sm font-medium">Every Life Matters</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
          Help Rescue
          <span className="block bg-gradient-to-r from-emerald-300 to-teal-300 bg-clip-text text-transparent">
            Injured Wildlife
          </span>
          Near You
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-10 font-light max-w-2xl mx-auto">
          Connect injured animals with rescuers in your community. Fast, easy, and life-saving.
        </p>

        {admin ? (
          <button className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-rose-500/50 hover:scale-105 transition-all duration-300">
            <span className="flex items-center space-x-2">
              <AlertCircle className="w-6 h-6" />
              <span>Track Rescue Reports</span>
            </span>
          </button>
        ) : (
          <Link to={"/report"} className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 text-white text-xl font-bold rounded-full shadow-2xl hover:shadow-rose-500/50 hover:scale-105 transition-all duration-300">
            <span className="flex items-center space-x-2">
              <Heart className="w-6 h-6 group-hover:animate-pulse" />
              <span>Report a Rescue</span>
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-0 group-hover:opacity-100"></div>
          </Link>
        )}


      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-24 fill-white">
          <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
        </svg>
      </div>
    </div>
    
      <HowItWorks/>
      <CategoryHighlights/>

{/* Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Heart className="w-6 h-6" fill="white" />
            <span className="text-2xl font-bold">WildresQ</span>
          </div>
          <p className="text-emerald-200 mb-2">Every creature deserves a chance</p>
          <p className="text-emerald-300/60 text-sm">© 2024 WildresQ. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default HomePage;
