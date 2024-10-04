//note that the cmdstore.js is unstable .its on beta position
const fetch = require('node-fetch');

const cmdStore = {
    commands: {},

    loadCommands: async function() {
        try {
            const response = await fetch('https://api.github.com/repos/leox-2/cmdstorebyRL/contents/scripts/cmds');
            const files = await response.json();

            for (const file of files) {
                if (file.type === 'file' && file.name.endsWith('.js')) {
                    const commandResponse = await fetch(file.download_url);
                    const commandCode = await commandResponse.text();
                    
                    // Wrap the command code in an object
                    const command = { config: {}, ...eval((${commandCode})) };
                    if (typeof command.config === 'object') {
                        this.commands[file.name] = command;
                    } else {
                        console.error(Invalid config in command ${file.name});
                    }
                }
            }
            console.log('Commands loaded:', Object.keys(this.commands));
        } catch (error) {
            console.error('Error loading commands:', error);
        }
    },

    executeCommand: function(commandName, args) {
        const command = this.commands[commandName];
        if (command) {
            if (typeof command.onStart === 'function') {
                command.onStart(args);
            }
        } else {
            console.log(Command ${commandName} not found.);
        }
    }
};

// Load commands when the script starts
cmdStore.loadCommands();

// Example of executing a command
// cmdStore.executeCommand('adduser.js', { /* args here */ });

module.exports = cmdStore;
