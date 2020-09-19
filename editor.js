var editor = ace.edit("editor");
editor.setTheme("ace/theme/monokai");
editor.session.setMode("ace/mode/javascript");

function runCode(){
    runCodeLocal(editor.getValue());
}

function submitCode() {
    runCodeRemote(editor.getValue());
}
