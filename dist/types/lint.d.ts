import type { LintOptions, QualifiedConfig } from '@commitlint/types';
/**
 * Conditionally sets values from configuration as a LintOptions object
 * @param {QualifiedConfig} configuration - Commitlint configuration file from load
 * @return {LintOptions} LintOptions object with possible falsy default values
 */
declare function getLintOptions(configuration: QualifiedConfig): LintOptions;
export declare const testLintOptions: {
    getLintOptions: typeof getLintOptions;
};
/**
 * Utilizes the {@link lint} function to verify the title with options fetched using {@link getLintOptions}
 * @param {string} title - The commit/PR title to check for lint
 * @return {Promise<boolean>} - Returns true if linter passes, throws {@link Error} if failing
 */
export declare function verifyTitle(title: string): Promise<boolean>;
export {};
