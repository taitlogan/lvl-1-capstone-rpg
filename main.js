
const rSync = require("readline-sync");

const stats = () => {
    console.log("Name: " +playerName+ "\nHP: " +player.currenthp+ "/" +player.maxhp+ "\nAttack Range: " +player.minAttack+ "-" +player.maxAttack+ "\nVampire Damage: " +player.minVamp+ "-" +player.maxVamp);
    console.log(player.satchel)
}

const randomRoll = (r) => {
    randomNumber = Math.floor(Math.random() * r)
    return parseInt(randomNumber)
}

const rollBetween = (min, max) => {return Math.floor(Math.random() * (max - min + 1)) + min}




const healPotion = () => {
    let healthIncrease = rollBetween(15,30);
    let newMaxHealth = player.maxhp + healthIncrease;
    player.maxhp = newMaxHealth;
    player.currenthp = newMaxHealth;
    console.log("Your maximum health has permanently increased by " +healthIncrease+ ". \nCurrent HP: " +player.currenthp+ "/" +player.maxhp)
}

const attackPotion = () => {
    let attackIncrease = rollBetween(10,20);
    let newAttackMin = player.minAttack + attackIncrease;
    let newAttackMax = player.maxAttack + attackIncrease;
    player.minAttack = newAttackMin;
    player.maxAttack = newAttackMax;
    console.log("Your attack power has permanently increased by " +attackIncrease+ ". \nCurrent Attack Power: " +player.minAttack+ "-" +player.maxAttack)
}

const vampPotion = () => {
    let vampIncrease = rollBetween(5,15);
    let newVampMin = player.minVamp + vampIncrease;
    let newVampMax = player.maxVamp + vampIncrease;
    player.minVamp = newVampMin;
    player.maxVamp = newVampMax;
    console.log("Your vampiric power has permanently increased by " +vampIncrease+ ". \nCurrent Vampiric Drain: " +player.minVamp+ "-" +player.maxVamp+ " HP")
}





function Enemy(name, health, minAttack, maxAttack, isAlive) {
    this.name = name
    this.hp = health
    this.minAttack = minAttack
    this.maxAttack = maxAttack
    this.isAlive = true
}

const vampThrall = new Enemy("Vampire's Thrall", rollBetween(35, 50), 10, 25)

const lesserVamp = new Enemy("Lesser Vampire", rollBetween(40, 60), 15, 35)

const greaterVamp = new Enemy("Greater Vampire", rollBetween(45, 70), 20, 35)

const vampLord = new Enemy("Vampire Lord", rollBetween(50, 80), 20, 40)

const alucard = new Enemy("Alucard, Son of Vlad", rollBetween(65, 90), 30, 40)

const vlad = new Enemy("Vladimir Dracula, Ruler of Darkness", rollBetween(80, 100), 30, 60)

enemyArray = [vampThrall, lesserVamp, greaterVamp, vampLord]






const playerName = rSync.question("**************************************************\n***************CURSE OF THE VAMPIRE***************\n************************************************** \n\nEnter your name: ")

function Player(playerName) {
    this.name = playerName;
    this.isAlive = true;
    this.satchel = [];
    this.hasWon = false;
    this.hasKey = false;
    this.hasBossItem = false;
    this.currenthp = 100;
    this.maxhp = 100;
    this.minAttack = 10;
    this.maxAttack = 15;
    this.minVamp = 5;
    this.maxVamp = 15;
}

const combatChance = () => {
    let combatRoll = randomRoll(100)
    if (combatRoll >= 35) {
        console.log("You come upon a fellow creature of the night!")
        combatEngage()
    } 
    else {console.log("The darkness and silence slither around you, filling you with dread as you move through Transylvania's maze.")
    journey()
    }
}

const combatEngage = () => {
    let stealthRoll = randomRoll(100)
    if (stealthRoll >= 80) {
        console.log("The stealth of a vampire serves you well! The creature has not detected you.")
        const killOrMercy = rSync.keyIn("Show the creature [M]ercy or execute with a [S]tealth kill? ", {limit: "MmSs"})
        while (killOrMercy === "Mm") {
            console.log("You retire from the creature's presence silently.") //NOT EXECUTING CONSOLE LOG HERE OR COMBATVICTORY() OR COMBAT()
            journey()
        }
        while (killOrMercy === "Ss") {combatVictory()} //INPUT DOESN'T SEEM TO MATTER THE PROGRAM JUST ENDS
    } 
    if (stealthRoll <= 74) {
            console.log("The creature detects you and strikes!")
            combat()
    }   
}

const combat = () => {
    const whichEnemy = rollBetween(1, 4)  //CAN'T FIGURE OUT HOW TO SPAWN ENEMY INTO THE 'WHILE' BELOW 'whichEnemy' IS NOT WORKING
            if (whichEnemy === 1) {vampThrall}
            if (whichEnemy === 2) {lesserVamp}
            if (whichEnemy === 3) {greaterVamp}
            if (whichEnemy === 4) {vampLord}
        while (player.isAlive && whichEnemy.isAlive) {
            let enemyAttack = rollBetween(whichEnemy.minAttack, whichEnemy.maxAttack)
            let enemyStrikeLog = () => {
                console.log("The " +whichEnemy.name+ " strikes for " +enemyAttack+ " damage!");
                player.currenthp -= enemyAttack
                const playerBeenHit = console.log("You are down to " +player.currenthp+ " HP.")
            }
        enemyStrikeLog()
        if (player.currenthp <= 0) {youDied()}
        if (player.currenthp > 0) {
            let playerStrike = rollBetween(player.minAttack, maxAttack)
            let playerVamp = rollBetween(player.minVamp, player.maxVamp)
            whichEnemy.hp -= playerStrike
            whichEnemy.hp -= playerVamp
            player.currenthp += playerVamp
            console.log("You strike the creature for " +parseInt(playerStrike + playerVamp)+ ".")
        } if (whichEnemy.isAlive) {
            enemyAttack()
            enemyStrikeLog()
        } if (whichEnemy.hp <= 0) {
            whichEnemy.isAlive = false;
            combatVictory()
        }
    }
}       

const combatVictory = () => {
    console.log("\nThe creature screeches and begs mercy as it draws its final breath.")
    let lootChance = randomRoll(100)
    if (lootChance >= 60) {
        let whichLoot = rollBetween(1, 3)
        if (whichLoot === 1) {
        console.log("The creature's heart is intact and undamaged. You consume it raw, increasing your vitality.")
        healPotion()
        journey()
    }   if (whichLoot === 2) {
        console.log("The creature's fangs are still razor sharp and deadly. You crush them to bone and consume them, increasing your vampiric prowess.")
        vampPotion()
        journey()
    }   if (whichLoot === 3) {
        console.log("The creature's claws are young and flawless. You use them to sharpen your own, increasing their deadliness.")
        attackPotion()
        journey()
    }
}    
    else { journey() }
    
}

const youDied = () => {
    console.log("\nThe hounds of hell erupt ferociously from the ground beneath you, surrounding and tearing you to pieces as they drag your tattered body down to the fiery throne of Lucifer. \n\n*******************\n*****GAME OVER*****\n*******************")}
    
const player = new Player(playerName)

console.log("\nChild of the night-- \nAfter centuries of immortality, you are world-weary and ready to join your family in the afterlife. \nBut you cannot pass the celestial gates as a vampire.\nTo die a vampire,\nat the hands of another vampire,\nwill damn you to hell for all eternity. \n\nFind and slay your maker to acquire your long-lost mortality, " +playerName+ ".")

rSync.keyIn("\n[B]egin traversing the castle at Transylvania? ", {limit: "Bb"})

console.log("\nYou push open the ancient wooden doors of the great hall, and venture forth into the decrepit ruins of Dracul's castle.")

const journey = () => {
    let jChoice = rSync.keyIn("\n[J]ourney further into the castle? Press [S] to view satchel and stats. ", {limit: "Jj"}) //STATS() WORKS BUT I CAN'T GET IT TO WORK HERE TRIED AND DELETED
    combatChance()
}

combatVictory()

console.log(stats())





