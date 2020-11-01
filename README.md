# StudyMate
StudyMate is a platform for students where they get to interact with others who have similar interests with them. 
It also helps them to find the closest study partners from their current location.This project is still under development and will be updated soon.
A demo can be found [here](https://tafadzwa-study-mate.herokuapp.com/). 

## Running the project locally.
You need to have an AWS S3 account and create a bucket called studymate-profile-pics. Install mongoDb on your pc and create a database called study_mate. 
Create a .env file and add the following variables
* TOKEN_SECRET = put any token secret of you choice
* LOCAL_DB_CONNECT = add the address to the study_mate database
* SECRET_ACCESS_KEY = add the secret access key for your AWS S3 account
* ACCESS_KEY_ID = add the access key id from your AWS S3 account
* REGION = add the region from your AWS S3 account.

Enter npm install followed by npm start in both client and server directories to run the project. 

## Tech Stack used.
* Reactjs
* Redux
* Nodejs
* Socket.io
* JSON Web Tokens
* ckeditor 5
* MongoDB Atlas
* Amazon S3 and more...
