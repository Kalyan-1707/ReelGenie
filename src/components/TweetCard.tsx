import React from 'react';
import { MessageCircle, Repeat, Heart, Share2 } from 'lucide-react';

type Tweet = {
  name: string;
  username: string;
  content: string;
  timestamp: string;
  imageUrl?: string; // optional image support
};

const TweetCard: React.FC<{ tweet: Tweet }> = ({ tweet }) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white dark:bg-neutral-900 border">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 mr-3"></div>
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-gray-800 dark:text-gray-200">{tweet.name}</span>
            <span className="text-gray-500 dark:text-gray-400">@{tweet.username}</span>
            <span className="text-gray-500 dark:text-gray-400">• {tweet.timestamp}</span>
          </div>
          <div className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{tweet.content}</div>
          {tweet.imageUrl && (
            <img src={tweet.imageUrl} alt="Tweet Image" className="mt-2 rounded-lg w-full object-cover max-h-96" />
          )}
          <div className="flex gap-6 text-gray-500 dark:text-gray-400 text-sm mt-3">
            <MessageCircle className="h-5 w-5" />
            <Repeat className="h-5 w-5" />
            <Heart className="h-5 w-5" />
            <Share2 className="h-5 w-5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetCard;