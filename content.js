//Highlights extension icon
chrome.runtime.sendMessage({todo: "showPageAction"});


let paragraphs = document.getElementsByClassName('paragraph');
let pos;

function checkPosExists(paragraph) {
    if (paragraph.outerHTML.split("[")[1]) {
        return true;
    }
}


for (let i=0;i<paragraphs.length;i++) {
     if (checkPosExists(paragraphs[i])) {
        pos = paragraphs[i].outerHTML.split("[")[1].split("]")[0];

        let position = document.createElement('p');
        position.textContent = "/travel " + pos;
        paragraphs[i].parentNode.insertBefore(position, paragraphs[i].nextSibling);
     }
}

