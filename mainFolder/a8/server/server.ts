// http-Modul importieren --> "npm install @types/node"
import * as http from "http";
import * as mongo from "mongodb";
// @ts-ignore
namespace Server {
  
  const hostname: string = "127.0.0.1"; // = localhost
  const port: number = 2222;
  const mongoUrl: string = "mongodb://localhost:27017";
  const dbCollection: string = "eventNode";
  const db: string = "Events"
  let mongoClient: mongo.MongoClient = new mongo.MongoClient(mongoUrl);

  // Server intitialisieren
  const server: http.Server = http.createServer(
    async (request: http.IncomingMessage, response: http.ServerResponse) => {
      
      response.statusCode = 200; // = ok

      response.setHeader("Content-Type", "text/plain"); // Rückgabetyp
      response.setHeader("Access-Control-Allow-Origin", "*"); // Erlaubt alle Rückgabe-Orte

      //Routing der verschiedenen Pfade
      let url: URL = new URL(request.url || "", `http://${request.headers.host}`);

      switch (url.pathname) {
        // Root
        case "/":
          response.write("Server erreichbar.");
          try {
            response.write("Einträge in der Datenbank:")
            response.setHeader("Content-Type", "application/json");
            response.end(await getDB());
          } catch (error) {
            response.write("Konnte keinen Eintrag vorfinden.")
          }
          
          mongoClient.db(db);
          break;
        // Vom Client angesprochener Pfad
        case "/concertEvents":
          console.log(">>Client is communicating...<<");
          console.log(`Request: ${request.method}`);
          switch (request.method) {
            // Packe Eintrag in Datenbank
            case "POST":                                                                             // POST
              console.log("Saving in database...");   
              let input: string;
              request.on("data", (data) => {
              input += data;
              })
              try {
                request.on("end", async () => {
                  input = input.replace("undefined", "");
                  console.log("Input: " + input);
                  await mongoClient.connect();
                  await mongoClient.db(db).collection(dbCollection).insertOne(JSON.parse(input));
                  console.log("Saved in database.");
                });
              } catch (error) {
                console.error(error);
              } finally {
                mongoClient.close();
              }
              break;
            // Nehme Einträge aus Datenbank
            case "GET":                                                                             // GET
              try {
                await mongoClient.connect();
                let dbContent = await getDB();
                response.setHeader("Content-Type", "application/json");
                response.write(dbContent);
                console.log(`Sent to client: ${dbContent}`);
            } catch (error) {
                console.error(error);
            } finally {
                mongoClient.close();
            }
              break;
            default:
                console.log("Request error.")
              break;
          }
          break;
        // Eintrag löschen
        case "/deleteEntry":
          console.log(">>Client is communicating...<<");
          console.log(`Request: DELETE`);
          let id: string = url.searchParams.get("delete");
          
          console.log();
          console.log(`Deleting entry with id ${id}`);
          try {
            await mongoClient.connect();
            await mongoClient.db(db).collection(dbCollection).deleteOne({_id: new mongo.ObjectId()});
            console.log("Successfully deleted.");
          } catch (error) {
            console.error(error);
          } finally {
            mongoClient.close();
          }
          break;
        // = Pfad nicht gefunden
        default:
          response.statusCode = 404;
      }
      response.end(); // Antwort
    }
  );

  async function getDB(): Promise<string> {
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
}
// Serverstart in Terminal mit "node ./mainFolder/a8/server/server.js"
