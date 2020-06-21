let elements = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'];
let headers = ['h1','h2','h3'];

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

for (let x in elements) {
  document.getElementById(elements[x]).addEventListener('click', function () {
    formatter(elements[x]);
  });
}

for (let x in headers) {
  document.getElementById(headers[x]).addEventListener('click', function () {
    headerFormatter(headers[x]);
  });
}

function headerFormatter(arg) {
  let newTag = document.createElement(arg);
  if (window.getSelection) {
    let sel = window.getSelection();
    if (sel.rangeCount) {
      let range = sel.getRangeAt(0).cloneRange();
      // create an object from range for querying tags
      let rangeProxy = sel.getRangeAt(0).cloneContents();
      if (rangeProxy.querySelector(arg)) {
        let tagContent = rangeProxy.querySelector(arg).innerHTML;
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
}

function formatter(arg) {
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
    document.execCommand(arg, false, null);
    document.designMode = "off";
  } else if (document.selection && document.selection.createRange &&
    document.selection.type != "None") {
    // IE case
    range = document.selection.createRange();
    range.execCommand(arg, false, null);
  }
}