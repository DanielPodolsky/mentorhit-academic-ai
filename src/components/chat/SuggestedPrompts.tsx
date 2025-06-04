import React from 'react';
import { BookOpen, TrendingUp, Code, Shield } from 'lucide-react';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  const prompts = [
    {
      icon: BookOpen,
      text: "איזה קורסי בחירה כדאי לי לקחת כדי להתמחות במדעי הנתונים?",
      category: "תכנון לימודים"
    },
    {
      icon: Code,
      text: "על בסיס הציונים שלי באלגוריתמים 1 ו2, אילו קורסי בחירה מתאימים לי?",
      category: "התקדמות אישית"
    },
    {
      icon: Shield,
      text: "איזה מסלולי קריירה בתחום הסייבר מתאימים לתחומי העניין שלי?",
      category: "הכונה מקצועית"
    },
    {
      icon: TrendingUp,
      text: "איך אני יכול לשפר את הממוצע ואת הביצועים האקדמיים שלי?",
      category: "טיפים ללמידה"
    }
  ];

  return (
    <div className="space-y-4" dir="rtl">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-hit-dark mb-2">
          התחילו לדוגמה עם ההצעות האלו
        </h3>
        <p className="text-hit-secondary">
          לחצו על כל הצעה כדי להתחיל את השיחה שלך איתנו :)
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt.text)}
            className="p-4 bg-white border border-gray-200 rounded-xl hover:border-hit-primary hover:shadow-md transition-all duration-200 text-right group"
            dir="rtl"
          >
            <div className="flex items-start space-x-3 space-x-reverse">
              <div className="flex-1 text-right">
                <p className="text-sm font-medium text-hit-dark mb-1">
                  {prompt.category}
                </p>
                <p className="text-sm text-hit-secondary leading-relaxed text-right">
                  {prompt.text}
                </p>
              </div>
              <div className="p-2 bg-hit-light rounded-lg group-hover:bg-hit-primary/10 transition-colors">
                <prompt.icon className="h-5 w-5 text-hit-primary" />
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;