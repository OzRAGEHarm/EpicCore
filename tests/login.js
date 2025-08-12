// if you use this, replace "../index.js" with "@ozrageharm/epiccore"
const epiccore = require('../index.js');

console.log(epiccore.clientTokens)

(async () => {
    const authCode = "your-auth-code-here"
    try {
        const auth = await epiccore.login({ method: "code", value: authCode });

        console.log(`Logged in as: ${auth.displayName}`)
    } catch(err) {
        console.log("An error occurred:", err)
    }
})();