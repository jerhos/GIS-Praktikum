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
    ["Bee Gees", 25.2],
];
// -- HIER BITTE IHRE LÖSUNG ZUR AUFGABE 2 EINTRAGEN
// Lösung a) ...
// Lösung b) ...
// Lösung c) ...
// Lösung d) ...
// Lösung e) ...
// Lösung f) ...
// Lösung g) ...
// Lösung h) ...
//# sourceMappingURL=script_vorlage1.js.map