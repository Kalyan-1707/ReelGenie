import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"

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
      <div className="space-y-4 rounded-xl p-4 bg-white dark:bg-gray-50 shadow-md dark:shadow-lg border border-gray-200 dark:border-gray-700">
        {tweets.map((tweet, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-start gap-3">
                <img
                  src="/profile.jpeg"
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm dark:text-white">
                    {tweet.name}
                    <span className="text-gray-500 ml-1 dark:text-gray-400">@{tweet.username} · {tweet.timestamp}</span>
                  </div>
                  <p className="mt-1 text-gray-800 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                    {tweet.content}
                  </p>
                  {tweet.imageUrl && (
                    <TweetImage imageUrl={tweet.imageUrl} />
                  )}
                </div>
              </div>
            </div>
        ))}
      </div>
    </div>
  );
};

const TweetImage = ({ imageUrl }: { imageUrl: string }) => {
  const [isImageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageUrl) return;

    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setImageLoaded(true);
  }, [imageUrl]);

  if (!imageUrl) {
    return <Skeleton className="w-full h-64 rounded-xl mt-2" />;
  }

  return (
    <>
      {!isImageLoaded && (
        <Skeleton className="w-full h-64 rounded-xl mt-2" />
      )}
      <img
        src={imageUrl}
        alt="Tweet visual"
        onLoad={() => setImageLoaded(true)}
        className={`rounded-xl mt-2 w-full object-cover max-h-[500px] transition-opacity duration-500 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0 absolute'
        }`}
      />
    </>
  );
};

export default TweetThread;