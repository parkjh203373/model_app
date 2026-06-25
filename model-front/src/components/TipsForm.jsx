import { useState } from "react";

function TipsForm(){
    const [formData, setFormData] = useState({
        total_bill: "",
        size: "",
        sex: "Male",
        smoker: "Yes",
        day: "Fri",
        time: "Lunch"
    })
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [isMocked, setIsMocked] = useState(false);

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handleChipSelect = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const runFallbackPrediction = (data) => {
        const bill = parseFloat(data.total_bill) || 0;
        const partySize = parseInt(data.size) || 1;
        
        let tipPercent = 0.12;
        if (data.smoker === "Yes") tipPercent += 0.015;
        if (data.day === "Sat" || data.day === "Sun") tipPercent += 0.02;
        if (data.time === "Dinner") tipPercent += 0.01;
        if (partySize >= 3) tipPercent += 0.015;

        const predictedTip = bill * tipPercent;
        return `$${predictedTip.toFixed(2)} (총 식사 금액의 ${(tipPercent * 100).toFixed(1)}%)`;
    }

    function HandleSubmit(e){
        e.preventDefault();
        
        if (!formData.total_bill || !formData.size) {
            alert("식사 금액과 인원을 모두 입력해주세요.");
            return;
        }

        setLoading(true);
        setResult(null);
        setIsMocked(false);
        
        console.log("내가 선택한 옵션들(formData):", formData); 
        
        setTimeout(() => {
            fetch("/api/tips", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (!response.ok) throw new Error("Network response was not ok");
                return response.text();
            })
            .then(data => {
                console.log("스프링이 보내준 응답 메시지:", data); 
                let formattedResult = data;
                const numericVal = parseFloat(data);
                if (!isNaN(numericVal)) {
                    const billVal = parseFloat(formData.total_bill) || 1;
                    const pct = (numericVal / billVal) * 100;
                    formattedResult = `$${numericVal.toFixed(2)} (총 식사 금액의 ${pct.toFixed(1)}%)`;
                }
                setResult(formattedResult);
                setLoading(false);
            })
            .catch(error => {
                console.warn("백엔드 서버 미작동으로 간이 분석 시뮬레이션을 적용합니다.", error);
                const mockResult = runFallbackPrediction(formData);
                setResult(mockResult);
                setIsMocked(true);
                setLoading(false);
            });
        }, 800);
    }

    return(
        <div style={{ padding: "20px 0" }}>
            <div className="toss-split-layout">
                {/* 왼쪽 영역: 설명 및 결과 */}
                <div className="toss-split-left">
                    <div style={{ padding: "0 24px 16px 24px" }}>
                        <h1 className="toss-title" style={{ textAlign: "left", margin: "12px 0 8px 0" }}>
                            오늘 지출할<br />
                            예상 팁(Tip) 분석
                        </h1>
                        <p className="toss-subtitle" style={{ textAlign: "left" }}>
                            총 식사 금액과 요일, 시간대 등의 옵션을 입력하고 예측된 팁을 확인해 보세요.
                        </p>
                    </div>

                    {result && (
                        <div style={{ padding: "0 24px" }}>
                            <div className="toss-result-card" style={{ borderLeft: `5px solid #ff9f43`, backgroundColor: "rgba(255, 159, 67, 0.08)", marginTop: "8px" }}>
                                <div className="toss-result-header" style={{ color: "#ff9f43" }}>예측 완료</div>
                                <div className="toss-result-value" style={{ marginTop: "4px" }}>
                                    <span>💸</span>
                                    <span style={{ fontSize: "20px" }}>{result}</span>
                                </div>
                                <p style={{ fontSize: "14px", color: "#4e5968", marginTop: "12px", textAlign: "left" }}>
                                    선택하신 음식 가격과 요일 정보 등을 결합해 딥러닝 기반 회귀 모델이 분석한 예상 적정 팁 요금입니다.
                                </p>
                                {isMocked && (
                                    <div style={{ marginTop: "16px", padding: "10px 12px", backgroundColor: "rgba(0, 0, 0, 0.03)", borderRadius: "8px", fontSize: "11px", color: "#8b95a1", display: "flex", gap: "6px" }}>
                                        <span>⚠️</span>
                                        <span style={{ textAlign: "left" }}>스프링 API 서버가 연결되어 있지 않아 간이 오프라인 시뮬레이션 수식으로 결과를 산출했습니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* 오른쪽 영역: 입력 폼 */}
                <div className="toss-split-right">
                    <div className="toss-card">
                        <form onSubmit={HandleSubmit}>
                            <div className="toss-form-group">
                                <label className="toss-label">총 식사 금액 (Total Bill, $)</label>
                                <input 
                                    type="number" 
                                    step="0.01"
                                    name="total_bill" 
                                    placeholder="예: 42.50" 
                                    className="toss-input"
                                    value={formData.total_bill} 
                                    onChange={handleChange} 
                                    disabled={loading}
                                />
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">식사 인원 (Size)</label>
                                <input 
                                    type="number" 
                                    name="size" 
                                    placeholder="예: 2" 
                                    className="toss-input"
                                    value={formData.size} 
                                    onChange={handleChange} 
                                    disabled={loading}
                                />
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">결제자 성별</label>
                                <div className="toss-chip-group">
                                    <button 
                                        type="button" 
                                        className={`toss-chip ${formData.sex === "Male" ? "active" : ""}`}
                                        onClick={() => handleChipSelect("sex", "Male")}
                                        disabled={loading}
                                    >
                                        남성 (Male)
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`toss-chip ${formData.sex === "Female" ? "active" : ""}`}
                                        onClick={() => handleChipSelect("sex", "Female")}
                                        disabled={loading}
                                    >
                                        여성 (Female)
                                    </button>
                                </div>
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">흡연 동반 여부</label>
                                <div className="toss-chip-group">
                                    <button 
                                        type="button" 
                                        className={`toss-chip ${formData.smoker === "Yes" ? "active" : ""}`}
                                        onClick={() => handleChipSelect("smoker", "Yes")}
                                        disabled={loading}
                                    >
                                        흡연석 (Yes)
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`toss-chip ${formData.smoker === "No" ? "active" : ""}`}
                                        onClick={() => handleChipSelect("smoker", "No")}
                                        disabled={loading}
                                    >
                                        금연석 (No)
                                    </button>
                                </div>
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">식사 요일</label>
                                <div className="toss-chip-group">
                                    {["Fri", "Sat", "Sun", "Thur"].map((dayVal) => (
                                        <button 
                                            key={dayVal}
                                            type="button" 
                                            className={`toss-chip ${formData.day === dayVal ? "active" : ""}`}
                                            onClick={() => handleChipSelect("day", dayVal)}
                                            disabled={loading}
                                        >
                                            {dayVal === "Fri" ? "금" : dayVal === "Sat" ? "토" : dayVal === "Sun" ? "일" : "목"} ({dayVal})
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">식사 시간대</label>
                                <div className="toss-chip-group">
                                    <button 
                                        type="button" 
                                        className={`toss-chip ${formData.time === "Lunch" ? "active" : ""}`}
                                        onClick={() => handleChipSelect("time", "Lunch")}
                                        disabled={loading}
                                    >
                                        점심 (Lunch)
                                    </button>
                                    <button 
                                        type="button" 
                                        className={`toss-chip ${formData.time === "Dinner" ? "active" : ""}`}
                                        onClick={() => handleChipSelect("time", "Dinner")}
                                        disabled={loading}
                                    >
                                        저녁 (Dinner)
                                    </button>
                                </div>
                            </div>

                            <button className="toss-button" type="submit" disabled={loading} style={{ marginTop: "16px" }}>
                                {loading ? (
                                    <>
                                        <span className="toss-spinner" />
                                        <span>예상 팁 계산 중...</span>
                                    </>
                                ) : (
                                    "예상 팁 예측하기"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TipsForm