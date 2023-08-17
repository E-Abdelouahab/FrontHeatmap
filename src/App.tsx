import { useState, useEffect } from 'react';
import './App.css';
import SelectComponent from './component/select-component';
import HeatMapComponent from './component/heatmap';
import axios from 'axios';
interface SelectInterface {
 label : string;
 value : string;
}
function App() {
  const [selectedGeneIds, setSelectedGeneIds] = useState<SelectInterface[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<SelectInterface>();
  const [selectedExpriment, setSelectedExpriment] = useState<SelectInterface>();
  const [selectedSRA, setSelectedSRA] = useState<SelectInterface>();
  const [isLoading, setIsLoading] = useState(false);
  
  const [heatmapData, setHeatmapData] = useState([]);
  const handleSelect = (selectionType: any, selectedOptions: any) => {
    switch (selectionType) {
      case 'Gene IDs':
        setSelectedGeneIds(selectedOptions);
        break;
        case 'Disease':
        setSelectedDisease(selectedOptions);
        break;
        case 'Expriment':
        setSelectedExpriment(selectedOptions);
        break;
        case 'SRA':
        setSelectedSRA(selectedOptions);
        break;
        default:
        break;
    }
  };
  const geneIdsOptions = [
    { value: 'A1BG', label: 'A1BG' },
    { value: 'A1BG-AS1', label: 'A1BG-AS1' },
    { value: 'A1CF', label: 'A1CF' },
    { value: 'A2M-AS1', label: 'A2M-AS1' },
    { value: 'A2ML1', label: 'A2ML1' },
    { value: 'A2MP1', label: 'A2MP1' },
    { value: 'A3GALT2', label: 'A3GALT2' },
    { value: 'A4GALT', label: 'A4GALT' },
    { value: 'A4GNT', label: 'A4GNT' },
    { value: 'AA06', label: 'AA06' },
    { value: 'AAAS', label: 'AAAS' },
    { value: 'AACSP1', label: 'AACSP1' },
    { value: 'AADACL2', label: 'AADACL2' },
    { value: 'AADACL2-AS1', label: 'AADACL2-AS1' },
    { value: 'AADACL3', label: 'AADACL3' },
    { value: 'AADACL4', label: 'AADACL4' },
    { value: 'AADACP1', label: 'AADACP1' },
    { value: 'AADAT', label: 'AADAT	' },
    { value: 'AAGAB', label: 'AAGAB	' },
    { value: 'AAK1', label: 'AAK1	' },
    { value: 'AAMDC', label: 'AAMDC		' },
    { value: 'AAMP', label: 'AAMP		' },
    { value: 'AANAT', label: 'AANAT' },
    { value: 'AAR2', label: 'AAR2' },
    { value: 'AARD', label: 'AARD' },
    { value: 'AARS1	', label: 'AARS1' },
    { value: 'AARS1P1', label: 'AARS1P1' },
  ];

  const diseaseOptions = [
    { value: 'Autism', label: 'Autism' },
    { value: 'Alzheimer', label: 'Alzheimer' },
    { value: 'Schizophrenia', label: 'Schizophrenia' },
    { value: 'Bipolar', label: 'Bipolar' },
    { value: 'Parkinson', label: 'Parkinson' },
  ];

  const sraOptions = [
    { value: 'SRR309133', label: 'SRR309133' },
    { value: 'SRR309134', label: 'SRR309134' },
    { value: 'SRR309135', label: 'SRR309135' },
    { value: 'SRR309136', label: 'SRR309136' },
    { value: 'SRR309137', label: 'SRR309137' },
    { value: 'SRR309138', label: 'SRR309138' },
    { value: 'SRR309139', label: 'SRR309139' },
    { value: 'SRR309140', label: 'SRR309140' },
    { value: 'SRR309141', label: 'SRR309141' },
    { value: 'SRR309142', label: 'SRR309142' },
    { value: 'SRR309143', label: 'SRR309143' },
    { value: 'SRR309144', label: 'SRR309144' },
    { value: 'SRR21029644', label: 'SRR21029644' },
    { value: 'SRR21029645', label: 'SRR21029645' },
    { value: 'SRR21029646', label: 'SRR21029646' },
    { value: 'SRR21029647', label: 'SRR21029647' },
    { value: 'SRR21029648', label: 'SRR21029648' },
    { value: 'SRR21029649', label: 'SRR21029649' },
    { value: 'SRR21029650', label: 'SRR21029650' },
    { value: 'SRR21029651', label: 'SRR21029651' },
    { value: 'SRR21029652', label: 'SRR21029652' },
    { value: 'SRR21029653', label: 'SRR21029653' },
    { value: 'SRR21029654', label: 'SRR21029654' },
    { value: 'SRR21029655', label: 'SRR21029655' },
    { value: 'SRR21029656', label: 'SRR21029656' },
    { value: 'SRR21029657', label: 'SRR21029657' },
    { value: 'SRR21029658', label: 'SRR21029658' },
    { value: 'SRR21029659', label: 'SRR21029659' },
    { value: 'SRR21029660', label: 'SRR21029660' },
    { value: 'SRR21029661', label: 'SRR21029661' },
    { value: 'SRR21029662', label: 'SRR21029662' },
    { value: 'SRR21029663', label: 'SRR21029663' },
    { value: 'SRR21029664', label: 'SRR21029664' },
    { value: 'SRR21029665', label: 'SRR21029665' },
    { value: 'SRR21029666', label: 'SRR21029666' },
    { value: 'SRR21029667', label: 'SRR21029667' },
    { value: 'SRR21029668', label: 'SRR21029668' },
    { value: 'SRR21029669', label: 'SRR21029669' },
    { value: 'SRR21029670', label: 'SRR21029670' },
    { value: 'SRR21029671', label: 'SRR21029671' },
    { value: 'SRR21029672', label: 'SRR21029672' },
    { value: 'SRR21029673', label: 'SRR21029673' },
    { value: 'SRR21029674', label: 'SRR21029674' },
    { value: 'SRR21029675', label: 'SRR21029675' },
    { value: 'SRR21029676', label: 'SRR21029676' },
    { value: 'SRR21029677', label: 'SRR21029677' },
    { value: 'SRR21029678', label: 'SRR21029678' },
    { value: 'SRR21029679', label: 'SRR21029679' },
    { value: 'SRR21029680', label: 'SRR21029680' },
    { value: 'SRR21029681', label: 'SRR21029681' },
    { value: 'SRR21029682', label: 'SRR21029682' },
  ];

  const exprimentOptions = [
    
    { value: 'PRJNA869106', label: 'PRJNA869106' },
    { value: 'PRJNA143369', label: 'PRJNA143369' },
  ];


  console.log(selectedSRA);
  
  useEffect(() => {
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`http://localhost:8000/api/getData`, {
          gene_ids: selectedGeneIds.map((item:any) => item.value),
          disease: selectedDisease?.value,
          experiment: selectedExpriment?.value,
          sra: selectedSRA?.value,
          
          
        });
        console.log('Fetched data:', response.data);
        // const transformedData = response.data.map((item: any) => ({
        //   "SRA": item.SRA,
        //   "Gene IDs": item.gene_ids,
        //   "value": parseFloat(item.value), 
        // }));
        setHeatmapData(response.data);
        setIsLoading(false);
        // console.log('Fetched data:', transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedGeneIds, selectedSRA, selectedExpriment, selectedDisease]);

  return (
    <div className="App">
      <div className=" bg-green-300 px-11 w-full rounded">
        <h1 className="underline decoration-indigo-500  font-serif text-2xl">Mentalome:</h1>
        <div className="mt-6 text-base font-mono"> <SelectComponent selectionType="Gene IDs" options={geneIdsOptions} onSelect={handleSelect} /></div>
        <div className=" text-base mt-2 py-10 gap-5 grid grid-cols-3 font-mono" >
        <SelectComponent selectionType="Disease" options={diseaseOptions} onSelect={handleSelect} />
        <SelectComponent selectionType="Experiment" options={exprimentOptions} onSelect={handleSelect} />
        <SelectComponent selectionType="SRA" options={sraOptions} onSelect={handleSelect} />
    
        </div>
      </div>
      <div className="  bg-green-300 px-11 py-11 w-full rounded">
     <HeatMapComponent
          xField="SRA"
          yField="Gene IDs"
          valueField="value"
          data={heatmapData}
        /> 
       {isLoading && <p>Loading...</p>}
      </div>  
 
    </div>
  );
}

export default App;
