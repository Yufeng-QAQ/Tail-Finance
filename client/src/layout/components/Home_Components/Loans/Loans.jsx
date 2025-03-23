import "./Loans.css"

const Loans = () => {
    return (
        <div className="Loans grid-one-item grid-common">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Loans and Debts</h3>
                <span>+</span>
            </div>
            <div className="loans-content">
                <div className="progress-bar">
                    <div className="percent">
                        <svg>
                            <circle cx={105} cy={105} r={50}></circle>
                            <circle cx={105} cy={105} r={50} 
                                style={{"--percent" : `${230 / 1000 * 100}`}}>
                            </circle>
                        </svg>
                        <h3 className="percent-number">
                            {230 / 1000 * 100}%
                        </h3>
                    </div>
                </div>
                <ul className="loan-data-list">
                    <li className="data-item">
                        <span className="data-item-title">Total Amount</span> 
                        <span className="data-item-value">$ 1000</span>
                    </li>
                    <li className="data-item">
                        <span className="data-item-title">Target Reached</span>
                        <span className="data-item-value">$ 230</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Loans;