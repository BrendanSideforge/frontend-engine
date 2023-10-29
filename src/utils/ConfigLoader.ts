
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";

/**
 * Load the configs from a yaml file
 * @param directory - string
 */

export function ConfigLoader(filename: string): object | any {

    const directory_path = path.join("./config", filename);
    const directory_file = fs.readFileSync(directory_path, 'utf8');
    const config = yaml.load(directory_file);

    return config;

}

/**
 * Get the configuration for an html file configuration
 */
export function PageConfigLoader(filename: string): object | any {

    console.log(filename);
    const directory_path = path.join("./config/pages", filename);
    const directory_file = fs.readFileSync(directory_path, 'utf8');
    const config = yaml.load(directory_file);

    return config;

}