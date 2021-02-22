import React, {createRef} from 'react';
import {RadialGauge, RadialGaugeOptions} from 'canvas-gauges';

type Props = Omit<RadialGaugeOptions, 'renderTo'>;

export default class ReactRadialGauge extends React.Component<Props> {
  private canvasRef = createRef<HTMLCanvasElement>();
  private gauge: RadialGauge | undefined;

  getOptions = (props: Props) => ({...props, renderTo: this.canvasRef.current!, highlights: props.highlights ?? []});

  componentDidMount() {
    this.gauge = new RadialGauge(this.getOptions(this.props)).draw();
  }

  componentWillReceiveProps(nextProps: Props) {
    this.gauge!.value = nextProps.value!;
    this.gauge!.update(this.getOptions(nextProps));
  }

  render() {
    return (
      <canvas ref={this.canvasRef} />
    );
  }
}
