// get current text of the input
var content = input.innerHTML, contentProxy;

window.addEventListener("load", function () {
  document.getElementById('editor').addEventListener('paste', function (e) {
    e.preventDefault();
    e.stopPropagation();
    insertAtCursor(this, e.clipboardData.getData('text/html'));
  });
});

document.getElementById('showtags').addEventListener('click', function () {
  var editor = document.getElementById('editor');
  var content = editor.innerHTML;
  content = htmlEncode(content);
  editor.innerHTML = content;
});

function insertAtCursor(input, textToInsert) {
  // save selection start and end position
  const start = window.getSelection().anchorOffset;
  const end = window.getSelection().focusOffset;

  // console.log(start);
  // console.log(end);
  // console.log(content.slice(0, start));
  // console.log(content.slice(end));
  // console.log(textToInsert);
  // console.log(content.slice(0, start) + textToInsert + content.slice(end));

  // update the content with our text inserted
  contentProxy = content.slice(0, start) + textToInsert + content.slice(end);
  input.innerHTML = contentProxy;

  // update cursor to be at the end of insertion
  input.selectionStart = input.selectionEnd = start + textToInsert.length;
}

function htmlEncode(html) {
  html = trim(html);
  return html.replace(/[&"'\<\>]/g, function (c) {
    switch (c) {
      case "&":
        return "&amp;";
      case "'":
        return "&#39;";
      case '"':
        return "&quot;";
      case "<":
        return "&lt;";
      default:
        return "&gt;";
    }
  });
};

function trim(input) {
  return input.toString().replace(/^([\s]*)|([\s]*)$/g, '');
}
