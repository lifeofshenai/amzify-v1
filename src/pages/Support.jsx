import React from "react";
import { Headset, MessageSquare, Mail, Phone } from "lucide-react";
import ComingSoon from "./component";
export default function Support() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-400">Support</h1>
      </div>

      <ComingSoon />
    </div>
  );
}
