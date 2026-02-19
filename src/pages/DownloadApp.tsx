import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Download, CheckCircle2, Monitor, Smartphone, 
  HardDrive, Zap, Shield, Cloud, ArrowRight,
  FolderSync, Bell, RefreshCw
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

type OS = 'windows' | 'mac' | 'linux' | 'unknown';

const DownloadApp = () => {
  const [detectedOS, setDetectedOS] = useState<OS>('unknown');

  useEffect(() => {
    // Detect user's operating system
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('win')) {
      setDetectedOS('windows');
    } else if (userAgent.includes('mac')) {
      setDetectedOS('mac');
    } else if (userAgent.includes('linux')) {
      setDetectedOS('linux');
    }
  }, []);

  const downloadLinks = {
    windows: 'https://github.com/smarthome9953/plr-organizer-pro-v1/releases/latest/download/PLROrganizerPro-Setup.exe',
    mac: 'https://github.com/smarthome9953/plr-organizer-pro-v1/releases/latest/download/PLROrganizerPro.dmg',
    linux: 'https://github.com/smarthome9953/plr-organizer-pro-v1/releases/latest/download/PLROrganizerPro.AppImage',
  };

  const systemRequirements = {
    windows: {
      os: 'Windows 10 or later',
      processor: '1.6 GHz or faster',
      memory: '4 GB RAM',
      storage: '500 MB available space',
    },
    mac: {
      os: 'macOS 10.14 (Mojave) or later',
      processor: 'Intel or Apple Silicon',
      memory: '4 GB RAM',
      storage: '500 MB available space',
    },
    linux: {
      os: 'Ubuntu 18.04, Fedora 32, or equivalent',
      processor: '1.6 GHz or faster',
      memory: '4 GB RAM',
      storage: '500 MB available space',
    },
  };

  const desktopFeatures = [
    {
      icon: HardDrive,
      title: 'Direct File System Access',
      description: 'Scan your entire computer for PLR content without uploading files to the cloud',
    },
    {
      icon: Zap,
      title: 'Lightning Fast Performance',
      description: 'Native app performance with instant file operations and indexing',
    },
    {
      icon: FolderSync,
      title: 'Real-time File Watching',
      description: 'Automatically detect new PLR files added to watched folders',
    },
    {
      icon: Cloud,
      title: 'Offline Capability',
      description: 'Access your library even without internet. Changes sync automatically',
    },
    {
      icon: RefreshCw,
      title: 'Automatic Updates',
      description: 'Get new features and improvements automatically in the background',
    },
    {
      icon: Bell,
      title: 'Native Notifications',
      description: 'Get system notifications for scan completions and important events',
    },
  ];

  const getOSName = (os: OS) => {
    switch (os) {
      case 'windows': return 'Windows';
      case 'mac': return 'macOS';
      case 'linux': return 'Linux';
      default: return 'Your OS';
    }
  };

  return (
    <>
      <Helmet>
        <title>Download Desktop App | PLR Organizer Pro</title>
        <meta name="description" content="Download PLR Organizer Pro desktop application for Windows, macOS, and Linux. Get native performance and advanced features." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <Badge className="mb-4" variant="secondary">
                  <Monitor className="w-3 h-3 mr-1" />
                  Desktop Application
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Download PLR Organizer Pro
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Get the full power of PLR organization with native desktop features
                </p>
              </div>

              {/* Main Download Card */}
              <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">
                    {detectedOS !== 'unknown' 
                      ? `Download for ${getOSName(detectedOS)}` 
                      : 'Choose Your Platform'}
                  </CardTitle>
                  <CardDescription>
                    Free for all PLR Organizer Pro users
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {detectedOS !== 'unknown' && (
                    <Button 
                      size="lg" 
                      className="w-full text-lg py-6"
                      asChild
                    >
                      <a href={downloadLinks[detectedOS]} download>
                        <Download className="mr-2 h-5 w-5" />
                        Download for {getOSName(detectedOS)}
                      </a>
                    </Button>
                  )}

                  <div className="space-y-2">
                    <p className="text-sm font-medium text-center mb-3">
                      Other platforms:
                    </p>
                    <div className="grid gap-2">
                      {detectedOS !== 'windows' && (
                        <Button variant="outline" className="justify-start" asChild>
                          <a href={downloadLinks.windows} download>
                            <Monitor className="mr-2 h-4 w-4" />
                            Windows (64-bit)
                          </a>
                        </Button>
                      )}
                      {detectedOS !== 'mac' && (
                        <Button variant="outline" className="justify-start" asChild>
                          <a href={downloadLinks.mac} download>
                            <Monitor className="mr-2 h-4 w-4" />
                            macOS (Intel & Apple Silicon)
                          </a>
                        </Button>
                      )}
                      {detectedOS !== 'linux' && (
                        <Button variant="outline" className="justify-start" asChild>
                          <a href={downloadLinks.linux} download>
                            <Monitor className="mr-2 h-4 w-4" />
                            Linux (AppImage)
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Desktop Features */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Desktop-Exclusive Features</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                  Powerful features built into the desktop application
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {desktopFeatures.map((feature, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>


          {/* System Requirements */}
          {detectedOS !== 'unknown' && (
            <section className="py-20 bg-muted/30">
              <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center mb-12">System Requirements</h2>
                
                <Card>
                  <CardHeader>
                    <CardTitle>{getOSName(detectedOS)} Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Operating System</p>
                        <p className="font-medium">{systemRequirements[detectedOS].os}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Processor</p>
                        <p className="font-medium">{systemRequirements[detectedOS].processor}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Memory</p>
                        <p className="font-medium">{systemRequirements[detectedOS].memory}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Storage</p>
                        <p className="font-medium">{systemRequirements[detectedOS].storage}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Installation Instructions */}
          <section className="py-20">
            <div className="container mx-auto px-4 max-w-4xl">
              <h2 className="text-3xl font-bold text-center mb-12">Installation Instructions</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-2 font-bold">
                      1
                    </div>
                    <CardTitle>Download</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Click the download button above for your operating system</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-2 font-bold">
                      2
                    </div>
                    <CardTitle>Install</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Run the installer and follow the setup wizard</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center mb-2 font-bold">
                      3
                    </div>
                    <CardTitle>Launch</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Sign in with your account and start organizing</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 max-w-3xl">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Is the desktop app free?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Yes! The desktop app is completely free for all PLR Organizer Pro users.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Do I need internet to use it?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">No. You can access your library offline. Changes will sync automatically when you reconnect to the internet.</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">How do updates work?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">The app checks for updates automatically and notifies you when a new version is available. Updates install in the background.</p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="container mx-auto px-4 max-w-3xl text-center">
              <Shield className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Download PLR Organizer Pro and start organizing your content like a pro
              </p>
              {detectedOS !== 'unknown' && (
                <Button size="lg" asChild>
                  <a href={downloadLinks[detectedOS]} download>
                    <Download className="mr-2 h-5 w-5" />
                    Download for {getOSName(detectedOS)}
                  </a>
                </Button>
              )}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default DownloadApp;
