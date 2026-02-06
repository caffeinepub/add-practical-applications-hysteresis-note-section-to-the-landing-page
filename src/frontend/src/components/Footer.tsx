import { Heart } from 'lucide-react';

interface FooterLink {
  label: string;
  url: string;
}

interface FooterProps {
  links: FooterLink[];
  projectName: string;
  description: string;
}

const Footer = ({ links, projectName, description }: FooterProps) => {
  const handleLinkClick = (url: string) => {
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
    <footer className="border-t border-border bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Brand Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img 
                  src="/assets/generated/project-logo.dim_512x512.png" 
                  alt="Logo" 
                  className="h-10 w-10 object-contain"
                />
                <span className="font-bold text-xl text-foreground">{projectName}</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                {description}
              </p>
            </div>

            {/* Links Section */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
              <div className="flex flex-wrap gap-4">
                {links.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleLinkClick(link.url)}
                    className="text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <p className="text-center text-sm text-muted-foreground flex items-center justify-center gap-2 flex-wrap">
              <span>© 2026. Built with</span>
              <Heart className="h-4 w-4 text-primary fill-primary" />
              <span>using</span>
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline font-medium"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
