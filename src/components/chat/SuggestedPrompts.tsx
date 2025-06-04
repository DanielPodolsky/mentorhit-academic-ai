import React from 'react';
import { BookOpen, TrendingUp, Code, Shield } from 'lucide-react';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  const prompts = [
    {
      icon: BookOpen,
      text: "?איזה קורסי בחירה כדאי לי לקחת כדי להתמחות במדעי הנתונים",
      category: "תכנון לימודים"
    },
    {
      icon: Code,
      text: "?על בסיס הציונים שלי באלגוריתמים 1 ו2, אילו קורסי בחירה מתאימים לי",
      category: "התקדמות אישית"
    },
    {
      icon: Shield,
      text: "?איזה מסלולי קריירה בתחום הסייבר מתאימים לתחומי העניין שלי",
      category: "הכונה מקצועית"
    },
    {
      icon: TrendingUp,
      text: "?איך אני יכול לשפר את הממוצע ואת הביצועים האקדמיים שלי",
      category: "טיפים ללמידה"
    }
  ];

  return (
    <div className="space-y-3 lg:space-y-4">
      <div className="text-center">
        <h3 className="text-base lg:text-lg font-semibold text-hit-dark mb-2">
          התחילו לדוגמה עם ההצעות האלו
        </h3>
        <p className="text-sm lg:text-base text-hit-secondary">
          :) לחצו על כל הצעה כדי להתחיל את השיחה שלך איתנו
        </p>
      </div>

      {/* Mobile: Single column, Desktop: Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt.text)}
            className="p-3 lg:p-4 bg-white border border-gray-200 rounded-xl hover:border-hit-primary hover:shadow-md active:border-hit-primary active:shadow-md transition-all duration-200 text-left group touch-manipulation"
          >
            <div className="flex items-start space-x-2 lg:space-x-3">
              <div className="p-1.5 lg:p-2 bg-hit-light rounded-lg group-hover:bg-hit-primary/10 group-active:bg-hit-primary/10 transition-colors flex-shrink-0">
                <prompt.icon className="h-4 w-4 lg:h-5 lg:w-5 text-hit-primary" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-xs lg:text-sm font-medium text-hit-dark mb-1">
                  {prompt.category}
                </p>
                <p className="text-xs lg:text-sm text-hit-secondary leading-relaxed">
                  {prompt.text}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;