
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Blog from "./pages/Blog";
import BlogCategory from "./pages/BlogCategory";
import BlogPost from "./pages/BlogPost";
import Resources from "./pages/Resources";
import Templates from "./pages/Templates";
import TemplateCategory from "./pages/TemplateCategory";
import TemplateDetail from "./pages/TemplateDetail";
import Scan from "./pages/Scan";
import Tools from "./pages/Tools";
import BrandKitTool from "./pages/BrandKitTool";
import BrandKitToolApp from "./pages/BrandKitToolApp";
import ContentSpinner from "./pages/ContentSpinner";
import ContentSpinnerApp from "./pages/ContentSpinnerApp";
import SeoAnalyzer from "./pages/SeoAnalyzer";
import SeoAnalyzerApp from "./pages/SeoAnalyzerApp";
import LicenseTracker from "./pages/LicenseTracker";
import LicenseTrackerApp from "./pages/LicenseTrackerApp";
import UniquenessMeter from "./pages/UniquenessMeter";
import UniquenessMeterApp from "./pages/UniquenessMeterApp";
import Translator from "./pages/Translator";
import TranslatorApp from "./pages/TranslatorApp";
import FileConverter from "./pages/FileConverter";
import FileConverterApp from "./pages/FileConverterApp";
import OcrTool from "./pages/OcrTool";
import OcrToolApp from "./pages/OcrToolApp";
import HtmlEditor from "./pages/HtmlEditor";
import HtmlEditorApp from "./pages/HtmlEditorApp";
import Affiliates from "./pages/Affiliates";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import GdprCompliance from "./pages/GdprCompliance";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import About from "./pages/About";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ThemeProvider } from "./context/ThemeContext";
import { FileExplorerProvider } from "./context/FileExplorerContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <ThemeProvider>
          <FileExplorerProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AuthProvider>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:categorySlug" element={<BlogCategory />} />
                  <Route path="/blog/:categorySlug/:postSlug" element={<BlogPost />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/resources/templates" element={<Templates />} />
                  <Route path="/resources/templates/:category" element={<TemplateCategory />} />
                  <Route path="/resources/templates/:category/:templateId" element={<TemplateDetail />} />
                  <Route path="/scan" element={<Scan />} />
                  <Route path="/tools" element={<Tools />} />
                  <Route path="/brand-kit-tool" element={<BrandKitTool />} />
                  <Route path="/content-spinner" element={<ContentSpinner />} />
                  <Route path="/seo-analyzer" element={<SeoAnalyzer />} />
                  <Route path="/license-tracker" element={<LicenseTracker />} />
                  <Route path="/uniqueness-meter" element={<UniquenessMeter />} />
                  <Route path="/translator" element={<Translator />} />
                  <Route path="/file-converter" element={<FileConverter />} />
                  <Route path="/ocr-tool" element={<OcrTool />} />
                  <Route path="/html-editor" element={<HtmlEditor />} />
                  <Route path="/affiliates" element={<Affiliates />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms-of-service" element={<TermsOfService />} />
                  <Route path="/cookie-policy" element={<CookiePolicy />} />
                  <Route path="/gdpr-compliance" element={<GdprCompliance />} />
                  <Route path="/careers" element={<Careers />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Index />} />
                    <Route path="/tools/brand-kit" element={<BrandKitToolApp />} />
                    <Route path="/tools/content-spinner" element={<ContentSpinnerApp />} />
                    <Route path="/tools/seo-analyzer" element={<SeoAnalyzerApp />} />
                    <Route path="/tools/license-tracker" element={<LicenseTrackerApp />} />
                    <Route path="/tools/uniqueness-meter" element={<UniquenessMeterApp />} />
                    <Route path="/tools/translator" element={<TranslatorApp />} />
                    <Route path="/tools/file-converter" element={<FileConverterApp />} />
                    <Route path="/tools/ocr-tool" element={<OcrToolApp />} />
                    <Route path="/tools/html-editor" element={<HtmlEditorApp />} />
                  </Route>
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AuthProvider>
            </BrowserRouter>
          </FileExplorerProvider>
        </ThemeProvider>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
