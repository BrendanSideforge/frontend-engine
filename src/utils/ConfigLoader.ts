
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as path from "path";
import { write_to_logs } from "./Logger";

/**
 * Load the configs from a yaml file
 * @param directory - string
 */

export function ConfigLoader(filename: string): object | any {

    const directory_path = path.join("./config", filename);
    const directory_file = fs.readFileSync(directory_path, 'utf8');
    const config = yaml.load(directory_file);
    
    write_to_logs(
        "service",
        "Loaded the global configuration",
        true
    );
    
    return config;

}

/**
 * Get the configuration for an html file configuration
 */
export function PageConfigLoader(filename: string): object | any {

    const directory_path = path.join("./config/pages", filename);
    const directory_file = fs.readFileSync(directory_path, 'utf8');
    const config = yaml.load(directory_file);

    write_to_logs(
        "service",
        `Loaded configuration for: ${filename} (from ./config/pages/${filename})`,
        true
    );

    return config;

}