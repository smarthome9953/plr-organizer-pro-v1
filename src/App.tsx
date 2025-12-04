import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HelmetProvider } from 'react-helmet-async';

// Providers
import { ThemeProvider } from '@/context/ThemeContext';
import { AuthProvider } from '@/context/AuthContext';
import { FileExplorerProvider } from '@/context/FileExplorerContext';
import { ElectronProvider } from '@/context/ElectronContext';

// Layouts & Core Components
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';

// Public Pages
import Index from '@/pages/Index';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import Auth from '@/pages/Auth';
import Onboarding from '@/pages/Onboarding';
import DownloadApp from '@/pages/DownloadApp';
import Careers from '@/pages/Careers';
import Affiliates from '@/pages/Affiliates';
import Blog from '@/pages/Blog';
import BlogPost from '@/pages/BlogPost';
import BlogCategory from '@/pages/BlogCategory';
import Landing from '@/pages/Landing';
import GdprCompliance from '@/pages/GdprCompliance';
import CookiePolicy from '@/pages/CookiePolicy';
import PrivacyPolicy from '@/pages/PrivacyPolicy';
import TermsOfService from '@/pages/TermsOfService';
import Resources from '@/pages/Resources';
import Tools from '@/pages/Tools';

// Templates
import Templates from '@/pages/Templates';
import TemplateCategory from '@/pages/TemplateCategory';
import TemplateDetail from '@/pages/TemplateDetail';

// PLR Tools
import HtmlEditor from '@/pages/HtmlEditor';
import HtmlEditorApp from '@/pages/HtmlEditorApp';
import BatchEditor from '@/pages/BatchEditor';
import BatchEditorApp from '@/pages/BatchEditorApp';
import ContentSpinner from '@/pages/ContentSpinner';
import ContentSpinnerApp from '@/pages/ContentSpinnerApp';
import FileConverter from '@/pages/FileConverter';
import FileConverterApp from '@/pages/FileConverterApp';
import OcrTool from '@/pages/OcrTool';
import OcrToolApp from '@/pages/OcrToolApp';
import Translator from '@/pages/Translator';
import TranslatorApp from '@/pages/TranslatorApp';
import BrandKitGuide from '@/pages/BrandKitGuide';
import BrandKitTool from '@/pages/BrandKitTool';
import BrandKitToolApp from '@/pages/BrandKitToolApp';
import UniquenessMeter from '@/pages/UniquenessMeter';
import UniquenessMeterApp from '@/pages/UniquenessMeterApp';
import SeoAnalyzer from '@/pages/SeoAnalyzer';
import SeoAnalyzerApp from '@/pages/SeoAnalyzerApp';

// PLR Software Guides & FAQ
import PLRSoftwareGuides from '@/pages/PLRSoftwareGuides';
import PLRSoftwareFAQ from '@/pages/PLRSoftwareFAQ';

// Protected Routes
import Scan from '@/pages/Scan';
import PLRDashboard from '@/pages/PLRDashboard';
import PLRBrowser from '@/pages/PLRBrowser';
import PLRCategories from '@/pages/PLRCategories';
import PLRLibraryPage from '@/pages/PLRLibraryPage';
import PLRScan from '@/pages/PLRScan';
import BlogManagementPage from '@/pages/BlogManagementPage';
import LicenseTracker from '@/pages/LicenseTracker';
import LicenseTrackerApp from '@/pages/LicenseTrackerApp';
import UserManagementPage from '@/pages/admin/UserManagementPage';
import SystemSettingsPage from '@/pages/admin/SystemSettingsPage';
import AnalyticsPage from '@/pages/admin/AnalyticsPage';
import ToolVerificationPage from '@/pages/ToolVerificationPage';

// NotFound
import NotFound from '@/pages/NotFound';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <ElectronProvider>
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <FileExplorerProvider>
                <AuthProvider>
                  <Routes>
                 {/* Public Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/download" element={<DownloadApp />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/affiliates" element={<Affiliates />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/blog/category/:category" element={<BlogCategory />} />
                <Route path="/gdpr-compliance" element={<GdprCompliance />} />
                <Route path="/cookie-policy" element={<CookiePolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/tools" element={<Tools />} />

                {/* Templates */}
                <Route path="/templates" element={<Templates />} />
                <Route path="/templates/:category" element={<TemplateCategory />} />
                <Route path="/templates/:category/:id" element={<TemplateDetail />} />

                {/* PLR Tools */}
                <Route path="/html-editor" element={<HtmlEditor />} />
                <Route path="/html-editor/app" element={<HtmlEditorApp />} />
                <Route path="/batch-editor" element={<BatchEditor />} />
                <Route path="/batch-editor/app" element={<BatchEditorApp />} />
                <Route path="/content-spinner" element={<ContentSpinner />} />
                <Route path="/content-spinner/app" element={<ContentSpinnerApp />} />
                <Route path="/file-converter" element={<FileConverter />} />
                <Route path="/file-converter/app" element={<FileConverterApp />} />
                <Route path="/ocr-tool" element={<OcrTool />} />
                <Route path="/ocr-tool/app" element={<OcrToolApp />} />
                <Route path="/translator" element={<Translator />} />
                <Route path="/translator/app" element={<TranslatorApp />} />
                <Route path="/brand-kit-tool" element={<BrandKitTool />} />
                <Route path="/brand-kit-tool/app" element={<BrandKitToolApp />} />
                <Route path="/brand-guidelines" element={<BrandKitGuide />} />
                <Route path="/uniqueness-meter" element={<UniquenessMeter />} />
                <Route path="/uniqueness-meter/app" element={<UniquenessMeterApp />} />
                <Route path="/seo-analyzer" element={<SeoAnalyzer />} />
                <Route path="/seo-analyzer/app" element={<SeoAnalyzerApp />} />

                {/* PLR Software Guides & FAQ */}
                <Route path="/plr-software-guides" element={<PLRSoftwareGuides />} />
                <Route path="/plr-software-faq" element={<PLRSoftwareFAQ />} />

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                  <Route path="/scan" element={<Scan />} />
                  <Route path="/dashboard" element={<PLRDashboard />} />
                  <Route path="/plr-dashboard" element={<PLRDashboard />} />
                  <Route path="/plr-browser" element={<PLRBrowser />} />
                  <Route path="/plr-categories" element={<PLRCategories />} />
                  <Route path="/plr-library" element={<PLRLibraryPage />} />
                  <Route path="/plr-scan" element={<PLRScan />} />
                  <Route path="/blog-management" element={<BlogManagementPage />} />
                  <Route path="/license-tracker" element={<LicenseTracker />} />
                  <Route path="/license-tracker/app" element={<LicenseTrackerApp />} />
                  <Route path="/admin/user-management" element={<UserManagementPage />} />
                  <Route path="/admin/system-settings" element={<SystemSettingsPage />} />
                  <Route path="/admin/analytics" element={<AnalyticsPage />} />
                  <Route path="/tool-verification" element={<ToolVerificationPage />} />
                </Route>

                {/* Catch-all route - 404 */}
                <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Toaster />
                </AuthProvider>
              </FileExplorerProvider>
            </BrowserRouter>
          </QueryClientProvider>
        </HelmetProvider>
      </ElectronProvider>
    </ThemeProvider>
  );
}

export default App;
