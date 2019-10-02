# FileUploadBackend
node application which provides endpoint to login,logout, file upload and file fetch

--This project was scaffolded with express server `express fileuploadbackend`. Express version 4.16.0.
-- `npm install` to install the node modules.

## Pre-requisite

-- Application uses mongo db to store the records in database.

## Development server

Run `nodemon` for a dev server. Navigate to `http://localhost:3000/`. The app will automatically reload if you change any of the source files.

## End points

### to register the user
type: GET, 
http://localhost:3000/users/signup

### to login the user :
type: POST, 
http://localhost:3000/users/login

### to fetch the file details :
type: GET, data: token, 
http://localhost:3000/upload

### to upload the file into the server :
type: POST, data: token, 
http://localhost:3000/upload
