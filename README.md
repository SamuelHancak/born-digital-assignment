# React Application with Audio Recording and WebSocket Integration

This project is a React-based web application built with **TypeScript** and **Vite**. It includes audio recording and playback functionality, WebSocket communication, and a responsive design. The app is styled using **Tailwind CSS** and is designed to be lightweight, fast, and user-friendly.

## Description of the Solution

The application allows users to record audio, play it back, and send the audio data to a server via WebSocket. It features a clean and responsive UI, making it accessible on both desktop and mobile devices. The app is built with a modular and maintainable code structure, ensuring scalability and ease of development.

## Features Implemented

- **Audio Recording and Playback**: Users can record audio using their microphone and play it back.
- **Auto-Stop Recording**: Recording automatically stops after the user is not speaking after a specific time.
- **WebSocket Communication**: Audio data is sent to a server in real-time using WebSocket.
- **Responsive Navigation**: A `Navbar` component with mobile-friendly design.
- **Custom Hook**: Utilizes custom hook for managing audio recording and playback.
- 
## Additional Libraries and Tools Used

- **extendable-media-recorder**: For handling audio recording.
- **hark**: For speech detection during audio recording.
- **react-icons**: For scalable vector icons.
- **tailwindcss**: Tailwind CSS integration with Vite.
- **@wavesurfer/react**: For audio waveform visualization.

## Features to Explore in the Future

- **Live Audio Visualization**: Display a waveform or spectrogram during audio playback.
- **File Uploads**: Allow users to upload pre-recorded audio files.
- **Speech-to-Text**: Integrate speech recognition for transcribing recorded audio.
- 
## Instructions for Running the App Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/SamuelHancak/born-digital-assignment.git
   cd born-digital-assignment
   ```
2. Install dependencies:
   ```bash
    npm install
    ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`.
5. Ensure the WebSocket server is running at `ws://localhost:8080` to test audio sending functionality.
