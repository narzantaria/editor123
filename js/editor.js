let editorContent = `
<div id="editor-wrapper">
  <div id="tools">
    <span class="tools-group">
      <i id='code' class="fa fa-code"></i>
    </span>
    <span class="tools-group">
      <i id='bold' class="fa fa-bold"></i>
      <i id='italic' class="fa fa-italic"></i>
      <i id="underline" class="fa fa-underline"></i>
    </span>
    <span class="tools-group">
      <i id="strikethrough" class="fa fa-strikethrough"></i>
      <i id="superscript" class="fa fa-superscript"></i>
      <i id="subscript" class="fa fa-subscript"></i>
    </span>
    <span class="tools-group">
      <button id="h1">H1</button>
      <button id="h2">H2</button>
      <button id="h3">H3</button>
    </span>
    <span class="tools-group">
      <div id="fontclr">
        <i class="fa fa-font"></i>
        <div id="fontclr-wrapper" class="colours-wrapper editor-hide">
          <button style="background-color: black;"></button>
          <button style="background-color: white;"></button>
          <button style="background-color: red;"></button>
          <button style="background-color: green;"></button>
          <button style="background-color: blue;"></button>
          <button style="background-color: yellow;"></button>
          <button style="background-color: orange;"></button>
          <button style="background-color: gray;"></button>
          <button style="background-color: brown;"></button>
          <button style="background-color: skyblue;"></button>
        </div>
      </div>
      <div id="backclr">
        <i class="fa fa-tint br"></i>
        <div id="backclr-wrapper" class="colours-wrapper editor-hide">
          <button style="background-color: black;"></button>
          <button style="background-color: white;"></button>
          <button style="background-color: red;"></button>
          <button style="background-color: green;"></button>
          <button style="background-color: blue;"></button>
          <button style="background-color: yellow;"></button>
          <button style="background-color: orange;"></button>
          <button style="background-color: gray;"></button>
          <button style="background-color: brown;"></button>
          <button style="background-color: skyblue;"></button>
        </div>
      </div>
    </span>
    <span class="tools-group">
      <select name="font-size" id="font-size">
        <option value="8px">8</option>
        <option value="9px">9</option>
        <option value="10px">10</option>
        <option value="11px">11</option>
        <option value="12px">12</option>
        <option value="14px">14</option>
        <option value="16px">16</option>
        <option value="18px">18</option>
        <option value="24px">24</option>
        <option value="30px">30</option>
        <option value="36px">36</option>
        <option value="48px">48</option>
        <option value="60px">60</option>
        <option value="72px">72</option>
      </select>
    </span>
    <span id="textalign" class="tools-group">
      <i id="insertUnorderedList" class="fa fa-list-ul"></i>
      <i id="insertOrderedList" class="fa fa-list-ol"></i>
      <i id="justifyLeft" class="fa fa-align-left"></i>
      <i id="justifyCenter" class="fa fa-align-center"></i>
      <i id="justifyRight" class="fa fa-align-right"></i>
      <i id="justifyFull" class="fa fa-align-justify"></i>
    </span>
    <span class="tools-group">
      <div id="linktext">
        <i class="fa fa-link"></i>
        <div id="link-wrapper" class="link-wrapper editor-hide">
          <input id="linkvalue" type="text">
          <button id="setlink">OK</button>
        </div>
      </div>
      <i id="unlink" class="fa fa-unlink"></i>
    </span>
    <span class="tools-group">            
      <div id="insertimg">
        <i class="fa fa-image"></i>
        <div id="img-wrapper" class="img-wrapper editor-hide">
          <input id="imgvalue" type="text">
          <button id="setimg">OK</button>
        </div>
      </div>
    </span>
  </div>
  <div id="editor" contenteditable="true">I am Shutruk Nahunte, King of Anšan and Susa, Sovereign of the land of
    Elam. By command of Inshushinak I destroyed Sippar, Took the Stele of Niran-Sin, and brought it back to Elam,
    where I erected it as an offering to my god.</div>
</div>
`;
let elements = ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript'];
let headers = ['h1', 'h2', 'h3'];

document.getElementById('editor-container').insertAdjacentHTML('beforeend', editorContent);

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

for (let x in elements) {
  document.getElementById(elements[x]).addEventListener('click', function () {
    formatter(elements[x], false, null);
  });
}

for (let x in headers) {
  document.getElementById(headers[x]).addEventListener('click', function () {
    if (window.getSelection) {
      let sel = window.getSelection();
      let range = sel.getRangeAt(0).cloneRange();
      if (range.commonAncestorContainer.parentNode.nodeName == headers[x].toUpperCase()) {
        formatter('formatBlock', false, 'p');
      } else {
        formatter('formatBlock', false, headers[x]);
      }
    }
  });
}

function formatter(arg1, arg2, arg3) {
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
    document.execCommand(arg1, arg2, arg3);
    document.designMode = "off";
  } else if (document.selection && document.selection.createRange &&
    document.selection.type != "None") {
    // IE case
    range = document.selection.createRange();
    range.execCommand(arg1, arg2, arg3);
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
    formatter('foreColor', false, this.style.backgroundColor);
    console.log(this.style.backgroundColor);
  });
}

for (let x = 0; x < backclr.length; x++) {
  backclr[x].addEventListener('click', function () {
    formatter('hiliteColor', false, this.style.backgroundColor);
    console.log(this.style.backgroundColor);
  });
}

document.getElementById('font-size').addEventListener('change', function (e) {
  if (window.getSelection) {
    let sel = window.getSelection();
    let range = sel.getRangeAt(0).cloneRange();
    let rangeProxy = sel.getRangeAt(0).cloneContents();
    let spans = rangeProxy.querySelectorAll('span');
    for (let x = 0; x < spans.length; x++) {
      if (spans[x].style.fontSize != '') {
        spans[x].replaceWith(spans[x].innerHTML);
      }
    }
    range.deleteContents();
    range.insertNode(rangeProxy);
    let newSpan = document.createElement('span');
    newSpan.style.fontSize = e.target.value;
    range.surroundContents(newSpan);
    sel.removeAllRanges();
    sel.addRange(range);
  }
});

let alignTools = document.getElementById('textalign').querySelectorAll('i');

for (let x = 0; x < alignTools.length; x++) {
  alignTools[x].addEventListener('click', function () {
    console.log(this.id);
    formatter(this.id, false, null);
  });
}

document.getElementById('linktext').addEventListener('click', function () {
  document.getElementById('link-wrapper').classList.toggle('editor-hide');
});

document.getElementById('link-wrapper').addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

document.getElementById('setlink').addEventListener('click', function () {
  let input1 = document.getElementById('linkvalue');
  let sel = window.getSelection();
  let range = sel.getRangeAt(0).cloneRange();
  let rangeProxy = sel.getRangeAt(0).cloneContents();
  range.deleteContents();
  range.insertNode(rangeProxy);
  let newLink = document.createElement('a');
  newLink.href = input1.value;
  newLink.target = '_blank';
  range.surroundContents(newLink);
  sel.removeAllRanges();
  sel.addRange(range);
  input1.value = '';
});

document.getElementById('unlink').addEventListener('click', function () {
  formatter('unlink', false, null);
});

document.getElementById('insertimg').addEventListener('click', function () {
  document.getElementById('img-wrapper').classList.toggle('editor-hide');
});

document.getElementById('img-wrapper').addEventListener('click', function (e) {
  e.preventDefault();
  e.stopPropagation();
});

document.getElementById('setimg').addEventListener('click', function () {
  let input1 = document.getElementById('imgvalue');
  formatter('insertImage', false, input1.value);
  input1.value = '';
});