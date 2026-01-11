/**
 * Builds the user prompt for the best match selection.
 */
export function buildBestMatchPrompt(
    searchTerm: string,
    candidateList: string
): string {
    return `User searched for: "${searchTerm}"

Candidates:
${candidateList}

Which number is the best match?`;
}
