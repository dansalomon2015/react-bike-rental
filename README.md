# Biker rental App

## Demo accounts

### Manager

email : dsalomonj@gmail.com / password : 123456

## Database

Database provider is firebase/firestore

### Documents structures

users_extend {<br> &emsp;username : string<br> &emsp;roles : string[]<br> &emsp;location : string<br> &emsp;email :
string<br> &emsp;timestamp : number<br> &emsp;createdBy : string<br> }

bikes {<br> &emsp;model : string<br> &emsp;color : string<br> &emsp;location : string<br> &emsp;available : boolean<br>
&emsp;timestamp : number<br> &emsp;lastupdate : number<br> &emsp;createdBy : string<br> }<br>

ratings {<br> &emsp;rating : number<br> &emsp;userId : string<br> &emsp;bikeId : string<br> }<br>

reservations {<br> &emsp;endDate: string<br> &emsp;bikeId: string<br> &emsp;userId: string<br> &emsp;startDate:
string<br> &emsp;timestamp: number<br> &emsp;bike: {<br> &emsp;&emsp;&emsp;location: string<br> &emsp;&emsp;model:
string<br> &emsp; &emsp;color: COLORS<br> &emsp;}<br> &emsp;user: {<br> &emsp;&emsp;email: string<br>
&emsp;&emsp;username: string<br> &emsp;}<br> }<br>

## Authentication

Authentication provider is firebase/auth

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\

### `yarn build`

Builds the app for production to the `build` folder.\
