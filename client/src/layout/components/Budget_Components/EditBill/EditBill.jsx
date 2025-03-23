import "./EditBill.css"
import { useState} from "react"
import { updateBillList } from "../../../../store/modules/billStore"
import { spentCategories, incomeCategories } from "../../../../data/data"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

const categories = {
    spending: spentCategories,
    income: incomeCategories
}


const EditBill = ({isOpen, onClose, currentData}) => {
    const dispatch = useDispatch()
    const [billData, setBillData] = useState(currentData || {})  
    const [amount, setAmount] = useState(currentData.amount)
    
    useEffect(() => {
        if (currentData) {
            setBillData({...currentData}) 
        }
    }, [currentData])

    const handleTypeChange = (e) => {
        setBillData({
            ...billData,
            type: e.target.value
        })
    }
    const handleDateChange = (e) => { 
        setBillData({
            ...billData,
            date: e.target.value
        })
    }

    const handleCategoryChange = (e) => { 
        setBillData({
            ...billData,
            category: e.target.value
        })
    }

    const handleNoteChange = (e) => {
        setBillData({
            ...billData,
            note: e.target.value
        })
    }

    const handleAmountChange = (e) => {
        let value = e.target.value;

        // Allow only digits and a single decimal point
        if (/^\d*\.?\d*$/.test(value)) {
            // Format to two decimal places
            if (value.includes('.')) {
                const parts = value.split('.');
                // Limit the decimal part to two digits
                parts[1] = parts[1].slice(0, 2);
                value = parts.join('.');
            }

            setBillData({
                ...billData,
                amount: parseFloat(value)
            })
            setAmount(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateBillList(billData))
        onClose() 
    }

    if (!isOpen) return null

    return (
        <div className="edit-modal">
            <div className="edit-modal-content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="type">Type</label>
                        <select
                            className="user-input"
                            id="type"
                            name="type"
                            value={billData.type}
                            onChange={handleTypeChange}
                        >
                            <option value="income">Income</option>
                            <option value="spending">Spending</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="amount">Amount</label>
                        <input
                            className="user-input"
                            type="number"
                            id="amount"
                            name="amount"
                            value={amount}
                            onChange={handleAmountChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input
                            className="user-input"
                            type="date"
                            id="date"
                            name="date"
                            value={billData.date}
                            onChange={handleDateChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            className="user-input"
                            id="category"
                            value={billData.category}
                            onChange={handleCategoryChange}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories[billData.type].map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="bill-note">Note</label>
                        <input
                            className="user-input"
                            type="note"
                            id="note"
                            name="note"
                            value={billData.note}
                            onChange={handleNoteChange}
                        />
                    </div>

                    <div className="form-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditBill