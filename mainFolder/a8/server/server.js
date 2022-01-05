"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// http-Modul importieren --> "npm install @types/node"
const http = require("http");
const mongo = require("mongodb");
// @ts-ignore
var Server;
(function (Server) {
    const hostname = "127.0.0.1"; // = localhost
    const port = 2222;
    const mongoUrl = "mongodb://localhost:27017";
    const dbCollection = "eventNode";
    const db = "Events";
    let mongoClient = new mongo.MongoClient(mongoUrl);
    // Server intitialisieren
    const server = http.createServer(async (request, response) => {
        response.statusCode = 200; // = ok
        response.setHeader("Content-Type", "text/plain"); // Rückgabetyp
        response.setHeader("Access-Control-Allow-Origin", "*"); // Erlaubt alle Rückgabe-Orte
        //Routing der verschiedenen Pfade
        let url = new URL(request.url || "", `http://${request.headers.host}`);
        switch (url.pathname) {
            // Root
            case "/":
                response.write("Server erreichbar.");
                try {
                    response.write("Einträge in der Datenbank:");
                    response.setHeader("Content-Type", "application/json");
                    response.end(await getDB());
                }
                catch (error) {
                    response.write("Konnte keinen Eintrag vorfinden.");
                }
                mongoClient.db(db);
                break;
            // Vom Client angesprochener Pfad
            case "/concertEvents":
                console.log(">>Client is communicating...<<");
                console.log(`Request: ${request.method}`);
                switch (request.method) {
                    // Packe Eintrag in Datenbank
                    case "POST": // POST
                        console.log("Saving in database...");
                        let input;
                        request.on("data", (data) => {
                            input += data;
                        });
                        try {
                            request.on("end", async () => {
                                input = input.replace("undefined", "");
                                console.log("Input: " + input);
                                await mongoClient.connect();
                                await mongoClient.db(db).collection(dbCollection).insertOne(JSON.parse(input));
                                console.log("Saved in database.");
                            });
                        }
                        catch (error) {
                            console.error(error);
                        }
                        finally {
                            mongoClient.close();
                        }
                        break;
                    // Nehme Einträge aus Datenbank
                    case "GET": // GET
                        try {
                            await mongoClient.connect();
                            let dbContent = await getDB();
                            response.setHeader("Content-Type", "application/json");
                            response.write(dbContent);
                            console.log(`Sent to client: ${dbContent}`);
                        }
                        catch (error) {
                            console.error(error);
                        }
                        finally {
                            mongoClient.close();
                        }
                        break;
                    default:
                        console.log("Request error.");
                        break;
                }
                break;
            // Eintrag löschen
            case "/deleteEntry":
                console.log(">>Client is communicating...<<");
                console.log(`Request: DELETE`);
                let id = url.searchParams.get("delete");
                console.log();
                console.log(`Deleting entry with id ${id}`);
                try {
                    await mongoClient.connect();
                    await mongoClient.db(db).collection(dbCollection).deleteOne({ _id: new mongo.ObjectId() });
                    console.log("Successfully deleted.");
                }
                catch (error) {
                    console.error(error);
                }
                finally {
                    mongoClient.close();
                }
                break;
            // = Pfad nicht gefunden
            default:
                response.statusCode = 404;
        }
        response.end(); // Antwort
    });
    async function getDB() {
        let result = await mongoClient
            .db(db)
            .collection(dbCollection)
            .find()
            .toArray();
        console.log(result);
        return JSON.stringify(result);
    }
    // Server soll über folgenden Host und Port lauschen:
    server.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}`);
    });
})(Server || (Server = {}));
// Serverstart in Terminal mit "node ./mainFolder/a8/server/server.js"
//# sourceMappingURL=server.js.map