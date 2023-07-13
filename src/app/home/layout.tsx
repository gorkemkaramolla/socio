import React, { ReactNode } from 'react';
import SideMenuLayout from '@/components/Layouts/SideMenuLayout';

interface Props {
  children: ReactNode;
}
const HomeLayout: React.FC<Props> = ({ children }) => {
  return <SideMenuLayout>{children}</SideMenuLayout>;
};

export default HomeLayout;
