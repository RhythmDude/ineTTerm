function loadfs() {
    let fs = localStorage.getItem("filesystem");

    if (fs === null) { // initialize tree
        fs = {
            "rt": {
                type: "dir",
                group: "sys",
                children: {
                    "apps": {
                        type: "dir",
                        group: "sys",
                        children: {
                            "usrApps": {
                                type: "dir",
                                group: "sys",
                                children: {
                                }
                            },
                            "sysApps": {
                                type: "dir",
                                group: "sys",
                                children: {

                                }
                            }
                        }
                    },
                    "sys": {
                        type: "dir",
                        group: "sys",
                        children: {

                        }
                    }
                }
            }
        }

        // initialize files
        fs["rt"].children["sys"].children["sysenv.json"] = {
            type: "file",
            group: "sys",
            content: `{
                "version":"pre-alpha 1"
            }`
        }

        fs["rt"].children["apps"].children["usrApps"].children["test.js"] = {
            type: "file",
            group: "usr",
            content: `print("This is printing.");`
        }

        fs["rt"].children["apps"].children["applist.json"] = {
            type: "file",
            group: "sys",
            content: `{
                "Test": {
                    "path": "rt/apps/usrApps/test.js"
                }
            }`
        }

        localStorage.setItem("filesystem", JSON.stringify(fs));
        return fs;
    }

    return JSON.parse(fs);
}

function savefs(fs) {
    localStorage.setItem("filesystem", JSON.stringify(fs));
}

function loadfile(path) {
    const fs = loadfs();
    let node = fs;
    const dirparts = path.split("/");

    for (let i = 0; i < dirparts.length; i++) {
        const part = dirparts[i];
        if (!node) {
            return null;
        }

        if (i === dirparts.length - 1) {
            node = node[part];
        } else {
            node = node[part] && node[part].children;
        }
    }

    return node;
}