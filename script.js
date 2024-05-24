function calculateResults() {
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const creatinine = parseFloat(document.getElementById('creatinine').value);
    const cysC = parseFloat(document.getElementById('cysC').value);
    const gender = document.getElementById('gender').value;

    const eGFR_Creatinine = calculateEGFR(creatinine, age, gender);
    const eGFR_CysC = calculateEGFR_CysC(cysC, age, gender);
    const creatinineClearance = calculateCreatinineClearance(creatinine, age, weight, gender);

    document.getElementById('resultEGFR_Creatinine').textContent = `eGFR (Creatinine): ${eGFR_Creatinine.toFixed(2)} mL/min/1.73m²`;
    document.getElementById('resultEGFR_CysC').textContent = `eGFR (Cystatin C): ${eGFR_CysC.toFixed(2)} mL/min/1.73m²`;
    document.getElementById('resultCreatinineClearance').textContent = `Creatinine Clearance: ${creatinineClearance.toFixed(2)} mL/min`;
    document.getElementById('results').style.display = 'block';
}

function calculateEGFR(cre, age, gender) {
    let eGFR = 0;
    const crePow = Math.pow(cre, -1.094);
    const agePow = Math.pow(age, -0.287);

    if (gender === "Male") {
        eGFR = 194 * crePow * agePow;
    } else if (gender === "Female") {
        eGFR = 194 * crePow * agePow * 0.739;
    }
    return eGFR;
}

function calculateEGFR_CysC(cysC, age, gender) {
    const ageFactor = Math.pow(0.996, age);
    const cysCFactor = Math.pow(cysC, -1.019);
    let eGFR_CysC = 104 * cysCFactor * ageFactor; // 共通の計算式部分

    // 性別に基づいた補正を適用
    if (gender === "Female") {
        eGFR_CysC *= 0.929; // 女性の場合のみ乗算
    }

    eGFR_CysC -= 8; // 最終的な値から8を引く

    return eGFR_CysC;
}



function calculateCreatinineClearance(cre, age, weight, gender) {
    let clearance = ((140 - age) * weight) / (72 * cre);
    if (gender === "Female") {
        clearance *= 0.85;
    }
    return clearance;
}
