// http-Modul importieren --> "npm install @types/node"
import * as http from "http";
// @ts-ignore
namespace Server {
  const hostname: string = "127.0.0.1"; // = localhost
  const port: number = 2222;

  // Server intitialisieren
  const server: http.Server = http.createServer(
    (request: http.IncomingMessage, response: http.ServerResponse) => {
      
      response.statusCode = 200; // = ok

      response.setHeader("Content-Type", "text/plain"); // Rückgabetyp
      response.setHeader("Access-Control-Allow-Origin", "*"); // Erlaubt alle Rückgabe-Orte

      //Routing der verschiedenen Pfade
      let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

      switch (url.pathname) {
        // Root
        case "/":
          response.write("Server erreichbar.");
          break;
        // Vom Client angesprochener Pfad
        case "/concertEvents":
          console.log(">>Client is communicating...<<");
          console.log(`Request: ${request.method}`);
          switch (request.method) {
            // Packe Eintrag in Datenbank
            case "POST":
                console.log("I PRETEND TO SAVE SOMETHING IN THE DB");
              break;
            // Nehme Einträge aus Datenbank
            case "GET":
                let dbResponse = "ʕ·͡ᴥ·ʔ";    
                console.log("I PRETEND TO GET SOMETHING FROM THE DB");
                response.write(dbResponse);
                console.log(`Sent to client: ${dbResponse}`);
              break;
            default:
                console.log("Request error.")
              break;
          }
          break;
        // = Pfad nicht gefunden
        default:
          response.statusCode = 404;
      }
      response.end(); // Antwort
    }
  );
  // Server soll über folgenden Host und Port lauschen:
  server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
  });
}
// Serverstart in Terminal mit "node ./mainFolder/a8/server/server.js"
