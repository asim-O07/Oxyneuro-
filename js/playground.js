
const codeEditor = document.getElementById("codeEditor");
const output = document.getElementById("output");
const status = document.getElementById("status");

const runBtn = document.getElementById("runBtn");
const resetBtn = document.getElementById("resetBtn");
const saveBtn = document.getElementById("saveBtn");

const fileName = document.getElementById("fileName");
const languageLabel = document.getElementById("languageLabel");

const langButtons = document.querySelectorAll(".lang-btn");

const xpDisplay = document.getElementById("xp");
const levelDisplay = document.getElementById("level");

let currentLanguage = "c";

const starterCode = {
    c: `#include <stdio.h>

int main() {

    printf("Hello, OXY NEURO!");

    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {

    cout << "Hello, OXY NEURO!";

    return 0;
}`
};

// Load saved progress
let xp = Number(localStorage.getItem("oxyXP")) || 0;

function updateXP() {
    const level = Math.floor(xp / 100) + 1;
    const progress = xp % 100;

    xpDisplay.textContent = progress;
    levelDisplay.textContent = level;

    localStorage.setItem("oxyXP", xp);
}

updateXP();

// Switch between C and C++
langButtons.forEach(button => {
    button.addEventListener("click", () => {

        currentLanguage = button.dataset.lang;

        langButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        fileName.textContent =
            currentLanguage === "c" ? "main.c" : "main.cpp";

        languageLabel.textContent =
            currentLanguage.toUpperCase() + " COMPILER";

        codeEditor.value = starterCode[currentLanguage];

        output.textContent = "Language switched to " +
            currentLanguage.toUpperCase() +
            ". Ready to code.";

        status.textContent = "READY";
    });
});

// Reset code
resetBtn.addEventListener("click", () => {

    codeEditor.value = starterCode[currentLanguage];

    output.textContent = "Code has been reset.";

    status.textContent = "RESET";
});

// Save code
saveBtn.addEventListener("click", () => {

    localStorage.setItem(
        "oxyCode_" + currentLanguage,
        codeEditor.value
    );

    output.textContent = "Code saved successfully in this browser.";

    status.textContent = "SAVED";
});

// Load saved code when opening the page
const savedCode = localStorage.getItem("oxyCode_c");

if (savedCode) {
    codeEditor.value = savedCode;
}

// Run button
runBtn.addEventListener("click", () => {

    const code = codeEditor.value.trim();

    if (code === "") {
        output.textContent = "Error: Editor is empty.";
        status.textContent = "ERROR";
        return;
    }

    status.textContent = "WAITING";

    output.textContent =
        "Your code is ready.\n\n" +
        "C/C++ compiler backend is not connected yet.\n" +
        "We will connect a secure compiler in the next development stage.";

    status.textContent = "NO COMPILER";
});

// First challenge
// XP will be awarded only after checking the challenge successfully.
const challengeCard = document.querySelector(".challenge-card");

if (challengeCard) {

    const challengeButton = document.createElement("button");

    challengeButton.textContent = "Check Challenge";
    challengeButton.className = "run-btn";

    challengeButton.style.padding = "12px 18px";
    challengeButton.style.border = "none";
    challengeButton.style.borderRadius = "7px";
    challengeButton.style.color = "white";
    challengeButton.style.cursor = "pointer";

    challengeCard.appendChild(challengeButton);

    challengeButton.addEventListener("click", () => {

        const code = codeEditor.value;

        const hasPrint =
            currentLanguage === "c"
                ? code.includes("printf")
                : code.includes("cout");

        const hasName =
            /printf\s*\([^)]*%s/.test(code) ||
            /cout\s*<<\s*["'][^"']+/.test(code);

        if (!hasPrint || !hasName) {
            output.textContent =
                "Challenge not completed yet.\n\n" +
                "Print your name using printf() or cout.";
            status.textContent = "TRY AGAIN";
            return;
        }

        if (localStorage.getItem("oxyChallenge1") === "completed") {
            output.textContent = "Challenge already completed. Keep learning!";
            status.textContent = "COMPLETED";
            return;
        }

        xp += 20;

        localStorage.setItem("oxyChallenge1", "completed");

        updateXP();

        output.textContent =
            "Challenge completed!\n\n" +
            "+20 XP awarded.\n" +
            "Welcome to your programming journey.";

        status.textContent = "SUCCESS";

        challengeButton.textContent = "Completed";
        challengeButton.disabled = true;
    });

    if (localStorage.getItem("oxyChallenge1") === "completed") {
        challengeButton.textContent = "Completed";
        challengeButton.disabled = true;
    }
}
