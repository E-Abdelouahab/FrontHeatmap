import { useState, useEffect } from 'react';
import './App.css';
import SelectComponent from './component/select-component';
import HeatMapComponent from './component/heatmap';
import axios from 'axios';

function App() {
  const [selectedGeneIds, setSelectedGeneIds] = useState([]);
  const [selectedSRA, setSelectedSRA] = useState();
  const [selectedExperiment, setSelectedExperiment] = useState();
  const [selectedDisease, setSelectedDisease] = useState();
  const [heatmapData, setHeatmapData] = useState([]);
  const handleSelect = (selectionType: any, selectedOptions: any) => {
    switch (selectionType) {
      case 'Gene IDs':
        setSelectedGeneIds(selectedOptions);
        break;
      case 'SRA':
        setSelectedSRA(selectedOptions);
        break;
      case 'Experiment':
        setSelectedExperiment(selectedOptions);
        break;
      case 'Disease':
        setSelectedDisease(selectedOptions);
        break;
      default:
        break;
    }
  };
  const geneIdsOptions = [
    { value: 'gene1', label: 'Gene 1' },
    { value: 'gene2', label: 'Gene 2' },
  ];

  const sraOptions = [
    { value: 'sra1', label: 'SRA 1' },
    { value: 'sra2', label: 'SRA 2' },
  ];

  const experimentOptions = [
    { value: 'exp1', label: 'Experiment 1' },
    { value: 'exp2', label: 'Experiment 2' },
  ];

  const diseaseOptions = [
    { value: 'disease1', label: 'Disease 1' },
    { value: 'disease2', label: 'Disease 2' },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.URL}/getData`, {
          params: {
            gene_ids: selectedGeneIds,
            sra: selectedSRA,
            experiment: selectedGeneIds,
            disease: selectedSRA,
          },
        });
        console.log('Fetched data:', response.data);
        const transformedData = response.data.map((item: any) => ({
          "SRA": item.SRA,
          "Gene IDs": item.gene_ids,
          "value": parseFloat(item.value), // Convert value to a number
        }));
        setHeatmapData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedGeneIds, selectedSRA, selectedExperiment, selectedDisease]);

  return (
    <div className="App">
      <div className="px-11 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <h1 className="ho">Mentalome:</h1>
        <div className=".container-fluid p-10 gap-5 flex items-center justify-center">
          <SelectComponent selectionType="Gene IDs" options={geneIdsOptions} onSelect={handleSelect} />
          <SelectComponent selectionType="SRA" options={sraOptions} onSelect={handleSelect} />
          <SelectComponent selectionType="Experiment" options={experimentOptions} onSelect={handleSelect} />
          <SelectComponent selectionType="Disease" options={diseaseOptions} onSelect={handleSelect} />
        </div>
      </div>
      <div className="px-11 py-11 w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <HeatMapComponent
          xField="SRA"
          yField="Gene IDs"
          valueField="value"
          data={heatmapData}
        />
      </div>
    </div>
  );
}

export default App;
