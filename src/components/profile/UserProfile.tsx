
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
          <div className="h-20 w-20 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
            <div className="flex items-center space-x-4 mt-2 text-gray-600">
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
            <div className="text-3xl font-bold text-blue-600">{user.gpa}</div>
            <div className="text-sm text-gray-500">Current GPA</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Academic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <BookOpen className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Current Courses</h2>
          </div>
          <div className="space-y-3">
            {user.currentCourses.map((course, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{course}</span>
                <span className="text-sm text-gray-500">In Progress</span>
              </div>
            ))}
          </div>
        </div>

        {/* Academic Performance */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="h-6 w-6 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">Academic Progress</h2>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Overall GPA</span>
              <span className="font-semibold text-lg">{user.gpa}/4.0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Credits Completed</span>
              <span className="font-semibold">78/120</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Current Semester</span>
              <span className="font-semibold">Fall 2024</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Expected Graduation</span>
              <span className="font-semibold">Summer 2025</span>
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Award className="h-6 w-6 text-yellow-600" />
            <h2 className="text-xl font-semibold text-gray-900">Achievements</h2>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-yellow-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Dean's List</div>
                <div className="text-sm text-gray-600">Spring 2024</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Outstanding Project</div>
                <div className="text-sm text-gray-600">Machine Learning Course</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <div className="font-medium text-gray-900">Hackathon Winner</div>
                <div className="text-sm text-gray-600">HIT Tech Challenge 2024</div>
              </div>
            </div>
          </div>
        </div>

        {/* Preferences Status */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <GraduationCap className="h-6 w-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">MentorHIT Setup</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Preferences Quiz</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.hasCompletedQuiz 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {user.hasCompletedQuiz ? 'Completed' : 'Pending'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">AI Advisor Access</span>
              <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Active
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Chat History</span>
              <span className="font-semibold">Available</span>
            </div>
          </div>
          
          {!user.hasCompletedQuiz && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                Complete your preferences quiz to get more personalized academic advice from MentorHIT.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-6">
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
