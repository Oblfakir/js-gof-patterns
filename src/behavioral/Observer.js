export function Observer(logger) {
    showDescription();
}

function showDescription() {
    document.getElementById('description').textContent = '';

    [``
    ,``
    ,``
    ,``]
        .map(x => {
            const p = document.createElement('p');
            p.textContent = x;
            return p;
        })
        .forEach(x => document.getElementById('description').appendChild(x));
}