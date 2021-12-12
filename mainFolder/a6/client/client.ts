namespace Client {
    
    console.log("Client aktiv.");

    const url: string = "http://127.0.0.1:3000";
    const path: string = "/convertDate";

    const sendButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendButton");
    const dateInput: HTMLInputElement = <HTMLInputElement>document.getElementById("dateIn");
    
    sendButton.addEventListener("click", function (evt: Event): void {
        evt.preventDefault();
        send();
    });

    async function send(): Promise<void> {
        document.getElementById("clientDate").innerText = dateInput.value;
        // Auslesen des DateInputs und umwandeln in string
        let dateString: string = JSON.stringify(new Date(dateInput.value));
        console.log(dateString);
        //In URL und Query umwandeln
        let query: URLSearchParams = new URLSearchParams(<string>dateString);
        let urlWithQuery: string = url + path + "?date=" + query;
        console.log(urlWithQuery);


        let response: Response = await fetch(urlWithQuery); // Senden und warten
        let responseText: string = await response.text(); // Antwort
        console.log(responseText);
        document.getElementById("resp-head").innerText = "Server-Antwort:";
        document.getElementById("resp").innerText = responseText;
    }
}