import "./Styles/Layout.css"
import "../App.css"
import { iconImgs, personsImgs } from "../data/images"
import { navigationLinks } from "../data/data"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { getBillList } from "../store/modules/billStore"
import { removeUser } from "../store/modules/userStore"

const LogoutConfirm = ({ show, onClose, onLogout }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Confirm Logout</h2>
                <p>Are you sure you want to log out?</p>
                <div className="modal-actions">
                    <button className="modal-button" onClick={onLogout}>Logout</button>
                    <button className="modal-button" onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
};

const Layout = () => {
    const [currentLink, setCurrentLink] = useState('')
    const [currentPage, setCurrentPage] = useState('')
    const [isSidebarExpand, setIsSidebarExpand] = useState(true)
    const [sidebarClass, setSidebarClass] = useState("")
    const [logoutConfirm, setLogoutConfirm] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBillList())
        setCurrentLink(location.pathname)

        // Obtain current page title
        const currPage = navigationLinks.find(link => link.link === location.pathname);
        if (currPage) {
            setCurrentPage(currPage.title);
        }

    }, [dispatch, location])

    const changeSidebar = () => {
        setIsSidebarExpand(!isSidebarExpand)

        if (isSidebarExpand) {
            setSidebarClass("sidebar-change")
        } else {
            setSidebarClass("")
        }
    }

    const handleLogout = () => {
        dispatch(removeUser());
        navigate("/Login");
    }


    return (
        <div className="Layout">
            <div className={`sidebar ${sidebarClass}`}>
                {/* Display user info */}
                <div className="user-info">
                    <div className="info-img img-fit-cover">
                        <img src={personsImgs.person_one} alt="profile"></img>
                    </div>
                    <span className="info-name">Lappland</span>
                </div>

                {/* Display sidebar contents */}
                <nav className="navigation">
                    <ul className="nav-list">
                        {
                            navigationLinks.map((navigationLinks) => (
                                <li className="nav-item" key={navigationLinks.id}
                                    onClick={() => { setCurrentLink(navigationLinks.title) }
                                    }>
                                    <Link
                                        to={navigationLinks.link}
                                        className={`nav-link ${currentLink === navigationLinks.link && 'active'}`}>
                                        <img src={navigationLinks.icon}
                                            className="nav-link-icon"
                                            alt={navigationLinks.title}></img>
                                        <span className="nav-link-text">{navigationLinks.title}</span>
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>
                </nav>
            </div>

            {/* Header Area */}
            <div className="header">
                <div className="sidebar-control">
                    <button type="button" className="sidebar-expand"
                        onClick={() => changeSidebar()}>
                        <img src={iconImgs.menu} alt="menu" />
                    </button>
                    <h3 className="page-title">{currentPage}</h3>
                </div>
                <button type="button" className="signout-btn" onClick={() => setLogoutConfirm(true)}>
                    <img src={iconImgs.sign_out} alt="sign_out" />
                </button>
                <LogoutConfirm
                    show={logoutConfirm}
                    onClose={() => setLogoutConfirm(false)}
                    onLogout={handleLogout}>
                </LogoutConfirm>
            </div>

            <div className="tabs"><Outlet></Outlet>  </div>
        </div>
    )
}

export default Layout
