// script.js - A single, modular script for all calculators

// --- Modul Kalkulator ---
const calculators = {
    loan: {
        title: "Kalkulator Pinjaman Peribadi",
        html: `
            <div class="form-group">
                <label for="loan-amount">Jumlah Pinjaman (RM):</label>
                <input type="number" id="loan-amount" placeholder="Contoh: 10000" min="1" required>
            </div>
            <div class="form-group">
                <label for="loan-interest">Kadar Faedah (%):</label>
                <input type="number" id="loan-interest" placeholder="Contoh: 4.5" step="0.01" min="0" required>
            </div>
            <div class="form-group">
                <label for="loan-tenure">Tempoh (Tahun):</label>
                <input type="number" id="loan-tenure" placeholder="Contoh: 5" min="1" required>
            </div>
            <button class="calculate-btn">Kira Bayaran Bulanan</button>
            <div class="result-box" id="loan-result"></div>
        `,
        logic: function() {
            const amountInput = document.getElementById('loan-amount');
            const interestInput = document.getElementById('loan-interest');
            const tenureInput = document.getElementById('loan-tenure');
            const resultBox = document.getElementById('loan-result');
            const btn = document.querySelector('.calculate-btn');

            btn.addEventListener('click', () => {
                const amount = parseFloat(amountInput.value);
                const interest = parseFloat(interestInput.value) / 100;
                const tenure = parseFloat(tenureInput.value);

                if (isNaN(amount) || isNaN(interest) || isNaN(tenure) || amount <= 0 || tenure <= 0) {
                    resultBox.innerHTML = 'Sila masukkan semua maklumat yang sah.';
                    return;
                }

                const monthlyInterestRate = interest / 12;
                const numberOfPayments = tenure * 12;
                let monthlyPayment;

                if (monthlyInterestRate === 0) {
                    monthlyPayment = amount / numberOfPayments;
                } else {
                    monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
                }

                const totalPayment = monthlyPayment * numberOfPayments;
                const totalInterest = totalPayment - amount;

                resultBox.innerHTML = `
                    <p>Bayaran Bulanan: <strong>RM${monthlyPayment.toFixed(2)}</strong></p>
                    <p>Jumlah Bayaran Balik: <strong>RM${totalPayment.toFixed(2)}</strong></p>
                    <p>Jumlah Faedah: <strong>RM${totalInterest.toFixed(2)}</strong></p>
                `;
            });
        }
    },
    bmi: {
        title: "Kalkulator BMI",
        html: `
            <div class="form-group">
                <label for="bmi-weight">Berat (kg):</label>
                <input type="number" id="bmi-weight" placeholder="Contoh: 65" min="1" required>
            </div>
            <div class="form-group">
                <label for="bmi-height">Tinggi (cm):</label>
                <input type="number" id="bmi-height" placeholder="Contoh: 170" min="1" required>
            </div>
            <button class="calculate-btn">Kira BMI</button>
            <div class="result-box" id="bmi-result"></div>
        `,
        logic: function() {
            const weightInput = document.getElementById('bmi-weight');
            const heightInput = document.getElementById('bmi-height');
            const resultBox = document.getElementById('bmi-result');
            const btn = document.querySelector('.calculate-btn');

            btn.addEventListener('click', () => {
                const weight = parseFloat(weightInput.value);
                const heightCm = parseFloat(heightInput.value);

                if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) {
                    resultBox.innerHTML = 'Sila masukkan berat dan tinggi yang sah.';
                    return;
                }

                const heightM = heightCm / 100;
                const bmi = weight / (heightM * heightM);
                let status = '';

                if (bmi < 18.5) {
                    status = 'Kurang Berat Badan';
                } else if (bmi >= 18.5 && bmi < 24.9) {
                    status = 'Berat Badan Normal';
                } else if (bmi >= 25 && bmi < 29.9) {
                    status = 'Lebih Berat Badan';
                } else {
                    status = 'Obesiti';
                }

                resultBox.innerHTML = `
                    <p>Nilai BMI anda: <strong>${bmi.toFixed(2)}</strong></p>
                    <p>Status: <strong>${status}</strong></p>
                `;
            });
        }
    }
};

// --- Logik Utama untuk Memuatkan Kalkulator ---
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('calculator-container');
    const selectorBtns = document.querySelectorAll('.selector-btn');

    function loadCalculator(tool) {
        const calculator = calculators[tool];
        if (calculator) {
            container.innerHTML = `<div class="calculator-module"><h2>${calculator.title}</h2>${calculator.html}</div>`;
            calculator.logic(); // Jalankan logik spesifik untuk kalkulator tersebut
        }
    }

    // Default load: Load the first calculator on page load
    loadCalculator('loan');

    // Event listener untuk butang pemilih
    selectorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tool = btn.getAttribute('data-tool');
            loadCalculator(tool);
        });
    });
});
