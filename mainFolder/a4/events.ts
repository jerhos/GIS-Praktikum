namespace a4 {
 
    const out: HTMLElement = <HTMLElement>document.querySelector("#out");
    const eventnameIn: HTMLInputElement = <HTMLInputElement>document.getElementById("eventnameIn");
    const interpretIn: HTMLInputElement = <HTMLInputElement>document.getElementById("interpretIn"); 
    const priceIn: HTMLInputElement = <HTMLInputElement>document.getElementById("priceIn"); 
    const dateIn: HTMLInputElement = <HTMLInputElement>document.getElementById("dateIn"); 
    const entryAdder: HTMLButtonElement = <HTMLButtonElement>document.querySelector("#entryAdder");
    entryAdder.addEventListener("click", addEntry, false);
    
    // Kontrolle
    console.log(eventnameIn);
    console.log(interpretIn);
    console.log(priceIn);
    console.log(dateIn);

    // Neuer Eintrag
    function addEntry(): void {
       
        let eventnameVal: string = eventnameIn.value;
        let interpretVal: string = interpretIn.value;
        let priceVal: number = Number(priceIn.value);
        let dateVal: Date = new Date(dateIn.value);

        let entry: HTMLDivElement = document.createElement("div");
        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";

        entry.textContent = eventnameVal + "; " + interpretVal + "; " + priceVal + "; " + dateVal; 

        out.appendChild(entry);

        entry.appendChild(deleteButton); //füge den Delete Button als Kindelement dem neu erstellten Element "newElement" hinzu

        // Eventlistener für den Deletebutton
        deleteButton.addEventListener("click", function(): void {
        deleteEvent(entry); //Übergeben wird als Parameter das Element, welches später gelöscht werden soll.
     }
     );

    }

    // Eventlistener für die Delete-Buttons
    function deleteEvent(parentElement: HTMLDivElement): void {
        console.log("deleteEvent wurde aufgerufen!"); // Konsolenausgabe zum Testen des Funktionsaufrufes
        out.removeChild(parentElement); //Lösche das als Parameter übergebene Element aus dem Elter-Element "display"
    }
}