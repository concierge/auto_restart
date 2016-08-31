let timeout;
const defaultRestartTime = 86400000;

exports.load = function() {
    let restartTime = defaultRestartTime,
        configRestartTime = exports.config['restartTime'];

    if (configRestartTime) {
        restartTime =  configRestartTime;
    }

    timeout = setTimeout(() => {
        exports.platform.shutdown(StatusFlag.ShutdownShouldRestart);
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
