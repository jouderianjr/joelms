const isEventAttribute = attr => /^on/.test(attr);

const extractEventName = attr => attr.replace('on', '').toLowerCase();

const renderElement = (obj, update, model, view, root) => {
  const el = document.createElement(obj.type);

  Object.keys(obj.attrs).forEach(key => {
    if (isEventAttribute(key)) {
      el.addEventListener(extractEventName(key), e =>
        _update({ type: obj.attrs[key], payload: e }, model, update, view, root)
      );
    } else {
      el.setAttribute(key, obj.attrs[key]);
    }
  });

  obj.children.forEach(item => {
    el.appendChild(
      typeof item === 'string'
        ? document.createTextNode(item)
        : renderElement(item, update, model, view, root)
    );
  });

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
  if (root.childElementCount) {
    root.removeChild(root.firstChild);
  }
  root.appendChild(renderElement(view(model), update, model, view, root));
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

export {
  p,
  div,
  span,
  section,
  nav,
  table,
  td,
  tr,
  tbody,
  thead,
  button,
  input,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  customEl,
  text,
  render,
  beginnerProgram,
};
