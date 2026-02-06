import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Code, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface ArduinoCodeSectionProps {
  thresholdC: number;
}

const ArduinoCodeSection = ({ thresholdC }: ArduinoCodeSectionProps) => {
  const [copied, setCopied] = useState(false);

  const arduinoCode = `#define PIN 6
#define TYPE DHT11
#include <DHT.h>

#define RELAY 8
#define LED 12

DHT dht(PIN , TYPE);

bool fanState = false;   // fan status memory

void setup()
{
  Serial.begin(9600);
  dht.begin();

  pinMode(RELAY, OUTPUT);
  pinMode(LED, OUTPUT);

  digitalWrite(RELAY, HIGH); // Fan OFF initially (active LOW)
  digitalWrite(LED, LOW);
}

void loop()
{
  float t = dht.readTemperature();
  float h = dht.readHumidity();

  if (isnan(t) || isnan(h)) return;

  // FAN CONTROL (27°C logic)
  if (t >= 27 && fanState == false)
  {
    fanState = true;
    digitalWrite(RELAY, LOW);   // Fan ON
    digitalWrite(LED, HIGH);
  }
  else if (t <= 26 && fanState == true)
  {
    fanState = false;
    digitalWrite(RELAY, HIGH);  // Fan OFF
    digitalWrite(LED, LOW);
  }

  Serial.print("Temperature: ");
  Serial.print(t);
  Serial.print(" C | Fan: ");
  Serial.println(fanState ? "ON" : "OFF");

  delay(2000);
}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(arduinoCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <section id="code" className="py-16 md:py-24 bg-muted/30">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Arduino Code</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete Arduino sketch for the DHT11 temperature monitor with hysteresis control (27°C ON / 26°C OFF)
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5 text-primary" />
                    DHT11_Fan_Control.ino
                  </CardTitle>
                  <CardDescription>
                    Upload this code to your Arduino board. Fan turns ON at 27°C and OFF at 26°C with hysteresis to prevent rapid cycling.
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  className="gap-2 shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-4 w-4" />
                      Copy
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex flex-wrap gap-2">
                <Badge variant="secondary">Arduino C/C++</Badge>
                <Badge variant="secondary">DHT Library Required</Badge>
                <Badge variant="outline">DHT11 Pin 6</Badge>
                <Badge variant="outline">Relay Pin 8 (Active LOW)</Badge>
                <Badge variant="outline">LED Pin 12</Badge>
              </div>
              
              <div className="relative">
                <pre className="bg-background border border-border rounded-lg p-4 overflow-x-auto text-sm leading-relaxed">
                  <code className="text-foreground font-mono">{arduinoCode}</code>
                </pre>
              </div>

              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">Required Library:</h4>
                <p className="text-sm text-muted-foreground mb-2">
                  Install the DHT sensor library in Arduino IDE:
                </p>
                <ol className="text-sm text-muted-foreground space-y-1 list-decimal ml-6">
                  <li>Open Arduino IDE</li>
                  <li>Go to Sketch → Include Library → Manage Libraries</li>
                  <li>Search for "DHT sensor library" by Adafruit</li>
                  <li>Click Install (also install dependencies if prompted)</li>
                </ol>
              </div>

              <div className="mt-4 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                <h4 className="font-semibold mb-2 text-sm">How It Works:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Reads temperature and humidity from DHT11 sensor on pin 6 every 2 seconds</li>
                  <li>• Uses hysteresis control: Fan turns ON at 27°C and OFF at 26°C</li>
                  <li>• Relay on pin 8 is active LOW (HIGH = OFF, LOW = ON)</li>
                  <li>• LED indicator on pin 12 shows fan status (HIGH = ON, LOW = OFF)</li>
                  <li>• Prints temperature readings and fan status to Serial Monitor for debugging</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ArduinoCodeSection;
