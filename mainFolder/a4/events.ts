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
       
        let eventnameVal: string = null;
        let interpretVal: string = null;
        let priceVal: number = null;
        let dateVal: Date = null;
 
        // EventnameIn
        try {
            eventnameVal = (<HTMLInputElement>document.getElementById("eventnameIn")).value;
            if (eventnameVal === "") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Eventeingabe ist leer.");
        }
        // InterpretIn
        try {
            interpretVal = (<HTMLInputElement>document.getElementById("interpretIn")).value;
            if (interpretVal === "") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Interpreteneingabe ist leer.");
        }
        // PriceIn
        try {
            priceVal = parseInt((<HTMLInputElement>document.getElementById("priceIn")).value);
            if (priceVal.toString() === "NaN") {
                throw new Error;
            }
        } catch (error) {
            throw new Error("Die Preiseingabe ist leer.");
        }
        // DateIn
        try {
            dateVal = new Date((<HTMLInputElement>document.getElementById("dateIn")).value);
            if (dateVal.toString() === "Invalid Date") {
                throw new Error;
            }
        } catch (error) {
           throw new Error("Die Termineingabe ist leer oder ungültiges Datum.");
        }

        let entry: HTMLDivElement = document.createElement("div");
        let deleteButton: HTMLButtonElement = document.createElement("button");
        deleteButton.textContent = "ⓧ Löschen";

        entry.textContent = eventnameVal + "; " + interpretVal + "; " + priceVal + "; " + dateVal; 

        out.appendChild(entry);
        entry.appendChild(deleteButton);
        deleteButton.addEventListener("click", function(): void {deleteEntry(entry); });
    }

    // Eintrag löschen
    function deleteEntry(parentElement: HTMLDivElement): void {
        console.log("Eintrag gelöscht.");
        out.removeChild(parentElement);
    }
}