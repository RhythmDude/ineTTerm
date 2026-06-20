(async function(){
    try {
        await loadfs();
        const sysenvNode = await loadfile("rt/sys/sysenv.json");
        let sysenv = {};
        try {
            if (sysenvNode && sysenvNode.content) {
                sysenv = JSON.parse(sysenvNode.content);
            }
        } catch (e) {
            console.warn('Failed to parse sysenv.json', e);
        }
        window.sysenv = sysenv;

        if (sysenv["debug_rfsob"]) {
            localStorage.removeItem('filesystem');
            await loadfs();
        }

        await run("byName", "TTshell");
    } catch (error) {
        console.error(error);
        print("Boot error: " + error.message);
    }
})();
