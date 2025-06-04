import React from 'react';
import { User, MapPin, DollarSign, Star, Briefcase, Building2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
  jobData?: any; // Job data from Lambda
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, jobData }) => {
  const isUser = message.sender === 'user';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageText = (text: string) => {
    // Simple markdown-like formatting
    const lines = text.split('\n');
    return lines.map((line, index) => {
      // Handle bullet points
      if (line.trim().startsWith('• ')) {
        const parts = line.split('**');
        if (parts.length >= 3) {
          return (
            <div key={index} className="mb-1">
              • <strong>{parts[1]}</strong>{parts[2]}
            </div>
          );
        }
        return <div key={index} className="mb-1">{line}</div>;
      }

      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={index} className={index > 0 ? 'mt-2' : ''}>
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
            )}
          </div>
        );
      }

      // Regular line
      return line.trim() ? (
        <div key={index} className={index > 0 ? 'mt-2' : ''}>
          {line}
        </div>
      ) : (
        <div key={index} className="h-2"></div>
      );
    });
  };

  // NEW: Render job card
  const renderJobCard = (job: any, index: number) => {
    return (
      <div key={index} className="bg-white rounded-xl border border-gray-200 p-4 mb-3 shadow-sm hover:shadow-md transition-shadow">
        {/* Header with Company Logo and Basic Info */}
        <div className="flex items-start space-x-3 mb-3">
          {job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-12 h-12 rounded-lg object-cover border border-gray-200"
              onError={(e) => {
                // Fallback to building icon if logo fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          {/* Fallback icon - hidden by default, shown if logo fails */}
          <div className={`w-12 h-12 rounded-lg bg-hit-primary flex items-center justify-center ${job.logo ? 'hidden' : ''}`}>
            <Building2 className="w-6 h-6 text-white" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-hit-dark text-lg leading-tight">{job.title}</h3>
            <p className="text-hit-secondary font-medium">{job.company}</p>

            {/* Location and Salary */}
            <div className="flex items-center space-x-4 mt-2 text-sm text-hit-secondary">
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span className="font-medium text-hit-dark">{job.salary}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500" />
                <span>{Math.round(job.match_score * 100)}% התאמה</span>
              </div>
            </div>
          </div>
        </div>

        {/* Job Description */}
        <p className="text-hit-dark text-sm mb-3 leading-relaxed">{job.description}</p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          {job.skills && job.skills.slice(0, 4).map((skill: string, skillIndex: number) => (
            <span
              key={skillIndex}
              className="px-3 py-1 bg-hit-light text-hit-primary text-xs font-medium rounded-full border border-hit-primary/20"
            >
              {skill}
            </span>
          ))}
          {job.skills && job.skills.length > 4 && (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{job.skills.length - 4} נוספים
            </span>
          )}
        </div>

        {/* Apply Button */}
        <div className="mt-4 pt-3 border-t border-gray-100">
          <button className="w-full bg-hit-primary text-white py-2 px-4 rounded-lg font-medium hover:bg-hit-primary-hover transition-colors text-sm">
            צפה במשרה המלאה
          </button>
        </div>
      </div>
    );
  };

  // NEW: Check if we should show job cards
  const shouldShowJobCards = !isUser && jobData && jobData.success && jobData.jobs && jobData.jobs.length > 0;

  return (
    <div className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      <div className={`h-10 w-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${isUser ? 'bg-hit-secondary' : 'bg-hit-primary'
        }`}>
        {isUser ? (
          <User className="h-5 w-5 text-white" />
        ) : (
          <img src="/logo-white.png" className='h-8 w-8' alt="" />
        )}
      </div>

      {/* Message Content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-4xl flex-1`}>
        {/* Regular Message Bubble */}
        <div className={`rounded-2xl px-4 py-3 shadow-sm ${isUser
            ? 'bg-hit-dark text-white'
            : 'bg-white text-hit-dark border border-gray-200'
          }`}>
          <div className="whitespace-pre-wrap text-right">
            {formatMessageText(message.text)}
          </div>
        </div>

        {/* NEW: Job Cards Section */}
        {shouldShowJobCards && (
          <div className="mt-4 w-full max-w-3xl">
            {/* Job Cards Header */}
            <div className="flex items-center space-x-2 mb-4 justify-end">
              <div className="text-right">
                <h4 className="text-lg font-semibold text-hit-dark">
                  משרות מומלצות ({jobData.jobs.length})
                </h4>
                {jobData.queryType === 'cybersecurity-focused' && (
                  <p className="text-sm text-hit-secondary">משרות בתחום האבטחה והסייבר</p>
                )}
              </div>
              <Briefcase className="w-6 h-6 text-hit-primary" />
            </div>

            {/* Job Cards */}
            <div className="space-y-3">
              {jobData.jobs.map((job: any, index: number) => renderJobCard(job, index))}
            </div>

            {/* Footer */}
            {jobData.totalJobsFound && jobData.totalJobsFound > jobData.jobs.length && (
              <div className="mt-4 p-3 bg-hit-light rounded-lg border border-hit-primary/20 text-center">
                <p className="text-sm text-hit-dark">
                  יש עוד <strong>{jobData.totalJobsFound - jobData.jobs.length}</strong> משרות נוספות בתחום.
                  האם תרצה לראות אותן?
                </p>
              </div>
            )}
          </div>
        )}

        {/* Timestamp */}
        <div className={`mt-1 text-xs text-hit-secondary ${isUser ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;