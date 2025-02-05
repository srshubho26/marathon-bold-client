![Marathon Bold](https://github.com/srshubho26/srshubho26/blob/main/marathon-bold.png?raw=true)

# MarathonBold

Marathon Bold is a platform for the people who are passionate about running. We organize different running events every year all over the world. Here people who are logged in can browse different Marathon events all over the world and participate in the event by registering. Besides logged in users can create Marathon event also modify and delete own Marathons.

## Technologies:
- JavaScript
- NodeJS
- NPM
- React
- Firebase
- Express
- MongoDB

## Key Features:
- Dark & light theme toggler.
- Sorting functionality based on Marathon's creation time.
- Sorting functionality based on Marathon's creation time.
- Countdown functionality for Marathons those haven't started yet.
- Pagination for Marathon browsing page.
- Creating Marathon and modifying own Marathons.
- Applying on a marathon depending on the registration deadline.
- Modifying own applies.

## Dependencies:
- axios: ^1.7.9
- firebase: ^11.1.0
- flowbite-react: ^0.10.2
- localforage: ^1.10.0
- match-sorter: ^8.0.0
- moment: ^2.30.1
- prop-types: ^15.8.1
- react: ^18.3.1
- react-awesome-reveal: ^4.3.1
- react-countdown-circle-timer: ^3.2.1
- react-countup: ^6.5.3
- react-datepicker: ^7.5.0
- react-dom: ^18.3.1
- react-helmet-async: ^2.0.5
- react-icons: ^5.4.0
- react-router-dom: ^7.1.0
- sort-by: ^1.2.0
- sweetalert: ^2.1.2
- swiper: ^11.1.15

## devDependencies
- @eslint/js: ^9.17.0
- @types/react: ^18.3.17
- @types/react-dom: ^18.3.5
- @vitejs/plugin-react: ^4.3.4
- autoprefixer: ^10.4.20
- eslint: ^9.17.0
- eslint-plugin-react: ^7.37.2
- eslint-plugin-react-hooks: ^5.0.0
- eslint-plugin-react-refresh: ^0.4.16
- globals: ^15.13.0
- postcss: ^8.4.49
- tailwindcss: ^3.4.17
- vite: ^6.0.3

## Run On Local Machine
- Run `git clone https://github.com/shuvo22890/marathon-bold-client.git` on your local machine
- After cloning run `cd marathon-bold-client`
- Then run `npm install`
- Create a `.env.local` file on the root of the project and paste the following code
- `VITE_API_KEY=`
- `VITE_AUTH_DOMAIN=`
- `VITE_PROJECT_ID=`
- `VITE_STORAGE_BUCKET=`
- `VITE_MESSAGING_SENDER_ID=`
- `VITE_APP_ID=`
- Create a firebase project and initiate a web app, email+password and google authentication inside the firebase project
- Get the project credentials in the firebase app and provide in keys of env file
- Finally run `npm run dev`

## Live Link:
https://marathon-bold.web.app

## Backend Repository:
https://github.com/srshubho26/marathon-bold-server