
import React from 'react';
import { BookOpen, TrendingUp, Code, Shield } from 'lucide-react';

interface SuggestedPromptsProps {
  onPromptClick: (prompt: string) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({ onPromptClick }) => {
  const prompts = [
    {
      icon: BookOpen,
      text: "What electives should I take for a data science career?",
      category: "Course Planning"
    },
    {
      icon: Code,
      text: "Based on my grades in Java and Python, what advanced courses do you recommend?",
      category: "Academic Progress"
    },
    {
      icon: Shield,
      text: "What career paths match my interests in cybersecurity?",
      category: "Career Guidance"
    },
    {
      icon: TrendingUp,
      text: "How can I improve my GPA and academic performance?",
      category: "Study Tips"
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-hit-dark mb-2">
          Get started with these suggestions
        </h3>
        <p className="text-hit-secondary">
          Click on any prompt to begin your conversation with MentorHIT
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt.text)}
            className="p-4 bg-white border border-gray-200 rounded-xl hover:border-hit-primary hover:shadow-md transition-all duration-200 text-left group"
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-hit-light rounded-lg group-hover:bg-hit-primary/10 transition-colors">
                <prompt.icon className="h-5 w-5 text-hit-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-hit-dark mb-1">
                  {prompt.category}
                </p>
                <p className="text-sm text-hit-secondary leading-relaxed">
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
