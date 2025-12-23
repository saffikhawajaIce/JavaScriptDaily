let multiDimensionalArray = [["banana", "toaster", "raccoon", "spaceship", "sock", "ball", "book", "foot", "chair", "bald man", "couch", "air freshner"], ["unhinged", "suspicious", "crunchy", "majestic", "radioactive","emotionally unstable", "majestic (but in a weird way)", "illegally loud"],
["screaming", "yeeting", "wobbling", "sneezing", "moonwalking", "malfunctioning", "aggressively blinking", "speed-running", "existing incorrectly", "vibing"],
["the Walmart parking lot", "the alien cafeteria", "my grandma’s basement","the group chat", "the underground lab", "the cursed website", "production (somehow)", "the comments section"],
["for absolutely no reason", "and nobody questioned it", "like it was totally normal", "as the prophecy foretold", "and that’s when things got worse", "in front of everyone", "and I regret everything",],
["with full confidence", "out of pure panic", "for emotional support", "like I knew what I was doing", "with unnecessary intensity", "completely unprepared", "fueled by caffeine" , "against my better judgment"],
["and now I’m banned", "and the app crashed", "and production went down" ,"and HR was notified", "and nobody knows why" ,"and I will not be explaining", "and this is why we have meetings", "and that was my last day", "and the bug report wrote itself"]];

function generateStory() {
    const pick = (multiDimensionalArray) => multiDimensionalArray[Math.floor(Math.random() * multiDimensionalArray.length)];

    let myNoun = pick(multiDimensionalArray[0]);
    let myAdjective = pick(multiDimensionalArray[1]);
    let myVerb = pick(multiDimensionalArray[2]);
    let myPlaces = pick(multiDimensionalArray[3]);
    let myFunnyPhrases = pick(multiDimensionalArray[4]);
    let myEmotions = pick(multiDimensionalArray[5]);
    let myConsequences = pick(multiDimensionalArray[6]);

    console.log(`my ${myNoun} felt ${myAdjective} so I started ${myVerb} ${myEmotions} at ${myPlaces} ${myFunnyPhrases} ${myConsequences}`);

}

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askAgain() {
    rl.question("Press ENTER to generate another cursed story (or type q to quit): ", (input) => {
        if (input.toLowerCase() === "q") {
            rl.close();
        } else {
            generateStory();
            askAgain();
        }
    });
}
generateStory();
askAgain();










