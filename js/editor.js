document.getElementById('code').addEventListener('click', function () {
  var editor = document.getElementById('editor');
  var content = editor.innerHTML;
  content = htmlEncode(content);
  editor.innerHTML = content;
});

function htmlEncode(html) {
  html = trim(html);
  if (html.search('<') == -1) {
    html = html.replace(/&lt;/g, '<');
    html = html.replace(/&gt;/g, '>');
    return html;
  }
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

document.getElementById('shutruk').addEventListener('click', function () {
  console.log(document.getElementById('editor').innerHTML);
});

document.getElementById('h1').addEventListener('click', function () {
  let newTag = document.createElement("h1");
  if (window.getSelection) {
    let sel = window.getSelection();
    if (sel.rangeCount) {
      let range = sel.getRangeAt(0).cloneRange();
      // console.log(range.startOffset); //the letter with which the first tag in the selection begins; counts from 1!!!
      // create an object from range for querying tags
      let rangeProxy = sel.getRangeAt(0).cloneContents();
      if (rangeProxy.querySelector('h1')) {
        let tagContent = rangeProxy.querySelector('h1').innerHTML;
        // compare selection length with queried tag length
        if (range.startOffset == 1) {
          tagContent = tagContent.replace(/(<([^>]+)>)/ig, "");
          range.deleteContents();
          range.insertNode(document.createTextNode(tagContent));
          sel.removeAllRanges();
          sel.addRange(range);
          return;
        }
        else {
          let rangeToString = range.toString().replace(/(<([^>]+)>)/ig, "");
          range.deleteContents();
          range.insertNode(document.createTextNode(rangeToString));
          sel.removeAllRanges();
          sel.addRange(range);
          return;
        }
      } else {
        range.surroundContents(newTag);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }
});

document.getElementById('bold').addEventListener('click', function () {
  var range, sel;
  if (window.getSelection) {
    // Non-IE case
    sel = window.getSelection();
    if (sel.getRangeAt) {
      range = sel.getRangeAt(0);
    }
    document.designMode = "on";
    if (range) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
    document.execCommand("bold", false, null);
    document.designMode = "off";
  } else if (document.selection && document.selection.createRange &&
    document.selection.type != "None") {
    // IE case
    range = document.selection.createRange();
    range.execCommand("bold", false, null);
  }
});