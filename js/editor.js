window.addEventListener("load", function () {
  document.getElementById('editor').addEventListener('paste', function (e) {
    e.preventDefault();
    e.stopPropagation();
    insertAtCursor(this,e.clipboardData.getData('text/html'));
  });
});

function insertAtCursor (input, textToInsert) {
  // get current text of the input
  const content = input.innerHTML;

  // save selection start and end position
  const start = window.getSelection().anchorOffset;
  const end = window.getSelection().focusOffset;

  // update the content with our text inserted
  input.innerHTML = content.slice(0, start) + textToInsert + content.slice(end);

  // update cursor to be at the end of insertion
  input.selectionStart = input.selectionEnd = start + textToInsert.length;
}

