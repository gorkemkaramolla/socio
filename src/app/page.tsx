import React, { useState } from 'react';

import { Metadata } from 'next';
import RootPage from '@/components/Root/RootPage';

// either Static metadata
export const metadata: Metadata = {
  title: 'Socio',
  description:
    'Socio: Stay connected, share your thoughts, and discuss on the ultimate social media platform for developers. Connect with like-minded individuals, explore trending topics, and stay up-to-date with the latest in the developer community. Join Socio today and experience a new level of social interaction for developers.',
  keywords:
    'Socio, Stay connected, Share your thoughts, Discuss, Social Media platform, Developers, Developer community, Social interaction, Trending topics, Like-minded individuals, Latest updates, Connect, Explore',
};

export default function Home() {
  return <RootPage />;
}
