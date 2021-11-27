"use strict";
var Aufgabe4;
(function (Aufgabe4) {
    class ToDoElement {
        interpret;
        price;
        date;
        constructor(interpret, price, date) {
            this.interpret = interpret;
            this.price = price;
            this.date = date;
        }
    }
    class ToDoElements {
        elements = [];
        addElement(element, index) {
            console.log(this.elements);
            this.elements[index] = element;
        }
        readElement(index) {
            return this.elements[index];
        }
    }
    //create html element --> creat a buldung stone (gif it an id // or save it on a array/list?) --Using timeAndDate for data-ToDoID
    //then apand it 
    //by clicking a button removing the appendet element --> by getting the : article.dataset.NAME --> data-NAME addEventListener use bubling
    //dont user innerhtml!!!
    let addButton = document.getElementById("Button-Add");
    let elementID = 0;
    addButton.addEventListener("click", addElement);
    let toDoElements = new ToDoElements();
    function removeElement(event) {
        let eventID = event.target.dataset.elementid;
        let dataEvent = '[data-todu-elementid]';
        let toDoElement = document.querySelectorAll(dataEvent);
        //iterates thorug all elements end check to what needs to be removed
        toDoElement.forEach(element => {
            if (element.getAttribute("data-todu-elementid") == eventID) {
                console.log(element + " with Tag: data-todu-elementid= " + eventID + " will be removed");
                element.remove();
                toDoElements.readElement(parseInt(eventID)) == null;
            }
        });
    }
    function addElement() {
        try {
            readForm();
        }
        catch (error) {
            alert(error);
            return;
        }
        createElement();
        fillFrom();
        elementID++;
    }
    function fillFrom() {
        //get elemnt byID in this TAG
        let toDoElement = document.getElementById(elementID.toString());
        console.log(toDoElement);
        let interpret_out = toDoElement.getElementsByClassName("interpret_out");
        let price_out = toDoElement.getElementsByClassName("price_out");
        let datetime_out = toDoElement.getElementsByClassName("datetime_out");
        console.log(interpret_out.item(0));
        //Not a god way -> is ther a nother way?
        interpret_out.item(0).textContent = toDoElements.readElement(elementID).interpret;
        price_out.item(0).textContent = (toDoElements.readElement(elementID).price).toString();
        datetime_out.item(0).textContent = (toDoElements.readElement(elementID).date).toTimeString();
    }
    function readForm() {
        let interpret = null;
        let price = null;
        let date = null;
        try {
            interpret = document.getElementById("interpret_input").value;
            if (interpret === "") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Interpret is empty!");
        }
        try {
            price = parseInt(document.getElementById("price_input").value);
            if (price.toString() === "NaN") {
                throw new Error;
            }
        }
        catch (error) {
            throw new Error("Price is empty!");
        }
        try {
            date = new Date(document.getElementById("datetime_local_input").value);
            if (date.toString() === "Invalid Date") {
                date = new Date();
            }
        }
        catch (error) {
            throw new Error("Date is empty!");
        }
        console.log(interpret);
        console.log(price);
        console.log(date);
        let toDoElement = new ToDoElement(interpret, price, date);
        toDoElements.addElement(toDoElement, elementID);
        console.log("Add to list " + toDoElements.readElement(elementID));
    }
    function createElement() {
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");
        let toDoElement = document.createElement("tr");
        let interpret_out = document.createElement("td");
        let price_out = document.createElement("td");
        let datetime_out = document.createElement("td");
        let delet = document.createElement("td");
        let deletButton = document.createElement("button");
        toDoElement.classList.add("toDoElement");
        interpret_out.classList.add("interpret_out");
        price_out.classList.add("price_out");
        datetime_out.classList.add("datetime_out");
        delet.classList.add("delet");
        deletButton.classList.add("deletButton");
        deletButton.innerText = "X";
        deletButton.setAttribute("type", "button");
        deletButton.addEventListener("click", removeElement, false);
        toDoElement.appendChild(interpret_out);
        toDoElement.appendChild(price_out);
        toDoElement.appendChild(datetime_out);
        delet.appendChild(deletButton);
        toDoElement.appendChild(delet);
        tbody.appendChild(toDoElement);
        table.appendChild(tbody);
        let toDoOUT = document.getElementById("toDoOUT").appendChild(table);
        console.log("createt ToDo elemtn wit the ID: " + elementID);
        toDoOUT.setAttribute("data-todu-elementid", elementID + "");
        deletButton.setAttribute("data-elementid", elementID + "");
        toDoOUT.id = elementID.toString();
    }
})(Aufgabe4 || (Aufgabe4 = {}));
//# sourceMappingURL=events.js.map