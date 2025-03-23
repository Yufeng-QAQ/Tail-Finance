import "./LineChart.css"
import { months } from "../../../data/data";
import { useSelector } from "react-redux";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { groupByMonth, monthlyResultArrays } from "../../../utils";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = () => {
    const billList = useSelector((state) => (state.bills.billList || []));
    const monthlyList = groupByMonth(billList);
    const result = monthlyResultArrays(monthlyList);


    
    const data = {
        labels: months,
        datasets: [
            {
                label: 'Income',
                yAxisID: 'y-axis-1',
                data: result.income,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Spending',
                yAxisID: 'y-axis-1',
                data: result.spending,
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Income and Spending Over Time',
            },
        },
    };

    return <Line className="line-chart" data={data} options={options} />;
     
}


export default LineChart;