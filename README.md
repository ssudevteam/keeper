
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
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
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

<sub>Screenshots on iOS</sub>
</br></br>
Keeper is an apicultural(Beekeeping) app that helps bees stay healthy during pollination season. It addresses a common challenge faced by growers: the loss of entire hives due to communication breakdowns within large organizations. Keeper provides teams with the ability to automatically generate work routes/schedules based on the company's most important daily tasks. It also allows easy reporting  of in-field metrics from a mobile app to facilite on-the-job coordination. We set out to create an app that focused on animal species and conservation efforts as our entry to the annual Sonoma State University Hackathon, where we came in 2nd overall!

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With


* [![React][React.js]][React-url]
* [![Expo][Expo.js]][Expo-url]
* [![Mongo][MongoDb]][Mongo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

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
- [ ] Add AI Chat Bot to company knowledgebase
- [ ] Refine Travelling Salesman Algorithim
- [ ] Create website backend

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
[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[Mongo-url]: https://www.mongodb.com
[React.js]: https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Expo.js]: https://img.shields.io/badge/Expo-35495E?style=for-the-badge&logo=expo&logoColor=4FC08D
[Expo-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
