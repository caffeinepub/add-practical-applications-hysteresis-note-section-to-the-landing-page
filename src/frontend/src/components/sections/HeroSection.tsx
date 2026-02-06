import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface HeroSectionProps {
  projectName: string;
  tagline: string;
  ctaLinks: {
    primary?: { label: string; url: string };
    secondary?: { label: string; url: string };
  };
}

const HeroSection = ({ projectName, tagline, ctaLinks }: HeroSectionProps) => {
  const handleCtaClick = (url: string) => {
    if (url.startsWith('#')) {
      const element = document.querySelector(url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/generated/hero-banner.dim_1600x600.png"
          alt="Hero background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <img
              src="/assets/generated/project-logo.dim_512x512.png"
              alt={projectName}
              className="h-20 w-20 md:h-28 md:w-28 object-contain animate-in fade-in zoom-in duration-700"
            />
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
            {projectName}
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
            {tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
            {ctaLinks.primary && (
              <Button
                size="lg"
                onClick={() => handleCtaClick(ctaLinks.primary!.url)}
                className="text-base px-8 py-6 group"
              >
                {ctaLinks.primary.label}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            )}
            {ctaLinks.secondary && (
              <Button
                size="lg"
                variant="outline"
                onClick={() => handleCtaClick(ctaLinks.secondary!.url)}
                className="text-base px-8 py-6"
              >
                {ctaLinks.secondary.label}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-muted-foreground/30 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
