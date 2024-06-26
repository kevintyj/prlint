import type { LintOptions, QualifiedConfig } from '@commitlint/types';
import type { downloadOptions } from './index.js';
/**
 * Conditionally sets values from configuration as a LintOptions object
 * @param {QualifiedConfig} configuration - Commitlint configuration file from load
 * @return {LintOptions} LintOptions object with possible falsy default values
 */
declare function getLintOptions(configuration: QualifiedConfig): LintOptions;
type configurationProps = {
    downloadOptions: downloadOptions;
};
declare function loadCommitLintConfig(downloadConfig: downloadOptions): Promise<QualifiedConfig | undefined>;
declare function extractPackageNameFromError(errorMessage: string): string | null;
export declare const testLintOptions: {
    getLintOptions: typeof getLintOptions;
    extractPackageNameFromError: typeof extractPackageNameFromError;
    loadCommitLintConfig: typeof loadCommitLintConfig;
};
/**
 * Utilizes the {@link lint} function to verify the title with options fetched using {@link getLintOptions}
 * @param {string} title - The commit/PR title to check for lint
 * @param {configurationProps} config - the verifyTitle configuration object
 * @return {Promise<boolean>} - Returns true if linter passes, throws {@link Error} if failing
 */
export declare function verifyTitle(title: string, config?: configurationProps): Promise<boolean>;
export {};
