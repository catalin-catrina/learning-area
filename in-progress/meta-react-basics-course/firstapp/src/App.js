import "./App.css";

import Personal from "./components/Personal.js";
import Bag from "./components/Bag.js";
import Apples from "./components/Apples.js";
import Pears from "./components/Pears.js";
import ModeToggler from "./components/ModeToggler.js";
import InputComponent from "./components/InputComponent.js";
import FormComponent from "./components/FormComponent.js";

function App() {
  return (
    <div>
      <Personal myName="Leo" age="29" />

      {/* This is how we use props.children*/}
      <Bag children={<Apples number="29" color="red"></Apples>} />
      {/* same as */}
      <Bag>
        <Apples number="12" color="blue"></Apples>
      </Bag>

      <Bag children={<Pears friend="Peter"></Pears>}></Bag>
      {/* same as */}
      <Bag>
        <Pears friend="Leo"></Pears>
      </Bag>

      <ModeToggler></ModeToggler>
      <hr></hr>
      <InputComponent></InputComponent>
      <hr></hr>
      <FormComponent></FormComponent>
    </div>
  );
}

export default App;
