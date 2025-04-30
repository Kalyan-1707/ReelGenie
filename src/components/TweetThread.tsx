import React from 'react';
import TweetCard from './TweetCard';

type Tweet = {
  name: string;
  username: string;
  content: string;
  timestamp: string;
  imageUrl?: string; // optional image support
};

interface TweetThreadProps {
  tweets: Tweet[];
}

const TweetThread: React.FC<TweetThreadProps> = ({ tweets }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="space-y-4 max-w-xl">
        {tweets.map((tweet, index) => (
          <TweetCard key={index} tweet={tweet} />
        ))}
      </div>
    </div>
  );
};

export default TweetThread;