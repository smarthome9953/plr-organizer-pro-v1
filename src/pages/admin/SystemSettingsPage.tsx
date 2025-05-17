
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import SystemSettings from '@/components/admin/SystemSettings';
import { Helmet } from 'react-helmet-async';

const SystemSettingsPage = () => {
  return (
    <>
      <Helmet>
        <title>System Settings | PLR Organizer Pro</title>
        <meta name="description" content="Configure system settings for PLR Organizer Pro" />
      </Helmet>
      
      <DashboardLayout>
        <SystemSettings />
      </DashboardLayout>
    </>
  );
};

export default SystemSettingsPage;
