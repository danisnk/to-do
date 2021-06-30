import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [activeTodo, setactiveTodo] = useState(
    localStorage.getItem("activetodo")
      ? JSON.parse(localStorage.getItem("activetodo"))
      : []
  );
  const [deletedTodo, setdeletedTodo] = useState(
    localStorage.getItem("deletedTodo")
      ? JSON.parse(localStorage.getItem("deletedTodo"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("activetodo", JSON.stringify(activeTodo));
    localStorage.setItem("deletedTodo", JSON.stringify(deletedTodo));
  }, [activeTodo, deletedTodo]);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      setactiveTodo([
        ...activeTodo,
        { id: Date.now(), text: todo, status: false },
      ]);
    }
    setTodo("");
  };

  const handleRemove = (data) => {
    setdeletedTodo([...deletedTodo, data]);
    var items = activeTodo.filter((item) => {
      return item !== data;
    });
    setactiveTodo(items);
  };

  return (
    <div className="App">
      <div className="activeTodos todos_section">
        <p className="title">
          <i class="far fa-calendar-alt"></i>
          {today()}, {todayDate()}
        </p>
        <form onSubmit={handleInputSubmit}>
          <input
            type="text"
            className="activeTodosInput"
            placeholder="🖊️ To-do..."
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            autoFocus
          />
        </form>
        <div className="todos">
          {activeTodo.map((data, key) => {
            if (!data.status) {
              return (
                <div key={key} className="todo">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="checkbox"
                    checked={data.status}
                    onChange={(e) => {
                      setactiveTodo(
                        activeTodo.filter((obj) => {
                          if (obj.id === data.id) {
                            obj.status = e.target.checked;
                          }
                          return obj;
                        })
                      );
                    }}
                  />
                  <span className="todoText">{data.text}</span>
                  <span
                    onClick={() => {
                      window.confirm("Removed items can't be restored") &&
                        handleRemove(data);
                    }}
                    className="closeButton"
                  >
                    <i class="fas fa-minus-circle"></i>
                  </span>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="completedTodos todos_section">
        <p className="title">
          <i class="fas fa-check-circle"></i> Done
        </p>
        <div className="todos">
          {activeTodo.map((data, key) => {
            if (data.status) {
              return (
                <div key={key} className="todo">
                  <input
                    type="checkbox"
                    name="checkbox"
                    className="checkbox"
                    checked={data.status}
                    onChange={(e) => {
                      setactiveTodo(
                        activeTodo.filter((obj) => {
                          if (obj.id === data.id) {
                            obj.status = e.target.checked;
                          }
                          return obj;
                        })
                      );
                    }}
                  />
                  <span className="todoText">{data.text}</span>
                  <span
                    onClick={() => {
                      let isdelete = window.confirm(
                        "deleted items can't be restored"
                      );
                      if (isdelete) {
                        var items = activeTodo.filter((item) => {
                          return item !== data;
                        });
                        setactiveTodo(items);
                      }
                    }}
                    className="closeButton delete"
                  >
                    Delete
                  </span>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
      <div className="deletedTodos todos_section">
        <p className="title">
          <i class="fas fa-trash"></i> Removed
        </p>
        <div className="todos">
          {deletedTodo.map((data, key) => {
            return (
              <div className="todo">
                <span className="todoText">{data.text}</span>
                <span
                  onClick={() => {
                    let isdelete = window.confirm(
                      "deleted items can't be restored"
                    );
                    if (isdelete) {
                      var items = deletedTodo.filter((item) => {
                        return item !== data;
                      });
                      setdeletedTodo(items);
                    }
                  }}
                  className="closeButton delete"
                >
                  <i class="far fa-trash-alt"></i>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;

function today() {
  var a = new Date();
  var weekdays = new Array(7);
  weekdays[0] = "Sunday";
  weekdays[1] = "Monday";
  weekdays[2] = "Tuesday";
  weekdays[3] = "Wednesday";
  weekdays[4] = "Thursday";
  weekdays[5] = "Friday";
  weekdays[6] = "Saturday";
  var r = weekdays[a.getDay()];
  return r;
}

function todayDate() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }
  today = dd + "/" + mm + "/" + yyyy;
  return today;
}
