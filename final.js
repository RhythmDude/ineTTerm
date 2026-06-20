loadfs();
const sysenv = loadfile("rt/sys/sysenv.json");

if (sysenv["debug_rfsob"]) {
    localStorage.removeItem('filesystem');
    loadfs();
}

run("byName", "TTshell")