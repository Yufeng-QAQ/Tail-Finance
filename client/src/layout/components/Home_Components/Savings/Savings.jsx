import "./Savings.css"

const savings = [
    {
        id: '1',
        title: 'Get a new computer',
        target_amount: 1500,
        reached_amount: 500,
        started_date: '24/7/28'
    },
    {
        id: '2',
        title: 'Get a new computer',
        target_amount: 1500,
        reached_amount: 500,
        started_date: '24/7/28'
    }
]

const Savings = () => {
    


    return (
        <div className="Savings grid-common grid-one-item">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Saving Goals</h3>
                <span>+</span>
            </div>

            <div className="Savings-content">
                <div className="grid-items">
                    {
                        savings.map((saving) => (
                            <div className="grid-item" key={saving.id}>
                                <div className="grid-item-top">
                                    <p className="saving-title">
                                        {saving.title}
                                    </p>
                                    <div className="saving-amount">
                                        ${saving.target_amount}
                                    </div>
                                </div>
                                 <div className="grid-item-bottom">
                                    <div className="saving-details">
                                        <div className="saving-info">
                                            Date Taken {saving.started_date}
                                        </div>
                                        <div className="saving-info">
                                            Amount Left ${saving.target_amount - saving.reached_amount}
                                        </div>
                                    </div>
                                    <div className="saving-progress">
                                        
                                        <div className="progress-fill" style={{ width: `${saving.reached_amount / saving.target_amount * 100}%` }}></div>
                                    </div>
                                 </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Savings;