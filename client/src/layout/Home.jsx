import '../layout/Styles/Home.css'

// import components
// import dayjs from 'dayjs'
// import { useEffect, useRef, useState } from 'react'
// import { commentList } from '../data/data'
// import { iconImgs } from '../data/images'

import RecentTrans from './components/Home_Components/RecentTrans/RecentTrans'
import Subscriptions from './components/Home_Components/Subscriptions/Subscriptions'
import Savings from './components/Home_Components/Savings/Savings'
import Report from './components/Home_Components/Report/Report'
import Loans from './components/Home_Components/Loans/Loans'
import Reminder from './components/Home_Components/Reminder/Reminder'

const Home = () => {
    // const [commentLists, setCommentLists] = useState([])
    // const [content, setContent] = useState('')
    // const inputRef = useRef(null)

    // // Load comment list
    // useEffect(() => {
    //     async function getList() {
    //         setCommentLists(commentList)
    //     }
    //     getList()
    // }, [])

    // const handlePublish = () => {
    //     setCommentLists([
    //         ...commentLists,
    //         {
    //             id: dayjs(new Date()).format('MMDDhhmmss'),
    //             content: content,
    //             date: dayjs(new Date()).format('MM-DD hh:mm')
    //         }
    //     ])

    //     // Clear content and re-focus
    //     setContent('')
    //     inputRef.current.focus()
    // }

    // // Remove comment
    // const handleDel = (id) => {
    //     setCommentLists(commentLists.filter(item => item.id !== id))
    // }

    // const handelFin = (id) => {
    //     const newList = commentLists.map(comment => {
    //         if (comment.id === id) {
    //             return { ...comment, isComplete: !comment.isComplete };
    //         }
    //         return comment;
    //     });

    //     setCommentLists(newList);
    //     console.log(newList);
    // }

    return (
        <div className="Home">
            {/* <div className='reminder'>
                <div className="reply-box-wrap">
                    <textarea className="reply-box-textarea"
                        placeholder="Anything need to keep in mind?"
                        id='text-area'
                        ref={inputRef}
                        value={content} onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className='send-text' onClick={handlePublish}>ADD</div>
                </div>

                <div className='comment-area'>
                    <div className='comment-list'>
                        {commentLists.map((comment) => (
                            <div className='comment-item' key={comment.id} >
                                <div className='comment' style={{ textDecoration: comment.isComplete ? "line-through" : "none" }}>{comment.content}</div>
                                <div className='operation-icons'>
                                    <span className='start-time'>{comment.date}</span>
                                    <img src={iconImgs.checkbox} className='icon' alt='finish'
                                        onClick={() => handelFin(comment.id)}></img>
                                    <img src={iconImgs.trash} className='icon' alt='delete'
                                        onClick={() => handleDel(comment.id)}></img>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}
            
            {/* <PieChart chartSize={300} year={year} month={month}></PieChart> */}
            
            <div className='content-grid-one'>
                <RecentTrans></RecentTrans>
                <Subscriptions></Subscriptions>
                <Report/>
               
                
                
            </div>
            <div className="content-grid-two">
                <div className="grid-two-items">
                    
                </div>
                
                <div className="grid-two-items">
                    <div className="subgrid-two">
                        <Savings></Savings>
                        <Loans></Loans>
                    </div>
                </div>

                <div className="grid-two-items reminder">
                    <Reminder></Reminder>
                </div>
                
            </div>
        </div>
    )

}

export default Home;
