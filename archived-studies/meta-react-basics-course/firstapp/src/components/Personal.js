function Personal(props) {
  console.log(props);
  return (
    <div className="personal-section">
      <div>
        <h2>
          my name is {props.name} and my age is {props.age}
        </h2>
      </div>
    </div>
  );
}

export default Personal;
