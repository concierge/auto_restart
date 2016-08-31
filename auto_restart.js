let timeout;

exports.load = function() {
    timeout = setTimeout(() => {
        exports.platform.shutdown(StatusFlags.ShutdownShouldRestart);
    },120000);
};

exports.unload = function() {
    clearTimeout(timeout);
};
