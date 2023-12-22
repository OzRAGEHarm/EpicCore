// if you use this, replace "../index.js" with "@ozrageharm/epiccore"
const epiccore = require('../index.js');

(async () => {
    const authCode = "your-auth-code-here"
    try {
        const auth = await epiccore.login({ method: "code", value: authCode });
        const deviceAuth = await epiccore.createDeviceAuth(auth).catch((err) => { 
            console.log("An error occurred:", err)
        });

        console.log(`Logged in as: ${auth.displayName}`)
        console.log(deviceAuth)
    } catch(err) {
        console.log("An error occurred:", err)
    }
})();