
import app from "./server"

import os from "os"
import cluster from 'cluster'




if (cluster.isPrimary) {
    const cpus = os.cpus()

    if (cpus.length > 10) {
        for (let index = 0; index < 10; index++) {
            cluster.fork()
        }
    }
    else {
        for (let index = 0; index < cpus.length; index++) {
            cluster.fork()
        }
    }
}

else {
}