import React, { useState } from 'react';
import { Wand2, Loader2, Check, X } from 'lucide-react';
import { NameGeneratorService } from '../../services/onboarding/nameGeneratorService';
import toast from 'react-hot-toast';

interface NameGeneratorProps {
  onSelect: (name: string) => void;
}

export default function NameGenerator({ onSelect }: NameGeneratorProps) {
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChecking, setIsChecking] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const nameService = new NameGeneratorService();

  const handleGenerate = async () => {
    if (!description || !keywords) {
      toast.error('Please enter both description and keywords');
      return;
    }

    setIsGenerating(true);
    try {
      const names = await nameService.generateNames(
        description,
        keywords.split(',').map(k => k.trim())
      );
      setSuggestions(names);
    } catch (error) {
      toast.error('Failed to generate names');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCheckAvailability = async (name: string) => {
    setIsChecking(name);
    try {
      const result = await nameService.checkAvailability(name);
      if (result.available) {
        onSelect(name);
        toast.success(`${name} is available!`);
      } else {
        toast.error(`${name} is not available. Try these alternatives:`, {
          duration: 5000,
          icon: '💡',
        });
        setSuggestions(prev => [...new Set([...prev, ...result.similar])]);
      }
    } catch (error) {
      toast.error('Failed to check availability');
    } finally {
      setIsChecking(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Describe your business
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          rows={3}
          placeholder="What does your business do? What makes it unique?"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Keywords (comma-separated)
        </label>
        <input
          type="text"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="e.g., tech, innovation, digital, future"
        />
      </div>

      <button
        onClick={handleGenerate}
        disabled={isGenerating || !description || !keywords}
        className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Generating names...
          </>
        ) : (
          <>
            <Wand2 className="w-5 h-5 mr-2" />
            Generate Names
          </>
        )}
      </button>

      {suggestions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-gray-700">Suggestions</h3>
          <div className="grid grid-cols-2 gap-4">
            {suggestions.map((name) => (
              <button
                key={name}
                onClick={() => handleCheckAvailability(name)}
                disabled={isChecking === name}
                className="p-4 text-left border border-gray-200 rounded-lg hover:border-primary-200 hover:bg-primary-50 transition-colors relative"
              >
                <span className="font-medium">{name}</span>
                {isChecking === name && (
                  <Loader2 className="w-4 h-4 animate-spin absolute top-4 right-4 text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}