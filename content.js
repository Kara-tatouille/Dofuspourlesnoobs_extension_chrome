//Highlights extension icon
chrome.runtime.sendMessage({todo: "showPageAction"});

let paragraphs;

if (document.getElementsByTagName("li")){
    paragraphs = document.getElementsByTagName("li");
}
else {
    paragraphs = document.getElementsByClassName('paragraph');

}

let pos;

function checkPosExists(paragraph) {
    if (paragraph.outerHTML.split("[")[1]) {
        return true;
    }
}

function copyToClipboard(i) {
    let copyText = document.getElementById(`input${i}`);
    copyText.select();
    document.execCommand('copy')
}




for (let i=0;i<paragraphs.length;i++) {
     if (checkPosExists(paragraphs[i])) {
        pos = paragraphs[i].outerHTML.split("[")[1].split("]")[0];

        let position = document.createElement('div');
        position.innerHTML =
            `<input type='text' value='/travel ${pos}' id="input${i}" readonly>`;

        let button = document.createElement('div');
        button.innerHTML =
        "<div class=\"tooltip\">\n" +
            `<button id='copyButton${i}'>\n` +
            "Copy text" +
            "  </button>\n" +
            "</div>";

        paragraphs[i].parentNode.insertBefore(button,paragraphs[i].nextSibling);
        paragraphs[i].parentNode.insertBefore(position, button);

        document.getElementById(`copyButton${i}`).addEventListener('click', function () {
            copyToClipboard(i);
        })
     }
}

