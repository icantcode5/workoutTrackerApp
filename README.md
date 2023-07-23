## FitFocus

A fitness tracking application catered towards weightlifting/bodybuilding where users can keep a digital record of workouts, reps, sets, and amount of weight lifted. Built using the MERN stack.

## Description

This application is a functioning workout logging application that helps "fitfocus"-ed individuals track their weightlifting/bodybuilding movements so they never forget how much weight they lifted and sets along with reps they completed the week and weeks before. Users can create an account utilizing JSON web token to authenticate and authorize them and begin by adding their workouts completed for the day. If they make a mistake in creating the workout, users can delete it and create a new one or they can also update it. The workouts are saved to the MongoDB database and displayed as most recently added through the mongoDB schema date property. As a way to utilize a 3rd party API, when users are entering their workouts, a motivational text appears above for encouragment.

## How to install

1. Clone this Project
2. Assuming you have Node.js and npm installed, run `npm install` in the root directory to install all the dependencies needed.
3. Create a MongoDB account and set up your client connection string in the .env file - https://account.mongodb.com/account/login
4. Create a JWT account and set up the JWT token secret in the .env file to allow authorization/authentication - https://auth0.com/signup?_ga=2.186242795.357770778.1682114575-778080090.1675400718&_gl=1*b8p4u8*rollup_ga*Nzc4MDgwMDkwLjE2NzU0MDA3MTg.*rollup_ga_F1G3E656YZ*MTY4MjExNDU3NC40LjEuMTY4MjExNDYwMS4zMy4wLjA.
5. In the root directory run `npm run dev` to get the server up and running on your selected port.
6. In the root directory, cd into the client folder and run `npm start` to get your frontend running on port 3000.
<!-- change to running on port 3000 above -->

## Currently working on

1. Finish refresh token implementation on frontend
2. Adding Nav layout to switch between pages easier
3. Update UI to make viewing workouts easier
4. Add responsive layout
