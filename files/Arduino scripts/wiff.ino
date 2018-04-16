#include <ESP8266WiFi.h>

// Networking details
const char* wifi_ssid = "BCKILLERS";
const char* wifi_password = "MTYzhenshuai";
const char* host = "http://localhost";
const int port = 8086;
const char* influx_database = "soil";
const char* influx_username = "";
const char* influx_password = "";
const char* influx_measurement = "distance,host=esp-01,location=outdoors";
const char* influx_field = "value";

// defines pins numbers
const int trigPin = 14;  
const int echoPin = 12; 

// defines variables
long duration;
int distance;


void setup() {
  // Set up status LED
  pinMode(LED_BUILTIN, OUTPUT);

  // Open serial port
  Serial.begin(115200);
  delay(10);

  // Connect to WiFi
  Serial.println();
  Serial.print("Connecting to ");
  Serial.print(wifi_ssid);
  WiFi.begin(wifi_ssid, wifi_password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println(" connected");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  pinMode(trigPin, OUTPUT); // Sets the trigPin as an Output
  pinMode(echoPin, INPUT); // Sets the echoPin as an Input
  Serial.begin(9600); // Starts the serial communication
}



void loop() {
  

// Clears the trigPin
digitalWrite(trigPin, LOW);
delayMicroseconds(2);

// Sets the trigPin on HIGH state for 10 micro seconds
digitalWrite(trigPin, HIGH);
delayMicroseconds(10);
digitalWrite(trigPin, LOW);

// Reads the echoPin, returns the sound wave travel time in microseconds
duration = pulseIn(echoPin, HIGH);

// Calculating the distance
distance= duration*0.034/2;
// Prints the distance on the Serial Monitor

Serial.print("Distance: ");
Serial.print(distance);
Serial.println("cm");
delay(1000);


  // Send data to InfluxDB
  Serial.print("Connecting to ");
  Serial.print(host);
  Serial.print(":");
  Serial.println(port);

  // Make a new client to connect to the server with
  WiFiClient client;
  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    return;
  }

  // Build the request URI with the database, username and password
  String url = "/write?db=";
  url += influx_database;
  url += "&u=";
  url += influx_username;
  url += "&p=";
  url += influx_password;
  Serial.print("Requesting URL: ");
  Serial.println(url);

  // Make the POST body containing the data
  String body = String(influx_measurement) + " " + influx_field + "=" + distance;
  Serial.print("Body: ");
  Serial.println(body);

  // Build the full POST request
  client.println(String("POST ") + url + " HTTP/1.1");
  client.println(String("Host: ") + host);
  client.println("Connection: close");
  client.print("Content-Length: ");
  client.println(body.length());
  client.println();
  client.println(body);

  // Wait for the response
  unsigned long timeout = millis();
  while (client.available() == 0) {
    if (millis() - timeout > 5000) {
      Serial.println("Client timed out!");
      client.stop();
      return;
    }
  }

  // Read the reply and print it out
  Serial.println("Got response:");
  while (client.available()){
    String line = client.readStringUntil('\r');
    Serial.print(line);
  }
  Serial.println();
}
