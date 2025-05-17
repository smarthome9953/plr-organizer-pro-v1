
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DashboardOverview from '@/components/dashboard/DashboardOverview';
import { Helmet } from 'react-helmet-async';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | PLR Organizer Pro</title>
        <meta name="description" content="PLR Organizer Pro Admin Dashboard" />
      </Helmet>
      
      <DashboardLayout>
        <DashboardOverview />
      </DashboardLayout>
    </>
  );
};

export default Index;
