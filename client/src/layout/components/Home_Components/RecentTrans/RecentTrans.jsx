import "./RecentTrans.css"
import { useSelector } from "react-redux"
import { useMemo } from "react"


const RecentTrans = () => {
    const billList = useSelector((state) => state.bills.billList || [])  

    const RecentTransactions = useMemo(() => {
        return [...billList];
    }, [billList]);

    RecentTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))


    return (
        <div className="RecentTrans grid-one-item grid-common">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Recent Transactions</h3>
            </div>
            
            <div className="grid-content">
                <div className="grid-items">
                    {
                        RecentTransactions.map((transaction) => (
                            <div className="grid-item" key={transaction.id}>
                                <div className="grid-item-l">
                                    <div className="transaction-title">
                                        <p className="category">{transaction.category}</p>
                                        <span className="transaction-date">{transaction.date}</span>
                                    </div>
                                    <span className="RecentTrans-note">{transaction.note}</span>
                                </div>
                                <div className="grid-item-r">
                                    <span className={transaction.type==="spending" ? "spent" : "income"}>
                                        {transaction.type === "spending" ? "-" : ""}${transaction.amount}
                                    </span>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default RecentTrans