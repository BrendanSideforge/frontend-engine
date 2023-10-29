
import { _CONFIG_ } from "..";
import { PageConfigLoader } from "./ConfigLoader";
import { write_to_logs } from "./Logger";

const htmlVariablePattern: RegExp = /\{[^}]*\}/g;
const cssVariablePattern: RegExp = /--(.*?)--/g;
const htmlCommentPattern: RegExp =/<!--[\s\S]*?-->|<!--.*?-->/g;
const cssCommentPattern: RegExp = /\/\*[\s\S]*?\*\/|\/\/.*/g;
const newLinesPattern: RegExp = /^\s*[\r\n]/gm;

function stripComments(content: string, filetype: string) {
    return filetype === "html" ? content.replace(htmlCommentPattern, '') : content.replace(cssCommentPattern, '');
}

function removeBlankLines(content: string) {
    return content.replace(newLinesPattern, '');
}

/**
 * Filter out {variables} from the HTML code
 * @param filename string
 * @param content string
 * @returns string
 */
export function filterCodeContent(filename: string, content: string, filetype: string): string {


    const matched_variables: Array<string> | undefined = content.match(filetype === "html" ? htmlVariablePattern : cssVariablePattern);
    const page_config: object | any = filetype === "html" ? PageConfigLoader(`${filename}.yaml`) : _CONFIG_;

    const setting_variables: Array<string> = filetype === "html" ? Object.keys(page_config.settings) : [];
    const body_variables: Array<string> = filetype === "html" ? Object.keys(page_config.body) : [];
    const universal_variables: Array<string> = Object.keys(_CONFIG_.universal_variables);
    const styles_variables: Array<string> = Object.keys(_CONFIG_.styles)
    let modified_content: string = content;

    for (let i: number = 0; i < matched_variables.length; i++) {

        const raw_variable: string = matched_variables[i];
        const variable: string = filetype === "html" ? matched_variables[i].replace("{", "").replace("}", "") : matched_variables[i].replace('--', '').replace("--", "");

        // console.log(variable, raw_variable);
        if (setting_variables.includes(variable)) {

            const value: any = page_config.settings[variable];
            modified_content = modified_content.replace(raw_variable, value);
            continue;

        }

        if (styles_variables.includes(variable)) {

            let value: any = _CONFIG_.styles[variable];

            modified_content = modified_content.replace(raw_variable, value);
            continue;  

        }

        if (body_variables.includes(variable)) {

            const value: any = page_config.body[variable];
            modified_content = modified_content.replace(raw_variable, value);
            continue;

        }

        if (universal_variables.includes(variable)) {

            const value: any = _CONFIG_.universal_variables[variable];
            modified_content = modified_content.replace(raw_variable, value);
            continue;

        }

    }
    
    if (_CONFIG_.builder[filetype].remove_comments) {

        const cleaned_code: string = stripComments(modified_content, filetype);
        modified_content = cleaned_code;

    }

    if (_CONFIG_.builder[filetype].remove_blank_lines) {

        const cleaned_code: string = removeBlankLines(modified_content);
        modified_content = cleaned_code;
        
    }

    write_to_logs(
        "service",
        `Replaced ${matched_variables.length} variables for the location: ${filename}`,
        true
    );

    return modified_content;


}
