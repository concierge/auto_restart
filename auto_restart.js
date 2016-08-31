let timeout;
const defaultRestartTime = 120000;

exports.load = function() {
    let restartIme = defaultRestartTime,
        configRestartTime = exports.config[restartTime];

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
