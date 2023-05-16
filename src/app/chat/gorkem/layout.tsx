import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const layout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {children}
      <div>bu gorkem/layout.tsx</div>
    </div>
  );
};

export default layout;
