import React from 'react';
import axios from 'axios';

const WorkoutsContext = React.createContext();

function workoutsReducer(state, action) {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { workouts: action.payload };
    case 'CREATE_WORKOUT':
      return { workouts: [action.payload, ...state.workouts] };
    case 'DELETE_WORKOUT':
      return { workouts: state.workouts.filter(w => w._id !== action.payload._id) };
    default:
      return state;
  }
}

function WorkoutDetails({ workout }) {
  const { dispatch } = React.useContext(WorkoutsContext);

  const handleDelete = () => {
    axios.delete('http://localhost:5000/api/workouts/' + workout._id)
      .then(res => {
        dispatch({ type: 'DELETE_WORKOUT', payload: res.data });
      })
      .catch(err => {
        console.log("Delete error");
      });
  };

  const formatTime = (dateString) => {
    const diff = new Date() - new Date(dateString);
    const secs = Math.floor(diff / 1000);
    if (secs < 60) return secs + " seconds ago";
    const mins = Math.floor(secs / 60);
    if (mins < 60) return mins + " minutes ago";
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return hrs + " hours ago";
    return Math.floor(hrs / 24) + " days ago";
  };

  return (
    <div className="workout-card">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Reps: </strong>{workout.reps}</p>
      <p className="time-txt">{formatTime(workout.createdAt)}</p>
      <button className="del-btn" onClick={handleDelete}>Delete</button>
    </div>
  );
}

function WorkoutForm() {
  const { dispatch } = React.useContext(WorkoutsContext);
  const [title, setTitle] = React.useState("");
  const [load, setLoad] = React.useState("");
  const [reps, setReps] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !load || !reps) {
      setErrorMsg("Please fill in all fields");
      return;
    }

    axios.post('http://localhost:5000/api/workouts', { title, load, reps })
      .then(res => {
        dispatch({ type: 'CREATE_WORKOUT', payload: res.data });
        setTitle("");
        setLoad("");
        setReps("");
        setErrorMsg("");
      })
      .catch(err => {
        setErrorMsg("Failed to add workout");
      });
  };

  return (
    <form onSubmit={handleSubmit} className="add-form">
      <div className="form-group">
        <label>Workout Title:</label>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Load (kg):</label>
        <input 
          type="number" 
          value={load} 
          onChange={(e) => setLoad(e.target.value)} 
        />
      </div>
      <div className="form-group">
        <label>Reps:</label>
        <input 
          type="number" 
          value={reps} 
          onChange={(e) => setReps(e.target.value)} 
        />
      </div>
      <button type="submit" className="submit-btn">Add Workout</button>
      {errorMsg && <div className="error-msg-box">{errorMsg}</div>}
    </form>
  );
}

function App() {
  const [state, dispatch] = React.useReducer(workoutsReducer, { workouts: [] });

  React.useEffect(() => {
    axios.get('http://localhost:5000/api/workouts')
      .then(res => {
        dispatch({ type: 'SET_WORKOUTS', payload: res.data });
      })
      .catch(err => {
        console.log("Fetch error");
      });
  }, []);

  return (
    <WorkoutsContext.Provider value={{ state, dispatch }}>
      <div className="workout-buddy-app">
        <header className="navbar-header">
          <h1>Workout Budyyy</h1>
        </header>

        <div className="two-column-layout">
          <div className="left-column">
            <h2>List of Workouts</h2>
            {state.workouts && state.workouts.map(w => (
              <WorkoutDetails key={w._id} workout={w} />
            ))}
          </div>

          <div className="right-column">
            <h2>Add a New Workout</h2>
            <WorkoutForm />
          </div>
        </div>
      </div>
    </WorkoutsContext.Provider>
  );
}

export default App;
export { WorkoutsContext };
