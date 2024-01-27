function Bag(props) {
  const headingStyling = {
    color: "green",
    fontSize: "15px",
  };
  return (
    <div>
      <h1 style={headingStyling}>I am so cool</h1>
      <div>{props.children}</div>
    </div>
  );
}

export default Bag;
