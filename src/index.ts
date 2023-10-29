
import fs from "fs-extra";

import { ConfigLoader } from "./utils/ConfigLoader";
import { readCSSFiles, readHTMLFiles } from "./utils/ReadFiles";

export const _CONFIG_: object | any = ConfigLoader("main.yaml");

// readHTMLFiles();
readCSSFiles();