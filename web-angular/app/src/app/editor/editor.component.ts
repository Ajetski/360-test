import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

import * as ace from 'ace-builds'; // ace module ..
import 'ace-builds/webpack-resolver';
// language package, choose your own 
import 'ace-builds/src-noconflict/mode-javascript';
// ui-theme package
import 'ace-builds/src-noconflict/theme-github';

const THEME = 'ace/theme/github'; 
const LANG = 'ace/mode/javascript';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

    //@ViewChild('codeEditor') codeEditorElmRef: ElementRef;
    //@ViewChild('codeEditor', { static: false }) public mydiv: ElementRef;
    private codeEditor: ace.Ace.Editor;

    constructor() { }

    ngOnInit () {
        //console.log(this.mydiv)
        console.log(this.getEditor());
        const element = this.getEditor();
        const editorOptions: Partial<ace.Ace.EditorOptions> = {
            highlightActiveLine: true,
            minLines: 10,
            maxLines: Infinity,
        };

        this.codeEditor = ace.edit(element, editorOptions);
        this.codeEditor.setTheme(THEME);
        this.codeEditor.getSession().setMode(LANG);
        this.codeEditor.setShowFoldWidgets(true); // for the scope fold feature
    }

    getEditor() {
        return document.querySelector('#code-editor')
    }

}
