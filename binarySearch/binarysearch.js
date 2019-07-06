window.onload = async function () {
    let jsonData, nextName;
    await fetch("mock-data.json")
        .then(response => response.json())
        .then(json => {
            jsonData = json;
        });
    nextName = findRandomName(jsonData);
    document.getElementById("binary-search").addEventListener("click", function () {
        getDataAndFindColorForPerson(jsonData, nextName);
        nextName = findRandomName(jsonData);
    });
};

function getDataAndFindColorForPerson(jsonData, nextName) {
    let result,
        hair1 = document.getElementById("hair1"),
        hair2 = document.getElementById("hair2"),
        namesAndHairColor = jsonData.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
    result = findHairColor(nextName, namesAndHairColor);
    hair1.style.fill = result.hairColor;
    hair2.style.fill = result.hairColor;
}

function findRandomName(jsonData) {
    return jsonData[Math.floor(Math.random() * jsonData.length)].name;
}

function findHairColor(name, array) {
    let numberOfSteps = 1,
        startTime = performance.now();
    while (array.length !== 1) {
        let boundaryName = array[Math.ceil((array.length / 2))].name;
        if (boundaryName < name) {
            if (boundaryName === name) {
                console.log(performance.now() - startTime + ' milliseconds');
                return {numberOfSteps: numberOfSteps, hairColor: array[Math.ceil((array.length / 2))].hairColor};
            } else {
                array = array.slice(Math.ceil((array.length / 2)));
                numberOfSteps++;
            }
        } else {
            if (boundaryName === name) {
                console.log(performance.now() - startTime + ' milliseconds');
                return {numberOfSteps: numberOfSteps, hairColor: array[Math.ceil((array.length / 2))].hairColor};
            } else {
                array = array.slice(0, Math.ceil((array.length / 2)));
                numberOfSteps++;
            }
        }
    }
}
