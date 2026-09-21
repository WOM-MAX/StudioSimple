import React from 'react';
import { useApp, AppProvider } from './context/AppContext';
import { LandingPage } from './components/landing/LandingPage';
import { CourseSelector } from './components/course/CourseSelector';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { CheckoutFlow } from './components/checkout/CheckoutFlow';
import { StudentDashboard } from './components/student/StudentDashboard';
import { ParentDashboard } from './components/parent/ParentDashboard';
import { LoginScreen } from './components/auth/LoginScreen';
import { SynchronizedLessonMaster } from './components/lesson/SynchronizedLessonMaster';
import { PricingPage } from './components/pricing/PricingPage';

const MainContent: React.FC = () => {
  const { viewMode, authSession, activeSynchronizedLesson } = useApp();

  const isAuthenticated = authSession?.isAuthenticated === true;
  const isAdmin = isAuthenticated && authSession?.role === 'admin';

  if (viewMode === 'lesson') {
    if (!isAuthenticated) {
      return <LoginScreen />;
    }
    return <SynchronizedLessonMaster lessonData={activeSynchronizedLesson || undefined} />;
  }

  if (viewMode === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen selection:bg-[#57d6f3]/30 transition-colors duration-300 relative" style={{ backgroundColor: 'var(--canvas-bg)', color: 'var(--canvas-text)' }}>
      {viewMode === 'landing' && <LandingPage />}
      {viewMode === 'pricing' && <PricingPage />}
      {viewMode === 'courses' && (isAuthenticated ? <CourseSelector /> : <LoginScreen />)}
      {viewMode === 'checkout' && <CheckoutFlow />}
      {viewMode === 'login' && <LoginScreen />}
      {viewMode === 'student' && (isAuthenticated ? <StudentDashboard /> : <LoginScreen />)}
      {viewMode === 'parent' && (isAuthenticated ? <ParentDashboard /> : <LoginScreen />)}
    </div>
  );
};


export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
