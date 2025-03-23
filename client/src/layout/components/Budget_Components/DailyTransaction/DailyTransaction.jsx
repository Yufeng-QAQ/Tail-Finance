import "./DailyTransaction.css"
import { iconImgs } from "../../../../data/images"
import { useMemo, useState } from "react"
import { useDispatch } from 'react-redux'
import { deleteBillList } from "../../../../store/modules/billStore"
import EditBill from "../EditBill/EditBill"

// Confirmation components for deletion
const Confirmation = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null

    return (
        <div className="confirmation-modal-overlay">
            <div className="confirmation-modal">
                <p>Are you sure you want to delete this item?</p>
                <div className="confirmation-modal-buttons">
                    <button onClick={onConfirm} className="confirm-btn">Yes</button>
                    <button onClick={onClose} className="cancel-btn">No</button>
                </div>
            </div>
        </div>
    )
}


const DailyTransaction = ({ date, billList }) => {
    const dateParts = date.split('-')
    const dayResult = useMemo(() => {
        if (!billList) return { spending: 0, income: 0, total: 0 };
        const spending = billList.filter(item => item.type === 'spending').reduce((a, c) => a + c.amount, 0)
        const income = billList.filter(item => item.type === 'income').reduce((a, c) => a + c.amount, 0)
        return {
            spending, income, total: income - spending
        }
    }, [billList])

    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false)
    const [isConfirmOpen, setIsConfirmOpen] = useState(false)
    const [selectedID, setSelectedID] = useState(null)

    const [isEditOpen, setIsEditOpen] = useState(false)
    const [currentItem, setCurrentItem] = useState(null);

    const handleEditClick = (item) => {
        setIsEditOpen(true)
        setCurrentItem(item)
    }

    const closeEdit = () => {
        setIsEditOpen(false)
        setCurrentItem(null)
    }


    const handleDeleteClick = (id) => {
        setSelectedID(id);
        setIsConfirmOpen(true);
    }

    const closeConfirm = () => {
        setIsConfirmOpen(false);
        setSelectedID(null);
    }

    const onConfirm = () => {
        if (selectedID) {
            dispatch(deleteBillList(selectedID));
            closeConfirm();
        }
    }

    return (
        <div className="DayTransaction">
            <div className={`DT-header ${!visible && 'collapse'}`} onClick={() => setVisible(!visible)}>
                <div className="DT-date-wraper">
                    <span className="DT-date">{`${dateParts[1]}/${dateParts[2]}`}</span>
                    <span className={`arrow ${visible && 'expand'}`}></span>
                </div>
                <div className="DT-overview">
                    <div className="DT-item">
                        <span className="DT-type" style={{ color: 'rgb(180, 87, 87)' }}>Spent</span>
                        <span className="DT-money">${dayResult.spending.toFixed(2)}</span>
                    </div>
                    <div className="DT-item">
                        <span className="DT-type" style={{ color: 'var(--clr-green)' }}>Income</span>
                        <span className="DT-money">${dayResult.income.toFixed(2)}</span>
                    </div>
                    <div className="DT-item">
                        <span className="DT-type DT-Balance">Balance</span>
                        <span className="DT-money">${dayResult.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className={`billList ${visible ? 'visible' : ''}`}>
                {billList.map(item => {
                    return (
                        <div className="DT-bill" key={item.id}>
                            <div className="DT-detail" key={item.date}>
                                <div className="DT-billType">
                                    {item.category}
                                    <div className="DT-bill-note">{item.note}</div>
                                </div>



                                <div className="DT-operate-Buttons">
                                    <img src={iconImgs.edit} alt="edit" title="edit"
                                        onClick={() => handleEditClick(item)}
                                    />
                                    <img src={iconImgs.remove} alt="remove" title="remove"
                                        onClick={() => handleDeleteClick(item.id)}
                                    />
                                </div>


                                <Confirmation
                                    isOpen={isConfirmOpen}
                                    onClose={closeConfirm}
                                    onConfirm={onConfirm}
                                />

                                {isEditOpen && currentItem?.id === item.id && (
                                    <EditBill
                                        isOpen={isEditOpen}
                                        onClose={closeEdit}
                                        currentData={currentItem}
                                    />
                                )}
                            </div>
                            <div className={`DT-amount ${item.type === 'spending' ? 'spent' : 'income'}`}>
                                {item.type === 'spending' ? '-' : ''}${item.amount.toFixed(2)}
                            </div>

                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default DailyTransaction