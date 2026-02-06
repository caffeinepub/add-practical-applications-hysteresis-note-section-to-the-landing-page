import { useEffect } from 'react';
import { siteConfig } from './siteConfig';
import TopNav from './components/TopNav';
import HeroSection from './components/sections/HeroSection';
import OverviewSection from './components/sections/OverviewSection';
import FeaturesSection from './components/sections/FeaturesSection';
import ThresholdDiagramSection from './components/sections/ThresholdDiagramSection';
import PracticalApplicationsSection from './components/sections/PracticalApplicationsSection';
import ManualSection from './components/sections/ManualSection';
import ArduinoCodeSection from './components/sections/ArduinoCodeSection';
import DemoMediaSection from './components/sections/DemoMediaSection';
import TechStackSection from './components/sections/TechStackSection';
import ContactSection from './components/sections/ContactSection';
import Footer from './components/Footer';

function App() {
  useEffect(() => {
    // Update document title and meta tags from config
    document.title = siteConfig.seo.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', siteConfig.seo.description);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = siteConfig.seo.description;
      document.head.appendChild(meta);
    }

    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', siteConfig.seo.ogTitle);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      meta.content = siteConfig.seo.ogTitle;
      document.head.appendChild(meta);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', siteConfig.seo.ogDescription);
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:description');
      meta.content = siteConfig.seo.ogDescription;
      document.head.appendChild(meta);
    }

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) {
      ogType.setAttribute('content', 'website');
    } else {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:type');
      meta.content = 'website';
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TopNav projectName={siteConfig.projectName} />
      <main>
        <HeroSection 
          projectName={siteConfig.projectName}
          tagline={siteConfig.tagline}
          ctaLinks={siteConfig.ctaLinks}
        />
        <OverviewSection overview={siteConfig.overview} />
        <FeaturesSection features={siteConfig.features} />
        <ThresholdDiagramSection thresholdC={siteConfig.temperatureThresholdC} />
        <PracticalApplicationsSection 
          applications={siteConfig.applications}
          hysteresisNote={siteConfig.hysteresisNote}
        />
        <ManualSection thresholdC={siteConfig.temperatureThresholdC} />
        <ArduinoCodeSection thresholdC={siteConfig.temperatureThresholdC} />
        <DemoMediaSection media={siteConfig.media} />
        <TechStackSection techStack={siteConfig.techStack} />
        <ContactSection />
      </main>
      <Footer 
        links={siteConfig.footerLinks} 
        projectName={siteConfig.projectName}
        description="Arduino-based temperature monitoring with automatic motor/fan control."
      />
    </div>
  );
}

export default App;
