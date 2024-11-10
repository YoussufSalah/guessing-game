const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});
const colors = {
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    default: "\x1b[39m",
};

let randomNum = Math.floor(Math.random() * 100) + 1;

function main() {
    let welcomeMsg = `${colors.magenta}Welcome to the ${colors.yellow}Number Guessing${colors.magenta} Game!
I'm thinking of a number between ${colors.yellow}1 ${colors.magenta}and ${colors.yellow}100${colors.magenta}.${colors.default}`;
    console.log(welcomeMsg, "\n");

    let diffSelectionMsg = `${colors.blue}Please select the ${colors.yellow}difficulty level:
${colors.cyan}1. ${colors.magenta}Easy (${colors.yellow}10 ${colors.magenta}chances)
${colors.cyan}2. ${colors.magenta}Medium (${colors.yellow}5 ${colors.magenta}chances)
${colors.cyan}3. ${colors.magenta}Hard (${colors.yellow}3 ${colors.magenta}chances)\n`;
    console.log(diffSelectionMsg);

    let choise;
    readline.question(
        `${colors.yellow}Enter your choise: ${colors.default}`,
        (input) => {
            choise = parseInt(input);
            switch (choise) {
                case 1:
                    play("easy");
                    break;
                case 2:
                    play("medium");
                    break;
                case 3:
                    play("hard");
                    break;
                default:
                    console.error(
                        `${colors.red}Invalid choise!${colors.default}`
                    );
                    readline.close();
                    break;
            }
        }
    );
    return 0;
}

function play(diff) {
    let attempts = 0,
        maxAttempts = diff === "easy" ? 10 : diff === "medium" ? 5 : 3,
        msg = `${colors.magenta}Great! You have selected the ${colors.yellow}${diff} difficulty${colors.magenta} level.
Let's start the game!${colors.default}\n`;
    console.log(msg);
    function ask() {
        if (attempts >= maxAttempts) {
            console.log(
                `${colors.red}Oops! ${colors.magenta}you've lost, the number was: ${colors.yellow}${randomNum}${colors.default}\n`
            );
            readline.close();
            return;
        }
        readline.question(
            `${colors.magenta}Enter your guess: ${colors.default}`,
            (guess) => {
                let userAns = +guess;
                let msg;
                attempts++;
                if (userAns < randomNum) {
                    msg = `${colors.red}Incorrect! ${colors.magenta}The number is ${colors.red}greater than ${userAns}.${colors.default}\n`;
                    console.log(msg);
                    ask();
                } else if (userAns > randomNum) {
                    msg = `${colors.red}Incorrect! ${colors.magenta}The number is ${colors.red}less than ${userAns}.${colors.default}\n`;
                    console.log(msg);
                    ask();
                } else if (userAns === randomNum) {
                    msg = `${colors.yellow}Congratulations! ${colors.magenta}You guessed the correct number in ${colors.yellow}${attempts} ${colors.magenta}attempts.${colors.default}\n`;
                    console.log(msg);
                    readline.close();
                } else {
                    msg = `${colors.red}Invalid guess!${colors.default}`;
                    console.error(msg);
                }
            }
        );
    }
    ask();
}

main();
