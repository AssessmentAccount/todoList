# Online TODO List

This project is a todo list program, with register and login functionalities.
It was developed using nodejs and mongoDB.

## Overview of the technologies/architecture


For this project, the MVC architecture was used:

- Model folder contains the todoDB.js

- Controller folder contains the file authen.js, where the following funcitonalities were coded: 
  - registration;
  - login;
  - add todo item;
  - remove todo item.

- View: contains two files
  - login.ejs: Regitration and login page;
  - index.ejs: Todo list page for each user.

- Additionaly, there is the cryptoFunctions file that contains the cryptofunctions.js file where the cryptographic functions related to the authentication process.

The following nodejs packages were used:
- express;
- mongoose;
- body-parser;
- client-sessions;
- crypto;
- ejs.


## Security Considerations

There is a session encryption, for each user. The user name and password in a relatively secure manner with session keys.
Additionaly, to safeguard passwords in storage, the password is concatenated with a random string and then hashed before being stored. 


## How to build and deploy the application

You must have nodejs and mongoDb installed in your computer. First, you must configure Mongo DB, and then run the application.


1) First run the MongoDB:
In the command line prompt, run the following commands:
- mongo
- use todoList

2) Open another command line and install all the required packages by running the following commands:
- npm init
- npm install express mongoose body-parser client-sessions crypto ejs --save

3) In the same command line as in 2), run the following commands:
node index

4) Open a browser and write the following URL:
localhost:3004

Now you are ready to register/login. After login in, feel free to add and remove todo items.


## Login details 
2 users are already created for testing purposes:

- John Doe/12345

- Jane Doe/54321



## Miscellaneous
### Future integration

- use better password for session keys;

- logout

- delete buttons for each todo item;

- e-mail account/confirmation of registration;

- Use regular expressions and length limits for data insertion control.
