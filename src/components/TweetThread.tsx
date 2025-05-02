import React from 'react';
import { TweetContainer } from 'react-tweet';

type Tweet = {
  name: string;
  username: string;
  content: string;
  timestamp: string;
  imageUrl?: string;
};

type TweetThreadProps = {
  tweets: Tweet[];
};

const TweetThread: React.FC<TweetThreadProps> = ({ tweets }) => {
  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-4">
        {tweets.map((tweet, index) => (
          <TweetContainer key={index}>
            <div className="rounded-xl p-4 shadow-md bg-white dark:bg-gray-800 space-y-2">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-300 rounded-full" /> {/* Placeholder Avatar */}
                <div>
                  <div className="font-semibold text-sm">
                    {tweet.name}
                    <span className="text-gray-500 ml-1">@{tweet.username} · {tweet.timestamp}</span>
                  </div>
                  <p className="mt-1 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {tweet.content}
                  </p>
                  {tweet.imageUrl && (
                    <img
                      src={tweet.imageUrl}
                      alt="Tweet visual"
                      className="rounded-lg mt-2 w-full object-cover max-h-96"
                    />
                  )}
                </div>
              </div>

              {/* Optional Actions Bar */}
              <div className="flex gap-6 text-gray-500 text-sm mt-3">
                {/* You can use lucide-react or icons here */}
              </div>
            </div>
          </TweetContainer>
        ))}
      </div>
    </div>
  );
};

export default TweetThread;