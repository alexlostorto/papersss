console.clear();
credits();

/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 SET-UP
    1.1 FADERS
    1.2 DROPDOWNS
2.0 PAPERSSS
    2.1 DOM ELEMENTS
    2.2 VARIABLES
    2.3 FUNCTIONS
    2.4 EVENT LISTENERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 SET-UP
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 FADERS
    |
    ------------------------------------------------------------*/

const headerText = document.querySelector('.header-text');
const headerDescription = document.querySelector('.header-description');
const headerArrow = document.querySelector('.arrow');

fadeIn(headerText, 500);
fadeIn(headerDescription, 800);

if (window.innerWidth < 1000) {
    fadeIn(headerArrow, 1000);
}

    /*------------------------------------------------------------
    |
    | 1.2 DROPDOWNS
    |
    ------------------------------------------------------------*/

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
    const anchors = dropdown.querySelectorAll('a');
    anchors.forEach((anchor) => {
        anchor.addEventListener('click', updateDropdown);
    })
})

dropdowns.forEach((dropdown) => {
    const input = dropdown.querySelector('input')

    input.addEventListener('focus', () => {
        input.nextElementSibling.classList.add('show');
    })

    input.addEventListener('blur', async () => {
        await sleep(200);
        input.nextElementSibling.classList.remove('show');
    })
})

function updateDropdown() {
    let dropdownInput = this.parentElement.previousElementSibling;
    dropdownInput.value = this.textContent;
    this.parentElement.classList.remove('show');
}

function filterFunction() {
    let input = event.target;
    let content = input.nextElementSibling;
    let a = content.querySelectorAll("a");
    let filter = input.value.toUpperCase();
    for (i = 0; i < a.length; i++) {
        txtValue = a[i].textContent || a[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            a[i].style.display = "";
        } else {
            a[i].style.display = "none";
        }
    }
}

/*--------------------------------------------------------------
2.0 PAPERSSS
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const searchButton = document.querySelector('#search-button');
const typeButton = document.querySelector('.type.switch input');
const tierButton = document.querySelector('.tier.switch input');

    /*------------------------------------------------------------
    |
    | 2.2 VARIABLES
    |
    ------------------------------------------------------------*/

const script = `s=document.createElement('script');s.src='https://cdn.jsdelivr.net/gh/alexlostorto/magic-notes@v3.0.0/console/inject.js';document.head.appendChild(s);`;
const HTML = "<body style='height: 100%; width: 100%; overflow: hidden; margin:0px; background-color: rgb(82, 86, 89);'><embed name='ABB25BBED00233C3197B40436C445BE3' style='position:absolute; left: 0; top: 0;'width='100%' height='100%' src='about:blank' type='application/pdf' internalid='ABB25BBED00233C3197B40436C445BE3'></body>";
let FILE = {
    'year': '2019',
    'month': 'november',
    'paper': '3',
    'tier': 'H',
    'type': 'W-MS'
}

    /*------------------------------------------------------------
    |
    | 2.3 FUNCTIONS
    |
    ------------------------------------------------------------*/

function getFileData() {
    FILE.year = document.querySelector('#year').value;
    FILE.month = document.querySelector('#month').value.toLowerCase();
    FILE.paper = document.querySelector('#paper').value;

    if (typeButton.checked) {
          FILE.type = 'W-MS';
    } else {
          FILE.type = 'QP';
    }
    
    if (tierButton.checked) {
          FILE.tier = 'F';
    } else {
          FILE.tier = 'H';
    }
}

function getSource() {
    let URL = `https://filestore.aqa.org.uk/sample-papers-and-mark-schemes/${FILE.year}/${FILE.month}/AQA-8300${FILE.paper}${FILE.tier.toUpperCase()}-${FILE.type}-${FILE.month.substring(0, 3).toUpperCase()}${FILE.year.substring(2, 4)}.PDF`;
    return URL;
}

function loadPDF() {
    getFileData();
    let url = getSource();
    document.querySelector('body').innerHTML = HTML;
    document.querySelector('embed').src =url;
}

    /*------------------------------------------------------------
    |
    | 2.4 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

searchButton.addEventListener('click', loadPDF);

typeButton.addEventListener('change', () => {
    if (typeButton.checked) {
        document.querySelector('.switch .mark-scheme').classList.add('active');
        document.querySelector('.switch .question-paper').classList.remove('active');
    } else {
        document.querySelector('.switch .question-paper').classList.add('active');
        document.querySelector('.switch .mark-scheme').classList.remove('active');
    }
})

tierButton.addEventListener('change', () => {
    if (tierButton.checked) {
        document.querySelector('.switch .foundation').classList.add('active');
        document.querySelector('.switch .higher').classList.remove('active');
    } else {
        document.querySelector('.switch .higher').classList.add('active');
        document.querySelector('.switch .foundation').classList.remove('active');
    }
})