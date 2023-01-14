nbdiff-web 707855e test/t.ipynb


Solution:
* explore Export diff button
* automatically export html
* do stuff with html

or:
* integrate difftool with github PR comments

User API:
* jupyterReview PR_ID file



TODO:
1. select a line and send a message
2. get PR messages and display them
3. answer a message from PR

everything pure JS ?


## Code exploration
/home/seb/workspace/jupyterReview/nbdime/nbdime/webapp/nbdiffweb.py l 64
-> main server -> init app -> make app  -> MainDifftoolHandler

<div id="nbdime-root" class="nbdime-root">
</div>

<script id='nbdime-config-data' type="application/json">{{ config_data|tojson|safe }}</script>
<script src="{{ static_url('nbdime.js') }}"></script>
<noscript>Nbdime relies on javascript for diff/merge views!</noscript>

-> webapp
-> function showDiff(data: {base: nbformat.INotebookContent, diff: IDiffEntry[]}): Promise<void> {
-> /home/seb/workspace/jupyterReview/nbdime/packages/nbdime/src/diff/widget && diff

## solution
* add a js script that inject edition button on the page
* add some backend route to: send messages to github, get messages...

Insert stuff in the page:
```js
for (e of document.getElementsByClassName("CodeMirror-code")) {
    for (e2 of e.getElementsByClassName("CodeMirror-linenumber")) {
        newNode = document.createElement("button");
        newNode.appendChild(document.createTextNode("✎"));
        e2.parentNode.insertBefore(newNode, e2);
    }
}

```