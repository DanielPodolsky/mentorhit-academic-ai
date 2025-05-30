
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface QuizStep {
  id: string;
  title: string;
  question: string;
  options: { value: string; label: string; description?: string }[];
  type: 'single' | 'multiple';
}

const PreferencesQuiz = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const { updateUser } = useAuth();

  const steps: QuizStep[] = [
    {
      id: 'interests',
      title: 'Academic Interests',
      question: 'Which fields of study interest you most?',
      type: 'multiple',
      options: [
        { value: 'ai', label: 'Artificial Intelligence & Machine Learning' },
        { value: 'cybersecurity', label: 'Cybersecurity & Information Security' },
        { value: 'software', label: 'Software Engineering & Development' },
        { value: 'data', label: 'Data Science & Analytics' },
        { value: 'networks', label: 'Computer Networks & Systems' },
        { value: 'mobile', label: 'Mobile App Development' }
      ]
    },
    {
      id: 'career',
      title: 'Career Goals',
      question: 'What is your primary career goal after graduation?',
      type: 'single',
      options: [
        { value: 'startup', label: 'Start my own tech company', description: 'Entrepreneurship and innovation' },
        { value: 'bigtech', label: 'Work at a major tech company', description: 'Google, Microsoft, Meta, etc.' },
        { value: 'local', label: 'Join an Israeli tech company', description: 'Check Point, Wix, JFrog, etc.' },
        { value: 'research', label: 'Pursue graduate studies/research', description: 'Masters or PhD programs' },
        { value: 'consulting', label: 'Technology consulting', description: 'Help businesses with tech solutions' }
      ]
    },
    {
      id: 'learning',
      title: 'Learning Style',
      question: 'How do you prefer to learn new concepts?',
      type: 'single',
      options: [
        { value: 'hands-on', label: 'Hands-on projects and coding', description: 'Learning by building and experimenting' },
        { value: 'theory', label: 'Theoretical understanding first', description: 'Math, algorithms, and principles' },
        { value: 'group', label: 'Group work and collaboration', description: 'Team projects and peer learning' },
        { value: 'visual', label: 'Visual aids and demonstrations', description: 'Diagrams, videos, and examples' },
        { value: 'mixed', label: 'Combination of methods', description: 'Different approaches for different topics' }
      ]
    },
    {
      id: 'industry',
      title: 'Industry Preferences',
      question: 'Which industries would you like to work in?',
      type: 'multiple',
      options: [
        { value: 'fintech', label: 'Financial Technology' },
        { value: 'healthcare', label: 'Healthcare & MedTech' },
        { value: 'gaming', label: 'Gaming & Entertainment' },
        { value: 'security', label: 'Defense & Security' },
        { value: 'ecommerce', label: 'E-commerce & Retail' },
        { value: 'education', label: 'Education Technology' }
      ]
    },
    {
      id: 'skills',
      title: 'Skill Development',
      question: 'Which skills would you most like to develop?',
      type: 'multiple',
      options: [
        { value: 'programming', label: 'Advanced Programming Languages' },
        { value: 'algorithms', label: 'Algorithms & Data Structures' },
        { value: 'systems', label: 'System Design & Architecture' },
        { value: 'leadership', label: 'Leadership & Project Management' },
        { value: 'communication', label: 'Technical Communication' },
        { value: 'business', label: 'Business & Entrepreneurship' }
      ]
    }
  ];

  const handleAnswerChange = (stepId: string, value: string, isMultiple: boolean) => {
    setAnswers(prev => {
      if (isMultiple) {
        const currentAnswers = prev[stepId] || [];
        const newAnswers = currentAnswers.includes(value)
          ? currentAnswers.filter(a => a !== value)
          : [...currentAnswers, value];
        return { ...prev, [stepId]: newAnswers };
      } else {
        return { ...prev, [stepId]: [value] };
      }
    });
  };

  const canProceed = () => {
    const currentStepId = steps[currentStep].id;
    const currentAnswers = answers[currentStepId] || [];
    return currentAnswers.length > 0;
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Save preferences and mark quiz as completed
    updateUser({ hasCompletedQuiz: true });
    setIsCompleted(true);
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-green-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
          <Check className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Preferences Saved Successfully!
        </h2>
        <p className="text-gray-600 mb-8">
          Thank you for completing the preferences quiz. MentorHIT will now provide more personalized academic and career guidance based on your interests.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          Start Chatting with MentorHIT
        </button>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {currentStepData.title}
        </h1>
        <p className="text-xl text-gray-600">
          {currentStepData.question}
        </p>
        {currentStepData.type === 'multiple' && (
          <p className="text-sm text-gray-500 mt-2">
            You can select multiple options
          </p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {currentStepData.options.map((option) => {
          const isSelected = (answers[currentStepData.id] || []).includes(option.value);
          return (
            <button
              key={option.value}
              onClick={() => handleAnswerChange(currentStepData.id, option.value, currentStepData.type === 'multiple')}
              className={`w-full p-4 border-2 rounded-xl text-left transition-all ${
                isSelected
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">
                    {option.label}
                  </h3>
                  {option.description && (
                    <p className="text-sm text-gray-600">
                      {option.description}
                    </p>
                  )}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {isSelected && <Check className="h-3 w-3 text-white" />}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="flex items-center space-x-2 px-4 py-2 text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Complete Quiz</span>
            <Check className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <span>Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PreferencesQuiz;
