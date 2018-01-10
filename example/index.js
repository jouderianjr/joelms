const { p, h1, div, render, text, button, input, beginnerProgram } = joelms;

const update = (action, model) => {
  switch (action.type) {
    case 'OnDecrement':
      return { ...model, counter: model.counter - 1 };
    case 'OnIncrement':
      return { ...model, counter: model.counter + 1 };
    default:
      return model;
  }
};

const renderHeader = () =>
  h1(
    {
      class: 'arroz',
      style: 'background-color: blue; color: white;',
    },
    [text('Hello World in JoelmS')]
  );

const view = model =>
  div({}, [
    renderHeader(model),
    p(
      {
        class: 'arroz',
        style: 'background-color: red; color: white;',
      },
      [text('This is an unique counter app')]
    ),
    button(
      {
        onClick: 'OnDecrement',
      },
      [text('Decrement')]
    ),
    text(model.counter.toString()),
    button(
      {
        onClick: 'OnIncrement',
      },
      [text('Increment')]
    ),
  ]);

beginnerProgram({
  root: document.getElementById('root'),
  model: { counter: 0 },
  view: view,
  update: update,
});
