import React from "react";
import { Lightbulb, ArrowRight, TrendingUp } from "lucide-react";

export default function AIRecommendations({ channels }) {
  const getRecommendations = () => {
    const recommendations = [];
    const totalBudget = Object.values(channels).reduce(
      (sum, channel) => sum + channel.budget,
      0
    );

    // Find best performing channel
    const bestChannel = Object.entries(channels).reduce(
      (best, [channel, metrics]) => {
        if (!best || metrics?.roas > best.metrics?.roas) {
          return { channel, metrics };
        }
        return best;
      }
    );

    if (bestChannel) {
      const currentAllocation =
        (bestChannel.metrics?.budget / totalBudget) * 100;
      if (currentAllocation < 60) {
        recommendations.push({
          title: "Increase Budget Allocation",
          description: `Increase budget allocation for ${bestChannel.channel} channel as it shows the highest ROAS (${bestChannel.metrics.roas}x)`,
          impact: "High",
        });
      }
    }

    // Find underperforming channels
    Object.entries(channels).forEach(([channel, metrics]) => {
      if (metrics.acos > 20) {
        recommendations.push({
          title: "Optimize ACOS",
          description: `Review and optimize keywords for ${channel} channel to reduce ACOS from ${metrics.acos}%`,
          impact: "Medium",
        });
      }
    });

    return recommendations;
  };

  const recommendations = getRecommendations();

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">AI Recommendations</h2>
        <Lightbulb className="w-5 h-5 text-primary-600" />
      </div>

      <div className="space-y-4">
        {recommendations.map((recommendation, index) => (
          <div
            key={index}
            className="p-4 border border-gray-100 rounded-lg hover:border-primary-100 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-900">
                  {recommendation.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {recommendation.description}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${
                  recommendation.impact === "High"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {recommendation.impact} Impact
              </span>
            </div>
            <button className="mt-3 text-sm text-primary-600 font-medium flex items-center hover:text-primary-700">
              Apply Recommendation
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        ))}

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">AI Optimization Status</span>
            <span className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              Active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
