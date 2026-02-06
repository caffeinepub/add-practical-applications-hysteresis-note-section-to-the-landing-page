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

  const arduinoCode = `#include <DHT.h>

// Pin definitions
#define DHTPIN 2        // DHT11 data pin connected to digital pin 2
#define DHTTYPE DHT11   // DHT sensor type
#define MOTORPIN 7      // Relay/Motor control pin connected to digital pin 7

// Temperature threshold in Celsius
const float TEMP_THRESHOLD = ${thresholdC}.0;

// Initialize DHT sensor
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  // Initialize serial communication
  Serial.begin(9600);
  Serial.println("DHT11 Temperature Monitor");
  Serial.println("Motor activates at >= ${thresholdC}°C");
  
  // Initialize DHT sensor
  dht.begin();
  
  // Set motor pin as output
  pinMode(MOTORPIN, OUTPUT);
  digitalWrite(MOTORPIN, LOW); // Motor off initially
}

void loop() {
  // Wait 2 seconds between measurements
  delay(2000);
  
  // Read temperature and humidity
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  
  // Check if readings are valid
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }
  
  // Print readings to Serial Monitor
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print("°C | Humidity: ");
  Serial.print(humidity);
  Serial.print("% | Motor: ");
  
  // Control motor based on temperature threshold
  if (temperature >= TEMP_THRESHOLD) {
    digitalWrite(MOTORPIN, HIGH); // Turn motor ON
    Serial.println("ON");
  } else {
    digitalWrite(MOTORPIN, LOW);  // Turn motor OFF
    Serial.println("OFF");
  }
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
              Complete Arduino sketch for the DHT11 temperature monitor with {thresholdC}°C threshold
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Code className="h-5 w-5 text-primary" />
                    DHT11_Motor_Control.ino
                  </CardTitle>
                  <CardDescription>
                    Upload this code to your Arduino board. Temperature threshold is set to {thresholdC}°C.
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
                <Badge variant="outline">Threshold: {thresholdC}°C</Badge>
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
                  <li>• Reads temperature from DHT11 sensor every 2 seconds</li>
                  <li>• Compares temperature to threshold ({thresholdC}°C)</li>
                  <li>• If temperature ≥ {thresholdC}°C: Sets pin 7 HIGH (motor ON)</li>
                  <li>• If temperature &lt; {thresholdC}°C: Sets pin 7 LOW (motor OFF)</li>
                  <li>• Prints readings to Serial Monitor for debugging</li>
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
