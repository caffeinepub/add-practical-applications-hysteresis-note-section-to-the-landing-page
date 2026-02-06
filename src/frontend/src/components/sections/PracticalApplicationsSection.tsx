import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Fan, Shield, Brain, Cpu, AlertTriangle } from 'lucide-react';

interface Application {
  title: string;
  scenario: string;
  logic: string[];
  dailyBenefit: string;
  icon: string;
}

interface HysteresisNote {
  title: string;
  description: string;
  badExample: string;
  goodExample: string;
}

interface PracticalApplicationsSectionProps {
  applications: Application[];
  hysteresisNote: HysteresisNote;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  fan: Fan,
  shield: Shield,
  brain: Brain,
  cpu: Cpu,
  lightbulb: Lightbulb,
};

const PracticalApplicationsSection = ({ applications, hysteresisNote }: PracticalApplicationsSectionProps) => {
  return (
    <section id="applications" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Practical Applications
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real-world applications for your temperature and humidity monitoring system that go beyond just displaying numbers.
            </p>
          </div>

          {/* Applications Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {applications.map((app, index) => {
              const IconComponent = iconMap[app.icon] || Lightbulb;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{app.title}</CardTitle>
                        <CardDescription className="text-base">{app.scenario}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">The Logic:</h4>
                      <ul className="space-y-1.5">
                        {app.logic.map((item, idx) => (
                          <li key={idx} className="text-sm text-muted-foreground pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-primary">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="pt-2 border-t border-border">
                      <p className="text-sm">
                        <span className="font-semibold text-foreground">Daily Benefit: </span>
                        <span className="text-muted-foreground">{app.dailyBenefit}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Hysteresis Note */}
          <Alert className="border-warning bg-warning/5">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <AlertTitle className="text-lg font-semibold mb-2">{hysteresisNote.title}</AlertTitle>
            <AlertDescription className="space-y-3">
              <p className="text-muted-foreground">{hysteresisNote.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div className="p-3 rounded-md bg-destructive/10 border border-destructive/20">
                  <p className="font-semibold text-destructive mb-1">❌ Bad:</p>
                  <p className="text-sm text-muted-foreground">{hysteresisNote.badExample}</p>
                </div>
                <div className="p-3 rounded-md bg-success/10 border border-success/20">
                  <p className="font-semibold text-success mb-1">✅ Good:</p>
                  <p className="text-sm text-muted-foreground">{hysteresisNote.goodExample}</p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </div>
    </section>
  );
};

export default PracticalApplicationsSection;
