import "./Reminder.css"
import { iconImgs } from "../../../../data/images";
import { useSelector, useDispatch } from "react-redux";
import { getReminderList, updateReminderList } from "../../../../store/modules/reminderStore";
import { useEffect, useRef, useState } from "react";
import { formatDate } from "../../../../utils";
// const reminderList1 = [
//     {
//         "id": 1,
//         "user": "Tail",
//         "time": "8/11/24",
//         "text": "I got a trip to California on Tuesday! I got a trip to California on Tuesday! I got a trip to California on Tuesday!",
//         "isCompleted": false
//     },
//     {
//         id: 2,
//         user: "Tail",
//         time: "8/11/24",
//         text: "I have a BBQ party today!",
//         isCompleted: false
//     }
// ]



const Reminder = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getReminderList());
    }, [dispatch]);

    const reminderList = useSelector((state) => state.reminders.reminderList || []);
    const reminderRef = useRef(null);
    const [content, setContent] = useState("");

    const handelPost = () => {
        const time = formatDate(new Date());
        const newReminder = {
            text: content,
            time: time
        }
        console.log(newReminder);
        
        
    }

    const handleReminderRemove = (id) => {
        console.log(id);

    }

    const handelReminderFinish = (id) => {
        dispatch(updateReminderList(id));
    }


    return (
        <div className="Reminder grid-common grid-two-item">
            <div className="grid-c-title">
                <h3 className="grid-c-title-text">Reminder</h3>
            </div>

            <div className="reminder-content">
                <div className="reminder-input">
                    <textarea
                        className="text-input-area common-scrollbar"
                        name="reminder-text"
                        id="reminder-text"
                        placeholder="Anything need to keep in mind?"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}></textarea>
                    <button className="reminder-post-btn"
                        onClick={() => handelPost()}>Post</button>
                </div>

                <div className="">
                    {
                        reminderList.map((reminder) => (
                            <div 
                                className="reminder-item" 
                                key={reminder.id}
                                ref={reminderRef}
                            >

                                <div className={`reminder-text ${reminder.isCompleted ? 'completed' : ''}`}>
                                    {reminder.text}
                                    
                                </div>
                                <div className="reminder-operate-btns">
                                    <img src={iconImgs.checkbox} alt="check" className="reminder-icon" 
                                        onClick={() => handelReminderFinish(reminder.id)}/>
                                    <img src={iconImgs.trash} alt="trash" className="reminder-icon" 
                                        onClick={() => handleReminderRemove(reminder.id)}/>
                                </div>
                            </div>
                        ))
                    } 
                </div>
            </div>
        </div>
    )
};

export default Reminder;