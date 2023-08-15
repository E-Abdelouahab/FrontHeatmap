import React from 'react';
import { VegaLite } from 'react-vega';

interface HeatMapComponentProps {
  xField: string;
  yField: string;
  valueField: string;
  data: any[]; 
}

const HeatMapComponent: React.FC<HeatMapComponentProps> = ({ xField, yField, valueField, data }) => {
  const spec: any = {
    data: { values: data },
    mark: {
      type: 'rect',
      tooltip: true, // Enable tooltips for the rect marks
    },
    encoding: {
      x: { field: xField, type: 'ordinal' },
      y: { field: yField, type: 'ordinal' },
      color: { field: valueField, type: 'quantitative' },
    },
    config: {
      view: {
        // Additional configuration options can be added here
      },
    },
  };

  return <VegaLite spec={spec} />;
};

export default HeatMapComponent;
