# inventory-application

- This is the result of the project Inventory Application.

1. Result

![Screenshot_2024-04-01_14-09-06](https://github.com/Preslav977/battleship/assets/119291608/59454503-e025-46ea-8548-5542b6aa83fe)

2. About the project

- The idea of this project was to create a music store where users can create, update, read, and delete songs, authors, genres, and albums.

3. Project Objectives

- The first objective was to create models of the databases for the music store. The author can have, for example, first name and date of birth fields; the song title; the song duration; and the channel released.
- The genres have just a name, and the albums have a title, a channel released, etc.
- The second objective was to set the basic route path in this project. I used /store, which is appropriate for music stores, and generated the skeleton of the project with Express installed, as well as pug, which is essentially the HTML.
- The objective was to create the database in the Mongo database using the interface, then choose the name of the database and the collection.
- The fourth objective was to populate the database using a script file with asynchronous code that fields the database with everything needed, for example, authors, genres, songs, authors, and all essential data for the project.
- The first object was to set up the routes. Each router has a GET and a POST; GET is retrieving (reading) information, and POST is using to change information. Each model has paths for creating, reading, updating, deleting, even based on an ID, etc.
- The controllers are used to control each of these paths, for example, a homepage path, which can be used to read information about what and how many available songs there are in the store.
- The sixth objective was to create the READ, which is the HTML that shows the content of each page, using the controller.
- The seventh objective was to create the forms that are going to be used to create, update, read, and delete each of these models, also using sanitizing and validation.

4. Notes and Lessons learned

- I learned to set and organize each model using references to other models in the Mongo database, which will help me further in later projects.
- Learned how to set a different path with middleware that will redirect to the main page of the project.
- How to create a database with MongoDB and how to use a connection string to connect to it
- How to populate a database using a script that you can modify to change the content of this file to suit your needs Using this fail is not necessary, but it does help with populating a database.
- How to create each router for create, update, read, and delete for each model, using an ID as well
- I learned how to use a controller with GET and POST in order to read or change information on the page and how to implement CRUD operations within the controllers.
- I learned how to create views or HTML files for each router of the controller and further solidified my knowledge of using Pug.
- What I learned is that sanitizing and validation are used together to check if the fields are not more or less characters, which makes me required to don't let the user type anything other than what is needed for each field.
- The last lesson I learned was how to use forms for each CRUD operation, which are basically used for each operation.
- The first objective was to create models of the databases for the music store. The author can have, for example, the first name and date of birth fields; the song title; the song duration; and the channel released.
- The genres have just a name, and the albums have a title, a channel released, etc.
- The second objective was to set the basic route path for this project. I used /store, which is appropriate for music stores, and generated the skeleton of the project with Express installed, as well as pug, which is essentially the HTML.
- The objective was to create the database in the Mongo database using the interface, then choose the name of the database and the collection.
- The fourth objective was to populate the database using a script file with asynchronous code that fields the database with everything needed, for example, authors, genres, songs, authors, and all essential data for the project.
  The first object was to set up the routes. Each router has a GET and a POST; GET is retrieving (reading) information, and POST is used to change information. Each model has paths for creating, reading, updating, deleting, even based on an ID, etc.
- The controllers are used to control each of these paths, for example, a homepage path, which can be used to read information about what and how many available songs there are in the store.
- The sixth objective was to create the READ, which is the HTML that shows the content of each page, using the controller.
- The seventh objective was to create the forms that are going to be used to create, update, read, and delete each of these models, also using sanitizing and validation.

5. Features or things I'd love to work on for this project in the future

- I would want to add more styles and make it responsive.
- I would reorganize my model relationships in order to solve my problem with showing the songs in the album.
- Add more sanitizing and validation.
