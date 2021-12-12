namespace Client {
    
    console.log("Client aktiv.");

    const url: string = "http://127.0.0.1:3000";
    const path: string = "/convertDate";

    const myForm: HTMLFormElement = <HTMLFormElement>document.getElementById("form");
    const sendButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("sendButton");
    const dateInput: HTMLInputElement = <HTMLInputElement>document.getElementById("dateIn");
    
    sendButton.addEventListener("click", function (evt: Event): void {
        evt.preventDefault();
        sendForm();
    });

    async function sendForm(): Promise<void> {

        let dateIn: Date = new Date(dateInput.value);
        let dateString: string = JSON.stringify(dateIn);
        console.log(dateString);
        
        //Senden
        let formData: FormData = new FormData(myForm);
        let test: string = JSON.stringify(myForm);
        console.log("Yooo " + test);
        //Formulardaten mit unserem Formular initialisieren.
        let query: URLSearchParams = new URLSearchParams(<string>dateString);
        let urlWithQuery: string = url + path + "?date=" + dateString;
        console.log(urlWithQuery);
        /* 
        Die QueryURL besteht aus der url selbst, 
        aus dem gewünschten Pfad, 
        einem Fragezeichen um zu kennzeichnen das jetzt Getparameter angehengt werden
        und der Get-Parametern (query.toString())
        */
        // let testresp: Response = await fetch();
        let response: Response = await fetch(urlWithQuery); // Senden und warten
        let responseText: string = await response.text(); // Antwort
        console.log(responseText);
        document.getElementById("resp").innerText = responseText;
    }
}