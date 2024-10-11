import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

const AddForm = ({ total, dispatch, showAddForm }) => {
  let form = React.useRef(null);

  function push() {
    form.current.style.setProperty("translate", `-50% ${(-10 * -1) / total}%`);
  }

  React.useEffect(() => {
    form.current.style.setProperty("width", `${300 - (-1 * 15) / total}px`);
    push();
  }, [total]);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "addTodo",
      payload: {
        title: form.current.querySelector("#title").value,
        desc: form.current.querySelector("#desc").value,
        complete: false,
      },
    });
  }

  return (
    <form className="todo-wrapper" ref={form} onSubmit={handleSubmit}>
      <div className="todo-form">
        <button className="cancel" onClick={showAddForm} type="button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
        <input
          type="text"
          className="field"
          id="title"
          name="title"
          placeholder="Todo Title"
        />
        <textArea
          id="desc"
          className="field"
          name="desc"
          placeholder="Todo Description"
        ></textArea>
        <button className="submit" type="submit">
          <span className="content">Add todo</span>
          <span className="icon-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
};

const ButtonGroup = ({ dispatch, showAddForm }) => {
  return (
    <div className="button-group">
      <button className="add" onClick={showAddForm}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
      <button className="done" onClick={() => dispatch({ type: "done" })}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 12.75 6 6 9-13.5"
          />
        </svg>
      </button>
      <button className="delete" onClick={() => dispatch({ type: "remove" })}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </button>
    </div>
  );
};

const Todo = ({ index, title, desc, total, dispatch, complete }) => {
  let todo = React.useRef(null);

  function pop() {
    if (index !== total)
      todo.current.style.setProperty("translate", `-50% -50%`);
  }
  function push() {
    todo.current.style.setProperty(
      "translate",
      `-50% ${(-10 * (total - index)) / total}%`
    );
  }

  React.useEffect(() => {
    todo.current.style.setProperty(
      "width",
      `${300 - ((total - index) * 15) / total}px`
    );
    push();
  }, [total, index]);

  return (
    <div
      className="todo-wrapper"
      ref={todo}
      onMouseEnter={pop}
      onMouseLeave={push}
      onClick={() =>
        dispatch({ type: "forward", payload: { title, desc, complete } })
      }
    >
      <div className="todo">
        {index === total && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="todo-icon"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
            />
          </svg>
        )}
        <h3>{title}</h3>
        <span
          className="todo-index"
          style={{ textDecoration: `${complete ? "line-through" : "none"}` }}
        >
          {index < 10 ? "0" + index : index}
        </span>
        <p>{desc}</p>
      </div>
    </div>
  );
};

const App = () => {
  const [show, setShow] = React.useState(false);

  const [todos, dispatch] = React.useReducer(reducer, [
    {
      title: "Complete React tutorial",
      complete: false,
      desc: "Finish the React tutorial on Codecademy.",
    },
    {
      title: "Grocery shopping",
      complete: false,
      desc: "Buy milk, eggs, bread, and fruits.",
    },
    {
      title: "Meet with clients",
      complete: false,
      desc: "Discuss project requirements and timeline.",
    },
    {
      title: "Workout",
      complete: false,
      desc: "Do 30 minutes of cardio and strength training.",
    },
    {
      title: "Read a book",
      complete: false,
      desc: "Finish reading 'The Great Gatsby'.",
    },
  ]);

  return (
    <>
      {todos.map((ele, idx) => (
        <Todo
          key={idx}
          index={idx + 1}
          {...ele}
          total={todos.length}
          dispatch={dispatch}
        />
      ))}
      {show && (
        <AddForm
          total={todos.length}
          dispatch={dispatch}
          showAddForm={() => setShow(false)}
        />
      )}
      <ButtonGroup dispatch={dispatch} showAddForm={() => setShow(true)} />
    </>
  );
};

ReactDOM.render(<App />, document.body);

function reducer(state, action) {
  let tempState = state,
    card = action.payload,
    cardIndex = tempState.length - 1;
  switch (action.type) {
    case "forward":
      tempState = tempState.filter(
        (ele) => ele.title !== card.title && ele.desc !== card.desc
      );
      return [...tempState, card];
    case "done":
      return [
        ...tempState.slice(0, cardIndex),
        { ...tempState[cardIndex], complete: true },
      ];
    case "remove":
      return [...tempState.slice(0, cardIndex)];
    case "addTodo":
      return [...tempState, card];
  }
}
