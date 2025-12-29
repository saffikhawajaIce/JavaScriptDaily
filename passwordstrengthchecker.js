const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Constants
const commonPasswords = ["password", "123456", "qwerty"];
let attemptCount = 0;
let maxScore = 0;
const history = [];

function checkPasswordStrength(password) {
    let strength = 0;
    const missingCriteria = [];

    const length = password.length;
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password); // updated: any non-alphanumeric
    const isCommon = commonPasswords.includes(password.toLowerCase());

    // Length criteria
    if (length < 6) {
        missingCriteria.push("make it at least 6 characters");
    } else if (length >= 12) {
        strength += 2; // bonus for very long passwords
    } else if (length >= 8) {
        strength += 1;
    } else {
        // length is 6–7: no points, but give feedback
        missingCriteria.push("make it at least 8 characters");
    }

    // Character types
    if (hasUpper) {
        strength += 1;
    } else {
        missingCriteria.push("add an uppercase letter");
    }

    if (hasLower) {
        strength += 1;
    } else {
        missingCriteria.push("add a lowercase letter");
    }

    if (hasNumber) {
        strength += 1;
    } else {
        missingCriteria.push("add a number");
    }

    if (hasSpecial) {
        strength += 1;
    } else {
        missingCriteria.push("add a special character");
    }

    // Repeated characters check (e.g., "aaa", "1111")
    if (/([a-zA-Z0-9])\1{2,}/.test(password)) {
        strength -= 1; // penalty
        missingCriteria.push("avoid repeated characters like 'aaa' or '111'");
    }

    // Common password check – applied last, overrides strength
    if (isCommon) {
        strength = 0;
        missingCriteria.push("avoid common passwords like 'password'");
    }

    // Normalize score
    strength = Math.max(0, Math.min(strength, 5));

    return { strength, missingCriteria };
}

function getStrengthDescription(score) {
    switch (score) {
        case 0:
        case 1: return "Weak";
        case 2: return "Moderate";
        case 3: return "Strong";
        case 4:
        case 5: return "Very Strong";
        default: return "Unknown";
    }
}

function buildStrengthMeter(score) {
    const filled = "#".repeat(score);
    const empty = "-".repeat(5 - score);
    return `[${filled}${empty}] ${score}/5`;
}

function maskPassword(pwd) {
    return "*".repeat(pwd.length);
}

function promptPassword() {
    rl.question("Enter a password to check its strength (or type q to quit): ", (input) => {
        if (input.toLowerCase() === "q") {
            printExitSummary();
            rl.close();
        } else {
            attemptCount++;
            const result = checkPasswordStrength(input);
            const description = getStrengthDescription(result.strength);
            const meter = buildStrengthMeter(result.strength);
            const masked = maskPassword(input);

            if (result.strength > maxScore) {
                maxScore = result.strength;
            }

            // Save session history (without storing actual password)
            history.push({
                length: input.length,
                score: result.strength,
                description
            });

            console.log(`\nPassword: ${masked}`);
            console.log(`Strength: ${description}`);
            console.log(`Meter: ${meter}`);
            if (result.missingCriteria.length > 0) {
                console.log("Suggestions to improve:");
                result.missingCriteria.forEach(msg => console.log(`- ${msg}`));
            } else {
                console.log("Great job! Your password looks solid.");
            }

            console.log(); // spacing
            promptPassword();
        }
    });
}

function printExitSummary() {
    console.log("\nSession Summary:");
    console.log(`- Total attempts: ${attemptCount}`);
    console.log(`- Strongest password score: ${maxScore}/5\n`);

    if (history.length === 0) {
        console.log("No passwords checked this session.");
    } else {
        console.log("Password history:");
        history.forEach((entry, i) => {
            console.log(`  ${i + 1}. Length: ${entry.length}, Score: ${entry.score}/5, ${entry.description}`);
        });
    }
}

promptPassword();
