const form = document.querySelector("#searchForm");
const resultContainer = document.querySelector(".resultContainer");

console.log(form);

console.log(resultContainer);

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    removeAllChildNodes(resultContainer);
    //console.log(queryResults.data);
    displayResults(await getQueryResults());
    form.elements.query.value = "";
})

const getQueryResults = async () => {
    console.log("Testing Results");
    const input = form.elements.query.value;
    console.log(input);
    const queryResults = await axios.get(`https://api.tvmaze.com/search/shows?q=${input}`)
    console.log(queryResults.data);
    return queryResults.data;
}

/**
 * <div class="resultItem">
                <div class="resultLeft">

                </div>
                <div class="resultRight">

                </div>
            </div> 
 */
const displayResults = (shows) => {
    console.log(shows);
    for (let result of shows) {
        var myLazyLoad = new LazyLoad({
            container: document.createElement('div')
        });
        console.log(myLazyLoad);

        //const container = document.createElement('div');
        const containerLeft = document.createElement('div');
        const containerRight = document.createElement('div');

        myLazyLoad._settings.container.classList.add("resultItem");
        containerLeft.classList.add("resultLeft");
        containerRight.classList.add("resultRight");

        const title = document.createElement('h2');
        //const summary = document.createElement('div');
        //summary.classList.add("resultSummary");

        title.textContent = result.show.name;
        containerRight.innerHTML = result.show.summary;

        const img = document.createElement('IMG');
        if (result.show.image) {
            img.src = result.show.image.medium;
        } else {
            img.src = "noImage.png";
        }

        containerLeft.appendChild(title);
        containerLeft.appendChild(img);
        //containerRight.appendChild(summary);

        myLazyLoad._settings.container.appendChild(containerLeft);
        myLazyLoad._settings.container.appendChild(containerRight);
        resultContainer.appendChild(myLazyLoad._settings.container);
    }
}

const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}