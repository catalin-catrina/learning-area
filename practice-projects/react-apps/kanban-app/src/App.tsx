import "./App.css";

function App() {
  return (
    <>
      <div className="container">
        <div className="cols">
          <div className="col">
            <div className="col-header">
              <h2>To Do</h2>
            </div>
            <div className="col-body"></div>
          </div>
          <div className="col">
            <div className="col-header">
              <h2>In Progress</h2>
            </div>
            <div className="col-body"></div>
          </div>
          <div className="col">
            <div className="col-header">
              <h2>Done</h2>
            </div>
            <div className="col-body"></div>
          </div>
        </div>
        <div className="cards">
          <div className="card">
            <div className="card-header">
              <h2>Create the project template</h2>
            </div>
            <div className="card-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              voluptates!
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2>Define the structure</h2>
            </div>
            <div className="card-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              voluptates!
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2>Add reactivity</h2>
            </div>
            <div className="card-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              voluptates!
            </div>
          </div>
          <div className="card">
            <div className="card-header">
              <h2>Allow users to create new cards</h2>
            </div>
            <div className="card-body">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam,
              voluptates!
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
