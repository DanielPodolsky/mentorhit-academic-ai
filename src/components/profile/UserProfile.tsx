
import React from 'react';
import { User, Mail, GraduationCap, BookOpen, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center space-x-6">
          <div className="h-20 w-20 bg-hit-primary rounded-full flex items-center justify-center shadow-lg">
            <User className="h-10 w-10 text-white" />
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
                <span>Student ID: {user.studentId}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-hit-primary">{user.gpa}</div>
            <div className="text-sm text-hit-secondary">Current GPA</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-6 w-6 text-hit-primary" />
            <h2 className="text-xl font-semibold text-hit-dark">Current Courses</h2>
          </div>
          <div className="space-y-3">
            {user.currentCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-hit-light rounded-lg">
                <span className="font-medium text-hit-dark">{course}</span>
                <span className="text-sm text-hit-secondary">In Progress</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="h-6 w-6 text-hit-secondary" />
            <h2 className="text-xl font-semibold text-hit-dark">Academic Progress</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">Overall GPA</span>
              <span className="font-semibold text-lg text-hit-dark">{user.gpa}/4.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">Credits Completed</span>
              <span className="font-semibold text-hit-dark">78/120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">Current Semester</span>
              <span className="font-semibold text-hit-dark">Fall 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-hit-secondary">Expected Graduation</span>
              <span className="font-semibold text-hit-dark">Summer 2025</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="h-6 w-6 text-hit-primary" />
            <h2 className="text-xl font-semibold text-hit-dark">Achievements</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-hit-light rounded-lg">
              <div className="h-8 w-8 bg-hit-primary rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-hit-dark">Dean's List</div>
                <div className="text-sm text-hit-secondary">Spring 2024</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-hit-light rounded-lg">
              <div className="h-8 w-8 bg-hit-secondary rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-hit-dark">Outstanding Project</div>
                <div className="text-sm text-hit-secondary">Machine Learning Course</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-hit-light rounded-lg">
              <div className="h-8 w-8 bg-hit-dark rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div>
                <div className="font-medium text-hit-dark">Hackathon Winner</div>
                <div className="text-sm text-hit-secondary">HIT Tech Challenge 2024</div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap className="h-6 w-6 text-hit-secondary" />
            <h2 className="text-xl font-semibold text-hit-dark">MentorHIT Setup</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-hit-secondary">Preferences Quiz</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.hasCompletedQuiz
                  ? 'bg-hit-light text-hit-primary'
                  : 'bg-yellow-100 text-yellow-700'
                }`}>
                {user.hasCompletedQuiz ? 'Completed' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-hit-secondary">AI Advisor Access</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-hit-light text-hit-primary">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-hit-secondary">Chat History</span>
              <span className="font-semibold text-hit-dark">Available</span>
            </div>
          </div>

          {!user.hasCompletedQuiz && (
            <div className="mt-4 p-3 bg-hit-light rounded-lg border border-hit-primary/20">
              <p className="text-sm text-hit-dark">
                Complete your preferences quiz to get more personalized academic advice from MentorHIT.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-hit-gradient-dark rounded-xl text-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Your MentorHIT Journey</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">15</div>
            <div className="text-sm opacity-90">Questions Asked</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">8</div>
            <div className="text-sm opacity-90">Courses Recommended</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">3</div>
            <div className="text-sm opacity-90">Career Paths Explored</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">92%</div>
            <div className="text-sm opacity-90">Satisfaction Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
