"use strict";
// -- [Aufgabe 1]
/**
 * @var {number} age: Bitte anstatt der 24 dein Alter eintragen
 */
let age = 20;
/**
 * @var {string} firstName: Bitte anstatt 'Max' deinen Vornamen eintragen
 */
let firstName = `Jerry`;
function func1(age) {
    return 2021 - age;
}
let output = func2(firstName);
function func3(meal) {
    console.log(`Ich esse gerne ${meal || "Pizza"}.`);
    return func1(age) > 1995
        ? `Ich gehöre zur Generation Z`
        : `Ich gehöre zur Generation Y`;
}
console.log(output);
function func2(name) {
    console.log(`Ich heiße ${name}.`);
    return func3();
}
/* -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 1 EINTRAGEN
 *
 * 1. "Ich heiße Jerry."
 * 2. "Ich esse gerne Pizza."
 * 3. "Ich gehöre zu Generation Z"
 *
 * Grund:
 * Ausgabe von console.log(output) [Z. 26]
 * output ruft func2 auf --> "Ich heiße Jerry."
 * func2 ruft nun func3 auf -->  "Ich esse gerne Pizza."
 * func3 ruft jetzt func1 auf und gibt mittels des Ergebnisses die Generation aus --> "Ich gehöre zu Generation Z"
 */
// -- [Aufgabe 2]
let events = [
    ["Mark Knopfler", 10.1],
    ["Pink Floyd", 15.9],
    ["Metallica", 20.1],
    ["Michael Bublé", 11.1],
    ["Dire Straits", 12.2],
    ["Mariah Carey", 1.1],
    ["Cat Stevens", 12.99],
    ["Mark Forster", 2.1],
    ["Helene Fischer", 3.1],
    ["Bee Gees", 25.2] // STAYIN' ALIVE
];
// -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 2 EINTRAGEN
let stringOut = "";
// Lösung a) ...
let aLength = events.length;
console.log(`Arraylänge: ${aLength}`);
// Lösung b) ...
for (let i of events) {
    console.log(i);
}
// Lösung c) ...
function highestTP(Array) {
    let price = 0;
    for (let i = 0; i < Array.length; i++) {
        for (let j = 0; j < Array[i].length; j++) {
            if (parseFloat(Array[i][j]) > price) {
                price = parseFloat(Array[i][j]);
            }
        }
    }
    return price;
}
console.log(`Höchster Preis: ${highestTP(events)}`);
// Lösung d) ...
function searchFor(Array, artist) {
    let found = false;
    for (let i = 0; i < Array.length; i++) {
        if (Array[i][0].toString().toLowerCase() === artist.toLowerCase()) {
            found = true;
            break;
        }
    }
    return found;
}
// Test
stringOut = "Metallica";
console.log(stringOut += " " + String(searchFor(events, stringOut)));
stringOut = "metallica";
console.log(stringOut += " " + String(searchFor(events, stringOut)));
stringOut = "MetallICa";
console.log(stringOut += " " + String(searchFor(events, stringOut)));
stringOut = "Genesis";
console.log(stringOut += " " + String(searchFor(events, stringOut)));
// Lösung e) ...
function factorial(n) {
    let i = n;
    while (i > 1) {
        n *= i - 1;
        i--;
    }
    return n;
}
console.log(factorial(4));
console.log(factorial(5));
console.log(factorial(10));
// Lösung f) ...
stringOut = "";
let count = 0;
for (let i = 1; i <= 100; i++) {
    if (i % 3 === 0) {
        stringOut += String(i) + " ";
        count++;
    }
}
console.log(stringOut);
console.log(`Anzahl an Nummern, die restlos durch 3 teilbar sind: ${count}`);
// Lösung g) ...
class ConcertEvent {
    interpret = "";
    price = 0;
    constructor(i, p) {
        this.interpret = i;
        this.price = p;
    }
    show() {
        console.log(`Int: ${this.interpret} | Pr: ${this.price}`);
    }
}
// Lösung h) ...
let eventArray = new Array(events.length);
for (let i = 0; i < events.length; i++) {
    for (let j = 0; j < events[i].length; j++) {
        eventArray[i] = new ConcertEvent(events[i][j - 1], events[i][j]);
    }
}
for (let i in eventArray) {
    eventArray[i].show();
}
//# sourceMappingURL=script_vorlage1.js.map