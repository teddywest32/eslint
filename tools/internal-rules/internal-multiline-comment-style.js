/**
 * @fileoverview A modified version of the `multiline-comment-style` rule that ignores banner comments.
 * @author Teddy Katz
 */

"use strict";

const ruleComposer = require("eslint-rule-composer");
const multilineCommentStyle = require("../../lib/rules/multiline-comment-style");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

// The `internal-no-invalid-meta` rule has a false positive here.
// eslint-disable-next-line internal-no-invalid-meta
module.exports = ruleComposer.filterReports(
    multilineCommentStyle,
    (problem, metadata) => {
        const problemIndex = metadata.sourceCode.getIndexFromLoc(problem.loc.start);
        const reportedToken = metadata.sourceCode.getTokenByRangeStart(problemIndex, { includeComments: true });

        return !(reportedToken && reportedToken.type === "Line" && /^-{2,}$/.test(reportedToken.value));
    }
);
