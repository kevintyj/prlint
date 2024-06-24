import type { LintOptions, QualifiedConfig } from '@commitlint/types';
/**
 * Conditionally sets values from configuration as a LintOptions object
 * @param {QualifiedConfig} configuration - Commitlint configuration file from load
 * @return {LintOptions} LintOptions object with possible falsy default values
 */
declare function getLintOptions(configuration: QualifiedConfig): LintOptions;
/**
 * Convert a ESM js file to CJS
 * @param {string} inputFilePath - Input file path for conversion
 * @param {string} outputFilePath - Output file path
 */
declare function convertESMtoCJS(inputFilePath: string, outputFilePath: string): Promise<void>;
export declare const testLintOptions: {
    getLintOptions: typeof getLintOptions;
    convertESMtoCJS: typeof convertESMtoCJS;
};
/**
 * Utilizes the {@link lint} function to verify the title with options fetched using {@link getLintOptions}
 * @param {string} title - The commit/PR title to check for lint
 * @param {string} configPath - The configuration path of the commitlint config fetched from current working directory
 * @return {Promise<boolean>} - Returns true if linter passes, throws {@link Error} if failing
 */
export declare function verifyTitle(title: string, configPath?: string): Promise<boolean>;
export {};
