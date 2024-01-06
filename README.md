
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://github.com/ssudevteam/keeper/assets/18277544/5051f115-9605-40f4-abda-669b93726d33" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Keeper</h3>

  <p align="center">
    Innovating for Social Good

</br>
     By:
    <a href="https://github.com/harrisb002">Ben</a>
    ·
    <a href="https://github.com/joeltho">Joel</a>
    ·
    <a href="https://github.com/jordannakamoto">Jordan</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#development">Development</a>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<img width="140" alt="Screenshot 2024-01-06 at 12 10 03 PM" src="https://github.com/ssudevteam/keeper/assets/18277544/d47759fb-b747-41ad-92dc-2ff58fb0c375">  &nbsp;  &nbsp;
<img width="148" alt="Screenshot 2024-01-06 at 12 10 33 PM" src="https://github.com/ssudevteam/keeper/assets/18277544/b0dbf509-98ee-4f9a-b4f1-4790ac1d548c"> &nbsp; &nbsp;
<img width="140" alt="Screenshot 2024-01-06 at 12 10 46 PM" src="https://github.com/ssudevteam/keeper/assets/18277544/64eb9bea-d7b0-40d7-9311-a2e9d29c79c8">  &nbsp;  &nbsp;
<img width="146" alt="Screenshot 2024-01-06 at 12 10 21 PM" src="https://github.com/ssudevteam/keeper/assets/18277544/3489a074-84d1-47c6-aeda-06b2def82676">
</br></br>
Keeper is an apicultural(Beekeeping) app to manage the health of our important pollinators. It addresses a common challenge faced by growers: the loss of entire hives due to communication breakdowns within large organizations. Keeper provides teams with the ability to automatically generate work routes/schedules based on the company's most important daily tasks. Our app focuses on animal species and conservation efforts as our entry to the annual Sonoma State University Hackathon, where we placed  2nd overall!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![React][React.js]][React-url]
* [![Expo][Expo.js]][Expo-url]
* [![Mongo][MongoDb]][Mongo-url]
* [![Google][Google]][Google-url]


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Video Demo
https://www.youtube.com/watch?v=lyVZktFsbaQ

</br>

<!-- GETTING STARTED -->
## Development

Follow the steps below to get the application up and running on your local environment.

### Prerequisites:

1. **Expo CLI**: The application is developed using Expo, so you will need to install the Expo CLI.
   
   ```
   npm install -g expo-cli
   ```

### Steps:

1. **Set Up Env. Variables**:

   - Open the `.env` file in the root directory.
   - Update the IP Address with your personal IP Address. This is necessary for Expo to send/receive app data.

   ```
   IP_ADDRESS=your_ip_address_here
   ```

2. **Start the Database Server**:

   Navigate to the database directory and run the server:

   ```
   cd database
   node server.js
   ```

   Make sure to keep this terminal running to keep your dev server connected to the database.

3. **Start the Metro Bundler**:

   In a separate terminal, run the following command:

   ```
   npm start
   ```

   This will start the Metro Bundler, which bundles the app enabling live-rendering and hot-reloading on your mobile device.

4. **Scan the QR Code**:

   Once the Metro Bundler starts, you'll see a QR code in the terminal. 

   - Ensure you have the `Expo Go` app installed on your mobile device. 
   - Scan the QR code using your device to open and run the app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [ ] Add Multi-Language Support
- [ ] Add Company KnowledgeBase/Health Compendium
- [ ] Refine Travelling Salesman Algorithim
- [ ] Create website

See the [open issues](https://github.com/ssudevteam/keeper/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- LICENSE -->
## License

Distributed under the MIT License.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

SSUDevTeam - ssudevteam@gmail.com

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Thank you to the following departments and Mr. Stewart for putting on the Innovating For Social Good Hackathon!
* [Sonoma State University School of Business and Economics](https://sbe.sonoma.edu)
* [Sonoma State University School EE](https://ee.sonoma.edu)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com
[React.js]: https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Expo.js]: https://img.shields.io/badge/Expo-35495E?style=for-the-badge&logo=expo&logoColor=4FC08D
[Expo-url]: https://vuejs.org/
[Google]: https://img.shields.io/badge/Google_Maps_API-4285F4?style=for-the-badge&logo=google-cloud&logoColor=white
[Google-url]: https://developers.google.com/maps
