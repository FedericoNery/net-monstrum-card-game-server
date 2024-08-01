function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sleep(tiempo) {
    await timeout(tiempo);
}

module.exports = { sleep }