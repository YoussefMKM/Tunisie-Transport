# Tunisie Transport - React Native App

Welcome to the Tunisie Transport mobile application! This React Native project is designed to help users easily search for bus stops and view them on a map. The app uses Google Maps to display the locations of the bus stops in Tunis, Tunisia.
Only available on Android devices.

## Features

- **Search Bar:** Allows users to search for bus stops by line number (`NumLigne`) or station name (`NomStation`).
- **Map Integration:** Displays bus stops on a map using Google Maps.
- **Real-time Search:** Autocomplete search results as users type.
- **Markers:** Shows all markers for a selected line on the map.
- **Expo Managed Workflow:** Built using Expo for easy development and deployment.

## Screenshots
![Screenshot_2024-09-08-19-37-39-215](https://github.com/user-attachments/assets/1dc7b86e-77c4-484e-805d-55c3004664c3)

## Download
Please Download the latest version ![here](https://github.com/YoussefMKM/Tunisie_Transport/releases/download/alpha/Tunisie-Transport-v0.1.0-alpha.apk)


## Installation

Follow these steps to get the project up and running on your local machine.

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/YoussefMKM/Tunisie-Transport
   cd tunisie-transport
   ```
   
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
    "name": "Tunisie Transport",
    "slug": "my-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_GOOGLE_MAPS_API_KEY_HERE"
        }
      },
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.youssefmkm.tt"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "router": {
        "origin": false
      },
      "eas": {
        "projectId": "e4640fa7-fa03-4a26-9229-3e119d7245bb"
      }
    }
  }
}

```

4. **Start the Development Server:**

Run the following command to start the development server:

``npm start``
or
``yarn start``
This will start the Expo development server and open a new tab in your browser. You can use the Expo Go app to view your app on your mobile device, or use an emulator.

# Usage

- Search for Bus Stops: Use the search bar to find bus stops by entering a line number (NumLigne) or station name (NomStation).
- View on Map: After selecting a bus stop, it will be displayed on the map with a marker.
- Multiple Markers: If multiple stops belong to the same line, all will be shown on the map.

# Configuration

If you need to configure the project further, you can do so in the following files:

- app.json/app.config.js: Main configuration file for Expo projects.
- constants/bus-stops.ts: Contains the list of bus stops with details like line number, station name, latitude, and longitude.

# Contributing

Contributions are welcome! Please follow these steps to contribute:

- Fork the repository.
- Create a new branch (git checkout -b feature/your-feature).
- Make your changes.
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature/your-feature).
- Create a new Pull Request.
