
import fs from "fs-extra";
import { _CONFIG_ } from "..";
import { write_to_logs } from "./Logger";

/**
 * Create a new CSS file, name and byte size, with the modified css content
 * @param filename string
 * @param content string
 */

export function buildCSSFile(filename: string, content: string) {

    const encoded: any = new TextEncoder().encode(content);
    const filename_mod: string = `${_CONFIG_.builder.build_dir}/` + `${filename}.css`;

    fs.writeFileSync (
        filename_mod,
        content
    );

    write_to_logs(
        "actions",
        `Built new CSS file at ${filename_mod} (${encoded.byteLength} bytes)`,
        true
    );

}

/**
 * Create a new HTML file, name and byte size, with the modified html content
 * @param filename string
 * @param content string
 */

export function buildHTMLFile(filename: string, content: string) {

    const encoded: any = new TextEncoder().encode(content);
    const filename_mod: string = `${_CONFIG_.builder.build_dir}/` + `${filename}.html`;

    fs.writeFileSync (
        filename_mod,
        content
    );

    write_to_logs(
        "actions",
        `Built new HTML file at ${filename_mod} (${encoded.byteLength} bytes)`,
        true
    );

}
