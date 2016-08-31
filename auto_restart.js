let timeout;
const defaultRestartTime = 120000;

exports.load = function() {
    let restartTime = defaultRestartTime,
        configRestartTime = exports.config['restartTime'];

    if (configRestartTime) {
        restartTime =  configRestartTime;
    }

    timeout = setTimeout(() => {
        exports.platform.shutdown(exports.platform.StatusFlags.ShutdownShouldRestart);
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
