const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const darkModeBtn = document.getElementById("darkModeBtn");


function resetEffects() {
    display.classList.remove("correct", "error");
}


function hasZeroMultiplication(expr) {
    return /(^0\*\d+)|(\d+\*0$)|(\d+\*0[\+\-\*\/]?)|(0\*\d+)/.test(expr);
}


buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const value = btn.textContent;
        resetEffects();

        if (value === "C") {
            display.value = "";
        }
        else if (value === "⌫") {
            display.value = display.value.slice(0, -1);
        }
        else if (value === "=") {

            let expression = display.value;

            
            if (hasZeroMultiplication(expression)) {
                display.value = "Error";
                display.classList.add("error");
                return;
            }

            try {
                let result = eval(expression);

                if (!isFinite(result)) {     
                    display.value = "Error";
                    display.classList.add("error");
                } else {
                    display.value = result;
                    display.classList.add("correct");
                }
            } catch {
                display.value = "Error";
                display.classList.add("error");
            }
        }
        else {
            display.value += value;
        }
    });
});

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkModeBtn.textContent =
        document.body.classList.contains("dark") ? "Light Mode" : "Dark Mode";
});

