module.exports = {
    START: "start",
    END: "end",
    JOIN: "join",

    start: function() {
        // Starts the game by infecting one random person
        console.log("commands.start()");
    },
    
    end: function() {
        // Stops the game and output statistics
        console.log("commands.end()");
    },

    join: function() {
        // Take part in the game
        // If a game is already in place, you will be uninfected
        // If a game in not in place and a game starts, you could be patient zero
        console.log("commands.join()");
    }
}
