//import { personsImgs } from "../utils/images";
import { iconImgs } from "./images";

export const navigationLinks = [
    { id: 1, title: 'Home', icon: iconImgs.home, link: "/" },
    { id: 2, title: 'Budget', icon: iconImgs.budget, link: "/Budget" },
    { id: 3, title: 'Reports', icon: iconImgs.stats, link: "/Login" },
    { id: 4, title: 'Account', icon: iconImgs.account }
]

export const commentList = [
    { id: "05312115", content: "喵喵喵这里是尾巴哦", date: "05-31 21:15", isComplete: false },
    { id: "06011125", content: "呀吼~古德猫宁", date: "06-01 11:25", isComplete: false }
]

export const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
]

export const spentCategories = [
    'Shopping', 'Entertainment', 'Home & Utilities', 'Dining', 'Transportation', 'Groceries', 'Personal & Family Care',
    'Health', 'Insurance', 'Education', 'Travel', 'Cash & Check'
]

export const incomeCategories = [
    'Paycheck', 'Cash', 'Interest', 'Finance', 'Gift', 'Refund'
]