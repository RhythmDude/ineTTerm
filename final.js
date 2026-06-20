(async function(){
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

    if (sysenv["debug_rfsob"]) {
        localStorage.removeItem('filesystem');
        await loadfs();
    }

    await run("byName", "TTshell");
})();