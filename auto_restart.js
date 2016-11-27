const onError = (err, blame, api, event) => {
    blame = blame.toLowerCase().trim();
    if (blame === 'facebook' || blame === 'kpm_facebook') {
        process.emitWarning('Facebook has crashed, restarting...');
        exports.platform.shutdown(StatusFlag.ShutdownShouldRestart);
    }
};

exports.load = (platform) => {
    platform.on('uncaughtError', onError);
};

exports.unload = () => {
    exports.platform.removeListener('uncaughtError', onError);
};
