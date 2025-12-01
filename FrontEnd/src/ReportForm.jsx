import React, { useState } from "react";
import { useFormik } from "formik";
import { Link, useLocation } from "react-router-dom";
import { MapPin, Camera, Clock, AlertTriangle, MessageSquare, Phone, ArrowLeft, Upload, X } from 'lucide-react';


const ReportForm = () => {

const [imagePreview, setImagePreview] = useState(null);

  const {state} = useLocation();
  const categoryFromCard = state?.Category || "";

  const formik = useFormik({
    initialValues: {
      category: categoryFromCard,
      location:"",
      city: "",
      image: null,
      dateTime: "",
      Urgency: 5,
      Notes: "",
      number: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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

  const getUrgencyColor = (value) => {
    if (value <= 3) return 'from-green-400 to-emerald-500';
    if (value <= 7) return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-rose-500';
  };

  const getUrgencyLabel = (value) => {
    if (value <= 3) return 'Low - Stable';
    if (value <= 7) return 'Medium - Needs Help';
    return 'High - Critical';
  };


  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to={"/"} className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Report a Rescue
          </h1>
          <p className="text-lg text-gray-600">
            Help us save a life. Fill in the details below.
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div className="space-y-8">
            {/* Animal Category */}
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
                <option value="Birds">Birds 🦅</option>
                <option value="Mammals">Mammals 🦊</option>
                <option value="Reptiles">Reptiles 🐢</option>
                <option value="Others">Others 🐾</option>
              </select>
            </div>

            {/* Location */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>Location/Address</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Near Central Park, Main Street"
                  {...formik.getFieldProps("location")}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>

              <div>
                <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>City</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., New York"
                  {...formik.getFieldProps("city")}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span>Upload Photo (Optional but helpful)</span>
              </label>
              
              {!imagePreview ? (
                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 transition-all group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 text-gray-400 group-hover:text-emerald-500 mb-3 transition-colors" />
                    <p className="mb-2 text-sm text-gray-600">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                  </div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              ) : (
                <div className="relative rounded-2xl overflow-hidden">
                  <img src={imagePreview} alt="Preview" className="w-full h-64 object-cover" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            {/* Date and Time */}
            <div>
              <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <Clock className="w-5 h-5 text-emerald-600" />
                <span>When did you spot it?</span>
              </label>
              <input
                type="datetime-local"
                {...formik.getFieldProps("dateTime")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
              />
            </div>

            {/* Urgency Slider */}
            <div>
              <label className="flex items-center justify-between text-gray-700 font-semibold mb-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-emerald-600" />
                  <span>Urgency Level</span>
                </div>
                <span className={`px-4 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getUrgencyColor(formik.values.Urgency)}`}>
                  {getUrgencyLabel(formik.values.Urgency)}
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                {...formik.getFieldProps("Urgency")}
                className="w-full h-3 bg-gradient-to-r from-green-400 via-yellow-400 to-red-400 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Low</span>
                <span>Medium</span>
                <span>Critical</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <MessageSquare className="w-5 h-5 text-emerald-600" />
                <span>Additional Notes</span>
              </label>
              <textarea
                placeholder="Describe the animal's condition, behavior, or any other helpful details..."
                rows="4"
                {...formik.getFieldProps("Notes")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all resize-none"
              />
            </div>

            {/* Contact Number */}
            <div>
              <label className="flex items-center space-x-2 text-gray-700 font-semibold mb-3">
                <Phone className="w-5 h-5 text-emerald-600" />
                <span>Your Contact Number</span>
              </label>
              <input
                type="tel"
                placeholder="+91 .........."
                {...formik.getFieldProps("number")}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-none transition-all"
              />
              <p className="text-sm text-gray-500 mt-2">
                Rescuers may need to contact you for more information
              </p>
            </div>

            {/* Submit Button */}
            <button
              onClick={formik.handleSubmit}
              type="button"
              className="w-full py-4 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
            >
              <span>Submit Rescue Report</span>
              <AlertTriangle className="w-6 h-6" />
            </button>

            <p className="text-center text-sm text-gray-500">
              By submitting, you agree to our terms and help us connect this animal with a rescuer
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};
export default ReportForm;
