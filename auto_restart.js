const onError = (err, blame, api, event) => {
    blame = blame.toLowerCase().trim();
    if (blame === 'facebook' || blame === 'kpm_facebook') {
        console.error('Facebook has crashed, reloading...');
        const ml = exports.platform.modulesLoader;
        try {
            const mods = ml.getLoadedModules();
            const mod = mods.find(m => m.__descriptor.name.indexOf('facebook') >= 0);
            const descriptor = mod.__descriptor;
            ml.unloadModule(mod);
            const res = ml.loadModule(descriptor);
            ml.startIntegration(exports.platform.onMessage.bind(exports.platform), res.module);
        }
        catch (e) {
            console.critical(e);
            console.error('Failed to reload, restarting instead.');
            exports.platform.shutdown(StatusFlag.ShutdownShouldRestart);
        }
    }
};

exports.load = (platform) => {
    platform.on('uncaughtError', onError);
};

exports.unload = () => {
    exports.platform.removeListener('uncaughtError', onError);
};
