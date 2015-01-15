Mongo Reactive Angular Play Template
=====

This is Mongo Reactive Angular Play Framework Template.

Quick Note
----
This is a AngularJs, Scala-Play and Reactive-MongoDB Template put up in few hours. This was one for internal consumption. There are few things missing in the template and these are list below. Take this template with a pintch of salt
* On the Server Side the Restful API for Person is include - Only Create and List are available
* On the Server Side the Restful API code needs to be split into Repository, Controller
* On the Server Side the Model class for Person needs to have an id for Post and Delete to work
* On Angular Js Side there would be a move from ngRoute to 'ui-router'

Prerequistes
=====
* Yeoman installed
* Install Activator from this url - http://typesafe.com/community/core-tools/activator-and-sbt
* Ensure you have npm installed
* Ensure you have a local mongodb running

Launching the App
======

The Applicaton can be launched in two modes
* Production
* Development


Production Mode 
-----
All HTML files are minified and web service calls are pointing to relative end points e.g /people. 

In Separate terminal

$>mongod


In Another terminal

$>cd project-dir

$>cd web

$>npm install       //one time

$>bower install     //one time

$>grunt build

$>cd ..

$>activator run     //Start Play Framework server

Goto http://localhost:9000/index.html on browser to see the application. This is an Angular app accessing the restful apis of Play Framework reading the data from Mongo DB. Warning - You will only see a blank list of people since we haven't added the functionality to add People from UI. If you add people from restful apis you will see the changes reflect on the ui

Development Mode
------
All the HTML, JavaScript and CSS files are exploded. You work out of the web directory. You run the Restful Server (Play Framework) and Angular JS Server (grunt serve) seperately. Angular Js code access the restful apis using cors (since domain names are different in this case)

In Separate terminal

$>mongod


In Another terminal

$>cd project-dir

$>activator run    //Start Play Framework server - restful apis run at http://localhost:9000/people


In yet another terminal

$>cd project-dir

$>cd web

$>grunt server     //Starts separate web server for angularjs (watches changes and reloads changes) at http://localhost:9999/


CORS
----
You will note in the development mode we are running things differently so that the UI Developer can make the most of Angular JS tools. In this case javascript from http://localhost:9999 is trying to use the restful web sevices using ajax on http://localhost:9000. Typically this is not allowed, due to Cross Domain calls. To work around this, we added CORS Filter Plugin to Play Framework

Production/Development time Config Changes
==============================

In Production time javascript hosted at http://localhost:9000 tries to access web services hosted at http://localhost:9000/people using relaive path "/people"

In Development time javascript hosted at http://localhost:9999 tries to access web services hosted at http://localhost:9000/people using complete path 'http://localhost:9000/people'. This is made possible by CORS

The benefit is the prefix is pulled from another module called "config". The value of config.ENV.apiEndPoint is different.
* When launching from $>grunt server (web), the value of config.ENV.apiEndPoint is "http://localhost:9000"
* When launching from $>activator run (root), the value of config.ENV.apiEndPoint is ""

This value is used in People Controller (controller/people.js) to determine where to shoot the ajax call.






