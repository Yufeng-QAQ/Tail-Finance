import "./PieChar.css"
import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import { groupByMonth, calCategorySpent, findMaxCategory } from "../../../utils/dataProcessing";

ChartJS.register(ArcElement, Tooltip, Legend);


// Data visulization for monthly report
const PieChart = ({ chartSize, year, month }) => {
    const billList = useSelector((state) => state.bills.billList || [])
    const monthlyData = useMemo(() => {
        return groupByMonth(billList)
    }, [billList])

    const [type, setType] = useState('spending')
    const categoryData = calCategorySpent(monthlyData[`${year}-${month + 1}`], type)
    const categoryLabels = Object.keys(categoryData)
    const categoryAmounts = Object.values(categoryData)


    const data = {
        Title: "Monthly Spending",
        labels: categoryLabels,
        datasets: [
            {
                data: categoryAmounts,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.5)',
                    'rgba(255, 99, 132, 0.5)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(153, 102, 255, 0.5)',
                    'rgba(255, 159, 64, 0.5)',
                    'rgba(255, 111, 64, 0.5)'
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 111, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                enabled: true,
            },
        },
    };


    return (
        <div className="Dashboard">
            <div className="report-title">Monthly Report</div>
            <div className="category-type">
                <span onClick={() => { setType("spending") }}
                    className={type === "spending" ? 'selectedCate' : ''}>Spent</span>
                <span onClick={() => { setType("income") }}
                    className={type === "income" ? 'selectedCate' : ''}>Income</span>
            </div>
            {Object.keys(categoryData).length !== 0 ? (
                <div className="PieChart">
                    <div className="chart" style={{ width: chartSize, height: chartSize }}>
                        <Doughnut data={data} options={options} />
                    </div>
                    <div className="information">
                        <div>You {type === "spending" ? "spent" : "earn"} the most on</div>
                        <div>{findMaxCategory(categoryData).maxCategory}</div>
                        <div>For ${findMaxCategory(categoryData).maxAmount}</div>
                    </div>
                </div>
            ) : (
                <div className="no-data">
                    <p>No data available</p>
                </div>
            )}
        </div>

    )
};

export default PieChart;