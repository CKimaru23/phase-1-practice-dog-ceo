
document.addEventListener('DOMContentLoaded', function () {
    getImages();
    getBreed();
});

function getImages() {
    const imageUrl = "https://dog.ceo/api/breeds/image/random/4"
    fetch(imageUrl)
        .then(res=> res.json())
        .then(results => {
            results.message.forEach(image => insertImage(image))
        });
}

function insertImage(picUrl) {
    let imageContainer = document.querySelector('#dog-image-container');
    let imageEl = document.createElement('img');
    imageEl.classList.add('imgClass');
    imageEl.src = picUrl;
    imageContainer.appendChild(imageEl);
}

let breeds = [];
function getBreed() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
    fetch(breedUrl)
        .then(res => res.json())
        .then(results => {

            breeds = Object.keys(results.message);
            updatesBreedList(breeds);
            addsBreedSelectListener();
        });
}

function updatesBreedList(breeds) {
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addsBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

function selectBreedsStartingWith(letter) {
    updatesBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addsBreedSelectListener() {
    let dropdown = document.querySelector('#breed-dropdown');
    dropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value);
    });
}

function addsBreed(breed) {
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.appendChild(li);
    li.addEventListener('click', color);
}

function color(event) {
    event.target.style.color = '#66FF00';
}
