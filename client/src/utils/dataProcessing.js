export const groupByMonth = (dataSet) => {
    if (!dataSet) return {}
    return dataSet.reduce((result, currItem) => {
        const year = new Date(currItem.date).getFullYear()
        const month = new Date(currItem.date).getUTCMonth() + 1; // Months are 0-based, so add 1
        const key = `${year}-${month}`

        if (!result[key]) {
            result[key] = []
        }
        result[key].push(currItem)
        return result
    }, {})
}


export const calCategorySpent = (list, type) => {
    if (!list) return {}

    return list.reduce((result, currItem) => {
        if (currItem.type === type) {
            if (!result[currItem.category]) {
                result[currItem.category] = 0
            }
            result[currItem.category] += currItem.amount
        }
        return result

    }, {})
}


export const findMaxCategory = (dataSet) => {
    let maxCategory = ''
    let maxAmount = 0

    if (!dataSet) return { maxCategory, maxAmount }
    for (const [category, amount] of Object.entries(dataSet)) {
        if (amount > maxAmount) {
            maxAmount = amount
            maxCategory = category
        }
    }
    return { maxCategory, maxAmount }
}


// Return two arrays containing monthly income and spending respectively
export const monthlyResultArrays = (dataSet) => {
    // Initialize two arrays with 12 months
    const income = Array(12).fill(0);
    const spending = Array(12).fill(0);
    for (const [month, transactions] of Object.entries(dataSet)) {
        const monthIndex = parseInt(month.split('-')[1], 10) - 1;

        transactions.forEach(transaction => {
            if (transaction.type === "income") {
                income[monthIndex] += transaction.amount;
            } else {
                spending[monthIndex] += transaction.amount;
            }
        });
    }
    return { income, spending };
}


export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = d.getMonth() + 1; // Months are zero-based, so add 1
    const day = d.getDate();

    // Format the date as YYYY-M-D
    return `${year}-${month}-${day}`;
};