# SimpleScript 📝

SimpleScript is a **tiny experimental language** inspired by JavaScript, designed to be easier to read and write.
It comes with:

* A **browser interpreter** (`simpleScript.js`) so you can run `.ss` files in an HTML page.
* A **VS Code extension** (`SimpleScript-Extension/`) that adds syntax highlighting, snippets and hover tooltips for `.ss` files.

---

## ✨ Language examples

```simplescript
# Temporary memory (like `let` in JS)
temporary.memory;username = "mattialobrano" end

# Permanent memory (like `const` in JS)
permanent.memory;username = "mattiabanano" end

# Shortcuts
temp.mem;count = 42 end
perm.mem;pi = 3.14 end

# Popup (alert in the browser)
popup "Hello from SimpleScript!" end

# If statements
if count > 10 then
    popup "Big number!" end
end

# Loops
repeat 3 times
    show "Hello!" end
end
```

Equivalent JavaScript for some constructs:

```javascript
let username = "mattialobrano";
const username = "mattiabanano";

let count = 42;
const pi = 3.14;

alert("Hello from SimpleScript!");

if (count > 10) {
  alert("Big number!");
}

for (let i = 0; i < 3; i++) {
  console.log("Hello!");
}
```

---

## 🚀 Quick start — run SimpleScript in the browser (recommended)

**Folder layout**

```
SimpleScript/
├─ index.html
├─ simpleScript.js     ← the interpreter (must define runSimpleScript)
└─ program.ss          ← your SimpleScript program
```

> **Important:** Browsers don’t execute `.ss` files natively. `simpleScript.js` must read and execute them. The examples below show two correct ways.

### Option A — load an external `program.ss` (recommended)

Create `index.html`:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>SimpleScript Test</title>
  <script src="simpleScript.js"></script>
</head>
<body>
  <h1>SimpleScript demo</h1>

  <div id="output"></div>

  <script>
    // fetch the external .ss file and run it through the interpreter
    fetch('program.ss')
      .then(res => res.text())
      .then(code => runSimpleScript(code, document.getElementById('output')))
      .catch(err => console.error('Failed to load SimpleScript file:', err));
  </script>
</body>
</html>
```

**Run:** serve the folder over HTTP (Live Server in VS Code, `python -m http.server`, or `http-server`) and open `index.html`. The interpreter will fetch `program.ss` and execute it.

---

### Option B — embed SimpleScript inside HTML (inline) or use a `<script type="text/simplescript" src="...">` loader

You can embed code inside an HTML page or use a `<script type="text/simplescript">` tag and a small loader which supports both inline content and an external `src`. This pattern lets you write SimpleScript directly in HTML while still using the interpreter.

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Inline SimpleScript</title>
  <script src="simpleScript.js"></script>
</head>
<body>
  <script type="text/simplescript" id="inlineScript">
    temp.mem;score = 5 end
    show score
    popup "Hello inline!"
  </script>

  <!-- Or reference an external file as src (loader will fetch it) -->
  <script type="text/simplescript" src="program.ss"></script>

  <script>
    // Loader: finds script[type="text/simplescript"], supports inline or external src
    document.querySelectorAll('script[type="text/simplescript"]').forEach(async (el) => {
      const output = document.createElement('div');
      document.body.appendChild(output);

      const src = el.getAttribute('src');
      if (src) {
        // fetch external .ss file (must be served over HTTP)
        const res = await fetch(src);
        const code = await res.text();
        runSimpleScript(code, output);
      } else {
        // inline content
        runSimpleScript(el.textContent, output);
      }
    });
  </script>
</body>
</html>
```

**Note:** If you use external `src="program.ss"`, you **must serve the files over HTTP** (Live Server or similar). `file://` pages often block `fetch()`.

---

## 📄 Example `program.ss` (hello demo)

Save this as `program.ss`:

```simplescript
temp.mem;playerName = "Mattia" end
temp.mem;score = 5 end
temp.mem;bonus = 10 end
temp.mem;total = score + bonus end

show playerName
show "Total Score: "
show total

if total > 10 then
    popup "You won the game!" end
end

repeat 3 times
    popup "Repeating popup" end
end
```

---

## 🧩 VS Code extension (SimpleScript-Extension/)

The `SimpleScript-Extension/` folder contains the VS Code editor support: grammar, snippets and hover tooltips.

### Features

* Syntax highlighting for `.ss` files
* Snippets for `temp.mem;`, `perm.mem;`, `if`, `repeat`, `popup`, `show`
* Hover tooltips for keywords

### Package & install the extension (local)

1. Install `vsce` if you haven't:

   ```bash
   npm install -g vsce
   ```
2. From inside `SimpleScript-Extension/` run:

   ```bash
   vsce package
   ```

   This will produce a `.vsix` file (e.g. `simplescript-0.1.0.vsix`).
3. In VS Code: Extensions → `...` menu → **Install from VSIX...** → choose the `.vsix` file.
4. Reload VS Code. Open a `.ss` file — the language should show as **SimpleScript** in the status bar.

**Troubleshooting:** Make sure `package.json` contains:

```json
"activationEvents": ["onLanguage:simplescript"],
"main": "./hover.js"
```

and that the `languages` and `grammars` configure `.ss` and point to `syntaxes/simplescript.tmLanguage.json`.

---

## 🔧 Development notes

* `simpleScript.js` should export/define `runSimpleScript(code, outputEl)` — the README examples rely on that function name.
* When testing locally, use Live Server (VS Code extension) or `python -m http.server` to avoid `fetch()` blocking issues.
* The extension only **helps editing** (.ss grammar/snippets/hover). It does not execute `.ss` itself; execution is done with `simpleScript.js` in the browser (or a Node runner you create).

---

## 🛠 Roadmap (ideas)

* [ ] Functions
* [ ] Better expression parsing (avoid `eval` where possible)
* [ ] `while` and `for`
* [ ] Publish VS Code extension to Marketplace
* [ ] Unit tests for the interpreter

---

## 📜 License

MIT — feel free to use, modify and share. Add a `LICENSE` file if you want.

---

## ✅ Summary / Quick checklist to get started

1. Put `index.html`, `simpleScript.js` and `program.ss` in the same folder.
2. Start a simple HTTP server (Live Server or `python -m http.server`).
3. Open `index.html` in the browser.
4. Edit `program.ss`, refresh the page — your SimpleScript runs.

---
