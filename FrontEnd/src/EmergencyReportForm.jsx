import { useState, useEffect } from 'react';
import { AlertTriangle, MapPin, Camera, Phone, Upload, X, Zap, ArrowLeft} from 'lucide-react';
import { useFormik } from 'formik';
import { Link, useLocation } from "react-router-dom";


const EmergencyReportForm = () => {
  const [countdown, setCountdown] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const {state} = useLocation();
  const categoryFromCard = state?.Category || ""; 

  const formik = useFormik({
    initialValues: {
      category: categoryFromCard,
      location:"",
      image: null,
      Notes: "",
      number: "",
      timestamp: new Date().toISOString()
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values));
    },

    getFieldProps: (fieldName) => ({
      name: fieldName,
      id: fieldName,
      value: formik.values[fieldName],
      onChange: (e) => {
        formik.values[fieldName] = e.target.value;
      }
    }),
    setFieldValue: (field, value) => {
      formik.values[field] = value;
    }

  });

  // Countdown effect
  useEffect(() => {
    if (countdown === null) return;
    
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Submit the form
      alert('🚨 EMERGENCY ALERT SENT!\n\nCertified rescuers have been notified immediately.\n\n' + JSON.stringify(formik.values, null, 2));
      setCountdown(null);
    }
  }, [countdown]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      formik.setFieldValue("image", file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Emergency Header */}
        <div className="text-center mb-6">
            <Link to={"/"} className="flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="inline-flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-full mb-4 animate-pulse shadow-lg">
            <Zap className="w-6 h-6" fill="white" />
            <span className="font-black text-lg">EMERGENCY ALERT</span>
            <Zap className="w-6 h-6" fill="white" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Dangerous Animal Spotted
          </h1>
          <p className="text-lg text-red-600 font-semibold">
            ⚠️ For aggressive or potentially dangerous wildlife only
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-100 border-l-4 border-red-600 p-4 mb-6 rounded-r-xl">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <p className="font-bold text-red-900 mb-1">Safety First!</p>
              <p className="text-sm text-red-800">
                Keep a safe distance. Do not approach or provoke the animal. 
                Only certified expert rescuers will be notified.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8 border-4 border-red-200">
          <div className="space-y-6">
            {/* Animal Type - Quick Select Buttons */}
            <div>
              <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <AlertTriangle className="w-5 h-5 text-emerald-600" />
                <span>What type of animal?</span>
              </label>
              <select 
                {...formik.getFieldProps("category")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white"
              >
                <option value="" disabled>Select an option</option>
                <option value="Snake">Snake 🐍</option>
                <option value="Wild Dog">Wild Dog 🐕</option>
                <option value="Bear">Bear 🐻</option>
                <option value="Big Cat">Big Cat 🐆</option>
                <option value="Monkey">Monkey 🐒</option>
                <option value="Others">Others 🐾</option>
              </select>
            </div>

            {/* Location - GPS Quick Access */}
            <div>
              <label className="flex items-center space-x-2 text-gray-900 font-bold mb-3 text-lg">
                <MapPin className="w-6 h-6 text-red-600" />
                <span>Your Location</span>
              </label>
              <div className="flex flex-col w-full space-y-5">

 <input
        type="text"
        placeholder="e.g., Near Clock Tower, Dehradun"
        {...formik.getFieldProps("location")}
        className="placeholder-gray-500 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
      />
      <button
        type="button"
        onClick={async () => {
          if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            return;
          }

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              
              try {
                // Use reverse geocoding to get address
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                );
                const data = await response.json();
                
                if (data.display_name) {
                  formik.setFieldValue("location", data.display_name);
                  
                  // Also set city if available
                  if (data.address?.city || data.address?.town || data.address?.village) {
                    formik.setFieldValue("city", data.address.city || data.address.town || data.address.village);
                  }
                }
              } catch (error) {
                console.error("Error fetching address:", error);
                formik.setFieldValue("location", `${latitude}, ${longitude}`);
              }
            },
            (error) => {
              console.error("Error getting location:", error);
              alert("Unable to retrieve your location. Please enter it manually.");
            }
          );
        }}
        className=" right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-sm font-medium"
      >
        Use My Location
      </button>
    </div>
            </div>

            {/* Photo - Optional but Helpful */}
            <div>
              <label className="flex items-center space-x-2 text-gray-900 font-bold mb-3 text-lg">
                <Camera className="w-6 h-6 text-red-600" />
                <span>Photo (If safe to take)</span>
              </label>
              
              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-red-300 rounded-2xl cursor-pointer hover:border-red-500 hover:bg-red-50/50 transition-all group">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="w-10 h-10 text-red-400 group-hover:text-red-600 mb-2 transition-colors" />
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Quick Upload</span>
                    </p>
                  </div>
                  <input
                    type="file"
                    id="image"
                    image="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Emergency Contact */}
            <div>
              <label className="flex items-center space-x-2 text-gray-900 font-bold mb-3 text-lg">
                <Phone className="w-6 h-6 text-red-600" />
                <span>Your Phone Number</span>
              </label>
              <input
                type="tel"
                placeholder="+91 .........."
                {...formik.getFieldProps("number")}
                className="placeholder-gray-500 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all text-lg"
              />
            </div>

            {/* Brief Description */}
            <div>
              <label className="flex items-center space-x-2 text-gray-900 font-bold mb-3 text-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                <span>What's happening? (One line)</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Snake near school entrance, aggressive dog chasing people"
                {...formik.getFieldProps("Notes")}
                className="placeholder-gray-500 w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 outline-none transition-all"
              />
            </div>

            {/* Emergency Submit Button */}
            <button
              onClick={formik.handleSubmit}
              disabled={countdown !== null}
              className={`w-full py-5 px-8 text-white text-xl font-black rounded-2xl shadow-2xl transition-all duration-200 flex items-center justify-center space-x-3 ${
                countdown !== null
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-500 to-rose-600 hover:shadow-red-500/50 hover:scale-105 animate-pulse'
              }`}
            >
              {countdown !== null ? (
                <>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                  <span>SENDING ALERT IN {countdown}...</span>
                </>
              ) : (
                <>
                  <Zap className="w-7 h-7" fill="white" />
                  <span>🚨 SEND EMERGENCY ALERT</span>
                  <Zap className="w-7 h-7" fill="white" />
                </>
              )}
            </button>

            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
              <p className="text-sm text-yellow-900 text-center">
                <strong>Note:</strong> False alarms waste valuable resources. Only use for genuine emergencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default EmergencyReportForm;