const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const targetDir = path.resolve(process.cwd(), 'public', 'Components');
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

const componentImages = [
  { file: 'arduino-uno.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Arduino_Uno_-_R3.jpg' },
  { file: 'nodemcu-v3.jpg', url: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/NodeMCU_DEVKIT_1.0.jpg' },
  { file: 'microchip.jpg', url: 'https://cdn-shop.adafruit.com/970x728/123-01.jpg' },
  { file: 'hc-sr04.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/1/5/15569-Ultrasonic_Distance_Sensor_-_HC-SR04-01a.jpg' },
  { file: 'sensor-8channel.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/1/1/11758-01.jpg' },
  { file: 'sensor-5channel.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/1/1/11758-01.jpg' },
  { file: 'rain-sensor.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/1/3/13322-01.jpg' },
  { file: 'lm35.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/0/0/00521-01.jpg' },
  { file: 'ir-red.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/1/1/11758-01.jpg' },
  { file: 'rfid-card.jpg', url: 'https://cdn-shop.adafruit.com/970x728/362-00.jpg' },
  { file: 'motor.jpg', url: 'https://cdn-shop.adafruit.com/970x728/3777-00.jpg' },
  { file: 'stepper-28byj.jpg', url: 'https://cdn-shop.adafruit.com/970x728/857-00.jpg' },
  { file: 'motor-controller.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/0/9/09540-01.jpg' },
  { file: 'l293d.jpg', url: 'https://cdn-shop.adafruit.com/970x728/807-01.jpg' },
  { file: 'wheel.jpg', url: 'https://cdn-shop.adafruit.com/970x728/3766-00.jpg' },
  { file: 'chassis.jpg', url: 'https://cdn-shop.adafruit.com/970x728/2939-01.jpg' },
  { file: 'breadboard.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/1/2/12615-01.jpg' },
  { file: 'connecting-wire.jpg', url: 'https://cdn-shop.adafruit.com/970x728/1957-00.jpg' },
  { file: 'switch-black.jpg', url: 'https://cdn-shop.adafruit.com/970x728/3221-00.jpg' },
  { file: 'b3-pro-charger.jpg', url: 'https://cdn-shop.adafruit.com/970x728/1904-00.jpg' },
  { file: 'battery-holder-3.jpg', url: 'https://cdn-shop.adafruit.com/970x728/3841-00.jpg' },
  { file: 'am7905t.jpg', url: 'https://cdn-shop.adafruit.com/970x728/2164-00.jpg' },
  { file: 'd400.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/0/0/00521-01.jpg' },
  { file: 'bc557.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/0/0/00521-01.jpg' },
  { file: 'diode.jpg', url: 'https://cdn-shop.adafruit.com/970x728/183-00.jpg' },
  { file: 'opamp-741.jpg', url: 'https://cdn-shop.adafruit.com/970x728/807-01.jpg' },
  { file: 'resistor-1ohm-1w.jpg', url: 'https://cdn-shop.adafruit.com/970x728/2780-00.jpg' },
  { file: 'relay.jpg', url: 'https://www.sparkfun.com/media/catalog/product/cache/f3020b7489dcfc4d1d147cf4dad07b7f/1/3/13815-04a.jpg' },
  { file: 'potentiometer.jpg', url: 'https://cdn-shop.adafruit.com/970x728/562-03.jpg' },
  { file: 'buzzer.jpg', url: 'https://cdn-shop.adafruit.com/970x728/160-01.jpg' },
  { file: 'laser-light.jpg', url: 'https://cdn-shop.adafruit.com/970x728/1054-04.jpg' },
  { file: 'capacitor-3300uf.jpg', url: 'https://cdn-shop.adafruit.com/970x728/2192-00.jpg' },
  { file: 'capacitor-2200uf.jpg', url: 'https://cdn-shop.adafruit.com/970x728/2192-00.jpg' },
  { file: 'capacitor-1000uf-50v.jpg', url: 'https://cdn-shop.adafruit.com/970x728/2192-00.jpg' },
  { file: 'capacitor-1000uf-25v.jpg', url: 'https://cdn-shop.adafruit.com/970x728/2192-00.jpg' },
  { file: 'capacitor-4-7uf-250v.jpg', url: 'https://cdn-shop.adafruit.com/970x728/1588-00.jpg' },
  { file: 'capacitor-4-7uf-25v.jpg', url: 'https://cdn-shop.adafruit.com/970x728/1588-00.jpg' },
  { file: 'capacitor-10uf-25v.jpg', url: 'https://cdn-shop.adafruit.com/970x728/1588-00.jpg' },
  { file: 'capacitor-1uf-50v.jpg', url: 'https://cdn-shop.adafruit.com/970x728/1588-00.jpg' },
];

console.log(`Starting download of ${componentImages.length} authentic component photos...`);

let successCount = 0;

for (const item of componentImages) {
  const destPath = path.join(targetDir, item.file);

  // If already exists and size > 2KB, skip downloading
  if (fs.existsSync(destPath) && fs.statSync(destPath).size > 2048) {
    console.log(`[EXISTS] ${item.file} (${fs.statSync(destPath).size} bytes)`);
    successCount++;
    continue;
  }

  try {
    const cmd = `curl.exe -s -L -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" -o "${destPath}" "${item.url}"`;
    execSync(cmd, { stdio: 'ignore' });
    const size = fs.existsSync(destPath) ? fs.statSync(destPath).size : 0;
    if (size > 1024) {
      console.log(`[DOWNLOADED] ${item.file} (${size} bytes)`);
      successCount++;
    } else {
      console.error(`[FAILED - SMALL SIZE] ${item.file} (${size} bytes)`);
    }
  } catch (err) {
    console.error(`[ERROR] ${item.file}:`, err.message);
  }
}

console.log(`Finished: ${successCount}/${componentImages.length} images ready in public/Components/`);
