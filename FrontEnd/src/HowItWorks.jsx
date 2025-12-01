import React from 'react';
import { Menu, X, Heart, MapPin, Clock, Camera, AlertCircle, CheckCircle, Users, Leaf } from 'lucide-react';



const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Spot an Injured Wild Animal",
      description: "Notice an animal in distress? Don't panic. Your quick action can save a life.",
      icon: <MapPin className="w-8 h-8" />,
      color: "from-emerald-400 to-teal-500"
    },
    {
      number: "02",
      title: "Report It on WildresQ",
      description: "Fill out a quick form with location, photos, and urgency level. It takes less than 2 minutes.",
      icon: <Camera className="w-8 h-8" />,
      color: "from-teal-400 to-cyan-500"
    },
    {
      number: "03",
      title: "Our Rescuers Respond",
      description: "Trained volunteers nearby are alerted immediately and will rush to help.",
      icon: <Users className="w-8 h-8" />,
      color: "from-cyan-400 to-blue-500"
    }
  ];

  return (
 <div id="how-it-works" className="py-20 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three simple steps to make a difference
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Number Badge */}
              <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg transform group-hover:rotate-12 transition-transform`}>
                {step.number}
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform`}>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Decorative Paw Print */}
              <div className="absolute bottom-4 right-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Heart className="w-20 h-20" fill="currentColor" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;