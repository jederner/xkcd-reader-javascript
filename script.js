const comics = [];
let currentComicIndex = 0;

// Fetch comics data from the JSON endpoint
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        comics.push(...data.comics);
        displayComic(currentComicIndex);
        updateButtons();
    })
    .catch(error => console.error('Error fetching comics:', error));

// Display the current comic
function displayComic(index) {
    const comic = comics[index];
    const comicImg = document.getElementById('comic-img');
    const comicTitle = document.getElementById('comic-title');

    comicImg.style.opacity = 0;
    setTimeout(() => {
        comicImg.src = comic.img;
        comicImg.alt = comic.alt;
        comicTitle.textContent = comic.title;
        comicImg.style.opacity = 1;
    }, 300);
}

// Update the state of the buttons
function updateButtons() {
    document.getElementById('prev-btn').disabled = currentComicIndex === 0;
    document.getElementById('next-btn').disabled = currentComicIndex === comics.length - 1;
}

// Event listeners for buttons
document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentComicIndex > 0) {
        currentComicIndex--;
        displayComic(currentComicIndex);
        updateButtons();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentComicIndex < comics.length - 1) {
        currentComicIndex++;
        displayComic(currentComicIndex);
        updateButtons();
    }
});

document.getElementById('random-btn').addEventListener('click', () => {
    currentComicIndex = Math.floor(Math.random() * comics.length);
    displayComic(currentComicIndex);
    updateButtons();
});
