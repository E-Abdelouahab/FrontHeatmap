import React from 'react';
import { VegaLite } from 'react-vega';

interface HeatMapComponentProps {
  xField: string;
  yField: string;
  valueField: string;
  data: any[]; // Modify the type as needed
}

const HeatMapComponent: React.FC<HeatMapComponentProps> = ({ xField, yField, valueField, data }) => {
  const spec: any = {
    data: { values: data },
    mark: 'rect',
    encoding: {
      x: { field: xField, type: 'ordinal' },
      y: { field: yField, type: 'ordinal' },
      color: { field: valueField, type: 'quantitative' },
    },
  };

  return <VegaLite spec={spec} />;
};

export default HeatMapComponent;
