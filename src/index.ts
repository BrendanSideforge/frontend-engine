
const startTime = performance.now();

import fs from "fs-extra";

import { ConfigLoader } from "./utils/ConfigLoader";
import { write_to_logs } from "./utils/Logger";
import { readCSSFiles, readHTMLFiles } from "./utils/ReadFiles";

export let _CONFIG_: object | any ;
try { 
    _CONFIG_ = ConfigLoader("main.yaml");

    readHTMLFiles();
    readCSSFiles();
} catch(e) {

    write_to_logs(
        "errors",
        `Error: ${e}`,
        true
    );

}

const endTime = performance.now();
write_to_logs(
    "build",
    `Build has finished in ${endTime - startTime} ms`,
    true
);