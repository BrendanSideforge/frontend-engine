
import * as fs from "fs";
import * as path from "path";

import { _CONFIG_ } from "..";
import { buildHTMLFile, buildCSSFile } from "./BuildFiles";
import { filterCodeContent } from "./Filter";

/**
 * Read CSS files from configuration
 */
 export function readCSSFiles() {

    fs.readdir(`./${_CONFIG_.builder.css.parent_dir}/${_CONFIG_.builder.css.child_dir}`, async (err: any, filenames: Array<string>) => {
        if (err) return console.error(err);

        filenames.forEach(async (filename: string) => {
            fs.readFile(`./${_CONFIG_.builder.css.parent_dir}/${_CONFIG_.builder.css.child_dir}/${filename}`, async (err: any, content: Buffer) => {
                if (err) return console.error(err);

                const text_content: string = content.toString();
                const filteredContent = filterCodeContent(filename.replace(".css", ""), text_content, "css");
                buildCSSFile(filename.replace(".css", ""), filteredContent);

            });
        });

    })

}

/**
 * Read HTML files from configuration
 */
export function readHTMLFiles() {

    fs.readdir(`./${_CONFIG_.builder.html.parent_dir}/${_CONFIG_.builder.html.child_dir}`, async (err: any, filenames: Array<string>) => {
        if (err) return console.error(err);

        filenames.forEach(async (filename: string) => {
            fs.readFile(`./${_CONFIG_.builder.html.parent_dir}/${_CONFIG_.builder.html.child_dir}/${filename}`, async (err: any, content: Buffer) => {
                if (err) return console.error(err);

                const text_content: string = content.toString();
                const filteredContent = filterCodeContent(filename.replace(".html", ""), text_content, "html");
                buildHTMLFile(filename.replace(".html", ""), filteredContent);

            });
        });

    })

}
