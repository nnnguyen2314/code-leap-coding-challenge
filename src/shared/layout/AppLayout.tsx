import React from 'react';
import './layout.css';

export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout-root">
      <main className="layout-main">{children}</main>
    </div>
  );
};

export default AppLayout;
