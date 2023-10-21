## Setup Instructions for the Mobile App

Follow the steps below to get the application up and running on your local environment.

### Prerequisites:

1. **Expo CLI**: The application is developed using Expo, so you will need to install the Expo CLI.
   
   ```
   npm install -g expo-cli
   ```

### Steps:

1. **Set Up Env. Variables**:

   - Open the `.env` file in the root directory.
   - Update the IP Address with your personal IP Address. This is necessary for the API endpoint to function correctly and fetch data.

   ```
   IP_ADDRESS=your_ip_address_here
   ```

2. **Start the Database Server**:

   Navigate to the database directory and run the server:

   ```
   cd database
   node server.js
   ```

   Make sure to keep this terminal running as to keep your dev server connected to the database.

3. **Start the Metro Bundler**:

   In a separate terminal, run the following command:

   ```
   npm start
   ```

   This will start the Metro Bundler, enabling hot-reloading and rendering the app on your mobile device.

4. **Scan the QR Code**:

   Once the Metro Bundler starts, you'll see a QR code in the terminal. 

   - Ensure you have the `Expo Go` app installed on your mobile device. 
   - Scan the QR code using your device to open and run the app.

