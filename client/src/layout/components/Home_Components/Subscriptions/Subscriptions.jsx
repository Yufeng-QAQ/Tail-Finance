import "./Subscriptions.css"
import { iconImgs } from "../../../../data/images"

const subscriptionList = [
    {
        "id": 100001,
        "name": "Honkai Star-Rail",
        "amount": 4.99,
        "start_date": "24/7/15",
        "frequency": "Monthly"
    },
    {
        "id": 100002,
        "name": "Honkai Star-Rail",
        "amount": 4.99,
        "start_date": "24/7/15",
        "frequency": "Monthly"
    },
    {
        "id": 100003,
        "name": "Honkai Star-Rail",
        "amount": 4.99,
        "start_date": "24/7/15",
        "frequency": "Monthly"
    },
    {
        "id": 100004,
        "name": "Honkai Star-Rail",
        "amount": 4.99,
        "start_date": "24/7/15",
        "frequency": "Monthly"
    },
    {
        "id": 100005,
        "name": "Honkai Star-Rail",
        "amount": 4.99,
        "start_date": "24/7/15",
        "frequency": "Monthly"
    }
]

const Subscriptions = () => {
    return (
        <div className="Subscriptions grid-one-item grid-common">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Subscriptions</h3>
                <span>+</span>
            </div>
            <div className="Subscriptions-content">
                <div className="grid-items">
                    {
                        subscriptionList.map((subscription) => (
                            <div className="grid-item" key={subscription.id}>
                                <div className="grid-item-l">
                                    <div className="item-icon">
                                        <img src={iconImgs.alarm} alt="alarm" />
                                    </div>
                                    <div className="Subscription-detail">
                                        {subscription.name}
                                        <span className="date-info">
                                            <span className="sub-date">{subscription.start_date}</span>
                                            <span className="sub-frequency">{subscription.frequency}</span>
                                        </span>
                                    </div>
                                </div>
                                <span className="Subscription-amount">${subscription.amount}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Subscriptions