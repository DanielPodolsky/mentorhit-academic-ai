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
  jobData?: any;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, jobData }) => {
  const isUser = message.sender === 'user';

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Helper function to detect if text contains Hebrew
  const containsHebrew = (text: string) => {
    return /[\u0590-\u05FF]/.test(text);
  };

  const formatMessageText = (text: string) => {
    const lines = text.split('\n');
    const hasHebrew = containsHebrew(text);

    return lines.map((line, index) => {
      // Handle bullet points
      if (line.trim().startsWith('• ')) {
        const parts = line.split('**');
        if (parts.length >= 3) {
          return (
            <div key={index} className={`mb-1 ${hasHebrew ? 'text-right' : 'text-left'}`} dir={hasHebrew ? 'rtl' : 'ltr'}>
              • <strong>{parts[1]}</strong>{parts[2]}
            </div>
          );
        }
        return <div key={index} className={`mb-1 ${hasHebrew ? 'text-right' : 'text-left'}`} dir={hasHebrew ? 'rtl' : 'ltr'}>{line}</div>;
      }

      // Handle bold text
      if (line.includes('**')) {
        const parts = line.split('**');
        return (
          <div key={index} className={`${index > 0 ? 'mt-2' : ''} ${hasHebrew ? 'text-right' : 'text-left'}`} dir={hasHebrew ? 'rtl' : 'ltr'}>
            {parts.map((part, partIndex) =>
              partIndex % 2 === 1 ? <strong key={partIndex}>{part}</strong> : part
            )}
          </div>
        );
      }

      // Regular line
      return line.trim() ? (
        <div key={index} className={`${index > 0 ? 'mt-2' : ''} ${hasHebrew ? 'text-right' : 'text-left'}`} dir={hasHebrew ? 'rtl' : 'ltr'}>
          {line}
        </div>
      ) : (
        <div key={index} className="h-2"></div>
      );
    });
  };

  // Mobile-optimized job card rendering
  const renderJobCard = (job: any, index: number) => {
    return (
      <div key={index} className="bg-white rounded-xl border border-gray-200 p-3 lg:p-4 mb-3 shadow-sm hover:shadow-md transition-shadow" dir="rtl">
        {/* Header - Mobile optimized with RTL */}
        <div className="flex items-start space-x-2 lg:space-x-3 mb-3 space-x-reverse">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-hit-dark text-base lg:text-lg leading-tight text-right">
              {job.title}
            </h3>
            <p className="text-hit-secondary font-medium text-sm lg:text-base text-right">{job.company}</p>

            {/* Location and Salary - Mobile stack with RTL */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 mt-2 text-xs lg:text-sm text-hit-secondary space-y-1 sm:space-y-0 sm:space-x-reverse sm:justify-end">
              <div className="flex items-center space-x-1 space-x-reverse justify-end">
                <span className="truncate">{job.location}</span>
                <MapPin className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              </div>
              <div className="flex items-center space-x-1 space-x-reverse justify-end">
                <span className="font-medium text-hit-dark">{job.salary}</span>
                <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 flex-shrink-0" />
              </div>
              <div className="flex items-center space-x-1 space-x-reverse justify-end">
                <span>{Math.round(job.match_score * 100)}% התאמה</span>
                <Star className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-500 flex-shrink-0" />
              </div>
            </div>
          </div>

          {job.logo ? (
            <img
              src={job.logo}
              alt={`${job.company} logo`}
              className="w-10 h-10 lg:w-12 lg:h-12 rounded-lg object-cover border border-gray-200 flex-shrink-0"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-lg bg-hit-primary flex items-center justify-center flex-shrink-0 ${job.logo ? 'hidden' : ''}`}>
            <Building2 className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
          </div>
        </div>

        {/* Job Description - Mobile optimized with RTL */}
        <p className="text-hit-dark text-xs lg:text-sm mb-3 leading-relaxed text-right" dir="rtl">
          {job.description}
        </p>

        {/* Skills Tags - Mobile responsive grid with RTL */}
        <div className="flex flex-wrap gap-1.5 lg:gap-2 mb-3 justify-end" dir="rtl">
          {job.skills && job.skills.slice(0, window.innerWidth < 768 ? 3 : 4).map((skill: string, skillIndex: number) => (
            <span
              key={skillIndex}
              className="px-2 lg:px-3 py-1 bg-hit-light text-hit-primary text-xs font-medium rounded-full border border-hit-primary/20"
            >
              {skill}
            </span>
          ))}
          {job.skills && job.skills.length > (window.innerWidth < 768 ? 3 : 4) && (
            <span className="px-2 lg:px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
              +{job.skills.length - (window.innerWidth < 768 ? 3 : 4)} נוספים
            </span>
          )}
        </div>

        {/* Apply Button - Mobile touch-friendly */}
        <div className="pt-3 border-t border-gray-100">
          <button className="w-full bg-hit-primary text-white py-3 lg:py-2 px-4 rounded-lg font-medium hover:bg-hit-primary-hover active:bg-hit-primary-hover transition-colors text-sm touch-manipulation">
            צפה במשרה המלאה
          </button>
        </div>
      </div>
    );
  };

  const shouldShowJobCards = !isUser && jobData && jobData.success && jobData.jobs && jobData.jobs.length > 0;

  return (
    <div className={`flex items-start space-x-2 lg:space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar - Mobile responsive */}
      <div className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full flex items-center justify-center shadow-sm flex-shrink-0 ${isUser ? 'bg-hit-secondary' : 'bg-hit-primary'
        }`}>
        {isUser ? (
          <User className="h-4 w-4 lg:h-5 lg:w-5 text-white" />
        ) : (
          <img src="/logo-white.png" className='h-6 w-6 lg:h-8 lg:w-8' alt="" />
        )}
      </div>

      {/* Message Content - Mobile optimized with RTL support */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] lg:max-w-4xl flex-1`}>
        {/* Regular Message Bubble with automatic RTL detection */}
        <div className={`rounded-2xl px-3 py-2 lg:px-4 lg:py-3 shadow-sm ${isUser
          ? 'bg-hit-dark text-white'
          : 'bg-white text-hit-dark border border-gray-200'
          }`}>
          <div className="whitespace-pre-wrap text-sm lg:text-base">
            {formatMessageText(message.text)}
          </div>
        </div>

        {/* Job Cards Section - Mobile optimized with RTL */}
        {shouldShowJobCards && (
          <div className="mt-3 lg:mt-4 w-full max-w-full lg:max-w-3xl" dir="rtl">
            {/* Job Cards Header with RTL */}
            <div className="flex items-center space-x-2 mb-3 lg:mb-4 justify-start space-x-reverse">
              <Briefcase className="w-5 h-5 lg:w-6 lg:h-6 text-hit-primary flex-shrink-0" />
              <div className="text-right">
                <h4 className="text-base lg:text-lg font-semibold text-hit-dark">
                  משרות מומלצות ({jobData.jobs.length})
                </h4>
                {jobData.queryType === 'cybersecurity-focused' && (
                  <p className="text-xs lg:text-sm text-hit-secondary">משרות בתחום האבטחה והסייבר</p>
                )}
              </div>
            </div>

            {/* Job Cards */}
            <div className="space-y-2 lg:space-y-3">
              {jobData.jobs.map((job: any, index: number) => renderJobCard(job, index))}
            </div>

            {/* Footer with RTL */}
            {jobData.totalJobsFound && jobData.totalJobsFound > jobData.jobs.length && (
              <div className="mt-3 lg:mt-4 p-3 bg-hit-light rounded-lg border border-hit-primary/20 text-center" dir="rtl">
                <p className="text-xs lg:text-sm text-hit-dark">
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