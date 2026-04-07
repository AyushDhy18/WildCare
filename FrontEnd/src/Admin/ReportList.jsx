import React from 'react';
import { useEffect } from 'react';
import { getReports } from '../Api';
import { useState } from 'react';
import Loading from '../Loading';
import { MapPin, Clock, AlertTriangle, CheckCircle, XCircle, Loader } from 'lucide-react';
import {Link} from 'react-router-dom';


const ReportList = () => {
    const [reports,setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterCategory, setFilterCategory] = useState("all");
    const [sortBy, setSortBy] = useState("latest");

    useEffect(()=>{ 
      const fetchReport = async()=>{
        try{
        const data = await getReports();
        setReports(data);
        }catch(err){
          console.error(err);
        }finally{
          setLoading(false);
        }
    };
    fetchReport();

    },[]);

    const getUrgencyColor = (urgency) => {
    if (urgency <= 3) return 'from-green-400 to-emerald-500';
    if (urgency <= 7) return 'from-yellow-400 to-orange-500';
    if (urgency <= 10) return 'from-red-400 to-rose-500';
  };

  const getUrgencyLabel = (urgency) => {
    if (urgency <= 3) return 'Low';
    if (urgency <= 7) return 'Medium';
    if (urgency <= 10) return 'Critical';
  };

  const getStatusConfig = (status) => {
    switch(status?.toLowerCase()) {
      case 'resolved':
        return { 
          icon: <CheckCircle className="w-5 h-5" />,
          bg: 'bg-green-100',
          text: 'text-green-700',
          border: 'border-green-300',
          label: 'Completed'
        };
      case 'assigned':
        return { 
          icon: <Loader className="w-5 h-5 animate-spin" />,
          bg: 'bg-blue-100',
          text: 'text-blue-700',
          border: 'border-blue-300',
          label: 'In Progress'
        };
      case 'cancelled':
        return { 
          icon: <XCircle className="w-5 h-5" />,
          bg: 'bg-gray-100',
          text: 'text-gray-700',
          border: 'border-gray-300',
          label: 'Cancelled'
        };
      default:
        return { 
          icon: <AlertTriangle className="w-5 h-5" />,
          bg: 'bg-yellow-100',
          text: 'text-yellow-700',
          border: 'border-yellow-300',
          label: 'Pending'
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
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  const filteredReports = reports
  .filter((r) => {
    const statusMatch =
      filterStatus === "all" ||
      r.status?.toLowerCase() === filterStatus;

    const categoryMatch =
      filterCategory === "all" ||
      r.category?.toLowerCase() === filterCategory;

    return statusMatch && categoryMatch;
  })
  .sort((a, b) => {
    if (sortBy === "latest") {
      return new Date(b.dateTime) - new Date(a.dateTime);
    }
    if (sortBy === "oldest") {
      return new Date(a.dateTime) - new Date(b.dateTime);
    }
    if (sortBy === "urgency") {
    return (Number(b.Urgency) || 0) - (Number(a.Urgency) || 0);
    }
    return 0;
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">
            Active Rescue Reports
          </h1>
          <p className="text-lg text-gray-600">
            Track and manage all wildlife rescue requests
          </p>
        </div>

        {/* Summary + Controls */}
<div className="mb-6 space-y-6">

  {/* Summary */}
  {!loading && reports.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-black text-gray-900 mb-1">{reports.length}</div>
                <div className="text-sm text-gray-600">Total Reports</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-yellow-600 mb-1">
                  {reports.filter(r => r.status?.toLowerCase() === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-blue-600 mb-1">
                  {reports.filter(r => r.status?.toLowerCase() === 'assigned').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-black text-green-600 mb-1">
                  {reports.filter(r => r.status?.toLowerCase() === 'resolved').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
            </div>
          </div>
        )}

  {/* Filters + Sort */}
  <div className="bg-white rounded-2xl shadow-lg p-4 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">

    {/* Filters */}
    <div className="flex flex-wrap gap-3">

      <select
        className="px-4 py-2 rounded-xl border bg-gray-50"
        onChange={(e) => setFilterStatus(e.target.value)}
      >
        <option value="all">All Status</option>
        <option value="pending">Pending</option>
        <option value="assigned">In Progress</option>
        <option value="resolved">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <select
        className="px-4 py-2 rounded-xl border bg-gray-50"
        onChange={(e) => setFilterCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="birds">Birds</option>
        <option value="mammals">Mammals</option>
        <option value="reptiles">Reptiles</option>
        <option value="others">Others</option>
      </select>
    </div>

    {/* Sort */}
    <div>
      <select
        className="px-4 py-2 rounded-xl border bg-gray-50"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="urgency">Urgency (High → Low)</option>
      </select>
    </div>

  </div>
</div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600 font-medium">Loading reports...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reports.length === 0 ? (
              <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Reports Yet</h3>
                <p className="text-gray-600">All rescue reports will appear here</p>
              </div>
            ) : (
              filteredReports.map((report) => {
                const statusConfig = getStatusConfig(report.status);
                return (
                  
                  <div 
                    key={report._id} 
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border-2 border-gray-100 hover:border-emerald-200"
                  >
                    <Link to={`/${report._id}`}>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Left Section - Category & Location */}
                      <div className="flex items-center space-x-4 flex-1">
                        {/* Category Icon */}
                        <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                          {getCategoryEmoji(report.category)}
                        </div>
                        
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-bold text-gray-900 mb-1">
                            {report.category}
                          </h3>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <MapPin className="w-4 h-4 flex-shrink-0" />
                            <span className="text-sm truncate">{report.city}</span>
                          </div>
                        </div>
                      </div>

                      {/* Middle Section - DateTime & Urgency */}
                      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                        {/* DateTime */}
                        <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-xl">
                          <Clock className="w-5 h-5 text-gray-500" />
                          <span className="text-sm font-medium text-gray-700">
                            {formatDateTime(report.dateTime)}
                          </span>
                        </div>

                        {/* Urgency Badge */}
                        <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getUrgencyColor(report.Urgency)} text-white font-bold text-sm flex items-center space-x-2 shadow-md`}>
                          <AlertTriangle className="w-4 h-4" />
                          <span>{getUrgencyLabel(report.Urgency)} - {report.Urgency}</span>
                        </div>
                      </div>

                      {/* Right Section - Status */}
                      <div className={`flex items-center space-x-2 px-4 py-2 ${statusConfig.bg} ${statusConfig.text} border-2 ${statusConfig.border} rounded-xl font-semibold`}>
                        {statusConfig.icon}
                        <span>{statusConfig.label}</span>
                      </div>
                    </div>
                    </Link>
                  </div>
                  
                );
              })
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default ReportList;