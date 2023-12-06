### <h1 align="center">Assignment-2</h1> 
### <h2 align="center">Project Name: user-crud</h2>

# How to run this project locally

- Run the project in locally, need to clone the git repository by using the command.

```
   git clone ['url of the repository']
```
- After cloning the repository. Than we need to install node modules.if have any depencies then just run this command or need to install with any npm packege then node modules will create.

```
  npm install
```
- In my project i have some npm method that run the code easily call them.

- First 
```
  npm run build
```
It convert typescript to javascript

- Second 
```bash
 npm run start:prod
```
It will run the sever locally. But it only run javascript file that convert by build method.

- Third 
```bash
  npm run start:dev
```
This run our typescript files and sever locally.

After running the server. we get result on browser by following this,
```bash

# This will serve first page of greeting
  http://localhost:5000/
# Getting all users
  http://localhost:5000/api/users
# Getting single users
  http://localhost:5000/api/users/[*userId*]
# Getting all orders
  http://localhost:5000/api/users/[*userId]/orders
# Getting all Total price of orders
  http://localhost:5000/api/users/[*userId]/orders/   total-price

N.B: you need to replace [*userId*] by real userId.
All this are get method for browser.
```

#### Vercel

- Here i have vercel live link that helps run this project dynamically. that means u don't need to run any engine locally.

Vercel live link: [user-crud](https://user-crud-vert-nine.vercel.app)

To use this live link you just need to remove localhost:5000 and put this link.

### Postman
In this my project i also taking helps form this software. It helps me to create/post, update, delete and get. For Getting any data just call and by the url we get result. but update and create we need to send body of json data that save to the database.

### About the project

This was a very simple user create, update,delete get project. Based on Typescript and mongoose. Typescript as look as javascript but we can define the types of any data. On the other side mongoose also based on mongodb but it have many advanced technology. Both typescript and mongoose are very much powerfull. Other side i also use some npm package. One of them help to hashed password. Using ZOD to validate user data before save to databse.Lodash help me to making some decision. Here some list of packages and technologies.

TS: [typescript](https://www.typescriptlang.org/) </br>
Mongoose: [mongoose](https://mongoosejs.com/) </br>
MongoDB:[mongodb](https://www.mongodb.com/) </br>
Bcrypt: [bcrypt](https://www.npmjs.com/package/bcrypt) </br>
Lodash: [lodash](https://lodash.com/) </br>
Zod: [zod](https://zod.dev/)






