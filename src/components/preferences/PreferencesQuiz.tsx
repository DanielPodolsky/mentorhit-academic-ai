
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
      title: 'תחום התמחות',
      question: '?אילו תחומים הכי מעניינים אתכם',
      type: 'multiple',
      options: [
        { value: 'ai_data', label: 'בינה מלאכותית ומדעי הנתונים', description: 'למשל: למידה עמוקה, ראייה ממוחשבת, כריית נתונים' },
        { value: 'cybersecurity_web', label: 'תקשורת ואינטרנט', description: 'למשל: אבטחת מחשבים, היבטים מעשיים באבטחת סייבר, פיתוח צד לקוח, פיתוח צד שרת' },
        { value: 'software_eng', label: 'הנדסת תוכנה', description: 'למשל: בדיקות תוכנה, תבנית עיצוב תוכנה, תכנות מונחה עצמים בסביבות דוט נט וסי-שארפ' },
        { value: 'system_eng', label: 'הנדסת מחשבים', description: 'למשל: מערכות זמן אמת, רובוטיקה למדעי המחשב, פיתוח תוכנה עבור רכב אוטונומי אינטליגנטי, אלגוריתמים לניווט ושיערוך מקום' },
        { value: 'general', label: 'קורסי בחירה כלליים', description: 'למשל: תכנות לוגי, מבוא למערכות מידע גאוגרפי, תכנות תחרותי, גרפיקה ממוחשבת' }
      ]
    },
    {
      id: 'course_purpose',
      title: 'מטרת קורסי הבחירה',
      question: '?מה חשוב לכם הכי הרבה בקורסי הבחירה',
      type: 'multiple',
      options: [
        { value: 'career_focused', label: 'רלוונטיות לקריירה', description: 'קורסים שיעזרו לי למצוא עבודה בתחום שאני רוצה' },
        { value: 'skill_building', label: 'פיתוח כישורים טכניים', description: 'ללמוד טכנולוגיות וכלים חדשים' },
        { value: 'academic_excellence', label: 'הישגים אקדמיים', description: 'קורסים שאני יכול להצליח בהם ולהעלות ממוצע' },
        { value: 'interest_driven', label: 'עניין אישי', description: 'קורסים שמעניינים אותי גם אם הם לא קשורים לקריירה' },
        { value: 'networking', label: 'קשרים ועבודה קבוצתית', description: 'קורסים עם פרויקטים קבוצתיים וחיבור לסטודנטים אחרים' }
      ]
    },
    {
      id: 'learning_style',
      title: 'סגנון למידה מועדף',
      question: '?איך אתם הכי אוהבים ללמוד חומר חדש',
      type: 'single',
      options: [
        { value: 'hands_on', label: 'למידה מעשית ופרויקטים', description: 'אוהב ללמוד תוך כדי עשייה ובניית דברים' },
        { value: 'theory_first', label: 'הבנה תיאורטית מעמיקה', description: 'מעדיף להבין את העקרונות לפני המעבר לפרקטיקה' },
        { value: 'collaborative', label: 'למידה חברתית ושיתופית', description: 'אוהב לעבוד בקבוצות ולשתף רעיונות' },
        { value: 'visual_learner', label: 'למידה חזותית ואינטראקטיבית', description: 'מתחבר לדיאגרמות, סרטונים ודוגמאות חזותיות' },
        { value: 'structured', label: 'למידה מובנית ושיטתית', description: 'אוהב תכנית לימודים ברורה ומתקדמת בצורה הדרגתית' }
      ]
    },
    {
      id: 'future_goals',
      title: 'מטרות לעתיד',
      question: 'איך אתה רואה את עצמך בעוד 5 שנים?',
      type: 'multiple',
      options: [
        { value: 'tech_leader', label: 'מוביל טכנולוגי', description: 'מוביל צוותי פיתוח ומשפיע על החלטות טכנולוגיות' },
        { value: 'entrepreneur', label: 'יזם וחדשן', description: 'מקים חברה או פותח מוצרים חדשניים' },
        { value: 'specialist', label: 'מומחה בתחום מסוים', description: 'הופך למומחה מוכר בתחום ספציפי' },
        { value: 'global_impact', label: 'יוצר השפעה חברתית', description: 'עובד על פרויקטים שמשפיעים חיובית על החברה' },
        { value: 'work_life_balance', label: 'איזון עבודה וחיים', description: 'משלב בין קריירה מספקת לחיים אישיים מלאים' },
      ]
    },
    {
      id: 'work_environment',
      title: 'סביבת עבודה מועדפת',
      question: 'באיזה סוג של סביבת עבודה אתה מרגיש הכי טוב?',
      type: 'single',
      options: [
        { value: 'startup', label: 'סטארט-אפ דינמי', description: 'סביבה מהירה, חדשנית ומאתגרת' },
        { value: 'remote_flexible', label: 'עבודה מרחוק וגמישה', description: 'חופש גיאוגרפי וגמישות בשעות העבודה' },
        { value: 'research_academic', label: 'מחקר ואקדמיה', description: 'סביבה אקדמית עם דגש על מחקר וחדשנות' },
        { value: 'freelance_consulting', label: 'עצמאי וייעוץ', description: 'עבודה עצמאית עם לקוחות מגוונים' },
        { value: 'social_impact', label: 'ארגונים חברתיים', description: 'ארגונים שמטרתם יצירת השפעה חברתית חיובית' }
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
        <div className="bg-hit-light rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 shadow-lg">
          <Check className="h-8 w-8 text-hit-primary" />
        </div>
        <h2 className="text-2xl font-bold text-hit-dark mb-4">
          !ההעדפות נשמרו בהצלחה
        </h2>
        <p className="text-hit-secondary mb-8">
          תודה שהשלמתם את השאלון. מנטורהיט יוכל כעת לספק לך הכוונה אקדמית ומקצועית מותאמת אישית על בסיס תחומי העניין שלך.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-hit-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-hit-primary-hover transition-colors shadow-md"
        >
          :) התחילו שיחה איתנו
        </button>
      </div>
    );
  }

  const currentStepData = steps[currentStep];

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-hit-secondary mb-2">
          <span>Step {currentStep + 1} of {steps.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-hit-primary h-2 rounded-full transition-all duration-300 shadow-sm"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-hit-dark mb-2 text-right">
          {currentStepData.title}
        </h1>
        <p className="text-xl text-hit-secondary text-right">
          {currentStepData.question}
        </p>
        {currentStepData.type === 'multiple' && (
          <p className="text-sm text-hit-secondary/70 mt-2 text-right">
            אתם יכולים לבחור יותר מתשובה אחת
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
              className={`w-full p-4 border-2 rounded-xl text-right transition-all shadow-sm ${isSelected
                ? 'border-hit-primary bg-hit-light'
                : 'border-gray-200 hover:border-hit-secondary bg-white'
                }`}
            >
              <div className="flex items-start justify-between flex-row-reverse">
                <div className="flex-1 text-right">
                  <h3 className="font-medium text-hit-dark mb-1">
                    {option.label}
                  </h3>
                  {option.description && (
                    <p className="text-sm text-hit-secondary">
                      {option.description}
                    </p>
                  )}
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ml-3 ${isSelected ? 'border-hit-primary bg-hit-primary' : 'border-gray-300'
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
          className="flex items-center space-x-2 px-4 py-2 text-hit-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:text-hit-dark transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          <span>Previous</span>
        </button>

        {currentStep === steps.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-hit-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-hit-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
          >
            <span>Complete Quiz</span>
            <Check className="h-5 w-5" />
          </button>
        ) : (
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-hit-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-hit-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md"
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
