const express = require("express");
const portNumber = 4200;
const app = express(); //make an instance of express

// Create an HTTP server using the Express app
const server = require("http").createServer(app);

// Middleware function to serve the "client.html" file
function clientRoute(req, res, next) {
  res.sendFile(__dirname + "/public/client.html");
}

// Define a route for the "/client" path and link it to the clientRoute function
app.use("/client", clientRoute);

// Serve static files from the "public" directory (using the Express framework object) 
app.use(express.static(__dirname + "/public"));

// Parse JSON data in incoming requests
app.use(express.json()); 

// Parse URL-encoded data in incoming requests
app.use(express.urlencoded({ extended: true })); 

// make server listen for incoming messages
server.listen(portNumber, function () {
  console.log("listening on port:: " + portNumber);
});

// Default route - responds with "Hello world" for the root URL "/"
app.get("/", function (req, res) {
  res.send("<h1>Hello world</h1>");
});

// Example async function
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    client.connect().then((res) => {
      // A:
      const database = client.db("sample_geospatial");
      const shipwrecks = database.collection("shipwrecks");
      
      // the callback function for when data is POSTED
      //ADD
      let handlePost = async function (request, response) {
              console.log(request.body);
        //2 insert
        await shipwrecks.insertOne(request.body);
        response.send("SUCCESS POST");
      };  
      /// use this VERB for getting posted data...
      app.use("/postForm", handlePost);


     });
  } catch (error) {
    // Handle errors that occurred within the try block
    console.error('An error occurred:', error);
  } finally {
    // Perform any necessary cleanup or actions, regardless of success or failure
  }
} 

