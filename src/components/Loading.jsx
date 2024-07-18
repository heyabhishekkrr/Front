import { Spinner } from "react-bootstrap";

const Loading = () => {
    var bgColors = { "Default": "#81b71a",
        "Blue": "#00B1E1"
};
  return (
    <div style={{
        top: "0px",
        position: "fixed",
        width: "100%",
        height:"100%",
        overflow: "hidden",
        zIndex:1000,
        backgroundColor: bgColors.Blue

      }} >
    <Spinner
      animation='border'
      role='status'
      style={{
        width: "150px",
        height: "150px",
        margin: "36vh auto",
    
        display: "block",
      }}
    ></Spinner></div>
  );
};

export default Loading;
