import "./Report.css"
import LineChart from "../../LineChart/LineChart";

const Report = () => {
    return (
        <div className="Report grid-two-items grid-common">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Report</h3>
            </div>
            <div className="grid-content">
                <div className="grid-items">
                    <LineChart></LineChart>  
                </div>
                    
            </div>
        </div>
    )
}

export default Report;