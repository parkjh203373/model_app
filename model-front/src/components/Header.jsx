import { Link, useLocation } from "react-router-dom"

function Header(){
    const location = useLocation();

    return(
        <header className="toss-header">
            <div className="toss-header-top">
                <Link to="/" className="toss-logo">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 22H22L12 2Z" fill="#3182f6" />
                    </svg>
                    <span>toss <span style={{fontWeight: 400, fontSize: "16px", color: "#4e5968"}}>ML</span></span>
                </Link>
                <span className="toss-badge">Beta</span>
            </div>
            <nav className="toss-nav-tabs">
                <Link to="/" className={`toss-nav-tab ${location.pathname === '/' ? 'active' : ''}`}>
                    홈
                </Link>
                <Link to="/tips" className={`toss-nav-tab ${location.pathname === '/tips' ? 'active' : ''}`}>
                    팁 예측
                </Link>
                <Link to="/iris" className={`toss-nav-tab ${location.pathname === '/iris' ? 'active' : ''}`}>
                    붓꽃 분류
                </Link>
            </nav>
        </header>
    )
}

export default Header