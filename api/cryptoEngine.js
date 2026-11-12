// api/cryptoEngine.js

// Catalogue des cryptos principales + possibilité de détection dynamique
const KNOWN_COINS = {
  bitcoin: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', genesisYear: 2008 },
  btc: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', genesisYear: 2008 },
  ethereum: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', genesisYear: 2015 },
  eth: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', genesisYear: 2015 },
  zcash: { id: 'zcash', symbol: 'ZEC', name: 'Zcash', genesisYear: 2016 },
  zec: { id: 'zcash', symbol: 'ZEC', name: 'Zcash', genesisYear: 2016 },
  solana: { id: 'solana', symbol: 'SOL', name: 'Solana', genesisYear: 2020 },
  sol: { id: 'solana', symbol: 'SOL', name: 'Solana', genesisYear: 2020 },
  ripple: { id: 'ripple', symbol: 'XRP', name: 'XRP', genesisYear: 2012 },
  xrp: { id: 'ripple', symbol: 'XRP', name: 'XRP', genesisYear: 2012 },
  bnb: { id: 'binancecoin', symbol: 'BNB', name: 'BNB', genesisYear: 2017 }
};

// Archives historiques de genèse (2008-2010) avant l'ouverture des premiers exchanges
const GENESIS_NOTES = {
  BTC: "2008 (Il y a 18 ans): Publication du Whitepaper par Satoshi Nakamoto (0$). Janv 2009 (17 ans): Bloc Genèse miné, 1ère cotation fin 2009 à ~0.0009$. Mai 2010 (16 ans): Bitcoin Pizza Day à ~0.0041$."
};

/**
 * 1. Détecte quelles cryptos sont mentionnées dans la question de l'utilisateur
 */
export function detectCoinsFromQuery(queryText) {
  const clean = queryText.toLowerCase();
  const detected = new Map();

  for (const [key, info] of Object.entries(KNOWN_COINS)) {
    if (clean.includes(key)) {
      detected.set(info.symbol, info);
    }
  }

  // Si aucune crypto précise n'est nommée, on prend le trio de base (BTC, ETH, ZEC)
  if (detected.size === 0) {
    detected.set('BTC', KNOWN_COINS.btc);
    detected.set('ETH', KNOWN_COINS.eth);
    detected.set('ZEC', KNOWN_COINS.zec);
  }

  return Array.from(detected.values());
}

/**
 * 2. Récupère et compresse les données Live + Archives (1 à 18 ans) pour une crypto
 */
export async function fetchAndCompressCoinData(coin) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4500); // Sécurité rapidité (4.5s max)

  try {
    // Appels parallèles : CoinGecko (Temps réel) + CryptoCompare (Archives historiques complètes)
    const cgUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&price_change_percentage=1h,24h,7d,30d,1y`;
    const ccUrl = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin.symbol}&tsym=USD&allData=true`;

    const [cgRes, ccRes] = await Promise.all([
      fetch(cgUrl, { signal: controller.signal, headers: { 'User-Agent': 'CryptoBot/2.0' } }),
      fetch(ccUrl, { signal: controller.signal })
    ]);

    const cgData = cgRes.ok ? await cgRes.json() : [];
    const ccData = ccRes.ok ? await ccRes.json() : null;

    const live = cgData[0] || {};
    const currentPrice = live.current_price || 0;

    // Compression des archives (1 à 18 ans) en jalons digestes
    const historyPoints = ccData?.Data?.Data || [];
    const milestones = {};
    const yearsToExtract = [1, 2, 3, 5, 8, 10, 12, 15, 16];

    if (historyPoints.length > 0) {
      const nowSec = Math.floor(Date.now() / 1000);

      for (const yrs of yearsToExtract) {
        const targetSec = nowSec - (yrs * 365.25 * 86400);
        // Recherche du point historique le plus proche
        const point = historyPoints.find(p => p.time >= targetSec && p.close > 0);

        if (point && Math.abs(point.time - targetSec) < 45 * 86400) {
          const oldPrice = point.close;
          const multiplier = currentPrice / oldPrice;
          const pctChange = ((currentPrice - oldPrice) / oldPrice) * 100;

          milestones[`Il_y_a_${yrs}_an(s)_ (${new Date(point.time * 1000).getFullYear()})`] = {
            prix_époque: `$${oldPrice < 1 ? oldPrice.toFixed(4) : oldPrice.toFixed(2)}`,
            évolution_depuis: multiplier >= 10
              ? `x${multiplier.toFixed(1)}`
              : `${pctChange >= 0 ? '+' : ''}${pctChange.toFixed(1)}%`
          };
        }
      }
    }

    // Construction de l'objet condensé (Zéro surcharge)
    return {
      nom: coin.name,
      symbole: coin.symbol,
      année_création: coin.genesisYear,
      temps_réel: {
        prix_actuel_usd: currentPrice,
        variation_1h: `${(live.price_change_percentage_1h_in_currency || 0).toFixed(2)}%`,
        variation_24h: `${(live.price_change_percentage_24h || 0).toFixed(2)}%`,
        variation_7j: `${(live.price_change_percentage_7d_in_currency || 0).toFixed(2)}%`,
        variation_30j: `${(live.price_change_percentage_30d_in_currency || 0).toFixed(2)}%`,
        record_absolu_ATH: `$${live.ath || 'N/A'} (${(live.ath_change_percentage || 0).toFixed(1)}% depuis le record)`,
        rang_mondial: live.market_cap_rank || 'N/A'
      },
      archives_historiques_1_a_18_ans: milestones,
      note_genèse_2008_2010: GENESIS_NOTES[coin.symbol] || `Créé en ${coin.genesisYear} (pas d'archives antérieures à cette date).`
    };
  } catch (err) {
    return { nom: coin.name, symbole: coin.symbol, erreur: "Données temporairement indisponibles" };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * 3. Synthétise les données traitées pour répondre à la question sans surcharger l'utilisateur
 */
export async function generateSmartResponse(userQuestion, compressedDataList) {
  const geminiKey = process.env.GEMINI_API_KEY;

  // Si la clé Gemini est configurée, l'IA rédige une réponse sur-mesure ultra-concise
  if (geminiKey) {
    try {
      const systemPrompt = `Tu es un analyste crypto d'élite sur Telegram.
Voici les données en temps réel et les archives vérifiées (de 1 à 18 ans) pré-traitées :
${JSON.stringify(compressedDataList)}

RÈGLES STRICTES DE FORMATAGE (ANTI-SURCHARGE) :
1. Réponds DIRECTEMENT à la question de l'utilisateur en utilisant uniquement les chiffres pertinents.
2. Ne récite JAMAIS toutes les années si l'utilisateur ne demande qu'une période précise.
3. Utilise un format Telegram aéré (gras *, listes à puces •, emojis sobres 📈📉⚖️).
4. Longueur maximale : 12 à 15 lignes pour une lecture instantanée sur mobile.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemPrompt}\n\nQuestion utilisateur : "${userQuestion}"` }] }],
            generationConfig: { temperature: 0.3, maxOutputTokens: 500 }
          })
        }
      );

      const json = await res.json();
      const aiText = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (aiText) return aiText;
    } catch (e) {
      console.error("Erreur synthèse IA, bascule sur le résumé structuré:", e);
    }
  }

  // Mode de secours automatique (si pas de clé IA) : Résumé condensé instantané
  let fallback = `📊 *Synthèse Crypto (Direct & Archives)*\n━━━━━━━━━━━━━━━\n\n`;
  for (const c of compressedDataList) {
    if (c.erreur) continue;
    fallback += `🔹 *${c.nom} (${c.symbole})* — *$${c.temps_réel.prix_actuel_usd}*\n`;
    fallback += `• *Direct :* 1h: ${c.temps_réel.variation_1h} | 24h: ${c.temps_réel.variation_24h} | 30j: ${c.temps_réel.variation_30j}\n`;
    fallback += `• *Record (ATH) :* ${c.temps_réel.record_absolu_ATH}\n`;

    const histEntries = Object.entries(c.archives_historiques_1_a_18_ans);
    if (histEntries.length > 0) {
      const sample = histEntries.slice(0, 4).map(([k, v]) => `${k.replace(/Il_y_a_|_an\(s\)_/g, '')}: ${v.prix_époque} (${v.évolution_depuis})`).join(' | ');
      fallback += `• *Archives clés :* ${sample}\n`;
    }
    fallback += `\n`;
  }
  return fallback;
}
