let timeout;
const defaultRestartTime = 120000;

exports.load = function() {
    let restarTime = defaultRestartTime,
        configRestartTime = exports.config['restartTime'];

    if (configRestartTime) {
        restartTime =  configRestartTime;
    }

    timeout = setTimeout(() => {
        exports.platform.shutdown(StatusFlags.ShutdownShouldRestart);
    }, restartTime);
};

exports.unload = function() {
    clearTimeout(timeout);
};

exports.run = function(api, event) {
};

exports.match = function(event, commandPrefix) {
    return false;
}
