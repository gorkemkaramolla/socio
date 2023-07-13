import React, { ReactNode } from 'react';
import SideMenuLayout from '@/components/Layouts/SideMenuLayout';

interface Props {
  children: ReactNode;
}
const ProfileLayout: React.FC<Props> = ({ children }) => {
  return <SideMenuLayout>{children}</SideMenuLayout>;
};

export default ProfileLayout;
