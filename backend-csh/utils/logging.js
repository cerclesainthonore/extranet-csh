function log(message) {
    console.log(`${new Date().toLocaleString()} - [INFO] - ${message}`);
}

function error(message) {
    console.log(`${new Date().toLocaleString()} - [ERROR] - ${message}`);
}

module.exports = {log, error};