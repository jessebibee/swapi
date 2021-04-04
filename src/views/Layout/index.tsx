import React from 'react';

export const Layout: React.FC = ({ children }) => (
  <div style={{ width: '100vw', display: 'flex', justifyContent: 'center' }}>
    <div style={{ width: '75vw', marginTop: '10vh' }}>
      {children}
    </div>
  </div>
);