import "./Styles/Budget.css"
import { months } from "../data/data";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { iconImgs } from "../data/images";

// import components
import DailyTransaction from "./components/Budget_Components/DailyTransaction/DailyTransaction";
import CreateTrans from "./components/Budget_Components/createTrans/createTrans";
import PieChart from "./components/PieChart/PieChar";



const getYearMonthDayKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1 and pad to 2 digits
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`
}

const getYearMonthKey = (date) => {
    const year = date.getFullYear()
    const month = date.getUTCMonth() + 1; // Months are 0-based, so add 1
    return `${year}-${month}`
}

const groupedByDate = (list, dateKeyFormat) => {
    if (!list) return {}
    return list.reduce((result, currentItem) => {
        const date = new Date(currentItem.date)
        const key = dateKeyFormat(date)

        if (!result[key]) {
            result[key] = []
        }

        // Push the current item to the corresponding month array
        result[key].push(currentItem)
        return result
    }, {})
}


const Budget = () => {
    const billList = useSelector((state) => state.bills.billList || []);

    const sortedTransactions = useMemo(() => {
        return [...billList].sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [billList]);

    const groupedByMonth = useMemo(() => {
        return groupedByDate(sortedTransactions, getYearMonthKey)
    }, [sortedTransactions])


    const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [currentMonthList, setMonthList] = useState([]);

    const [isCreateTransVisible, setCreateTransVisible] = useState(false)
    const toggleCreateTrans = () => { setCreateTransVisible(!isCreateTransVisible) }

    // Load data when website is rendered
    useEffect(() => {
        const newMonthList = groupedByMonth[`${selectedYear}-${selectedMonth + 1}`] || [];
        setMonthList(newMonthList);
    }, [selectedMonth, selectedYear, groupedByMonth]);

    const handleMonthChange = (index) => {
        setSelectedMonth(index)
        setShowDatePicker(false)
        setMonthList(groupedByMonth[`${selectedYear}-${index + 1}`])
    }

    const handleYearChange = (increment) => {
        setSelectedYear(selectedYear + (increment ? 1 : -1))
    }

    const toggleDatePicker = () => {
        setShowDatePicker(!showDatePicker)
    }



    const monthResult = useMemo(() => {
        if (!currentMonthList) return { spending: 0, income: 0, total: 0 };
        const spending = currentMonthList.filter(item => item.type === 'spending').reduce((a, c) => a + c.amount, 0)
        const income = currentMonthList.filter(item => item.type === 'income').reduce((a, c) => a + c.amount, 0)
        return {
            spending, income, total: income - spending
        }
    }, [currentMonthList])

    // Summarize transaction in terms of days
    const groupedByDay = useMemo(() => {
        const groupData = groupedByDate(currentMonthList, getYearMonthDayKey)
        const keys = Object.keys(groupData)
        return {
            groupData, keys
        }
    }, [currentMonthList])

    const changeMonth = (direction) => {
        if (direction === 'next') {
            if (selectedMonth === 11) {
                setSelectedYear(selectedYear + 1)
            }
            setSelectedMonth((selectedMonth + 1) % 12)
        } else {
            if (selectedMonth === 0) {
                setSelectedYear(selectedYear - 1)
                setSelectedMonth(11)
            } else {
                setSelectedMonth(selectedMonth - 1)
            }
        }
    }

    return (
        <div className="Budget">
            <div className="content">
                <div className="createTrans-BTN">
                    <div className="createTrans-text" onClick={toggleCreateTrans}>New Transaction</div>
                </div>

                <CreateTrans isVisible={isCreateTransVisible} onClose={toggleCreateTrans}></CreateTrans>

                <div className="budget-header">
                    <div className="select-month">
                        <img src={iconImgs.left} alt="left" className="month-btn" onClick={() => changeMonth('prev')} />
                        <div className="date" onClick={toggleDatePicker}>
                            <span>{String(selectedMonth + 1).padStart(2, '0')} | {selectedYear}</span>
                            <span className={`arrow ${showDatePicker && 'expand'}`}></span>
                        </div>
                        <img src={iconImgs.right} alt="right" className="month-btn" onClick={() => changeMonth('next')} />

                        {showDatePicker && (
                            <div className="date-picker" >
                                <div className="year">
                                    <div className="prev-year" onClick={() => handleYearChange(false)}></div>
                                    {selectedYear < new Date().getFullYear() &&
                                        <div className="next-year" onClick={() => handleYearChange(true)}></div>}

                                </div>
                                {months.map((month, index) => (
                                    <div
                                        className="month"
                                        key={index}
                                        onClick={() => handleMonthChange(index)}>
                                        {month}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>


                    <div className="summary">
                        <div className="item">
                            <span className="type" style={{ color: 'rgb(180, 87, 87)' }}>Spending</span>
                            <span className="money">${monthResult.spending.toFixed(2)}</span>
                        </div>
                        <div className="item">
                            <span className="type" style={{ color: 'var(--clr-green)' }}>Income</span>
                            <span className="money">${monthResult.income.toFixed(2)}</span>
                        </div>
                        <div className="item">
                            <span className="type">Surplus</span>
                            <span className="money">${monthResult.total.toFixed(2)}</span></div>
                    </div>
                </div>

                <div className="day-summary">
                    {
                        groupedByDay.keys.map(key => {
                            return <DailyTransaction key={key} date={key} billList={groupedByDay.groupData[key]}></DailyTransaction>
                        })
                    }
                </div>

            </div>


            <PieChart chartSize={330} year={selectedYear} month={selectedMonth}></PieChart>

        </div>
    )
}

export default Budget
