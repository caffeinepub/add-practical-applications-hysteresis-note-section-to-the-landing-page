import { Badge } from '@/components/ui/badge';

interface TechStackSectionProps {
  techStack: string[];
}

const TechStackSection = ({ techStack }: TechStackSectionProps) => {
  return (
    <section id="tech" className="py-20 md:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Tech Stack
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Built with modern, reliable technologies
          </p>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-base md:text-lg px-4 md:px-6 py-2 md:py-3 font-medium hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
