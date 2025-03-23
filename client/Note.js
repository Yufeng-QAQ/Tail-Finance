const list = [
    { id: 1001, name: 'Vue' },
    { id: 1002, name: 'React' },
    { id: 1003, name: 'Angular' }
]

const newL = list.filter(item => item.id != 1001)
console.log(newL);

// {/* <ul>
// { list.map(item => <li key={item.id}> {item.name}</li>) }
// </ul> */}

// { isLogin ? <span>Login Success</span> : <span>Login Failed</span> }

// multi-conditions
/*const type = 0
function getType() {
    if (type === 0) {
        return <div>This is type 0</div>
    } else if (type === 1) {
        return <div>This is type 1</div>
    } else {
        return <div>This is type 3</div>
    }
}
{ getType() }
*/


const handleClick_1 = (name, e) => {
    console.log('已经点击', name, e);
}
<button onClick={(e) => handleClick('Lappland', e)}>click me</button>

// useState && 组件
const [count, setCount] = useState(0)
const handleClick = () => {
    setCount(count + 1)
}

const Button = () => {
    return <button onClick={handleClick}>{count}</button>
}

{
    showDatePicker && (
        <div className="date-picker">
            <select value={selectedMonth} onChange={handleMonthChange}>
                {months.map((month, index) => (
                    <option key={index} value={index}>{month}</option>
                ))}
            </select>
        </div>
    )
}

// 行内样式, 注：是className 不是 class
const textStyle = {
    color: 'red',
    fontSize: '30px',
    fontWeight: 700
}
// {/* < span style = { textStyle } > This is a span</> */}

{/* < input value = { value } type = 'text' onChange = {(e) => setValue(e.target.value)}> </ input> */}


// // Close date select tab when click outside
// useEffect(() => {
//     const handleClickOutside = (event) => {
//         if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
//             console.log('change');
//             setShowDatePicker(!setShowDatePicker)
//         }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => {
//         document.removeEventListener('mousedown', handleClickOutside)
//     }
// }, [datePickerRef])