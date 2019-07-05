window.onload = function () {
    let nextName;
    document.getElementById("binary-search").addEventListener("click", getDataAndFindColorForPerson);
};

function getDataAndFindColorForPerson(nextName) {
    let namesAndHairColor = [],
        hair1 = document.getElementById("hair1"),
        hair2 = document.getElementById("hair2");
    fetch("mock-data.json")
        .then(response => response.json())
        .then(json => {
            namesAndHairColor = json.sort((a, b) => (a.name > b.name) ? 1 : (b.name > a.name) ? -1 : 0);
            let result = findHairColor(findRandomName(namesAndHairColor), namesAndHairColor);
            hair1.style.fill = result.hairColor;
            hair2.style.fill = result.hairColor;
        });
}

function findRandomName(array) {
    return array[Math.floor(Math.random() * array.length)].name;
}

function findHairColor(name, array) {
    let numberOfSteps = 1,
        startTime = performance.now();
    while (array.length !== 1) {
        let bounadaryName = array[Math.ceil((array.length / 2))].name;
        if (bounadaryName < name) {
            if (bounadaryName === name) {
                console.log(performance.now() - startTime + ' milliseconds');
                return {numberOfSteps: numberOfSteps, hairColor: array[Math.ceil((array.length / 2))].hairColor};
            } else {
                array = array.slice(Math.ceil((array.length / 2)));
                numberOfSteps++;
            }
        } else {
            if (bounadaryName === name) {
                console.log(performance.now() - startTime + ' milliseconds');
                return {numberOfSteps: numberOfSteps, hairColor: array[Math.ceil((array.length / 2))].hairColor};
            } else {
                array = array.slice(0, Math.ceil((array.length / 2)));
                numberOfSteps++;
            }
        }
    }
}

