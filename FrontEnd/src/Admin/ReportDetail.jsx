import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getreportById } from '../Api';
import { MapPin, Clock, AlertTriangle, Phone, MessageSquare, Calendar, User, CheckCircle, ArrowLeft, Zap } from 'lucide-react';
import {Link} from 'react-router-dom'

const ReportDetail = ({reportId}) => {
  
  const {id} = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchReport = async()=>{
      try{
        const data = await getreportById(id);
        setReport(data);
        setLoading(false);
        console.log(report)
      }catch(err){console.error(err)
      }
    };
    fetchReport();
  },[id]);

  const handleAssignToMe = ()=>{};
  const handleMarkAsResolved = ()=>{};


  const getUrgencyColor = (urgency) => {
    if (urgency <= 3) return 'from-green-400 to-emerald-500';
    if (urgency <= 7) return 'from-yellow-400 to-orange-500';
    if (urgency <= 10) return 'from-red-400 to-rose-500';
  };

  const getUrgencyLabel = (urgency) => {
    if (urgency <= 3) return 'Low Priority';
    if (urgency <= 7) return 'Medium Priority';
    if (urgency <= 10) return 'Critical Priority';
  };

  const getStatusConfig = (status) => {
    switch(status?.toLowerCase()) {
      case 'resolved':
        return {
          icon: <CheckCircle className="w-6 h-6" />,
          bg: 'bg-green-500',
          label: 'Resolved',
          textColor: 'text-green-700'
        };
      case 'assigned':
        return {
          icon: <User className="w-6 h-6" />,
          bg: 'bg-blue-500',
          label: 'Assigned to Rescuer',
          textColor: 'text-blue-700'
        };
      default:
        return {
          icon: <Clock className="w-6 h-6" />,
          bg: 'bg-yellow-500',
          label: 'Awaiting Response',
          textColor: 'text-yellow-700'
        };
    }
  };

  const getCategoryEmoji = (category) => {
    switch(category?.toLowerCase()) {
      case 'birds': return '🦅';
      case 'mammals': return '🦊';
      case 'reptiles': return '🐢';
      case 'others': return '🐾';
    }
  };

  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return date.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTimeAgo = (dateTime) => {
    const now = new Date();
    const date = new Date(dateTime);
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `${diffMins} minutes ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-gray-600 font-medium text-lg">Loading report details...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-md">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-600 mb-6">This rescue report doesn't exist or has been removed.</p>
         
          <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold rounded-full hover:scale-105 transition-transform">
            
            <Link to={'/admin'}>
            <span className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Reports</span>
            </span>
            
            </Link>
          </button>

        </div>
      </div>
    );
  }

  const statusConfig = getStatusConfig(report.status);

  
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
          <Link to={'/admin'}>

        <button className="inline-flex items-center space-x-2 text-emerald-600 hover:text-emerald-700 mb-6 font-semibold transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to All Reports</span>

        </button>
          </Link>

        {/* Emergency Badge */}
        {report.isEmergency && (
          <div className="bg-red-600 text-white px-6 py-3 rounded-2xl mb-6 shadow-lg flex items-center justify-center space-x-2 animate-pulse">
            <Zap className="w-6 h-6" fill="white" />
            <span className="font-black text-lg">🚨 EMERGENCY REPORT</span>
            <Zap className="w-6 h-6" fill="white" />
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content - Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-100">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-5xl">
                    {getCategoryEmoji(report.category)}
                  </div>
                  <div>
                    <h1 className="text-3xl font-black text-gray-900 mb-2">
                      {report.category} Rescue
                    </h1>
                    <p className="text-gray-500 text-sm">
                      Report ID: <span className="font-mono font-semibold">{report._id}</span>
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className={`${statusConfig.bg} text-white px-4 py-2 rounded-full flex items-center space-x-2 font-bold shadow-lg`}>
                  {statusConfig.icon}
                  <span>{statusConfig.label}</span>
                </div>
              </div>

              {/* Urgency Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Urgency Level</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${getUrgencyColor(report.Urgency)}`}>
                    {getUrgencyLabel(report.Urgency)} - {report.Urgency}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getUrgencyColor(report.Urgency)} transition-all duration-500`}
                    style={{ width: `${report.Urgency * 10}%` }}
                  ></div>
                </div>
              </div>

              {/* Image */}
              {report.imageUrl && (
                <div className="rounded-2xl overflow-hidden mb-6">
                  <img
                    src={report.imageUrl}
                    alt={`${report.category} rescue`}
                    className="w-full h-96 object-cover"
                  />
                </div>
              )}

              {/* Notes Section */}
              {report.Notes && (
                <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-2xl">
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Reporter's Notes</h3>
                      <p className="text-gray-700 leading-relaxed">{report.Notes}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Right Column */}
          <div className="space-y-6">
            {/* Location Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100">
              <h3 className="font-black text-xl text-gray-900 mb-4 flex items-center space-x-2">
                <MapPin className="w-6 h-6 text-emerald-600" />
                <span>Location Details</span>
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500 mb-1">City</p>
                  <p className="font-bold text-gray-900 text-lg">{report.city}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Address</p>
                  <p className="text-gray-700">{report.location}</p>
                </div>
              </div>

              {/* For future Usage......... View on Map Button */}

              {/* <button className="mt-4 w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors flex items-center justify-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>View on Map</span>
              </button> */}

            </div>

            {/* Time Details Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100">
              <h3 className="font-black text-xl text-gray-900 mb-4 flex items-center space-x-2">
                <Calendar className="w-6 h-6 text-emerald-600" />
                <span>Time Details</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Spotted At</p>
                  <p className="font-semibold text-gray-900">{formatDateTime(report.dateTime)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Reported</p>
                  <p className="font-semibold text-gray-900">{formatTimeAgo(report.createdAt)}</p>
                </div>
                {report.updatedAt !== report.createdAt && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="font-semibold text-gray-900">{formatTimeAgo(report.updatedAt)}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Card */}
            <div className="bg-white rounded-3xl shadow-xl p-6 border-2 border-gray-100">
              <h3 className="font-black text-xl text-gray-900 mb-4 flex items-center space-x-2">
                <Phone className="w-6 h-6 text-emerald-600" />
                <span>Contact Reporter</span>
              </h3>
              <p className="text-gray-700 mb-4">{report.number}</p>

                {/* Call Now Button, For Future Use............. */}

              {/* <button className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </button> */}


            </div>

            {/* Action Buttons (for rescuers/admins) */}
            {report.status === 'pending' && (
              <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl shadow-xl p-6 text-white">
                <h3 className="font-black text-xl mb-4">Take Action</h3>
                <div className="space-y-3">
                  <button onClick={handleAssignToMe()} className="w-full py-3 bg-white text-emerald-600 font-bold rounded-xl hover:scale-105 transition-transform">
                    Assign to Me
                  </button>
                  <button onClick={handleMarkAsResolved()} className="w-full py-3 bg-white/20 backdrop-blur text-white font-bold rounded-xl hover:bg-white/30 transition-colors">
                    Mark as Resolved
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportDetail;