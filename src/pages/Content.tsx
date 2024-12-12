import React from 'react';
import { Video, Image, FileText, Wand2 } from 'lucide-react';

export default function Content() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-400">Content Creation</h1>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <div className="text-center space-y-6">
          <div className="flex justify-center space-x-6">
            <div className="p-4 bg-gray-50 rounded-full">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            <div className="p-4 bg-gray-50 rounded-full">
              <Image className="w-8 h-8 text-gray-400" />
            </div>
            <div className="p-4 bg-gray-50 rounded-full">
              <FileText className="w-8 h-8 text-gray-400" />
            </div>
            <div className="p-4 bg-gray-50 rounded-full">
              <Wand2 className="w-8 h-8 text-gray-400" />
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-400">
            Content Creation Coming Soon
          </h2>
          
          <p className="text-gray-400 max-w-2xl mx-auto">
            We're working on powerful content creation tools to help you manage and optimize 
            your product content across all sales channels. Stay tuned for features like AI-powered 
            content generation, multi-channel publishing, and performance analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                AI Content Generation
              </h3>
              <p className="text-sm text-gray-400">
                Create optimized product descriptions, titles, and features using advanced AI
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                Multi-Channel Publishing
              </h3>
              <p className="text-sm text-gray-400">
                Manage and sync content across Amazon, E-commerce, and TikTok Shop
              </p>
            </div>

            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-medium text-gray-400 mb-2">
                Performance Analytics
              </h3>
              <p className="text-sm text-gray-400">
                Track content performance and get AI-powered optimization suggestions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}