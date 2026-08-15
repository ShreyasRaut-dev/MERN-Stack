import React from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [titleInput, setTitleInput] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [lodinng, setLodinng] = React.useState(false);
  const [erorMsg, setErorMsg] = React.useState("");

  React.useEffect(() => {
    fetchData();
  }, [search]);

  const fetchData = () => {
    setLodinng(true);
    axios.get('http://localhost:5000/api/todo?search=' + search)
      .then(res => {
        setTasks(res.data);
        setErorMsg("");
      })
      .catch(err => {
        setErorMsg("Fech tasks eror");
      })
      .finally(() => {
        setLodinng(false);
      });
  };

  const handleSubmitt = (e) => {
    e.preventDefault();
    if (!titleInput.trim()) return;
    setLodinng(true);
    axios.post('http://localhost:5000/api/todo', { title: titleInput })
      .then(res => {
        setTasks([res.data, ...tasks]);
        setTitleInput("");
        setErorMsg("");
      })
      .catch(err => {
        setErorMsg("Add task failed");
      })
      .finally(() => {
        setLodinng(false);
      });
  };

  const toggleStatus = (id, val) => {
    setLodinng(true);
    axios.put('http://localhost:5000/api/todo/' + id, { completed: !val })
      .then(res => {
        setTasks(tasks.map(t => t._id === id ? res.data : t));
      })
      .catch(err => {
        setErorMsg("Update status failed");
      })
      .finally(() => {
        setLodinng(false);
      });
  };

  const deleteItem = (id) => {
    setLodinng(true);
    axios.delete('http://localhost:5000/api/todo/' + id)
      .then(() => {
        setTasks(tasks.filter(t => t._id !== id));
      })
      .catch(err => {
        setErorMsg("Delete failed");
      })
      .finally(() => {
        setLodinng(false);
      });
  };

  return (
    <div className="todo-app-body">
      <h1 className="title-txt">To-Do Dashboard</h1>

      {erorMsg && <div className="error-banner">{erorMsg}</div>}

      <div className="search-bar-container">
        <input 
          type="text" 
          placeholder="Search task..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
      </div>

      <form onSubmit={handleSubmitt} className="todo-form">
        <input 
          className="task-input" 
          type="text" 
          placeholder="Write a task here..." 
          value={titleInput}
          onChange={(e) => setTitleInput(e.target.value)}
        />
        <button type="submit" className="submit-btn">Submitt</button>
      </form>

      {lodinng && <div className="loading-indicator">Lodinng list...</div>}

      <ul className="task-list">
        {tasks.map(t => (
          <li key={t._id} className="task-item">
            <span 
              onClick={() => toggleStatus(t._id, t.completed)}
              className={t.completed ? "task-completed" : "task-pending"}
            >
              {t.title}
            </span>
            <button onClick={() => deleteItem(t._id)} className="delete-btn">Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
