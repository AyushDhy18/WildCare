import React from 'react';
import {Link} from 'react-router-dom'
import { Menu, X, Heart, MapPin, Clock, Camera, AlertCircle, CheckCircle, Users, Leaf } from 'lucide-react';


const CategoryHighlights = () => {
    const categories = [
    {
      name: "Birds",
      emoji: "🦅",
      gradient: "from-sky-400 to-blue-500",
      description: "Injured birds, fallen nests"
    },
    {
      name: "Mammals",
      emoji: "🦊",
      gradient: "from-orange-400 to-red-500",
      description: "Stranded or hurt mammals"
    },
    {
      name: "Reptiles",
      emoji: "🐢",
      gradient: "from-green-400 to-emerald-500",
      description: "Turtles, snakes, lizards"
    },
    {
      name: "Others",
      emoji: "🐾",
      gradient: "from-purple-400 to-pink-500",
      description: "Other wildlife in need"
    }
  ];
//Link to={"/report"} state={{category : "Birds"}}
  return (
     <div id="categories" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            What Can You Report?
          </h2>
          <p className="text-xl text-gray-600">
            We rescue all kinds of wildlife
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link to={"/report"} state={{Category : category.name}}
              key={index}
              className="group relative bg-white rounded-3xl p-8 border-2 border-gray-200 hover:border-transparent shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform">
                  {category.emoji}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 group-hover:text-white mb-2 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 group-hover:text-white/90 text-sm transition-colors">
                  {category.description}
                </p>
              </div>

              {/* Decorative Circle */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full transform group-hover:scale-150 transition-transform duration-500"></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryHighlights;