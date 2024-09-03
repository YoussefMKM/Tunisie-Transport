# Tunisie Transport - React Native App

Welcome to the Tunisie Transport mobile application! This React Native project is designed to help users easily search for bus stops and view them on a map. The app uses Google Maps to display the locations of the bus stops in Tunis, Tunisia.


## Features

- **Search Bar:** Allows users to search for bus stops by line number (`NumLigne`) or station name (`NomStation`).
- **Map Integration:** Displays bus stops on a map using Google Maps.
- **Real-time Search:** Autocomplete search results as users type.
- **Markers:** Shows all markers for a selected line on the map.
- **Expo Managed Workflow:** Built using Expo for easy development and deployment.

## Screenshots
![1725398673679](https://github.com/user-attachments/assets/698dc0ed-fa4a-4a61-a8ca-1268186273b5)


## Installation

Follow these steps to get the project up and running on your local machine.

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/your-username/tunisie-transport.git
   cd tunisie-transport
2. **Install Dependencies:**

Make sure you have node and npm or yarn installed, then run:

``npm install``
or
``yarn install``

3. **Add Google Maps API Key:**

To use Google Maps, you need to add your Google Maps API key. In app.json:

```bash
{
  "expo": {
    "name": "TunisieTransport",
    "slug": "tunisie-transport",
    "version": "1.0.0",
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY"
        }
      }
    }
  }
}
```
In app.config.js:

4. **Start the Development Server:**

Run the following command to start the development server:

``npm start``
or
``yarn start``
This will start the Expo development server and open a new tab in your browser. You can use the Expo Go app to view your app on your mobile device, or use an emulator.

# Usage

-Search for Bus Stops: Use the search bar to find bus stops by entering a line number (NumLigne) or station name (NomStation).
-View on Map: After selecting a bus stop, it will be displayed on the map with a marker.
-Multiple Markers: If multiple stops belong to the same line, all will be shown on the map.

# Configuration

If you need to configure the project further, you can do so in the following files:

app.json/app.config.js: Main configuration file for Expo projects.
constants/bus-stops.ts: Contains the list of bus stops with details like line number, station name, latitude, and longitude.

# Contributing

Contributions are welcome! Please follow these steps to contribute:

-Fork the repository.
-Create a new branch (git checkout -b feature/your-feature).
-Make your changes.
-Commit your changes (git commit -am 'Add new feature').
-Push to the branch (git push origin feature/your-feature).
-Create a new Pull Request.
