export async function GET(request) {
  const collections = [
    { name: 'PunkStrategy', id: 'cryptopunks' },
    { name: 'ApeStrategy', id: 'boredapeyachtclub' },
    { name: 'PudgyStrategy', id: 'pudgypenguins' },
    { name: 'MeebitStrategy', id: 'meebits' },
    { name: 'AzukiStrategy', id: 'azuki' },
    { name: 'MoonbirdsStrategy', id: 'moonbirds' }
  ];

  const apiKey = process.env.COINGECKO_API_KEY; // Set in Vercel/Netlify
  const results = await Promise.all(
    collections.map(async (c) => {
      try {
        const res = await fetch(
          `https://pro-api.coingecko.com/api/v3/nfts/${c.id}`,
          { headers: { 'x-cg-pro-api-key': apiKey } }
        );
        const data = await res.json();
        return {
          name: c.name,
          floorPriceUsd: data.floor_price?.usd || 'N/A'
        };
      } catch (err) {
        return { name: c.name, floorPriceUsd: 'Error' };
      }
    })
  );

  return new Response(JSON.stringify(results), { status: 200 });
}
