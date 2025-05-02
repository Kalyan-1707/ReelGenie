declare module 'react-tweet' {
  import * as React from 'react';

  export const Tweet: React.FC<{ id: string }>;

  export const TweetContainer: React.FC<{ children: React.ReactNode }>;
  export const TweetHeader: React.FC<{
    author: {
      name: string;
      username: string;
      avatarUrl?: string;
      verified?: boolean;
    };
    createdAt: string;
  }>;
  export const TweetBody: React.FC<{ children: React.ReactNode; lang: string }>;
  export const TweetActions: React.FC;
}