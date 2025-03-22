import React from 'react';
import ParentSidebar from './ParentSidebar';
import HomeworkPage from './HomeworkPage';

const ParentPortal = () => {
  return (
    <div className="flex min-h-screen bg-black">
      <ParentSidebar />
      <main className="flex-1 ml-[var(--sidebar-width)] p-8">
        <HomeworkPage />
      </main>
    </div>
  );
};

export default ParentPortal;