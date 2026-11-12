// api/webhook.js — VERSION PRO UNIVERSELLE (Toutes Cryptos + Boutons Interactifs + Design HTML + Archives 1-18 ans)

// 1. Dictionnaire rapide des 40+ cryptos majeures (et recherche dynamique automatique pour toutes les autres)
const POPULAR_COINS = {
  bitcoin: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', year: 2008 },
  btc: { id: 'bitcoin', symbol: 'BTC', name: 'Bitcoin', year: 2008 },
  ethereum: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', year: 2015 },
  eth: { id: 'ethereum', symbol: 'ETH', name: 'Ethereum', year: 2015 },
  solana: { id: 'solana', symbol: 'SOL', name: 'Solana', year: 2020 },
  sol: { id: 'solana', symbol: 'SOL', name: 'Solana', year: 2020 },
  bnb: { id: 'binancecoin', symbol: 'BNB', name: 'BNB', year: 2017 },
  xrp: { id: 'ripple', symbol: 'XRP', name: 'XRP', year: 2012 },
  ripple: { id: 'ripple', symbol: 'XRP', name: 'XRP', year: 2012 },
  zcash: { id: 'zcash', symbol: 'ZEC', name: 'Zcash', year: 2016 },
  zec: { id: 'zcash', symbol: 'ZEC', name: 'Zcash', year: 2016 },
  cardano: { id: 'cardano', symbol: 'ADA', name: 'Cardano', year: 2017 },
  ada: { id: 'cardano', symbol: 'ADA', name: 'Cardano', year: 2017 },
  dogecoin: { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', year: 2013 },
  doge: { id: 'dogecoin', symbol: 'DOGE', name: 'Dogecoin', year: 2013 },
  tron: { id: 'tron', symbol: 'TRX', name: 'TRON', year: 2017 },
  trx: { id: 'tron', symbol: 'TRX', name: 'TRON', year: 2017 },
  toncoin: { id: 'the-open-network', symbol: 'TON', name: 'Toncoin', year: 2020 },
  ton: { id: 'the-open-network', symbol: 'TON', name: 'Toncoin', year: 2020 },
  avalanche: { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', year: 2020 },
  avax: { id: 'avalanche-2', symbol: 'AVAX', name: 'Avalanche', year: 2020 },
  shiba: { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu', year: 2020 },
  shib: { id: 'shiba-inu', symbol: 'SHIB', name: 'Shiba Inu', year: 2020 },
  polkadot: { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', year: 2020 },
  dot: { id: 'polkadot', symbol: 'DOT', name: 'Polkadot', year: 2020 },
  chainlink: { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', year: 2017 },
  link: { id: 'chainlink', symbol: 'LINK', name: 'Chainlink', year: 2017 },
  litecoin: { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', year: 2011 },
  ltc: { id: 'litecoin', symbol: 'LTC', name: 'Litecoin', year: 2011 },
  monero: { id: 'monero', symbol: 'XMR', name: 'Monero', year: 2014 },
  xmr: { id: 'monero', symbol: 'XMR', name: 'Monero', year: 2014 },
  pepe: { id: 'pepe', symbol: 'PEPE', name: 'Pepe', year: 2023 },
  sui: { id: 'sui', symbol: 'SUI', name: 'Sui', year: 2023 },
  kaspa: { id: 'kaspa', symbol: 'KAS', name: 'Kaspa', year: 2021 },
  kas: { id: 'kaspa', symbol: 'KAS', name: 'Kaspa', year: 2021 },
  near: { id: 'near', symbol: 'NEAR', name: 'NEAR Protocol', year: 2020 },
  aptos: { id: 'aptos', symbol: 'APT', name: 'Aptos', year: 2022 },
  apt: { id: 'aptos', symbol: 'APT', name: 'Aptos', year: 2022 },
  uniswap: { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', year: 2020 },
  uni: { id: 'uniswap', symbol: 'UNI', name: 'Uniswap', year: 2020 },
  stellar: { id: 'stellar', symbol: 'XLM', name: 'Stellar', year: 2014 },
  xlm: { id: 'stellar', symbol: 'XLM', name: 'Stellar', year: 2014 },
  cosmos: { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos', year: 2019 },
  atom: { id: 'cosmos', symbol: 'ATOM', name: 'Cosmos', year: 2019 },
  arbitrum: { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum', year: 2023 },
  arb: { id: 'arbitrum', symbol: 'ARB', name: 'Arbitrum', year: 2023 },
  optimism: { id: 'optimism', symbol: 'OP', name: 'Optimism', year: 2022 },
  render: { id: 'render-token', symbol: 'RENDER', name: 'Render', year: 2020 }
};

const STOP_WORDS = new Set([
  'le', 'la', 'les', 'de', 'des', 'du', 'un', 'une', 'et', 'ou', 'est', 'sont', 'que', 'qui',
  'quoi', 'comment', 'pourquoi', 'prix', 'cours', 'crypto', 'cryptomonnaie', 'cryptomonnaies',
  'marche', 'marché', 'analyse', 'archive', 'archives', 'ans', 'an', 'annee', 'année',
  'hier', 'aujourd', 'hui', 'demain', 'tendance', 'hausse', 'baisse', 'fait', 'va', 'donne',
  'moi', 'sur', 'dans', 'avec', 'pour', 'par', 'plus', 'moins', 'tout', 'toutes', 'tous',
  'bonjour', 'salut', 'stp', 'merci', 'bot', 'quel', 'quelle', 'quels', 'quelles', 'évolution'
]);

// Clavier interactif affiché sous chaque message du bot
function getMainKeyboard() {
  return {
    inline_keyboard: [
      [
        { text: '🌍 Radar Marché Global', callback_data: 'cmd_global' },
        { text: '🔥 Top Tendances & Mouvements', callback_data: 'cmd_trending' }
      ],
      [
        { text: '⚡ Focus BTC • ETH • SOL • ZEC', callback_data: 'cmd_majors' },
        { text: '🕰️ Archives 1 à 18 ans', callback_data: 'cmd_history' }
      ],
      [
        { text: '💡 Idées de questions & Aide', callback_data: 'cmd_help' }
      ]
    ]
  };
}

// 2. Détection intelligente de N'IMPORTE QUELLE cryptomonnaie dans la phrase de l'utilisateur
async function resolveCoinsFromQuery(queryText) {
  const clean = (queryText || '').toLowerCase();
  const found = new Map();

  // A. Recherche immédiate dans les 40+ cryptos connues
  const words = clean.replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ]/gi, ' ').split(/\s+/).filter(Boolean);
  for (const w of words) {
    if (POPULAR_COINS[w]) {
      found.set(POPULAR_COINS[w].symbol, POPULAR_COINS[w]);
    }
  }

  // B. Si l'utilisateur mentionne un autre nom de crypto inconnu, on interroge le moteur de recherche CoinGecko
  if (found.size === 0) {
    const candidates = words.filter(w => w.length >= 3 && !STOP_WORDS.has(w)).slice(0, 2);
    for (const candidate of candidates) {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(candidate)}`, {
          headers: { 'User-Agent': 'CryptoBotPro/3.0' }
        });
        if (res.ok) {
          const data = await res.json();
          const topCoin = data?.coins?.[0];
          if (topCoin && (topCoin.name.toLowerCase().includes(candidate) || topCoin.symbol.toLowerCase() === candidate)) {
            found.set(topCoin.symbol.toUpperCase(), {
              id: topCoin.id,
              symbol: topCoin.symbol.toUpperCase(),
              name: topCoin.name,
              year: 'N/A'
            });
          }
        }
      } catch (e) {
        // Ignore erreur recherche unitaire
      }
    }
  }

  return Array.from(found.values()).slice(0, 6);
}

// 3. Collecte du Radar Global (Top du marché + Cryptos en feu + Dominances)
async function fetchGlobalMarketOverview() {
  try {
    const [marketsRes, trendingRes, globalRes] = await Promise.all([
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&price_change_percentage=1h,24h,7d', {
        headers: { 'User-Agent': 'CryptoBotPro/3.0' }
      }),
      fetch('https://api.coingecko.com/api/v3/search/trending', {
        headers: { 'User-Agent': 'CryptoBotPro/3.0' }
      }),
      fetch('https://api.coingecko.com/api/v3/global', {
        headers: { 'User-Agent': 'CryptoBotPro/3.0' }
      })
    ]);

    const markets = marketsRes.ok ? await marketsRes.json() : [];
    const trendingData = trendingRes.ok ? await trendingRes.json() : {};
    const globalData = globalRes.ok ? await globalRes.json() : {};

    const topCoins = markets.slice(0, 10).map(c => ({
      nom: c.name,
      symbole: c.symbol.toUpperCase(),
      prix: `$${c.current_price}`,
      var_1h: `${(c.price_change_percentage_1h_in_currency || 0).toFixed(2)}%`,
      var_24h: `${(c.price_change_percentage_24h || 0).toFixed(2)}%`,
      var_7j: `${(c.price_change_percentage_7d_in_currency || 0).toFixed(2)}%`
    }));

    // Tri pour identifier la plus forte hausse et plus forte baisse du Top 15
    const sorted24h = [...markets].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0));
    const topGainer = sorted24h[0];
    const topLoser = sorted24h[sorted24h.length - 1];

    const trendingCoins = (trendingData?.coins || []).slice(0, 5).map(t => ({
      nom: t.item?.name,
      symbole: t.item?.symbol,
      rang: t.item?.market_cap_rank,
      prix_usd: t.item?.data?.price ? `$${Number(t.item.data.price).toFixed(4)}` : 'N/A'
    }));

    const g = globalData?.data || {};

    return {
      meteo_globale: {
        variation_marche_24h: g.market_cap_change_percentage_24h_usd ? `${g.market_cap_change_percentage_24h_usd.toFixed(2)}%` : 'N/A',
        dominance_btc: g.market_cap_percentage?.btc ? `${g.market_cap_percentage.btc.toFixed(1)}%` : 'N/A',
        dominance_eth: g.market_cap_percentage?.eth ? `${g.market_cap_percentage.eth.toFixed(1)}%` : 'N/A',
        cryptos_actives: g.active_cryptocurrencies || '15000+'
      },
      leader_hausse_24h: topGainer ? `${topGainer.name} (${topGainer.symbol.toUpperCase()}) : +${(topGainer.price_change_percentage_24h || 0).toFixed(2)}%` : 'N/A',
      leader_baisse_24h: topLoser ? `${topLoser.name} (${topLoser.symbol.toUpperCase()}) : ${(topLoser.price_change_percentage_24h || 0).toFixed(2)}%` : 'N/A',
      top_10_marche: topCoins,
      cryptos_tendances_du_moment: trendingCoins
    };
  } catch (e) {
    return { erreur: 'Radar global momentanément indisponible' };
  }
}

// 4. Collecte détaillée + Archives de 1 à 18 ans pour une crypto précise
async function fetchDetailedCoinWithArchives(coin) {
  try {
    const cgUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&price_change_percentage=1h,24h,7d,30d,1y`;
    const ccUrl = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin.symbol}&tsym=USD&allData=true`;

    const [cgRes, ccRes] = await Promise.all([
      fetch(cgUrl, { headers: { 'User-Agent': 'CryptoBotPro/3.0' } }),
      fetch(ccUrl)
    ]);

    const cgData = cgRes.ok ? await cgRes.json() : [];
    const ccData = ccRes.ok ? await ccRes.json() : null;
    const live = cgData[0] || {};
    const currentPrice = live.current_price || 0;

    // Compression des archives de 1 à 18 ans
    const historyPoints = ccData?.Data?.Data || [];
    const archives = {};
    const yearsList = [1, 2, 3, 5, 8, 10, 12, 15, 16];
    const nowSec = Math.floor(Date.now() / 1000);

    for (const yrs of yearsList) {
      const targetSec = nowSec - (yrs * 365.25 * 86400);
      const pt = historyPoints.find(p => p.time >= targetSec && p.close > 0);
      if (pt && Math.abs(pt.time - targetSec) < 45 * 86400 && currentPrice > 0) {
        const mult = currentPrice / pt.close;
        const pct = ((currentPrice - pt.close) / pt.close) * 100;
        archives[`Il_y_a_${yrs}_ans_${new Date(pt.time * 1000).getFullYear()}`] = {
          prix_epoque: `$${pt.close < 1 ? pt.close.toFixed(4) : pt.close.toFixed(2)}`,
          performance: mult >= 10 ? `x${mult.toFixed(1)}` : `${pct >= 0 ? '+' : ''}${pct.toFixed(1)}%`
        };
      }
    }

    if (coin.symbol === 'BTC') {
      archives['Origines_2008_2010_(16_a_18_ans)'] = '2008: Whitepaper (0$) | 2009: ~0.0009$ | Mai 2010: ~0.0041$';
    }

    return {
      nom: coin.name,
      symbole: coin.symbol,
      rang_mondial: live.market_cap_rank || 'N/A',
      direct: {
        prix_usd: currentPrice,
        var_1h: `${(live.price_change_percentage_1h_in_currency || 0).toFixed(2)}%`,
        var_24h: `${(live.price_change_percentage_24h || 0).toFixed(2)}%`,
        var_7j: `${(live.price_change_percentage_7d_in_currency || 0).toFixed(2)}%`,
        var_30j: `${(live.price_change_percentage_30d_in_currency || 0).toFixed(2)}%`,
        var_1an: `${(live.price_change_percentage_1y_in_currency || 0).toFixed(1)}%`,
        record_absolu_ATH: `$${live.ath || 'N/A'} (${(live.ath_change_percentage || 0).toFixed(1)}% du record)`
      },
      archives_1_a_18_ans: archives
    };
  } catch (e) {
    return { nom: coin.name, symbole: coin.symbol, erreur: 'Données indisponibles' };
  }
}

// 5. Génération de la réponse esthétique, humaine et intuitive via Gemini 2.5 Flash
async function generateAestheticResponse(userPrompt, contextPayload) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const systemInstruction = `Tu es un stratège et analyste crypto charismatique, vivant et ultra-intuitif sur Telegram.
Tu parles naturellement comme un expert passionné (jamais comme un robot mécanique ni répétitif).

DONNÉES EN DIRECT ET ARCHIVES (1 À 18 ANS) :
${JSON.stringify(contextPayload)}

RÈGLES ESTHÉTIQUES ET DE MISE EN PAGE (FORMAT HTML TELEGRAM STRICT) :
1. Utilise UNIQUEMENT les balises HTML supportées par Telegram : <b>gras</b>, <i>italique</i>, <code>chiffres/prix</code>, et <blockquote>encadré de synthèse ou conseil</blockquote>. N'utilise JAMAIS d'astérisques ** ou de Markdown.
2. Structure visuellement ta réponse avec élégance :
   • Un titre accrocheur avec emoji adapté à l'humeur du marché.
   • Des séparateurs visuels fins : <code>━━━━━━━━━━━━━━━━━━</code>
   • Des puces visuelles claires : 🟢 (hausse), 🔴 (baisse), ⚖️ (stagnation), 🔥 (tendance), 🕰️ (archive).
   • Termine par un court encadré <blockquote>💡 <b>L'œil de l'analyste :</b> (une observation pertinente en 1-2 phrases + une suggestion interactive sur ce que l'utilisateur peut demander ensuite)</blockquote>.
3. Sois digeste et percutant (12 à 18 lignes maximum) : sélectionne les données qui répondent exactement à la demande sans noyer le lecteur.`;

      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `${systemInstruction}\n\nDemande de l'utilisateur : "${userPrompt}"` }] }],
            generationConfig: { temperature: 0.45, maxOutputTokens: 700 }
          })
        }
      );

      const json = await res.json();
      let reply = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (reply) {
        // Nettoyage de sécurité au cas où des ** glissent dans le HTML
        reply = reply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/```html|```/g, '').trim();
        return reply;
      }
    } catch (e) {
      console.error('Erreur Gemini:', e);
    }
  }

  // Secours esthétique si la clé IA ne répond pas
  return `⚡ <b>Radar Crypto en Direct</b>\n<code>━━━━━━━━━━━━━━━━━━</code>\nLes données du marché ont été récupérées avec succès. Utilise les boutons ci-dessous pour explorer une crypto ou une période précise !`;
}

// Fonction d'envoi sécurisée sur Telegram (avec boutons interactifs et sécurité anti-erreur de formatage)
async function sendTelegramMessage(token, chatId, htmlText, showButtons = true) {
  const payload = {
    chat_id: chatId,
    text: htmlText,
    parse_mode: 'HTML',
    disable_web_page_preview: true
  };
  if (showButtons) {
    payload.reply_markup = getMainKeyboard();
  }

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  // Si une balise HTML mal fermée bloque l'envoi, on renvoie immédiatement en texte brut propre
  const data = await res.json();
  if (!data.ok) {
    const cleanText = htmlText.replace(/<[^>]*>/g, '');
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: cleanText,
        reply_markup: showButtons ? getMainKeyboard() : undefined
      })
    });
  }
}

// 6. Contrôleur principal (Orchestre la recherche selon la question ou le bouton cliqué)
async function processUserRequest(userQuery) {
  const detectedCoins = await resolveCoinsFromQuery(userQuery);

  // Si l'utilisateur parle de cryptos spécifiques, on charge leurs données + archives (et un coup d'œil global)
  if (detectedCoins.length > 0) {
    const [coinsDetails, globalOverview] = await Promise.all([
      Promise.all(detectedCoins.map(fetchDetailedCoinWithArchives)),
      fetchGlobalMarketOverview()
    ]);
    return generateAestheticResponse(userQuery, {
      cryptos_demandees: coinsDetails,
      contexte_marche_global: globalOverview.meteo_globale
    });
  }

  // Sinon (question sur le marché en général, les cryptos qui explosent, etc.), on charge le Radar Global + BTC/ETH/SOL/ZEC
  const [globalOverview, coreCoins] = await Promise.all([
    fetchGlobalMarketOverview(),
    Promise.all([POPULAR_COINS.btc, POPULAR_COINS.eth, POPULAR_COINS.sol, POPULAR_COINS.zec].map(fetchDetailedCoinWithArchives))
  ]);

  return generateAestheticResponse(userQuery, {
    radar_marche_global: globalOverview,
    focus_piliers_et_archives: coreCoins
  });
}

module.exports = async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const host = req.headers.host;

  // --- MODE NAVIGATEUR (Setup & Ping Automatique) ---
  if (req.method === 'GET') {
    const { setup, ping } = req.query || {};

    if (setup === 'true') {
      const webhookUrl = `https://${host}/api/webhook`;
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`);
      const tgJson = await tgRes.json();
      return res.status(200).json({ message: 'Webhook mis à jour avec succès !', detail: tgJson });
    }

    if (ping === 'true') {
      const pingPrompt = "Génère un Flash Radar Crypto captivant : donne la météo globale du marché, les cryptos majeures (BTC, ETH, SOL, ZEC), la crypto qui performe le mieux aujourd'hui dans le Top 15 et les cryptos en tendance, en indiquant clairement ce qui monte, baisse ou stagne, avec un clin d'œil aux archives.";
      const report = await processUserRequest(pingPrompt);
      await sendTelegramMessage(token, process.env.TELEGRAM_CHAT_ID, `🔔 <b>FLASH RADAR — VEILLE AUTOMATIQUE</b>\n\n${report}`, true);
      return res.status(200).json({ ok: true, message: 'Ping Pro envoyé sur Telegram !' });
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
      <body style="font-family:system-ui,sans-serif;background:#0d1117;color:#f0f6fc;padding:40px;text-align:center;">
        <h2>🚀 Ton Bot Crypto Universel (V3 Interactive) est Actif !</h2>
        <p style="color:#8b949e;">Toutes les cryptos CoinGecko • Archives 1 à 18 ans • Boutons Interactifs</p>
        <p><a href="/api/webhook?setup=true" style="background:#238636;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin:10px;font-weight:bold;">🔗 1. Relier / Actualiser le Webhook</a></p>
        <p><a href="/api/webhook?ping=true" style="background:#1f6feb;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin:10px;font-weight:bold;">🔔 2. Tester le nouveau Ping Esthétique</a></p>
      </body>
    `);
  }

  // --- MODE TELEGRAM (Messages écrits ET Boutons cliqués) ---
  if (req.method === 'POST') {
    try {
      const { message, callback_query } = req.body || {};

      // A. Si l'utilisateur a cliqué sur l'un des boutons interactifs sous un message
      if (callback_query) {
        const chatId = callback_query.message.chat.id;
        const action = callback_query.data;

        // Acquitter le clic immédiatement pour enlever l'icône de chargement sur le bouton
        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_id: callback_query.id, text: 'Analyse en cours...' })
        });

        await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, action: 'typing' })
        });

        const buttonPrompts = {
          cmd_global: "Dresse un panorama complet et esthétique du marché crypto global aujourd'hui : météo générale, dominance, le Top 10 des cryptomonnaies et les leaders à la hausse comme à la baisse.",
          cmd_trending: "Quelles sont les cryptomonnaies les plus tendances (Trending) qui attirent toute l'attention aujourd'hui sur le web, ainsi que les plus forts mouvements sur 24h ?",
          cmd_majors: "Fais une analyse comparative précise en temps réel sur Bitcoin (BTC), Ethereum (ETH), Solana (SOL), BNB, XRP et Zcash (ZEC) : prix, variations 1h/24h/7j et dynamique actuelle.",
          cmd_history: "Compare les prix actuels de Bitcoin, Ethereum, Dogecoin, Litecoin et Zcash avec leurs archives historiques sur 1 an, 5 ans, 10 ans et jusqu'à 18 ans (genèse 2008).",
          cmd_help: "Présente-toi avec enthousiasme et donne 5 exemples concrets et variés de questions que l'utilisateur peut te poser sur n'importe quelle crypto du marché ou sur les archives de 1 à 18 ans."
        };

        const chosenPrompt = buttonPrompts[action] || buttonPrompts.cmd_global;
        const replyHtml = await processUserRequest(chosenPrompt);
        await sendTelegramMessage(token, chatId, replyHtml, true);
        return res.status(200).json({ ok: true });
      }

      // B. Si l'utilisateur a tapé un message ou une question libre
      if (message && message.text) {
        const chatId = message.chat.id;
        const userText = message.text.trim();

        await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, action: 'typing' })
        });

        if (userText === '/start' || userText === '/menu') {
          const welcomeHtml =
            `⚡ <b>Bienvenue sur ton Radar Crypto Intelligent !</b>\n` +
            `<code>━━━━━━━━━━━━━━━━━━</code>\n\n` +
            `Je surveille en direct <b>plus de 15 000 cryptomonnaies</b> ainsi que <b>18 ans d'archives historiques</b> (2008–2026).\n\n` +
            `💬 <b>Parle-moi librement :</b>\n` +
            `• <i>"Que se passe-t-il sur Solana, Pepe et Kaspa aujourd'hui ?"</i>\n` +
            `• <i>"Quelles cryptos explosent à la hausse en ce moment ?"</i>\n` +
            `• <i>"Compare Cardano, XRP et Zcash sur 5 ans."</i>\n\n` +
            `<blockquote>👇 <b>Tu peux aussi cliquer directement sur les boutons ci-dessous pour explorer le marché d'un geste :</b></blockquote>`;
          await sendTelegramMessage(token, chatId, welcomeHtml, true);
          return res.status(200).json({ ok: true });
        }

        if (userText === '/id') {
          await sendTelegramMessage(token, chatId, `🔑 Ton Chat ID est : <code>${chatId}</code>`, true);
          return res.status(200).json({ ok: true });
        }

        const replyHtml = await processUserRequest(userText);
        await sendTelegramMessage(token, chatId, replyHtml, true);
      }

      return res.status(200).json({ ok: true });
    } catch (e) {
      return res.status(200).json({ ok: true });
    }
  }
};
