import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from '@contexts/AuthContext';
import AppRoutes from '@components/routes/AppRoutes';
import { Toaster } from '@components/shared/ui/toaster';

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster />
      </AuthProvider>
    </Router>
  );
}

export default App;