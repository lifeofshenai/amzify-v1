import React from 'react';

interface SalesChannelIconProps {
  channel: 'amazon' | 'ecommerce' | 'tiktok';
  size?: number;
  className?: string;
}

export default function SalesChannelIcon({ channel, size = 16, className = '' }: SalesChannelIconProps) {
  const getIcon = () => {
    switch (channel) {
      case 'amazon':
        return (
          <svg viewBox="0 0 448 512" width={size} height={size} className={className}>
            <path
              fill="currentColor"
              d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"
            />
          </svg>
        );
      case 'ecommerce':
        return (
          <svg viewBox="0 0 24 24" width={size} height={size} className={className}>
            <path
              fill="currentColor"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
            />
          </svg>
        );
      case 'tiktok':
        return (
          <svg viewBox="0 0 448 512" width={size} height={size} className={className}>
            <path
              fill="currentColor"
              d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"
            />
          </svg>
        );
    }
  };

  return (
    <div className={`inline-flex items-center justify-center ${
      channel === 'amazon' ? 'text-amber-600' :
      channel === 'ecommerce' ? 'text-blue-600' :
      'text-pink-600'
    }`}>
      {getIcon()}
    </div>
  );
}