import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wrench, Zap, Play, AlertCircle } from 'lucide-react';

interface ManualSectionProps {
  thresholdC: number;
}

const ManualSection = ({ thresholdC }: ManualSectionProps) => {
  return (
    <section id="manual" className="py-16 md:py-24">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">User Manual</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Step-by-step guide to build and operate your DHT11 temperature control system
            </p>
          </div>

          <div className="space-y-6">
            {/* Components Needed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="h-5 w-5 text-primary" />
                  Components Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid md:grid-cols-2 gap-3">
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">1x</Badge>
                    <span>Arduino board (Uno, Nano, etc.)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">1x</Badge>
                    <span>DHT11 Temperature & Humidity Sensor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">1x</Badge>
                    <span>DC Motor or Fan</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">1x</Badge>
                    <span>Relay Module (5V, Active LOW)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">1x</Badge>
                    <span>LED (any color)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">1x</Badge>
                    <span>Breadboard</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Badge variant="outline">Several</Badge>
                    <span>Jumper wires</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Wiring Instructions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  Wiring Instructions
                </CardTitle>
                <CardDescription>Connect components as follows</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">DHT11 Sensor:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• VCC → Arduino 5V</li>
                      <li>• GND → Arduino GND</li>
                      <li>• DATA → Arduino Digital Pin 6</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Relay Module (Active LOW):</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• VCC → Arduino 5V</li>
                      <li>• GND → Arduino GND</li>
                      <li>• IN → Arduino Digital Pin 8</li>
                      <li>• Note: HIGH = Fan OFF, LOW = Fan ON</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">LED Indicator:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• Anode (+) → Arduino Digital Pin 12 (through 220Ω resistor)</li>
                      <li>• Cathode (-) → Arduino GND</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Motor/Fan:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground ml-4">
                      <li>• Connect motor to relay's NO (Normally Open) and COM terminals</li>
                      <li>• Connect motor power supply through the relay</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Operation */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Play className="h-5 w-5 text-primary" />
                  Operation
                </CardTitle>
                <CardDescription>How the system works with hysteresis control</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <h4 className="font-semibold mb-2">Hysteresis Control: 27°C ON / 26°C OFF</h4>
                    <p className="text-sm text-muted-foreground">
                      The system continuously monitors temperature every 2 seconds using the DHT11 sensor and uses hysteresis to prevent rapid on/off cycling.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Automatic Control Logic:</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Badge className="mt-0.5">ON</Badge>
                        <span>When temperature ≥ 27°C, the relay activates (pin 8 goes LOW), the motor/fan turns <strong>ON</strong>, and the LED lights up to provide cooling.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="secondary" className="mt-0.5">OFF</Badge>
                        <span>When temperature ≤ 26°C, the relay deactivates (pin 8 goes HIGH), the motor/fan turns <strong>OFF</strong>, and the LED turns off to save energy.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">Hysteresis</Badge>
                        <span>Between 26°C and 27°C, the fan maintains its previous state, preventing rapid cycling and extending component life.</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Setup Steps:</h4>
                    <ol className="space-y-1 text-sm text-muted-foreground list-decimal ml-6">
                      <li>Wire all components according to the wiring diagram above</li>
                      <li>Install the DHT sensor library in Arduino IDE</li>
                      <li>Upload the Arduino code to your board</li>
                      <li>Open Serial Monitor (9600 baud) to view temperature readings and fan status</li>
                      <li>Test by heating the DHT11 sensor (e.g., with your hand or a heat source)</li>
                      <li>Observe the LED indicator and fan behavior as temperature changes</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Notice */}
            <Card className="border-warning">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-warning">
                  <AlertCircle className="h-5 w-5" />
                  Safety Notice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Always disconnect power before wiring or modifying connections</li>
                  <li>• Use appropriate power supply for your motor/fan</li>
                  <li>• Ensure relay is rated for your motor's voltage and current</li>
                  <li>• Verify relay polarity: Active LOW means HIGH = OFF, LOW = ON</li>
                  <li>• Keep water away from electronic components</li>
                  <li>• Supervise the system during initial testing</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManualSection;
