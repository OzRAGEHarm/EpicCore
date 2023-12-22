const epiccore = require('@ozrageharm/epiccore');

(async () => {
    const authCode = "your-auth-code-here"
    const auth = await epiccore.login({ method: "code", value: authCode });
    console.log(`Logged in as: ${auth.displayName}`)
})();