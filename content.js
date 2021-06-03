const {host} = window.location;

switch (host) {
    case 'www.dofuspourlesnoobs.com':
        dofuspourlesnoobs();
        break;
    case 'dofus-map.com':
        dofusmap();
        break;
}

document.addEventListener('click', (event) => {
    const position = event.target.closest('.position');
    if (position !== null) {
        const str = position.dataset.travel;
        navigator.clipboard.writeText(str);
    }
})

function dofuspourlesnoobs() {
    const paragraphs = [...document.querySelectorAll('.paragraph')]
        .filter(div => {
            return div.textContent.match(/\[.*]/gm) !== null;
        })
    ;

    paragraphs.forEach(paragraph => {
        const regex = /(\[([^\[]*)])/g;
        const str = paragraph.innerHTML;
        const subst = `
            <span 
                class="position"
                data-travel="/travel $2"
                title="Copier la commande d'autopilotage"
                style="font-size: 1.1em; color: hotpink; font-weight: bold; background-color: aliceblue; border-radius: 10px; padding: 5px; cursor: pointer"
            >$1</span>`;
        paragraph.innerHTML = str.replace(regex, subst);
    });
}

function dofusmap() {
    const targetNode = document.getElementById('secondLine');
    const observer = new MutationObserver((records) => {
        records.forEach((record) => {
            let texts = [];

            record.addedNodes.forEach((node) => {
                texts.push(node.textContent.trim())
            })

            texts = texts.map((text) => {
                return Number.parseInt(text.trim())
            });
            const coordinates = texts.filter((item) => {
                return !Number.isNaN(item);
            });

            if (coordinates.length === 2) {
                // TODO : replace all this with a stylesheet
                targetNode.dataset.travel = `/travel ${coordinates[0]},${coordinates[1]}`
                targetNode.classList.add('position')
                targetNode.style.color = 'hotpink';
                targetNode.style.backgroundColor = '#171717';
                targetNode.style.borderRadius = '10px';
                targetNode.style.padding = '5px';
                targetNode.style.margin = '5px';
                targetNode.style.cursor = 'pointer';
                targetNode.style.display = 'inline-block';
                targetNode.title = 'Copier la commande d\'autopilotage'
            }
        })
    });

    observer.observe(targetNode, {
        subtree: true,
        childList: true,
    });
}
