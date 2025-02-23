import React from 'react';
import { MessageCircle, Share2, MoreHorizontal, Star, Copy } from 'lucide-react';

function Profile() {
  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="relative">
        <div className="h-48 bg-orange-500 rounded-lg pattern-bg"></div>
        <div className="absolute -bottom-12 left-8">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-white"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="pt-16 px-8">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold">Gaston Lapierre</h1>
              <span className="text-green-500">●</span>
            </div>
            <p className="text-gray-600">Project Head Manager</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-teal-500 text-white rounded-lg flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Message
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center gap-2">
              <span>+ Follow</span>
            </button>
            <button className="p-2 border border-gray-300 rounded-lg">
              <MoreHorizontal className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="flex gap-8 mt-8">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-orange-500">⌛</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">3+ Years Job</p>
              <p className="text-sm">Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-orange-500">🏆</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">5 Certificate</p>
              <p className="text-sm">Achieved</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <span className="text-orange-500">📋</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">2 Internship</p>
              <p className="text-sm">Completed</p>
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">About</h2>
          <p className="text-gray-600">
            I'm the model of the new Project Head Manager. I've combined a deep background in brand management at blue chip CPG companies with eCommerce growth marketing at the world's biggest retailer. I've run SingleFire I've created world-class campaigns; I've built digital marketing organizations from the ground up. I have over 20 years' experience leading...
            <button className="text-orange-500">See more</button>
          </p>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-lg p-6 mt-8">
          <h3 className="font-semibold mb-4">Personal Information</h3>
          <div className="space-y-4">
            <InfoItem icon="👔" label="Project Head Manager" />
            <InfoItem icon="🎓" label="Went to Oxford International" />
            <InfoItem icon="📍" label="Lives in Pittsburgh, PA 15212" />
            <InfoItem icon="👥" label="Followed by 16.6k People" />
            <InfoItem icon="📧" label="Email hello@dunder.mifflin.com" />
            <InfoItem icon="🌐" label="Website www.larkon.co" />
            <InfoItem icon="🗣️" label="Language English, Spanish, German" />
            <InfoItem icon="⭐" label="Status Active" isActive />
          </div>
        </div>

        {/* Achievements */}
        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="bg-teal-500 w-12 h-12 rounded-lg mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🏆</span>
            </div>
            <p className="text-2xl font-semibold">+12</p>
            <p className="text-gray-600">Achievements</p>
          </div>
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="bg-teal-500 w-12 h-12 rounded-lg mx-auto flex items-center justify-center mb-4">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <p className="text-2xl font-semibold">+24</p>
            <p className="text-gray-600">Accomplishments</p>
          </div>
        </div>

        {/* Core Skills */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">My Core Skills</h2>
          <div className="space-y-4">
            <SkillBar skill="Inbound Marketing" rating={4} />
            <SkillBar skill="Entrepreneurship" rating={3} />
            <SkillBar skill="Growth Marketing" rating={2} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, isActive = false }) {
  return (
    <div className="flex items-center gap-4">
      <span className="text-gray-400">{icon}</span>
      <span className={isActive ? 'text-green-500' : ''}>{label}</span>
      {isActive && <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>}
    </div>
  );
}

function SkillBar({ skill, rating }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <span className="text-gray-600">{skill}</span>
      </div>
    </div>
  );
}

export default Profile;