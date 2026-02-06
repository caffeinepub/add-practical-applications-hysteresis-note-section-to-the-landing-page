import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeaturesSectionProps {
  features: Feature[];
}

const FeaturesSection = ({ features }: FeaturesSectionProps) => {
  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-4 text-foreground">
            Key Features
          </h2>
          <p className="text-center text-muted-foreground mb-16 text-lg max-w-2xl mx-auto">
            Discover what makes this project stand out
          </p>

          {/* Feature Icons Banner */}
          <div className="mb-16 flex justify-center">
            <img
              src="/assets/generated/feature-icons-set.dim_768x256.png"
              alt="Feature icons"
              className="max-w-full h-auto opacity-80"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-lg group"
              >
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
