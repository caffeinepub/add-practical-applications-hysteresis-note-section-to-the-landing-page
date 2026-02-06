# Specification

## Summary
**Goal:** Update the Arduino Code section and site copy/config to match the provided DHT11 + relay + LED fan control sketch with 27°C ON / 26°C OFF hysteresis.

**Planned changes:**
- Replace the code shown in `frontend/src/components/sections/ArduinoCodeSection.tsx` with the exact user-provided Arduino sketch (DHT11 pin 6, relay pin 8 active-LOW, LED pin 12, fanState memory, 27/26 hysteresis, 2-second delay).
- Update all Arduino Code section user-facing English text (title/subtitle/labels/badges/how-it-works) to describe the new pins, active-LOW relay behavior, 2-second sampling, and 27°C ON / 26°C OFF hysteresis.
- Update `frontend/src/siteConfig.ts` to set `temperatureThresholdC` to 27 and revise any marketing/SEO/feature copy that mentions 28°C to reflect the 27°C ON / 26°C OFF hysteresis behavior.

**User-visible outcome:** The Arduino Code section displays and copies the new sketch exactly, and the app’s configuration and marketing text consistently describe fan activation at 27°C with 26°C turn-off hysteresis.
