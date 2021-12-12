// http-Modul importieren --> "npm install @types/node"
import * as http from "http";
// @ts-ignore
namespace Server {
  const hostname: string = "127.0.0.1"; // = localhost
  const port: number = 3000;

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
        case "/convertDate":
          let dateString: string = url.searchParams.get("date");
          console.log(dateString);
          let date: Date = new Date(dateString.substring(1, 25));
          console.log(date);
          response.write(`Day: ${date.getDate()} | Month: ${date.getMonth() + 1} | Year: ${date.getFullYear()}`);
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
// Serverstart in Terminal mit "node ./mainFolder/a6/server/server.js"
