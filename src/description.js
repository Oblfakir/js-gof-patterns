export default function showPatternDescription(patternName, textArr) {
    document.getElementById('description-header').textContent = `${patternName} pattern description:`;
    document.getElementById('description').textContent = '';

    textArr
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}
