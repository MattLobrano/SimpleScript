let variables = {};

function runSimpleScript(code, outputEl = null) {
    let lines = code.split("\n").map(l => l.trim()).filter(l => l.length > 0);

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Shortcuts
        line = line.replace(/temporary\.memory;/g, "temp.mem;")
                   .replace(/permanent\.memory;/g, "perm.mem;")
                   .replace(/ end/g, "");

        // Variable declaration
        if (line.startsWith("temp.mem;") || line.startsWith("perm.mem;")) {
            let isPermanent = line.startsWith("perm.mem;");
            let rest = line.replace("temp.mem;", "").replace("perm.mem;", "").trim();
            let [name, value] = rest.split("=");
            if (!name || !value) continue;
            name = name.trim();
            value = evaluateExpression(value.trim());
            variables[name] = { value, permanent: isPermanent };
        }

        // If statements
        else if (line.startsWith("if ")) {
            let condition = line.slice(3, line.indexOf(" then")).trim();
            let body = [];
            i++;
            while (i < lines.length && lines[i] !== "end") {
                body.push(lines[i]);
                i++;
            }
            if (evaluateExpression(condition)) {
                runSimpleScript(body.join("\n"), outputEl);
            }
        }

        // Repeat loops
        else if (line.startsWith("repeat ")) {
            let count = parseInt(evaluateExpression(line.slice(7, line.indexOf(" times")).trim()));
            let body = [];
            i++;
            while (i < lines.length && lines[i] !== "end") {
                body.push(lines[i]);
                i++;
            }
            for (let r = 0; r < count; r++) {
                runSimpleScript(body.join("\n"), outputEl);
            }
        }

        // Show command
        else if (line.startsWith("show ")) {
            let expr = line.slice(5).trim();
            let val = variables[expr] ? variables[expr].value : expr;
            if (outputEl) outputEl.innerHTML += val + "<br>";
            else console.log(val);
        }

        // Popup/alert command
        else if (line.startsWith("popup ") || line.startsWith("alert ")) {
            let msg = line.replace(/^(popup|alert)\s+/, "").trim();
            msg = evaluateExpression(msg); // replace variables if needed
            alert(msg);
        }
    }
}

// Evaluates math expressions and variables
function evaluateExpression(expr) {
    for (let name in variables) {
        expr = expr.replace(new RegExp("\\b" + name + "\\b", "g"), variables[name].value);
    }
    try {
        return eval(expr);
    } catch {
        return expr;
    }
}
