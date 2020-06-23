/*
Есть глюк - Если создать заголовок, а затем что-то еще в другом месте, и потом снова выделить заголовок, то нельзя его обернуть назад.
Он увеличивается. Также надо, чтобы заголовок одного типа не оборачивал другой. С последним требованием вроде неплохо, но надо проверить.
*/

let elements = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'];
let headers = ['h1', 'h2', 'h3'];

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
  let sel = window.getSelection();
  let range = sel.getRangeAt(0).cloneRange();
  let parent = range.commonAncestorContainer.parentNode.innerHTML;
  console.log(sel);
  console.log('sel.anchorOffset = ' + sel.anchorOffset);
  console.log('sel.focusOffset = ' + sel.focusOffset);
  console.log(range);
  console.log('range.startOffset = ' + range.startOffset);
  console.log('range.endOffset = ' + range.endOffset);
  console.log(sel.toString().length);
  console.log(parent.length);
  console.log(parent.slice(0, range.startOffset));
  console.log(parent.slice(range.startOffset, range.endOffset));
  console.log('=============================');

});

for (let x in elements) {
  document.getElementById(elements[x]).addEventListener('click', function () {
    formatter(elements[x], null);
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
      if (
        rangeProxy.querySelector('h1') ||
        rangeProxy.querySelector('h2') ||
        rangeProxy.querySelector('h3')
      ) {
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
      }
      if (
        range.commonAncestorContainer.parentNode.nodeName == 'H1' ||
        range.commonAncestorContainer.parentNode.nodeName == 'H2' ||
        range.commonAncestorContainer.parentNode.nodeName == 'H3'
      ) {
        if (range.commonAncestorContainer.parentNode.innerHTML == sel.toString()) {
          let parent = range.commonAncestorContainer.parentNode;
          parent.remove();
          range.deleteContents();
          range.insertNode(document.createTextNode(parent.innerHTML));
          sel.removeAllRanges();
          sel.addRange(range);
        }
        console.log(range.endOffset);
        console.log(sel.toString().length);
        if (range.endOffset == range.commonAncestorContainer.parentNode.innerHTML.length) {
          let parent = range.commonAncestorContainer.parentNode;
          let first = document.createElement("h2");
          let second = document.createTextNode(parent.innerHTML.slice(range.startOffset, range.endOffset));
          first.appendChild(document.createTextNode(parent.innerHTML.slice(0, range.startOffset)));
          newNode = document.createElement("p");
          newNode.appendChild(document.createTextNode("New Node Inserted Here"));
          parent.remove();         
          range.insertNode(second);
          let secondRange = sel.getRangeAt(0).cloneRange();
          sel.removeAllRanges();
          sel.addRange(secondRange);
          secondRange.insertNode(first);          
        }
      }
      else {
        range.surroundContents(newTag);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }
}

function formatter(arg1, arg2) {
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
    document.execCommand(arg1, false, arg2);
    document.designMode = "off";
  } else if (document.selection && document.selection.createRange &&
    document.selection.type != "None") {
    // IE case
    range = document.selection.createRange();
    range.execCommand(arg1, false, arg2);
  }
}

document.getElementById('fontclr').addEventListener('click', function () {
  document.getElementById('fontclr-wrapper').classList.toggle('editor-hide');
});

document.getElementById('backclr').addEventListener('click', function () {
  document.getElementById('backclr-wrapper').classList.toggle('editor-hide');
});

let fontclr = document.getElementById('fontclr-wrapper').querySelectorAll('button');
let backclr = document.getElementById('backclr-wrapper').querySelectorAll('button');

document.getElementById('fontclr-wrapper').addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

document.getElementById('backclr-wrapper').addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

for (let x = 0; x < fontclr.length; x++) {
  fontclr[x].addEventListener('click', function () {
    formatter('foreColor', this.style.backgroundColor);
  });
}

for (let x = 0; x < backclr.length; x++) {
  backclr[x].addEventListener('click', function () {
    formatter('hiliteColor', this.style.backgroundColor);
  });
}

document.getElementById('font-size').addEventListener('change', function (e) {
  console.log(e.target.value);
  formatter('fontSize', e.target.value);
});