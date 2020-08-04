import React from "react";
class Drawing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  handleMouseDown = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    this.setState({ isDrawing: true });
    ctx.beginPath();
    ctx.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
  };
  handleMouseMove = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (this.state.isDrawing) {
      ctx.lineTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
      ctx.strokeStyle = "#000";
      ctx.stroke();
    }
  };
  handleMouseUp = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (this.state.isDrawing) {
      this.setState({ isDrawing: false });
      ctx.closePath();
    }
  };
  render() {
    return (
      <canvas
        ref={this.canvasRef}
        onMouseDown={this.handleMouseDown}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}
        style={{ cursor: "crosshair" }}
        id="thisCanvas"
      />
    );
  }
}
export default Drawing;
