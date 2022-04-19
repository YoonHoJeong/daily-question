import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import DailyAnswersPage from './DailyAnswersPage';
import MonthlyAnswersPage from './MonthlyAnswersPage';
import WeeklyAnswersPage from './WeeklyAnswersPage';
import { Link } from 'react-router-dom';

import { ClientLayout } from '../../components/layouts/ClientLayout';
import { BottomNavigation, Header } from '../../components/layouts';
import { LoadScreen } from '../../components/common';
import { ErrorBoundary } from '../../components/common/ErrorBoundary';
import DateFormatPicker from '../../components/DateFormatPicker';

interface Props {}

const AnswersPage: React.FC<Props> = () => {
  return (
    <ClientLayout style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Header />
      <Link to="daily">일간</Link>
      <Link to="weekly">주간</Link>
      <Link to="monthly">월간</Link>
      <DateFormatPicker />
      <ErrorBoundary>
        <Routes>
          <Route
            path=""
            element={
              <Suspense fallback={LoadScreen}>
                <WeeklyAnswersPage />
              </Suspense>
            }
          />
          <Route
            path="weekly"
            element={
              <Suspense fallback={LoadScreen}>
                <WeeklyAnswersPage />
              </Suspense>
            }
          />
          <Route
            path="daily"
            element={
              <Suspense fallback={LoadScreen}>
                <DailyAnswersPage />
              </Suspense>
            }
          />
          <Route
            path="monthly"
            element={
              <Suspense fallback={LoadScreen}>
                <MonthlyAnswersPage />
              </Suspense>
            }
          />
          <Route path="*" element={<Navigate to="weekly" replace />} />
        </Routes>
      </ErrorBoundary>
      <BottomNavigation />
    </ClientLayout>
  );
};

export default AnswersPage;
