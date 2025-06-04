import React, { useState, useEffect, useMemo } from 'react';
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  TrendingUp,
  Award,
  Settings,
  Calendar,
  Target,
  Clock,
  BarChart3,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Edit3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ProfileStats {
  questionsAsked: number;
  coursesRecommended: number;
  careerPathsExplored: number;
  satisfactionScore: number;
  totalChatSessions: number;
  averageSessionLength: number;
}

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileStats, setProfileStats] = useState<ProfileStats>({
    questionsAsked: 15,
    coursesRecommended: 8,
    careerPathsExplored: 3,
    satisfactionScore: 92,
    totalChatSessions: 7,
    averageSessionLength: 12
  });

  // Load saved stats from localStorage
  useEffect(() => {
    const savedStats = localStorage.getItem('mentorHIT_stats');
    if (savedStats) {
      try {
        const parsedStats = JSON.parse(savedStats);
        setProfileStats(parsedStats);
      } catch (error) {
        console.error('Failed to parse saved stats:', error);
      }
    }
  }, []);

  // Computed values
  const completionPercentage = useMemo(() => {
    if (!user) return 0;
    const totalCredits = 120;
    const completedCredits = 78; // This could come from user data
    return Math.round((completedCredits / totalCredits) * 100);
  }, [user]);

  const currentSemesterProgress = useMemo(() => {
    // Mock calculation - in real app this would come from actual data
    const semesterStart = new Date('2024-09-01');
    const semesterEnd = new Date('2024-12-31');
    const now = new Date();
    const totalDuration = semesterEnd.getTime() - semesterStart.getTime();
    const elapsed = now.getTime() - semesterStart.getTime();
    return Math.max(0, Math.min(100, Math.round((elapsed / totalDuration) * 100)));
  }, []);

  const handleQuizRedirect = () => {
    // This would trigger navigation to preferences quiz
    window.location.href = '#preferences';
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
          <AlertCircle className="h-12 w-12 text-hit-secondary mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-hit-dark mb-2">שגיאה בטעינת פרופיל</h2>
          <p className="text-hit-secondary">אנא התחברו מחדש למערכת</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-hit-gradient opacity-10 rounded-full -mr-16 -mt-16"></div>

        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 text-hit-secondary hover:text-hit-primary transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            <span className="text-sm">ערוך פרופיל</span>
          </button>
        </div>

        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="h-20 w-20 bg-hit-primary rounded-full flex items-center justify-center shadow-lg overflow-hidden">
              {user.name.includes('noy') ? (
                <img src="/noy.png" alt="Noy's picture" className="h-full w-full object-cover" />
              ) : user.name.includes('daniel') ? (
                <img src="/daniel.png" alt="Daniel's picture" className="h-full w-full object-cover" />
              ) : (
                <User className="h-10 w-10 text-white" />
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
              <CheckCircle className="h-3 w-3 text-white" />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-hit-dark">{user.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-hit-secondary">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="h-4 w-4" />
                <span>מזהה סטודנט: {user.studentId}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="px-2 py-1 bg-hit-light text-hit-primary text-xs font-medium rounded-full">
                סטודנט פעיל
              </span>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                ממוצע גבוה
              </span>
            </div>
          </div>

          <div className="text-right">
            <div className="text-3xl font-bold text-hit-primary">{user.gpa}</div>
            <div className="text-sm text-hit-secondary">ממוצע נוכחי</div>
            <div className="text-xs text-hit-secondary mt-1">מתוך 4.0</div>
          </div>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="h-10 w-10 bg-hit-light rounded-lg flex items-center justify-center mx-auto mb-2">
            <BookOpen className="h-5 w-5 text-hit-primary" />
          </div>
          <div className="text-xl font-bold text-hit-dark">{user.currentCourses.length}</div>
          <div className="text-sm text-hit-secondary">קורסים נוכחיים</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="h-10 w-10 bg-hit-light rounded-lg flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="h-5 w-5 text-hit-primary" />
          </div>
          <div className="text-xl font-bold text-hit-dark">{completionPercentage}%</div>
          <div className="text-sm text-hit-secondary">מהתואר הושלם</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="h-10 w-10 bg-hit-light rounded-lg flex items-center justify-center mx-auto mb-2">
            <Target className="h-5 w-5 text-hit-primary" />
          </div>
          <div className="text-xl font-bold text-hit-dark">78</div>
          <div className="text-sm text-hit-secondary">נקודות זכות</div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
          <div className="h-10 w-10 bg-hit-light rounded-lg flex items-center justify-center mx-auto mb-2">
            <Clock className="h-5 w-5 text-hit-primary" />
          </div>
          <div className="text-xl font-bold text-hit-dark">{currentSemesterProgress}%</div>
          <div className="text-sm text-hit-secondary">מהסמסטר</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <BookOpen className="h-6 w-6 text-hit-primary" />
              <h2 className="text-xl font-semibold text-hit-dark">קורסים נוכחיים</h2>
            </div>
            <span className="text-sm text-hit-secondary">סמסטר חורף 2024</span>
          </div>

          <div className="space-y-3">
            {user.currentCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-hit-light rounded-lg border border-hit-primary/10">
                <div className="flex items-center space-x-3">
                  <div className="h-2 w-2 bg-hit-primary rounded-full animate-pulse"></div>
                  <span className="font-medium text-hit-dark">{course}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-hit-secondary">בתהליך</span>
                  <div className="h-6 w-6 bg-hit-secondary/20 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-hit-secondary">
                      {Math.floor(Math.random() * 40) + 60}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-hit-secondary">עומס נקודות זכות השבוע</span>
              <span className="font-medium text-hit-dark">12 נ"ז</span>
            </div>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BarChart3 className="h-6 w-6 text-hit-secondary" />
            <h2 className="text-xl font-semibold text-hit-dark">התקדמות אקדמית</h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">ממוצע כללי</span>
              <span className="font-semibold text-lg text-hit-dark">{user.gpa}/4.0</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">נקודות זכות שהושלמו</span>
              <span className="font-semibold text-hit-dark">78/120</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-hit-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>

            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">סמסטר נוכחי</span>
              <span className="font-semibold text-hit-dark">חורף 2024</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">סיום צפוי</span>
              <span className="font-semibold text-hit-dark">קיץ 2025</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">דירוג כיתה</span>
              <span className="font-semibold text-hit-dark">15% עליון</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="h-6 w-6 text-hit-primary" />
            <h2 className="text-xl font-semibold text-hit-dark">הישגים ופרסים</h2>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-hit-light rounded-lg border border-hit-primary/20">
              <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-hit-dark">מלגת הצטיינות דיקן</div>
                <div className="text-sm text-hit-secondary">אביב 2024</div>
              </div>
              <div className="text-xs bg-hit-primary/10 text-hit-primary px-2 py-1 rounded-full">
                חדש
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-hit-light rounded-lg border border-hit-secondary/20">
              <div className="h-8 w-8 bg-hit-secondary rounded-full flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-hit-dark">פרויקט מצטיין</div>
                <div className="text-sm text-hit-secondary">קורס למידת מכונה</div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-hit-light rounded-lg border border-hit-dark/20">
              <div className="h-8 w-8 bg-hit-dark rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-medium text-hit-dark">מקום ראשון בהקתון</div>
                <div className="text-sm text-hit-secondary">HIT Tech Challenge 2024</div>
              </div>
            </div>
          </div>
        </div>

        {/* MentorHIT Setup */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Settings className="h-6 w-6 text-hit-secondary" />
            <h2 className="text-xl font-semibold text-hit-dark">הגדרות MentorHIT</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-hit-secondary">שאלון העדפות</span>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.hasCompletedQuiz
                    ? 'bg-hit-light text-hit-primary'
                    : 'bg-yellow-100 text-yellow-700'
                  }`}>
                  {user.hasCompletedQuiz ? 'הושלם' : 'ממתין'}
                </span>
                {!user.hasCompletedQuiz && (
                  <button
                    onClick={handleQuizRedirect}
                    className="text-xs text-hit-primary hover:text-hit-secondary transition-colors underline"
                  >
                    השלם כעת
                  </button>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-hit-secondary">גישה ליועץ AI</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-hit-light text-hit-primary">
                פעיל
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-hit-secondary">היסטוריית שיחות</span>
              <span className="font-semibold text-hit-dark">{profileStats.totalChatSessions} שיחות</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-hit-secondary">זמן ממוצע לשיחה</span>
              <span className="font-semibold text-hit-dark">{profileStats.averageSessionLength} דקות</span>
            </div>
          </div>

          {!user.hasCompletedQuiz && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                <div>
                  <p className="text-sm text-yellow-800 font-medium">
                    השלימו את שאלון ההעדפות
                  </p>
                  <p className="text-xs text-yellow-700 mt-1">
                    השאלון יעזור ל-MentorHIT לספק הכוונה אקדמית מותאמת אישית
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MentorHIT Journey Stats */}
      <div className="bg-gradient-to-r from-hit-secondary to-hit-primary rounded-xl text-white p-6 shadow-lg">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="h-6 w-6" />
          <h3 className="text-lg font-semibold">המסע שלך עם MentorHIT</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{profileStats.questionsAsked}</div>
            <div className="text-sm opacity-90">שאלות נשאלו</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profileStats.coursesRecommended}</div>
            <div className="text-sm opacity-90">קורסים הומלצו</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profileStats.careerPathsExplored}</div>
            <div className="text-sm opacity-90">מסלולי קריירה נחקרו</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{profileStats.satisfactionScore}%</div>
            <div className="text-sm opacity-90">שביעות רצון</div>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-white/20">
          <p className="text-sm opacity-90 text-center">
            כל הנתונים מוצפנים ושמורים באופן מאובטח במערכת החכמה של HIT
          </p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <Calendar className="h-6 w-6 text-hit-primary" />
          <h2 className="text-xl font-semibold text-hit-dark">פעילות אחרונה</h2>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="h-2 w-2 bg-hit-primary rounded-full"></div>
            <span className="text-sm text-hit-dark">שיחה עם MentorHIT בנושא קורסי בחירה</span>
            <span className="text-xs text-hit-secondary">לפני שעתיים</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="h-2 w-2 bg-hit-secondary rounded-full"></div>
            <span className="text-sm text-hit-dark">עדכון פרופיל אקדמי</span>
            <span className="text-xs text-hit-secondary">אתמול</span>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-hit-dark">השלמת שאלון העדפות</span>
            <span className="text-xs text-hit-secondary">לפני 3 ימים</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;