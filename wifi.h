#include <WiFi.h>

#define NET_SSID "Paidamoyo"
#define NET_PASS "11111111"

#define HOSTNAME "TID-00A1E380"
#define FLASH_LED_GPIO 2

void blinkLED(){
  digitalWrite(FLASH_LED_GPIO, LOW);
  delay(100);
  digitalWrite(FLASH_LED_GPIO, HIGH);
  delay(100);
}

void startWiFi(){
  
  WiFi.hostname(HOSTNAME);
  WiFi.mode(WIFI_STA);
  WiFi.begin(NET_SSID, NET_PASS);
  pinMode(FLASH_LED_GPIO, OUTPUT);
  
  while (WiFi.status() != WL_CONNECTED){ blinkLED(); }
  digitalWrite(FLASH_LED_GPIO, HIGH);
}
