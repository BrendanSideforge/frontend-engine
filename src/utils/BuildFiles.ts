
import fs from "fs-extra";
import { _CONFIG_ } from "..";

/**
 * Create a new CSS file, name and byte size, with the modified css content
 * @param filename string
 * @param content string
 */

export function buildCSSFile(filename: string, content: string) {

    fs.writeFileSync (
        `${_CONFIG_.builder.build_dir}/` + `${filename}.css`,
        content
    );

}

/**
 * Create a new HTML file, name and byte size, with the modified html content
 * @param filename string
 * @param content string
 */

export function buildHTMLFile(filename: string, content: string) {

    fs.writeFileSync (
        `${_CONFIG_.builder.build_dir}/` + `${filename}.html`,
        content
    );

}
