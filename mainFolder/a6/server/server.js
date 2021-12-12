"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// http-Modul importieren --> "npm install @types/node"
const http = require("http");
// @ts-ignore
var Server;
(function (Server) {
    const hostname = "127.0.0.1"; // = localhost
    const port = 3000;
    // Server intitialisieren
    const server = http.createServer((request, response) => {
        response.statusCode = 200; // = ok
        response.setHeader("Content-Type", "text/plain"); // Rückgabetyp
        response.setHeader("Access-Control-Allow-Origin", "*"); // Erlaubt alle Rückgabe-Orte
        //Routing der verschiedenen Pfade
        let url = new URL(request.url || "", `http://${request.headers.host}`);
        switch (url.pathname) {
            // Root
            case "/":
                response.write("Server erreichbar.");
                break;
            // Vom Client angesprochener Pfad
            case "/convertDate":
                let dateString = url.searchParams.get("date");
                console.log(dateString);
                let date = new Date(JSON.parse(dateString));
                console.log(date);
                response.write(`Day: ${date.getDate()} | Month: ${date.getMonth() + 1} | Year: ${date.getFullYear()}`); //Definieren der Rückgabe mit der name-Variable
                break;
            // = Pfad nicht gefunden
            default:
                response.statusCode = 404;
        }
        response.end(); // Antwort
    });
    // Server soll über folgenden Host und Port lauschen:
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
})(Server || (Server = {}));
// Serverstart in Terminal mit "node ./mainFolder/a6/server/server.js"
//# sourceMappingURL=server.js.map