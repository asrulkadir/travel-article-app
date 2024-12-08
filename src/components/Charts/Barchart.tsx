import Chart from 'react-apexcharts';
import { truncateTitle } from '../../utils/helpers';

interface BarChartProps {
  titlesBar: string[];
  data: number[];
  seriesName: string;
  titleChart: string;
}

const BarChart = ({ titlesBar, data, seriesName, titleChart }: BarChartProps) => {
  const maxTitleLength = 15;
  const truncatedTitles = titlesBar.map(title => truncateTitle(title, maxTitleLength));

  const options = {
    chart: {
      type: 'bar' as const
    },
    xaxis: {
      categories: truncatedTitles
    },
    title: {
      text: titleChart
    },
    tooltip: {
      custom: ({ series, seriesIndex, dataPointIndex }: { series: number[][], seriesIndex: number, dataPointIndex: number }) => {
        return `
          <div class="bg-opacity-75 rounded-lg p-2 pointer-events-none whitespace-nowrap">
            <span class="font-bold block mb-1">
              ${titlesBar[dataPointIndex]}
            </span>
            <span>
              ${seriesName}: ${series[seriesIndex][dataPointIndex]}
            </span>
          </div>`;
      }
    }
  };

  const series = [{
    name: seriesName,
    data: data
  }];

  return <Chart options={options} series={series} type="bar" height={350} />;
};

export default BarChart;