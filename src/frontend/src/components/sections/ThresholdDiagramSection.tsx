import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Thermometer, Fan, Play, Pause } from 'lucide-react';

interface ThresholdDiagramSectionProps {
  thresholdC: number;
}

const ThresholdDiagramSection = ({ thresholdC }: ThresholdDiagramSectionProps) => {
  const [temperature, setTemperature] = useState(25);
  const [isSimulating, setIsSimulating] = useState(true);

  const isMotorOn = temperature >= thresholdC;

  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setTemperature((prev) => {
        // Simulate temperature fluctuation between 20°C and 35°C
        const change = (Math.random() - 0.5) * 2;
        const newTemp = prev + change;
        return Math.max(20, Math.min(35, newTemp));
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
  };

  return (
    <section id="simulation" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Interactive Simulation</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Watch how the motor/fan responds to temperature changes in real-time
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-6 w-6 text-primary" />
                DHT11 Temperature Monitor
              </CardTitle>
              <CardDescription>
                Threshold: {thresholdC}°C | Motor turns ON when temperature ≥ {thresholdC}°C
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Temperature Display */}
                <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Current Temperature</div>
                  <div className="text-6xl font-bold mb-4" style={{ color: temperature >= thresholdC ? 'oklch(0.65 0.25 25)' : 'oklch(0.60 0.20 240)' }}>
                    {temperature.toFixed(1)}°C
                  </div>
                  <div className="w-full max-w-xs h-4 bg-background rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-500 rounded-full"
                      style={{ 
                        width: `${((temperature - 20) / 15) * 100}%`,
                        background: temperature >= thresholdC 
                          ? 'linear-gradient(90deg, oklch(0.75 0.20 60), oklch(0.65 0.25 25))' 
                          : 'linear-gradient(90deg, oklch(0.70 0.15 240), oklch(0.60 0.20 200))'
                      }}
                    />
                  </div>
                  <div className="flex justify-between w-full max-w-xs mt-2 text-xs text-muted-foreground">
                    <span>20°C</span>
                    <span>35°C</span>
                  </div>
                </div>

                {/* Motor Status */}
                <div className="flex flex-col items-center justify-center p-6 bg-muted/50 rounded-lg">
                  <div className="text-sm font-medium text-muted-foreground mb-2">Motor/Fan Status</div>
                  <div className="relative mb-4">
                    <Fan 
                      className={`h-24 w-24 transition-all duration-300 ${
                        isMotorOn ? 'text-primary animate-spin' : 'text-muted-foreground'
                      }`}
                      style={{ animationDuration: isMotorOn ? '1s' : 'none' }}
                    />
                  </div>
                  <Badge 
                    variant={isMotorOn ? 'default' : 'secondary'}
                    className="text-lg px-4 py-2"
                  >
                    {isMotorOn ? 'ON' : 'OFF'}
                  </Badge>
                  <div className="mt-4 text-center text-sm text-muted-foreground">
                    {isMotorOn 
                      ? `Temperature ≥ ${thresholdC}°C: Motor is running`
                      : `Temperature < ${thresholdC}°C: Motor is off`
                    }
                  </div>
                </div>
              </div>

              {/* Control Button */}
              <div className="mt-8 flex justify-center">
                <Button 
                  onClick={toggleSimulation}
                  variant={isSimulating ? 'outline' : 'default'}
                  size="lg"
                  className="gap-2"
                >
                  {isSimulating ? (
                    <>
                      <Pause className="h-5 w-5" />
                      Pause Simulation
                    </>
                  ) : (
                    <>
                      <Play className="h-5 w-5" />
                      Resume Simulation
                    </>
                  )}
                </Button>
              </div>

              {/* Logic Explanation */}
              <div className="mt-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Control Logic:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• If temperature ≥ {thresholdC}°C → Motor turns <strong>ON</strong></li>
                  <li>• If temperature &lt; {thresholdC}°C → Motor turns <strong>OFF</strong></li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ThresholdDiagramSection;
