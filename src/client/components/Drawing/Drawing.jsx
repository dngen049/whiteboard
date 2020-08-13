import React from "react";

class Drawing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawing: false,
      location: {},
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
  componentDidUpdate() {
    if (this.props.coordinates) {
      this.props.coordinates.forEach((coordinate) => {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { x1, y1, x2, y2, color } = coordinate;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.stroke();
        ctx.closePath();
      });
    }
  }
  handleMouseDown = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    this.setState({ isDrawing: true });
    ctx.beginPath();
    const x = e.pageX - canvas.offsetLeft;
    const y = e.pageY - canvas.offsetTop;
    ctx.moveTo(x, y);
    console.log(x, y);
    this.setState({ location: { x, y } });
  };
  handleMouseMove = (e) => {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (this.state.isDrawing) {
      const x2 = e.pageX - canvas.offsetLeft;
      const y2 = e.pageY - canvas.offsetTop;
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = this.props.color;
      ctx.stroke();
      const { x, y } = this.state.location;
      this.props.onDraw(x, y, x2, y2, this.props.color);
      this.setState({ location: { x: x2, y: y2 } });
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
