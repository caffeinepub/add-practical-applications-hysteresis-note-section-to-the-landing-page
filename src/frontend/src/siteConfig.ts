export interface Application {
  title: string;
  scenario: string;
  logic: string[];
  dailyBenefit: string;
  icon: string;
}

export interface HysteresisNote {
  title: string;
  description: string;
  badExample: string;
  goodExample: string;
}

export interface SiteConfig {
  projectName: string;
  tagline: string;
  overview: string;
  features: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  applications: Application[];
  hysteresisNote: HysteresisNote;
  techStack: string[];
  media: {
    videoUrl?: string;
    images?: string[];
  };
  ctaLinks: {
    primary?: { label: string; url: string };
    secondary?: { label: string; url: string };
  };
  footerLinks: Array<{
    label: string;
    url: string;
  }>;
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  temperatureThresholdC: number;
}

export const siteConfig: SiteConfig = {
  projectName: 'DHT11 Temperature Monitor',
  tagline: 'Arduino-based temperature control with automatic motor/fan activation',
  overview: 
    'This Arduino project uses a DHT11 sensor to monitor temperature and humidity in real-time. ' +
    'When the temperature reaches or exceeds 28°C, the system automatically activates a motor or fan to provide cooling. ' +
    'The motor turns off when the temperature drops below 28°C, creating an efficient automated climate control solution. ' +
    'Perfect for learning about sensors, actuators, and basic automation with Arduino.',
  features: [
    {
      title: 'DHT11 Temperature & Humidity Sensor',
      description: 'Accurate real-time monitoring of environmental conditions with the reliable DHT11 sensor.',
    },
    {
      title: 'Automatic Motor/Fan Control',
      description: 'Motor or fan automatically turns ON when temperature >= 28°C and OFF when temperature < 28°C.',
    },
    {
      title: 'Simple Arduino Setup',
      description: 'Easy-to-follow wiring and code that works with any Arduino board and standard components.',
    },
  ],
  applications: [
    {
      title: 'The "Smart Sleep" Comfort System',
      scenario: 'Sleeping with a fan on full blast can leave you freezing by 3 AM, but turning it off makes you wake up sweating.',
      logic: [
        'If Temp > 28°C: Fan speed High (or Relay ON).',
        'If Temp drops below 24°C: Fan turns OFF (or switches to a lower speed if using a PWM controller).',
      ],
      dailyBenefit: 'Ensures uninterrupted sleep without needing to wake up to adjust the switch.',
      icon: 'fan',
    },
    {
      title: 'Mold & Mildew Prevention (The "Dry Closet")',
      scenario: 'High humidity in wardrobes or storage rooms leads to fungus on clothes and bad smells, especially during the rainy season.',
      logic: [
        'Place your project inside a closet or storage area. Connect the relay to a small exhaust fan or a 5V heating pad.',
        'If Humidity > 65%: Turn on the exhaust fan to circulate air.',
      ],
      dailyBenefit: 'Protects expensive suits, leather jackets, or shoes from moisture damage automatically.',
      icon: 'shield',
    },
    {
      title: 'Electronics Preservation Station',
      scenario: 'Since you own specialized electronics (like your laptop, tablet, and components), you know that moisture is the enemy of circuit boards.',
      logic: [
        'Monitor humidity inside a sealed cabinet where you store your gadgets.',
        'If humidity spikes, the LCD alerts you (or an LED lights up red), indicating you need to replace the silica gel packets or turn on a dehumidifier.',
      ],
      dailyBenefit: 'Extends the lifespan of your laptop and development boards by preventing corrosion.',
      icon: 'shield',
    },
    {
      title: 'Ideal Study Environment Monitor',
      scenario: 'Research suggests that thermal comfort significantly impacts cognitive performance and focus.',
      logic: [
        'Define an "Ideal Zone" (e.g., 22°C–25°C and 40%–50% Humidity).',
        'If the sensor detects conditions outside this range, the LCD displays "TAKE A BREAK" or "VENTILATE ROOM."',
      ],
      dailyBenefit: 'Helps you recognize that you aren\'t tired/lazy; the room is just too stuffy for effective studying.',
      icon: 'brain',
    },
    {
      title: 'Automated Server/PC Cooling',
      scenario: 'If you push your laptop or PC hard (e.g., rendering animations or compiling code), the ambient temperature around the machine matters.',
      logic: [
        'Position the sensor near your laptop\'s air intake.',
        'If the air intake temperature rises (indicating the laptop is recycling hot air), the relay triggers a secondary external desk fan to flush cool air towards the computer.',
      ],
      dailyBenefit: 'Prevents thermal throttling during heavy tasks.',
      icon: 'cpu',
    },
  ],
  hysteresisNote: {
    title: 'Technical Note on "Hysteresis"',
    description: 'For any of these "Live Day" applications to be annoying-free, ensure your code uses hysteresis.',
    badExample: 'Turn fan ON at 30.0°C and OFF at 29.9°C. (The fan will click on/off rapidly).',
    goodExample: 'Turn fan ON at 30°C and wait until it drops to 28°C to turn it OFF.',
  },
  techStack: [
    'Arduino',
    'DHT11 Sensor',
    'Motor/Fan',
    'C/C++',
    'Digital I/O',
  ],
  media: {
    videoUrl: '',
    images: ['/assets/whatsapp-image-2026-02-06-092349.jpeg'],
  },
  ctaLinks: {
    primary: {
      label: 'View Simulation',
      url: '#simulation',
    },
    secondary: {
      label: 'Read Manual',
      url: '#manual',
    },
  },
  footerLinks: [
    {
      label: 'Applications',
      url: '#applications',
    },
    {
      label: 'Manual',
      url: '#manual',
    },
    {
      label: 'Arduino Code',
      url: '#code',
    },
    {
      label: 'Contact',
      url: '#contact',
    },
  ],
  seo: {
    title: 'DHT11 Temperature Monitor - Arduino Project',
    description: 'Arduino-based temperature monitoring system with DHT11 sensor and automatic motor/fan control at 28°C threshold.',
    ogTitle: 'DHT11 Temperature Monitor - Arduino Project',
    ogDescription: 'Arduino-based temperature monitoring system with DHT11 sensor and automatic motor/fan control at 28°C threshold.',
  },
  temperatureThresholdC: 28,
};
