import "./createTrans.css"
import { spentCategories, incomeCategories } from "../../../../data/data"
import { useState } from "react"
import { addBillList } from "../../../../store/modules/billStore"
import { useDispatch } from "react-redux"
import { DatePicker } from "antd"
import axios from "axios"


const categories = {
    spending: spentCategories,
    income: incomeCategories
}

const generateID = () => {
    const now = new Date();
    const year = now.getFullYear().toString(); // Get last two digits of the year
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const id = `${year}${month}${day}-${hours}${minutes}${seconds}`;
    return id
}


const CreateTrans = ({ isVisible, onClose }) => {
    const dispatch = useDispatch()
    const [type, setType] = useState("spending")
    const [money, setMoney] = useState(0)       // Converted number for data storage
    const [amount, setAmount] = useState("")    // Number string for display
    const [category, setCategory] = useState("")
    const [date, setDate] = useState("")
    const [note, setNote] = useState("")
    
    // Temp value
    const user = "Tail";
    

    const handleAmount = (e) => {
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

            setMoney(parseFloat(value))
            setAmount(value);
        }
    }

    const handleDateChange = (date, dateString) => {
        setDate(dateString)
    }

    const insertDB = () => {
        axios.post("http://localhost:3001/transactions/create_transaction", {
            type: type,
            amount: money,
            date: date,
            note: note,
            category: category,
            user: user,
        }).then(() => {
            console.log("success");
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = generateID()

        insertDB();

        const newTrans = {
            id: id,
            type: type,
            amount: money,
            date: date,
            note: note,
            category: category,

        }
        
        dispatch(addBillList(newTrans))
        handleCancel()
    }

    const handleCancel = () => {
        onClose()
        setType("spending")
        setAmount("")
        setCategory("")
        setNote("")
        setMoney(0)
    }


    if (!isVisible) return null

    return (
        <div className="createTrans">
            <div className="createTrans-content">
                <form onSubmit={handleSubmit}>
                    <div className="CT-select-type">
                        <span onClick={() => { setType("spending") }}
                            className={type === "spending" ? 'selected' : ''}>Spent</span>
                        <span onClick={() => { setType("income") }}
                            className={type === "income" ? 'selected' : ''}>Income</span>
                    </div>

                    <div className="CT-amount">
                        $<input
                            className="user-input"
                            type="text"
                            id="amount"
                            value={amount}
                            onChange={handleAmount}
                            placeholder="please enter the amount"
                            required
                        />

                        <DatePicker onChange={handleDateChange}></DatePicker>
                    </div>


                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select
                            className="user-input"
                            id="category"
                            value={category}
                            onChange={(e) => { setCategory(e.target.value) }}
                            required
                        >
                            <option value="">Select a category</option>
                            {categories[type].map((cat, index) => (
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
                            value={note}
                            onChange={(e) => { setNote(e.target.value) }}
                            placeholder="Make a little note here?"
                        />
                    </div>

                    <div className="CT-buttons">
                        <button type="submit" className="CT-save">Save</button>
                        <button type="reset" onClick={handleCancel} className="CT-cancle">Cancel</button>
                    </div>

                </form>
            </div>
            
        </div>
    )
}


export default CreateTrans