'use client';

import * as React from 'react';
import { NextUIProvider } from '@nextui-org/system';

// Define interfaces for the context values
interface ProfileInfoContextType {
  profileInfo: Record<string, unknown>;
  setProfileInfo: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  phoneVerifyEmail: string;
  setPhoneVerifyEmail: React.Dispatch<React.SetStateAction<string>>;
  phoneVerifyAvatar: string;
  setPhoneVerifyAvatar: React.Dispatch<React.SetStateAction<string>>;
}

interface PostContextType {
  sentComment: Record<string, unknown>;
  setSentComment: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  votedComment: Record<string, unknown>;
  setVotedComment: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
}

// Create the context with the defined types
const ProfileInfoContext = React.createContext<ProfileInfoContextType | null>(null);
const PostContext = React.createContext<PostContextType | null>(null);

// Create the hook
export function useProfileInfoContext() {
  const context = React.useContext(ProfileInfoContext);
  if (context === null) {
    throw new Error('useProfileInfoContext must be used within a ProfileInfoProvider');
  }
  return context;
}
export function usePostContext() {
  const context = React.useContext(PostContext);
  if (context === null) {
    throw new Error('usePostContext must be used within a PostProvider');
  }
  return context;
}
export interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  // You might want to replace this with actual profile info state management
  const [profileInfo, setProfileInfo] = React.useState({});
  const [phoneVerifyEmail, setPhoneVerifyEmail] = React.useState('');
  const [phoneVerifyAvatar, setPhoneVerifyAvatar] = React.useState('');
  const [sentComment, setSentComment] = React.useState({});
  const [votedComment, setVotedComment] = React.useState({});
  return (
    <ProfileInfoContext.Provider value={{ profileInfo, setProfileInfo, phoneVerifyEmail, setPhoneVerifyEmail, phoneVerifyAvatar, setPhoneVerifyAvatar }}>
      <PostContext.Provider value={{ sentComment, setSentComment, votedComment, setVotedComment }}>
        <NextUIProvider>{children}</NextUIProvider>
      </PostContext.Provider>
    </ProfileInfoContext.Provider>
  );
}
