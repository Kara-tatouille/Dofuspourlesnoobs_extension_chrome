const paragraphs = [...document.querySelectorAll('.paragraph')]
    .filter(div => {
        return div.textContent.match(/\[.*]/gm) !== null;
    })
;

paragraphs.forEach(paragraph => {
    const regex = /(\[[^\[]*])/g;
    const str = paragraph.innerHTML;
    const subst = `<span class="position" style="font-size: 1.1em; color: hotpink; font-weight: bold; background-color: aliceblue; border-radius: 10px; padding: 5px; cursor: pointer">$1</span>`;
    paragraph.innerHTML = str.replace(regex, subst)
});

document.querySelectorAll('.position').forEach(position => {
    position.addEventListener('click', event => {
        const str = '/travel ' + event.target.textContent.replace(/[\[\]]/g, '')
        navigator.clipboard.writeText(str);
    })
})
