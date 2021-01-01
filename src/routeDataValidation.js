export function parseAndValidate(routesText) {

    let routesParsed;
    let feedback;

    try {
        routesParsed = JSON.parse(routesText);
    } catch (e) {
        feedback = ["Not valid JSON: " + e];
        routesParsed = null;
    }
    if (routesParsed) {
        feedback = checkDataShape(routesParsed);
    }
    return feedback.length > 0 ? [null, feedback] : [routesParsed, null];
}


function checkDataShape(json) {
    const feedback = [];
    function makeRequiredArrayElement(fieldName) {
        return [(json) => json.every(item => item.hasOwnProperty(fieldName)), "Each array element needs " + fieldName]
    }
    function makeCoordinateChecker(fieldName) {
        const rule = (json) => json.every(item => {
            const objMaybe = item[fieldName];
            return [objMaybe.x, objMaybe.y].every(val => typeof val === "number")
        });

        return [rule, fieldName + " needs numeric .x and .y properties"];
    }
    const rules = [
        [(json) => Array.isArray(json), "top level structure must be an array"],
        makeRequiredArrayElement("departure_coordinates"),
        makeRequiredArrayElement("arrival_coordinates"),
        makeRequiredArrayElement("flight_no"),
        makeRequiredArrayElement("departure_city"),
        makeRequiredArrayElement("arrival_city"),
        makeCoordinateChecker("departure_coordinates"),
        makeCoordinateChecker("arrival_coordinates"),
    ];
    for (let [rule, msg] of rules) {
        if (!rule(json)) {
            feedback.push(msg);
            break;
        }
    }
    return feedback;
}