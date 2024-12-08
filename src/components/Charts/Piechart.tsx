import Chart from 'react-apexcharts';

interface PieChartProps {
  data: { [key: string]: number };
  titleChart: string;
}

const PieChart = ({ data, titleChart }: PieChartProps) => {
  const options = {
    labels: Object.keys(data),
    title: {
      text: titleChart
    }
  };

  const series = Object.values(data);

  return <Chart options={options} series={series} type="pie" height={350} />;
};

export default PieChart;