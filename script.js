const collections = [
    { name: 'PunkStrategy', contract: '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB' },
    { name: 'ApeStrategy', contract: '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D' },
    { name: 'PudgyStrategy', contract: '0xBd3531dA5CF5857e7CfAA92426877b022e612cf8' },
    { name: 'MeebitStrategy', contract: '0x7Bd29408f11D2bFC23c34f18275bBf23bB76BaD7' },
    { name: 'AzukiStrategy', contract: '0xED5AF388653567Af2F388E6224dC7C4b3241C544' },
    { name: 'MoonbirdsStrategy', contract: '0x23581767a106ae21c074b2276D25e5C3e136a68b' }
];

async function fetchNFTData() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual CoinGecko Pro API key
    const results = [];
    const container = document.getElementById('data');
    container.innerHTML = '<p>Loading...</p>';

    for (const collection of collections) {
        const url = `https://pro-api.coingecko.com/api/v3/nfts/ethereum/contract/${collection.contract}/market_chart?days=1`;
        try {
            const response = await fetch(url, {
                headers: {
                    'x-cg-pro-api-key': apiKey
                }
            });
            const data = await response.json();
            const floorPrice = data.prices[data.prices.length - 1][1];
            results.push({
                name: collection.name,
                floorPrice: floorPrice ? floorPrice.toFixed(4) + ' ETH' : 'N/A'
            });
        } catch (error) {
            results.push({
                name: collection.name,
                floorPrice: 'Error'
            });
        }
    }

    displayData(results);
}

function displayData(results) {
    const container = document.getElementById('data');
    container.innerHTML = '<h2>NFT Floor Prices</h2><table>' +
        '<tr><th>Strategy</th><th>Floor Price</th></tr>' +
        results.map(item => `<tr><td>${item.name}</td><td>${item.floorPrice}</td></tr>`).join('') +
        '</table>';
}
