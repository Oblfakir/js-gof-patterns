const logMessage = function(msg) {
    const message = document.createElement('p');
    message.textContent = msg;
    return message;
}

export const logger = (() => {
    const loggerOutput = document.getElementById('logger-output');

    return {
        add(msg) {
            loggerOutput.appendChild(logMessage(msg));
        },
        clear() {
            loggerOutput.innerHTML = '';
        }
    };
})();