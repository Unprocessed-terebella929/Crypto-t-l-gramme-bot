// api/webhook.js — VERSION UNIQUE TOUT-EN-UN (Réponses IA + Archives 1-18 ans + Pings)

const KNOWN_COINS = {
  bitcoin: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', genesisYear: 2008 },
  btc: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', genesisYear: 2008 },
  ethereum: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', genesisYear: 2015 },
  eth: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', genesisYear: 2015 },
  zcash: { id: 'zcash', symbol: 'ZEC', name: 'Zcash', genesisYear: 2016 },
  zec: { id: 'zcash', symbol: 'ZEC', name: 'Zcash', genesisYear: 2016 },
  solana: { id: 'solana', symbol: 'SOL', name: 'Solana', genesisYear: 2020 },
  sol: { id: 'solana', symbol: 'SOL', name: 'Solana', genesisYear: 2020 },
  xrp: { id: 'ripple', symbol: 'XRP', name: 'XRP', genesisYear: 2012 },
  bnb: { id: 'binancecoin', symbol: 'BNB', name: 'BNB', genesisYear: 2017 }
};

function detectCoins(text) {
  const clean = (text || '').toLowerCase();
  const found = new Map();
  for (const [key, info] of Object.entries(KNOWN_COINS)) {
    if (clean.includes(key)) found.set(info.symbol, info);
  }
  if (found.size === 0) {
    found.set('BTC', KNOWN_COINS.btc);
    found.set('ETH', KNOWN_COINS.eth);
    found.set('ZEC', KNOWN_COINS.zec);
  }
  return Array.from(found.values());
}

async function fetchCoinData(coin) {
  try {
    const cgUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&price_change_percentage=1h,24h,7d,30d,1y`;
    const ccUrl = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin.symbol}&tsym=USD&allData=true`;

    const [cgRes, ccRes] = await Promise.all([
      fetch(cgUrl, { headers: { 'User-Agent': 'TelegramCryptoBot/2.5' } }),
      fetch(ccUrl)
    ]);

    const cgData = cgRes.ok ? await cgRes.json() : [];
    const ccData = ccRes.ok ? await ccRes.json() : null;
    const live = cgData[0] || {};
    const currentPrice = live.current_price || 0;

    // Extraction et compression des archives de 1 à 18 ans
    const historyPoints = ccData?.Data?.Data || [];
    const archives = {};
    const yearsList = [1, 2, 3, 5, 8, 10, 12, 15, 16];
    const nowSec = Math.floor(Date.now() / 1000);

    for (const yrs of yearsList) {
      const targetSec = nowSec - (yrs * 365.25 * 86400);
      const pt = historyPoints.find(p => p.time >= targetSec && p.close > 0);
      if (pt && Math.abs(pt.time - targetSec) < 45 * 86400) {
        const mult = currentPrice / pt.close;
        const pct = ((currentPrice - pt.close) / pt.close) * 100;
        archives[`Il_y_a_${yrs}_ans`] = {
          prix: `$${pt.close < 1 ? pt.close.toFixed(4) : pt.close.toFixed(2)}`,
          evolution: mult >= 10 ? `x${mult.toFixed(1)}` : `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`
        };
      }
    }

    if (coin.symbol === 'BTC') {
      archives['Genese_2008_2010_(16_a_18_ans)'] = '2008: Whitepaper (0$) | 2009: ~0.0009$ | Mai 2010: ~0.0041$';
    }

    return {
      nom: coin.name,
      symbole: coin.symbol,
      creation: coin.genesisYear,
      direct: {
        prix_usd: currentPrice,
        var_1h: `${(live.price_change_percentage_1h_in_currency || 0).toFixed(2)}%`,
        var_24h: `${(live.price_change_percentage_24h || 0).toFixed(2)}%`,
        var_7j: `${(live.price_change_percentage_7d_in_currency || 0).toFixed(2)}%`,
        var_30j: `${(live.price_change_percentage_30d_in_currency || 0).toFixed(2)}%`,
        record_ATH: `$${live.ath || 'N/A'}`
      },
      archives_1_a_18_ans: archives
    };
  } catch (e) {
    return { nom: coin.name, symbole: coin.symbol, erreur: 'Indisponible' };
  }
}

async function synthesizeAnswer(question, dataList) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    try {
      const prompt = `Tu es un analyste crypto sur Telegram.
Données récoltées (Temps réel + Archives 1 à 18 ans) : ${JSON.stringify(dataList)}
RÈGLES :
1. Réponds directement et clairement en français à la demande : "${question}".
2. Indique si le marché a augmenté, baissé ou stagné avec les chiffres exacts.
3. Sois concis (maximum 12 lignes) pour ne jamais surcharger l'utilisateur.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );
      const json = await res.json();
      const reply = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) return reply;
    } catch (e) {
      console.error(e);
    }
  }

  // Résumé automatique si Gemini ne répond pas
  let text = `📊 *Point Crypto (Direct & Archives)*\n\n`;
  for (const c of dataList) {
    if (c.erreur) continue;
    text += `• *${c.nom} (${c.symbole})* : *$${c.direct.prix_usd}* (1h: ${c.direct.var_1h} | 24h: ${c.direct.var_24h})\n`;
  }
  return text;
}

module.exports = async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const host = req.headers.host;

  // --- MODE NAVIGATEUR (Activation en 1 clic & Pings automatiques) ---
  if (req.method === 'GET') {
    const { setup, ping } = req.query || {};

    // 1. Si tu cliques sur le bouton d'activation du Webhook
    if (setup === 'true') {
      const webhookUrl = `https://${host}/api/webhook`;
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`);
      const tgJson = await tgRes.json();
      return res.status(200).json({ message: 'Connexion Telegram effectuée !', detail: tgJson });
    }

    // 2. Si le minuteur (ou toi) déclenche un Ping automatique
    if (ping === 'true') {
      const coins = detectCoins('bitcoin ethereum zcash');
      const data = await Promise.all(coins.map(fetchCoinData));
      const report = await synthesizeAnswer(
        "Fais un Ping de notification court : dis si BTC, ETH et ZEC ont augmenté, baissé ou stagné sur 1h et 24h, avec un bref rappel historique.",
        data
      );
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: process.env.TELEGRAM_CHAT_ID, text: `🔔 *PING AUTO*\n\n${report}` })
      });
      return res.status(200).json({ ok: true, message: 'Ping envoyé sur Telegram !' });
    }

    // 3. Page de contrôle visible dans ton navigateur
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
      <body style="font-family:sans-serif;background:#111;color:#fff;padding:40px;text-align:center;">
        <h2>✅ Ton Bot Crypto est en ligne sur Vercel !</h2>
        <p><a href="/api/webhook?setup=true" style="background:#2ea043;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block;margin:10px;">🔗 1. Activer le Webhook Telegram en 1 clic</a></p>
        <p><a href="/api/webhook?ping=true" style="background:#0969da;color:#fff;padding:12px 20px;text-decoration:none;border-radius:6px;display:inline-block;margin:10px;">🔔 2. Tester l'envoi d'un Ping sur Telegram</a></p>
      </body>
    `);
  }

  // --- MODE TELEGRAM (Répond automatiquement à tes messages et questions) ---
  if (req.method === 'POST') {
    try {
      const message = req.body?.message;
      if (!message || !message.text) return res.status(200).json({ ok: true });

      const chatId = message.chat.id;
      const userText = message.text.trim();

      await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, action: 'typing' })
      });

      let reply = '';
      if (userText === '/start' || userText === '/id') {
        reply = `🤖 Bot Crypto Actif 24/7 !\nTon Chat ID est : ${chatId}\n\nPose-moi n'importe quelle question sur Bitcoin, Ethereum, Zcash (en direct ou sur 1 à 18 ans d'archives).`;
      } else {
        const coins = detectCoins(userText);
        const data = await Promise.all(coins.map(fetchCoinData));
        reply = await synthesizeAnswer(userText, data);
      }

      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: reply })
      });

      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(200).json({ ok: true });
    }
  }
};
