(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.joelms = {})));
}(this, (function (exports) { 'use strict';

const isEventAttribute = attr => /^on/.test(attr);

const extractEventName = attr => attr.replace('on', '').toLowerCase();

const renderElement = (vNode, update, model, view, root, parent, index = 0) => {
  // debugger;

  let el;

  if (parent.childNodes.length >= index + 1) {
    el = parent.childNodes[index];

    if (typeof vNode === 'string') {
      if (el.data !== vNode) {
        el.data = vNode;
        debugger;
      }

      return el;
    } else {
      const validItems = vNode.children.filter(item => !!item);

      validItems.forEach((item, i) =>
        renderElement(item, update, model, view, root, el, i)
      );

      return el;
    }
  } else {
    if (typeof vNode === 'string') {
      debugger;
      el = document.createTextNode(vNode);

      parent.appendChild(el);

      return el;
    }

    el = document.createElement(vNode.type);

    // Adicionando os atributos ao novo node
    Object.keys(vNode.attrs).forEach(key => {
      if (isEventAttribute(key)) {
        el.addEventListener(extractEventName(key), e =>
          _update(
            { type: vNode.attrs[key], payload: e },
            model,
            update,
            view,
            root
          )
        );
      } else {
        el.setAttribute(key, vNode.attrs[key]);
      }
    });
  }

  const validItems = vNode.children.filter(item => !!item);

  validItems.forEach((item, i) =>
    renderElement(item, update, model, view, root, el, i)
  );

  parent.appendChild(el);

  return el;
};

const createElement = (type, attrs = {}, children = []) => {
  return { type: type, attrs: attrs, children: children };
};

const _update = (payload, model, update, view, root) => {
  const newModel = update(payload, model);

  render(root, view, update, newModel);
};

const render = (root, view, update, model) => {
  // if (root.childElementCount) {
  //   root.removeChild(root.firstChild);
  // }

  renderElement(
    view(model),
    update,
    model,
    view,
    root,
    document.getElementById(root),
    0
  );
};

const beginnerProgram = ({ root, view, update, model }) => {
  render(root, view, update, model);
};

const p = createElement.bind(null, 'p');
const div = createElement.bind(null, 'div');
const span = createElement.bind(null, 'span');
const section = createElement.bind(null, 'section');
const nav = createElement.bind(null, 'nav');

const table = createElement.bind(null, 'table');
const td = createElement.bind(null, 'tr');
const tr = createElement.bind(null, 'tr');
const tbody = createElement.bind(null, 'tbody');
const thead = createElement.bind(null, 'thead');
const button = createElement.bind(null, 'button');
const input = createElement.bind(null, 'input');

const h1 = createElement.bind(null, 'h1');
const h2 = createElement.bind(null, 'h2');
const h3 = createElement.bind(null, 'h3');
const h4 = createElement.bind(null, 'h4');
const h5 = createElement.bind(null, 'h5');
const h6 = createElement.bind(null, 'h6');

const customEl = type => createElement.bind(null, type);
const text = value => value;

exports.p = p;
exports.div = div;
exports.span = span;
exports.section = section;
exports.nav = nav;
exports.table = table;
exports.td = td;
exports.tr = tr;
exports.tbody = tbody;
exports.thead = thead;
exports.button = button;
exports.input = input;
exports.h1 = h1;
exports.h2 = h2;
exports.h3 = h3;
exports.h4 = h4;
exports.h5 = h5;
exports.h6 = h6;
exports.customEl = customEl;
exports.text = text;
exports.render = render;
exports.beginnerProgram = beginnerProgram;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=joelms.js.map
