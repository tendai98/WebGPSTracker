#include "wifi.h"
#include "client.h"

void setup(){
  startWiFi();
  initGPS();
  Serial.begin(9600);
}

void loop(){
  getLocationData();
  httpGet();
  delay(500);
}
