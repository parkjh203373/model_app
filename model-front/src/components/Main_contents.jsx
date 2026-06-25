import { Link } from "react-router-dom"

function Main_contents(){
    
    return(
        <div style={{ padding: "20px 0" }}>
            {/* 사용자 환영 타이틀 */}
            <div style={{ padding: "0 24px 24px 24px" }}>
                <h1 className="toss-title" style={{ textAlign: "left", margin: "24px 0 8px 0" }}>
                    나에게 딱 맞는<br />
                    AI 모델을 분석해 보세요
                </h1>
                <p className="toss-subtitle" style={{ textAlign: "left" }}>
                    스프링 백엔드와 연동되어 빠르게 예측하고 분석을 수행합니다.
                </p>
            </div>

            {/* 대시보드 상태 요약 카드 */}
            <div className="toss-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(135deg, #e8f3ff 0%, #d2e6ff 100%)", boxShadow: "none" }}>
                <div>
                    <h3 style={{ fontSize: "18px", color: "#191f28", fontWeight: "700" }}>사용 가능한 AI 모델</h3>
                    <p style={{ fontSize: "14px", color: "#4e5968", marginTop: "4px" }}>2개의 고성능 분류/예측 모델</p>
                </div>
                <div style={{ fontSize: "32px", fontWeight: "800", color: "#3182f6" }}>2개</div>
            </div>

            <div className="toss-divider" />

            {/* 서비스 목록 */}
            <div style={{ padding: "8px 0" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "700", margin: "16px 24px", color: "#4e5968" }}>AI 도구 모음</h3>
                
                <div className="toss-responsive-grid">
                    {/* 팁 예측기 카드 */}
                    <Link to="/tips" style={{ display: "block", textDecoration: "none" }}>
                        <div className="toss-card" style={{ margin: 0, padding: "24px", display: "flex", alignItems: "center", gap: "16px", height: "100%" }}>
                            <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "#fff0d9", display: "flex", alignItems: "center", justifyContent: "center", shrink: 0, flexShrink: 0 }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.88 9H14.5C14.78 9 15 8.78 15 8.5C15 8.22 14.78 8 14.5 8H12.88V7C12.88 6.72 12.66 6.5 12.38 6.5C12.1 6.5 11.88 6.72 11.88 7V8H11C10.17 8 9.5 8.67 9.5 9.5C9.5 10.33 10.17 11 11 11H12.12C12.61 11 13 11.39 13 11.88C13 12.37 12.61 12.75 12.12 12.75H10.5C10.22 12.75 10 12.97 10 13.25C10 13.53 10.22 13.75 10.5 13.75H12.12V14.75C12.12 15.03 12.34 15.25 12.62 15.25C12.9 15.25 13.12 15.03 13.12 14.75V13.75H14C14.83 13.75 15.5 13.08 15.5 12.25C15.5 11.42 14.83 10.75 14 10.75H12.88C12.39 10.75 12 10.36 12 9.88C12 9.4 12.39 9 12.88 9Z" fill="#ff9f43" />
                                </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: "17px", color: "#191f28", fontWeight: "700" }}>웨이터 팁(Tip) 예측기</h4>
                                <p style={{ fontSize: "13px", color: "#8b95a1", marginTop: "4px" }}>식사 가격, 인원, 요일 등을 연산해 예상 팁 계산</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#8b95a1" />
                            </svg>
                        </div>
                    </Link>

                    {/* 붓꽃 분류기 카드 */}
                    <Link to="/iris" style={{ display: "block", textDecoration: "none" }}>
                        <div className="toss-card" style={{ margin: 0, padding: "24px", display: "flex", alignItems: "center", gap: "16px", height: "100%" }}>
                            <div style={{ width: "48px", height: "48px", borderRadius: "14px", backgroundColor: "#e2f9eb", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 3C6.5 3 2 6.5 2 12C2 15.5 4.5 18.5 8 19.5V21C8 21.5 8.5 22 9 22H15C15.5 22 16 21.5 16 21V19.5C19.5 18.5 22 15.5 22 12C22 6.5 17.5 3 12 3ZM12 18C8.7 18 6 15.3 6 12C6 8.7 8.7 6 12 6C15.3 6 18 8.7 18 12C18 15.3 15.3 18 12 18Z" fill="#2ecc71" />
                                </svg>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h4 style={{ fontSize: "17px", color: "#191f28", fontWeight: "700" }}>붓꽃(Iris) 품종 분류기</h4>
                                <p style={{ fontSize: "13px", color: "#8b95a1", marginTop: "4px" }}>꽃잎과 꽃받침의 물리적 수치 기반 붓꽃 품종 분류</p>
                            </div>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ flexShrink: 0 }}>
                                <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#8b95a1" />
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>

            {/* 하단 안내 배너 */}
            <div className="toss-card" style={{ margin: "24px 16px 16px 16px", padding: "20px", backgroundColor: "#f9fafb", border: "none", display: "flex", gap: "14px", alignItems: "center" }}>
                <span style={{ fontSize: "24px" }}>💡</span>
                <p style={{ fontSize: "13px", color: "#4e5968", textAlign: "left" }}>
                    이 웹사이트는 반응형으로 구축되어 모바일뿐만 아니라 데스크톱 환경에서도 쾌적하게 사용하실 수 있습니다. 상단 탭을 눌러 원하는 AI 분석 폼을 사용해보세요!
                </p>
            </div>
        </div>
    )
}

export default Main_contents