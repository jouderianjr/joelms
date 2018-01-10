const { p, h1, div, render, text, button, input, beginnerProgram } = joelms;

const update = (action, model) => {
  debugger;
  switch (action.type) {
    case 'OnDecrement':
      return { ...model, counter: model.counter - 1 };
    case 'OnIncrement':
      return { ...model, counter: model.counter + 1 };
    default:
      return model;
  }
};

const renderAwesomeMsg = counter =>
  counter === 10 && h1({}, [text('DUUUUUDEEEE, ten? 10? really?')]);

const view = model => {
  return div({}, [
    button(
      {
        onClick: 'OnDecrement',
      },
      [text('Decrement')]
    ),
    button(
      {
        onClick: 'OnIncrement',
      },
      [text('Increment')]
    ),
    text(model.counter.toString()),
    renderAwesomeMsg(model.counter),
  ]);
};

beginnerProgram({
  root: 'root',
  model: { counter: 0 },
  view: view,
  update: update,
});
