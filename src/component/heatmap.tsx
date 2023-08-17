import React from "react";
import { VegaLite } from "react-vega";

interface HeatMapComponentProps {
  xField: string;
  yField: string;
  valueField: string;
  data: any[];
}
const HeatMapComponent: React.FC<HeatMapComponentProps> = ({
  xField,
  yField,
  valueField,
  data,
}) => {
  const transformedData = Object.keys(data).flatMap((abbreviation: any) => {
    return data[abbreviation].map((item: any) => ({
      SRA: item.SRA,
      "Gene IDs": item.gene_ids,
      value: parseFloat(item.value),
      Abbreviation: abbreviation, 
    }));
  });

  const hasCT = transformedData.some((item) => item.Abbreviation === "CT");
  const hasPT = transformedData.some((item) => item.Abbreviation === "PT");
  
  const colorBarStyle = {
    background: `linear-gradient(${
      hasCT && hasPT
        ? "to right,  #56BD89  50%,  #6E85B7   50%"
        : "to right,  #56BD89  100%,  #6E85B7   0%"
    })`,
  };

  const spec: any = {
    data: { values: transformedData },
    mark: {
      type: "rect",
      tooltip: true, 
    },
    encoding: {
      x: { field: xField, type: "ordinal" },
      y: { field: yField, type: "ordinal" },
      color: {
        field: valueField,
        type: "quantitative",
        legend: { title: "Value"},
        aggregate: "mean"
      },
    },
    config: {
      axis: {"grid": true,
      tickBand: "extent"
      },
      view: {
        width: 1200, 
        height: 600, 
      },
      legend: {
        title: 'Value',
        titleFontSize: 10,
        labelFontSize: 10,
        titlePadding: 10,
        labelPadding: 20,
        gradientLength: 580, 
        gradientThickness: 15, 
      },

    },
  };

  return (
    <div className="heatmap-container">
      <div className="color-bar" style={colorBarStyle}></div>
      <VegaLite spec={spec} />

      <div className="p-4 border border-gray-300 rounded-lg shadow-md">
        {hasCT && (
          <div className="mb-2">
            <div className="flex items-center">
              {hasCT &&  hasPT ? <div className="w-6 h-6 bg-blue-500 mr-2"></div> : <div className="w-6 h-6 bg-green-500 mr-2"></div>}
              <div className="text-sm">CT</div>
            </div>
          </div>
        )}
        {hasPT && (
          <div className="flex items-center">
            <div className="w-6 h-6 bg-green-500 mr-2"></div>
            <div className="text-sm">PT</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatMapComponent;
