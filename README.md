 # React Native Notes App (Expo + TypeScript)

A simple and clean Notes App built with React Native, Expo SDK 54, and TypeScript.
This app allows users to create, edit, delete, and manage notes with a smooth UI and responsive layout.

This is a simple secure notes application for assessment:
- Authentication (register/login) stored in AsyncStorage
- Protected routing (auth flow)
- Notes CRUD with categories, search, sorting, timestamps
- Uses AsyncStorage as the data store

Features

Create notes

View all notes

Edit existing notes

Delete notes

Local storage using @react-native-async-storage/async-storage

Clean and modern UI

Built with Expo (easy development, no native builds required)

Installation
1️ Clone the repo
git clone 
cd notesapp_full_ts

2️⃣ Install dependencies
npm install

3️⃣ Start the app (Expo Go)
npx expo start -c


Scan the QR code using Expo Go on your Android device.

Clearing cache (important)

If you get errors like PlatformConstants not found, run:

npx expo start -c
npm install

Running in Expo Go

Open Expo Go on your phone

Scan the QR code from the terminal/browser

App loads immediately


Quick start:
1. Install Expo CLI: `npm install -g expo-cli`
2. Install dependencies: `npm install`
3. Run: `npm start` (or `expo start`)
4. Open in simulator or Expo Go

