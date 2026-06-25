import { useState } from "react";

function IrisForm(){
    const [formData, setFormData] = useState({
        sepal_length: "",
        sepal_width: "",
        petal_length: "",
        petal_width: ""
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

    const runFallbackPrediction = (data) => {
        const pl = parseFloat(data.petal_length) || 0;
        const pw = parseFloat(data.petal_width) || 0;
        
        if (pl < 2.0) {
            return "Setosa (세토사)";
        } else if (pl > 4.9 || pw > 1.6) {
            return "Virginica (버진아카)";
        } else {
            return "Versicolor (버시컬러)";
        }
    }

    function HandleSubmit(e){
        e.preventDefault();
        
        if (!formData.sepal_length || !formData.sepal_width || !formData.petal_length || !formData.petal_width) {
            alert("모든 수치를 입력해주세요.");
            return;
        }

        setLoading(true);
        setResult(null);
        setIsMocked(false);
        
        console.log("내가 선택한 옵션들(formData):", formData); 
        
        setTimeout(() => {
            fetch("/api/iris", {
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
                if (data.toLowerCase().includes("setosa")) formattedResult = "Setosa (세토사)";
                else if (data.toLowerCase().includes("versicolor")) formattedResult = "Versicolor (버시컬러)";
                else if (data.toLowerCase().includes("virginica")) formattedResult = "Virginica (버진아카)";
                
                setResult(formattedResult);
                setLoading(false);
            })
            .catch(error => {
                console.warn("백엔드 서버 미작동으로 자체 분석 시뮬레이션 결과를 출력합니다.", error);
                const mockResult = runFallbackPrediction(formData);
                setResult(mockResult);
                setIsMocked(true);
                setLoading(false);
            });
        }, 800);
    }

    const getFlowerInfo = (flowerType) => {
        if (!flowerType) return { emoji: "🌸", color: "#3182f6" };
        if (flowerType.includes("Setosa")) return { emoji: "💙", color: "#5dade2", desc: "꽃잎이 상대적으로 짧고 둥글며 단아한 푸른빛 붓꽃" };
        if (flowerType.includes("Versicolor")) return { emoji: "💖", color: "#ec7063", desc: "꽃받침과 꽃잎의 비율이 조화로운 밝은 핑크빛 붓꽃" };
        return { emoji: "💜", color: "#af7ac5", desc: "꽃잎이 크고 넓게 늘어지는 고급스러운 보랏빛 붓꽃" };
    }

    const flowerInfo = getFlowerInfo(result);

    return(
        <div style={{ padding: "20px 0" }}>
            <div className="toss-split-layout">
                {/* 왼쪽 분할: 설명 및 결과 */}
                <div className="toss-split-left">
                    <div style={{ padding: "0 24px 16px 24px" }}>
                        <h1 className="toss-title" style={{ textAlign: "left", margin: "12px 0 8px 0" }}>
                            꽃의 크기로<br />
                            붓꽃 품종 알아보기
                        </h1>
                        <p className="toss-subtitle" style={{ textAlign: "left" }}>
                            꽃받침(Sepal)과 꽃잎(Petal)의 수치를 센티미터(cm) 단위로 입력해 주세요.
                        </p>
                    </div>

                    {result && (
                        <div style={{ padding: "0 24px" }}>
                            <div className="toss-result-card" style={{ borderLeft: `5px solid ${flowerInfo.color}`, marginTop: "8px" }}>
                                <div className="toss-result-header" style={{ color: flowerInfo.color }}>분석 완료</div>
                                <div className="toss-result-value" style={{ marginTop: "4px" }}>
                                    <span>{flowerInfo.emoji}</span>
                                    <span>{result}</span>
                                </div>
                                <p style={{ fontSize: "14px", color: "#4e5968", marginTop: "12px", textAlign: "left" }}>
                                    {flowerInfo.desc}
                                </p>
                                {isMocked && (
                                    <div style={{ marginTop: "16px", padding: "10px 12px", backgroundColor: "rgba(0, 0, 0, 0.03)", borderRadius: "8px", fontSize: "11px", color: "#8b95a1", display: "flex", gap: "6px" }}>
                                        <span>⚠️</span>
                                        <span style={{ textAlign: "left" }}>스프링 API 서버가 연결되어 있지 않아 간이 오프라인 예측 모드로 결과를 도출했습니다.</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* 오른쪽 분할: 입력 폼 */}
                <div className="toss-split-right">
                    <div className="toss-card">
                        <form onSubmit={HandleSubmit}>
                            <div className="toss-form-group">
                                <label className="toss-label">꽃받침 길이 (Sepal Length)</label>
                                <input 
                                    type="number" 
                                    step="0.1" 
                                    name="sepal_length" 
                                    placeholder="예: 5.1" 
                                    className="toss-input"
                                    value={formData.sepal_length} 
                                    onChange={handleChange} 
                                    disabled={loading}
                                />
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">꽃받침 너비 (Sepal Width)</label>
                                <input 
                                    type="number" 
                                    step="0.1" 
                                    name="sepal_width" 
                                    placeholder="예: 3.5" 
                                    className="toss-input"
                                    value={formData.sepal_width} 
                                    onChange={handleChange} 
                                    disabled={loading}
                                />
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">꽃잎 길이 (Petal Length)</label>
                                <input 
                                    type="number" 
                                    step="0.1" 
                                    name="petal_length" 
                                    placeholder="예: 1.4" 
                                    className="toss-input"
                                    value={formData.petal_length} 
                                    onChange={handleChange} 
                                    disabled={loading}
                                />
                            </div>

                            <div className="toss-form-group">
                                <label className="toss-label">꽃잎 너비 (Petal Width)</label>
                                <input 
                                    type="number" 
                                    step="0.1" 
                                    name="petal_width" 
                                    placeholder="예: 0.2" 
                                    className="toss-input"
                                    value={formData.petal_width} 
                                    onChange={handleChange} 
                                    disabled={loading}
                                />
                            </div>

                            <button className="toss-button" type="submit" disabled={loading} style={{ marginTop: "12px" }}>
                                {loading ? (
                                    <>
                                        <span className="toss-spinner" />
                                        <span>품종 분석 중...</span>
                                    </>
                                ) : (
                                    "품종 확인하기"
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IrisForm