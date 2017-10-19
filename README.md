# SOEN341
The system is a web application that allows clients to watch a retailer's catalogs and create a wish list.

# Understanding Our Work Environment Using Node.js with ExpressJS

* ## Node.js Itself
  Node.js takes responsibility of handling http request i.e GET, POST like *www.mywebsite.com/about, www.mywebsite.com/monitors/19inch*
   Node.js has the same responsibility of Apache which is server side.
   
   * ### Using ExpressJS Framework

      ExpressJS is a framework or in other words, a Node.js library for handling https with ease with prebuild core functions.
  
  **server** folder contains the server side, or backend related work. Handling request of GET and POST made by the client is done in this folder. The data is receive and sent back as a *JSON* file. The sessions are created using *Password*, *PasswordJWT* and other related libraries.
  
  **database** folder holds the server database related work. Scripts such as the latest data structure, generating data set and the currently data set being used by the server are part of this folder.
  
  The **database** and **server** each contains a **README.md** file to understand their work related environment.
