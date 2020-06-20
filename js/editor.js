// window.addEventListener("load", function () {
//   document.getElementById('editor').addEventListener('paste', function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     insertAtCursor(this, e.clipboardData.getData('text/html'));
//   });
// });

document.getElementById('code').addEventListener('click', function () {
  var editor = document.getElementById('editor');
  var content = editor.innerHTML;
  content = htmlEncode(content);
  editor.innerHTML = content;
});

// function insertAtCursor(input, textToInsert) {
//   // get current text of the input
//   var content = input.innerHTML;

//   // save selection start and end position
//   const start = window.getSelection().anchorOffset;
//   const end = window.getSelection().focusOffset;

//   // update the content with our text inserted
//   input.innerHTML = content.slice(0, start) + textToInsert + content.slice(end);

//   // update cursor to be at the end of insertion
//   input.selectionStart = input.selectionEnd = start + textToInsert.length;
// }

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

document.getElementById('bold').addEventListener('click', function () {
  let span = document.createElement("span");
  span.style.fontWeight = "bold";
  if (window.getSelection) {
    let sel = window.getSelection();
    console.log(sel.anchorNode.parentNode);
    console.log(sel.anchorOffset);
    if (sel.rangeCount) {
      let range = sel.getRangeAt(0).cloneRange();
      range.surroundContents(span);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
});

document.getElementById('italic').addEventListener('click', function () {
  //
});