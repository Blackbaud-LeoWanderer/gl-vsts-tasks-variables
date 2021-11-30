import fs = require("fs-extra");
import tl = require("azure-pipelines-task-lib/task");
import {recursiveProcessing} from "./common/expandJObject";

try {
    let source = tl.getPathInput("JsonSource");
    let variablePrefix = tl.getInput("VariablePrefix");
    let isSecret = tl.getBoolInput("MarkAsSecret");

    let content = fs.readFileSync(source, { encoding: "utf8" });
    let jObject = JSON.parse(content);

    recursiveProcessing(jObject, variablePrefix, isSecret);

    tl.setResult(tl.TaskResult.Succeeded, "Variables loaded");

} catch (err) {
    // tslint:disable-next-line: no-console
    console.error(String(err));
    tl.setResult(tl.TaskResult.Failed, String(err));
}
