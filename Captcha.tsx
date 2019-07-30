import React, { Component } from 'react';


function getRandomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6);
}

interface IProps {
  text: string;
  width?: number;
  height?: number;
  fontSize?: number;
  onClick?(): void;
}

interface IState { }

export default class Captcha extends Component<IProps, IState> {

  private canvas: React.RefObject<HTMLCanvasElement>;

  static defaultProps = {
    width: 60,
    height: 30,
    fontSize: 14,
  }

  constructor(props) {
    super(props);
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.draw();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.text != this.props.text) {
      this.draw();
    }
  }

  draw() {
    const { text, width, height, fontSize } = this.props;
    if (text) {
      const ctx = this.canvas.current.getContext('2d');
      ctx.clearRect(0, 0, width, height);
      ctx.font = "14px serif";
      const letters = text.split('');
      const averageWidth = (width - fontSize) / letters.length;
      letters.forEach((letter, index) => {
        const x = averageWidth * index + fontSize / 2;
        const y = (height + fontSize) / 2;
        const radian = Math.random() < 0.5
          ? -Math.PI / 180 * Math.random() * 15
          : Math.PI / 180 * Math.random() * 15;
        ctx.translate(x, 0);
        ctx.rotate(radian);
        ctx.fillStyle = getRandomColor();
        ctx.fillText(letter, 0, y);
        ctx.rotate(-radian);
        ctx.translate(-x, 0);
      });
    }
  }

  render() {
    const {
      width,
      height,
      onClick,
    } = this.props;
    return (
      <canvas
        className="cm-captcha"
        ref={this.canvas}
        width={width}
        height={height}
        onClick={onClick}
      />
    );
  }
}
