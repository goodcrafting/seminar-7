
function switchToTeacher() {
      // Find the link element by its ID
      var themeLink = document.getElementById('PageMode');
      var VeryFirstImage = document.getElementById('Title_Image');
      VeryFirstImage.setAttribute('src', 'huuplogo.png');
      // Check the current file name and swap it
      if (themeLink.getAttribute('href') === 'student.css') {
        themeLink.setAttribute('href', 'teacher.css');
};
    };
function switchToStudent() {
      // Find the link element by its ID
      var themeLink = document.getElementById('PageMode');
      var VeryFirstImage = document.getElementById('Title_Image');
      VeryFirstImage.setAttribute('src', 'GCR_Neon_Transp.png');
      // Check the current file name and swap it
      if (themeLink.getAttribute('href') === 'teacher.css') {
        themeLink.setAttribute('href', 'student.css');
      };
    };

    var alphabetC = [
        ["Й", "Ц", "У", "К", " Е", "Н", "Г", "Ш", "Щ", "З", "Х"],
        ["Ф", "І", "В", "А", " П", "Р", "О", "Л", "Д", "Ж", "Є"],
        [" ", "Я", "Ч", "С", "М", " И", "Т", "Ь", "Б", "Ю", " "],
    ];

    var crossInfo = [
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "Р", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "О", " "],  
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "З", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "С", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "Л", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "І", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", "Д", " "],  
        [" ", " ", " ", " ", " ", " ", "П", "Р", "О", "Т", "О", "К", "О", "Л", " ", "У", " "],
        [" ", " ", " ", " ", " ", " ", "Р", " ", " ", "П", " ", "А", " ", " ", " ", "В", " "],
        [" ", " ", " ", " ", " ", " ", "О", " ", " ", "Р", " ", "С", " ", " ", " ", "А", " "],
        [" ", " ", " ", "П", "Р", "А", "В", "О", "П", "О", "Р", "У", "Ш", "Е", "Н", "Н", "Я"],
        [" ", " ", " ", "О", " ", " ", "А", " ", " ", "С", " ", " ", " ", " ", " ", "Н", " "],  
        [" ", " ", " ", "С", " ", " ", "Д", " ", " ", "Т", " ", " ", " ", " ", " ", "Я", " "],
        [" ", " ", " ", "Т", " ", " ", "Ж", " ", "К", "У", "П", "А", "П", " ", " ", " ", " "],
        [" ", " ", " ", "А", " ", " ", "Е", " ", " ", "П", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", "Н", " ", " ", "Н", " ", "Д", "О", "Б", "А", " ", " ", " ", " ", " "],
        ["С", "П", "Р", "О", "Щ", "Е", "Н", "Е", " ", "К", " ", " ", " ", " ", " ", " ", " "],  
        [" ", " ", " ", "В", " ", " ", "Я", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        ["Ш", "Т", "Р", "А", "Ф", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],  
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
        [" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " "]
    ];


function createCrossword(){
    // Setting horizontal coordinates
    for (let row = 0; row < crossInfo.length; row++) {
        // Loop through each column inside that row
        for (let col = 0; col < crossInfo[row].length; col++) {
            createCrosswordSlot(row, col, crossInfo[row][col], crossInfo[row][col]);
        }
    }
    createAlphabet()
}

function createAlphabet(){
    // Setting horizontal coordinates
    for (let row = 0; row < alphabetC.length; row++) {
        // Loop through each column inside that row
        for (let col = 0; col < alphabetC[row].length; col++) {
            createAlphabetKey(row, col, alphabetC[row][col], alphabetC[row][col]);
        }
    }
}

function createCrosswordSlot(exes, ygriks, colors, slotInfo){

    const slot = document.createElement('div');
    slot.className = 'tile-slot';
    slot.style.gridRow = exes + 1;
    slot.style.gridColumn = ygriks + 1;

    slot.dataset.row = exes;
    slot.dataset.col = ygriks;
    slot.dataset.color = colors;

    // Allow non-empty tiles to be dragged
    slot.draggable = slotInfo !== 0;

    const img = document.createElement('img');
    if (colors == 1) {
        img.src = 'PurpTile.png';
    }else if (colors == 2){
        img.src = 'GreenTile.png';
    }else if (colors == 3){
        img.src = 'RedTile.png';
    }else if (colors == 0 || colors == " "){
        img.src = 'Empty.png';
    }else {img.src = 'PurpTile.png';}

    img.className = 'Purple-tile';

    const text = document.createElement('h2');
    text.innerText = slotInfo;
    text.className = 'crossword-text';

    slot.addEventListener('dragover', (event) => {
        event.preventDefault(); // Allow dropping
    });

    slot.addEventListener('drop', (event) => {
      event.preventDefault();

      const data = event.dataTransfer.getData('text/plain');
      if (!data) return;

      const tileInfo = JSON.parse(data);
      if (tileInfo.source !== "alphabet") return;

      const expected = crossInfo[exes][ygriks];
      const droppedLetter = tileInfo.letter.trim();

      // Always display the dropped letter
      text.innerText = droppedLetter;
      text.style.display = 'block';

      // Change the tile image depending on correctness
      if (droppedLetter === expected.trim()) {
        img.src = 'GreenTile.png';
        slot.dataset.correct = 'true';
        console.log("Correct tile!");
      } else {
        img.src = 'RedTile.png';
        slot.dataset.correct = 'false';
        console.log("Incorrect tile!");
      }
    });

    const container = document.getElementById('crossword');
    container.appendChild(slot);
    slot.appendChild(img);
    slot.appendChild(text);

}


function createAlphabetKey(exes, ygriks, colors, slotInfo){

    const AlphBet = document.createElement('div');
    AlphBet.className = 'tile-slot';
    AlphBet.style.gridRow = exes + 1;
    AlphBet.style.gridColumn = ygriks + 1;

    AlphBet.dataset.row = exes;
    AlphBet.dataset.col = ygriks;
    AlphBet.dataset.color = colors;

    // Allow non-empty tiles to be dragged
    AlphBet.draggable = slotInfo !== 0;

    const img2 = document.createElement('img');

    if (colors == " ") {
        img2.src = 'Empty.png';
    }else {img2.src = 'Yellorium.png';}

    img2.className = 'Purple-tile';

    const Lettertext = document.createElement('h2');
    Lettertext.innerText = slotInfo;
    Lettertext.className = 'keyboard-text';


    AlphBet.draggable = slotInfo.trim() !== "";

    AlphBet.addEventListener('dragstart', (event) => {
        const tileInfo = {
            letter: slotInfo.trim(),
            source: "alphabet"
        };

        event.dataTransfer.setData(
            'text/plain',
            JSON.stringify(tileInfo)
        );

        event.dataTransfer.effectAllowed = 'copy';
    });

    const KeyboardAAA = document.getElementById('keysforboard');
    KeyboardAAA.appendChild(AlphBet);
    AlphBet.appendChild(img2);
    AlphBet.appendChild(Lettertext);
}

function checkAnswers() {
    const texts = document.querySelectorAll('.crossword-text');

    texts.forEach((text) => {
        const row = Number(text.parentElement.dataset.row);
        const col = Number(text.parentElement.dataset.col);

        text.innerText = crossInfo[row][col];
        text.style.display = 'block';

        const img = text.parentElement.querySelector('img');

        if (crossInfo[row][col].trim() !== '') {
            img.src = 'GreenTile.png';
        }
    });
}
