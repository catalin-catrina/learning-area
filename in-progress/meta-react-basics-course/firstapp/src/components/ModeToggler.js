function ModeToggler() {
  let dark = false;
  const toggle = function () {
    dark = !dark;
    console.log("current value is", dark);
  };
  return <button onClick={toggle}>Toggle Light/Dark</button>;
}

export default ModeToggler;
