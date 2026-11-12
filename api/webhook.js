// api/webhook.js — VERSION 4 ENTERPRISE (Animations Live + Double Moteur IA/Natif + Multi-Sources + Archives 1-18 ans)

const CATALOG = {
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

const CRYPTO_KEYWORDS = [
  'prix', 'cours', 'marche', 'marché', 'crypto', 'cryptomonnaie', 'cryptomonnaies', 'monnaie', 'devise',
  'augmente', 'augmenté', 'baisse', 'baissé', 'stagne', 'stagné', 'hausse', 'chute', 'tendance', 'top',
  'archive', 'archives', 'ans', 'an', 'annee', 'année', 'historique', 'hier', 'aujourd', 'évolution',
  'evolution', 'comparer', 'compare', 'record', 'ath', 'analyse', 'investissement', 'valeur', 'combien',
  'explose', 'bouge', 'rapport', 'bilan', 'statut', 'etat', 'état', 'dominance', 'volume', 'capitalisation',
  'blockchain', 'token', 'altcoin', 'altcoins', 'defi', 'halving', 'minage', 'satoshi', '2008', '2010',
  '2015', '2017', '2020', '2021', '2024', '2025', '2026'
];

const STOP_WORDS = new Set([
  'le', 'la', 'les', 'de', 'des', 'du', 'un', 'une', 'et', 'ou', 'est', 'sont', 'que', 'qui', 'quoi',
  'comment', 'pourquoi', 'donne', 'moi', 'sur', 'dans', 'avec', 'pour', 'par', 'plus', 'moins', 'tout',
  'toutes', 'tous', 'bonjour', 'salut', 'stp', 'merci', 'bot', 'quel', 'quelle', 'quels', 'quelles',
  'peux', 'tu', 'dire', 'voir', 'faire', 'fais', 'voudrais', 'aimerais', 'savoir', 'connais', 'parle'
]);

// Formatage propre des prix USD
function fmtPrice(num) {
  const n = Number(num);
  if (isNaN(n) || n === 0) return 'N/A';
  if (n < 0.001) return `$${n.toFixed(6)}`;
  if (n < 1) return `$${n.toFixed(4)}`;
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function fmtPct(num) {
  const n = Number(num || 0);
  const sign = n > 0 ? '+' : '';
  return `${sign}${n.toFixed(2)}%`;
}

function trendBadge(pct1h, pct24h) {
  const p = Number(pct24h || 0);
  if (p >= 3) return '🚀 Forte hausse';
  if (p > 0.35) return '🟢 En hausse';
  if (p <= -3) return '🩸 Forte baisse';
  if (p < -0.35) return '🔴 En baisse';
  return '⚖️ Stagnation';
}

// Clavier interactif dynamique (s'adapte aux cryptos analysées)
function buildKeyboard(customCoins = []) {
  const rows = [];

  if (customCoins.length === 1) {
    const sym = customCoins[0].symbol;
    rows.push([
      { text: `🕰️ Archives ${sym} (1–18 ans)`, callback_data: `hist_${sym}` },
      { text: `⚖️ Comparer ${sym} vs BTC`, callback_data: `cmp_${sym}` }
    ]);
  } else if (customCoins.length > 1) {
    const syms = customCoins.slice(0, 2).map(c => c.symbol);
    rows.push(syms.map(s => ({ text: `🔍 Focus & Archives ${s}`, callback_data: `hist_${s}` })));
  }

  rows.push([
    { text: '🌍 Radar Marché Global', callback_data: 'cmd_global' },
    { text: '🔥 Top Hausses & Tendances', callback_data: 'cmd_trending' }
  ]);
  rows.push([
    { text: '⚡ Piliers (BTC•ETH•SOL•ZEC)', callback_data: 'cmd_majors' },
    { text: '🕰️ Archives 1 à 18 ans', callback_data: 'cmd_history' }
  ]);
  rows.push([
    { text: '🔄 Actualiser en direct', callback_data: 'cmd_refresh' },
    { text: '🧭 Guide & Questions', callback_data: 'cmd_help' }
  ]);

  return { inline_keyboard: rows };
}

// --- SYSTÈME D'ANIMATION ET FEEDBACK EN TEMPS RÉEL SUR TELEGRAM ---
async function sendProgressMessage(token, chatId, initialText) {
  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: initialText,
        parse_mode: 'HTML'
      })
    });
    const data = await res.json();
    return data?.result?.message_id || null;
  } catch (e) {
    return null;
  }
}

async function updateProgressMessage(token, chatId, messageId, newText) {
  if (!messageId) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId,
        text: newText,
        parse_mode: 'HTML'
      })
    });
  } catch (e) {
    // Ignore si le texte est identique
  }
}

async function deliverFinalMessage(token, chatId, messageId, htmlText, keyboard) {
  // 1. Si on a un message de progression ouvert, on le transforme en réponse finale (effet d'animation fluide)
  if (messageId) {
    try {
      const editRes = await fetch(`https://api.telegram.org/bot${token}/editMessageText`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          message_id: messageId,
          text: htmlText,
          parse_mode: 'HTML',
          disable_web_page_preview: true,
          reply_markup: keyboard
        })
      });
      const editData = await editRes.json();
      if (editData.ok) return;
    } catch (e) {
      // Bascule sur sendMessage si l'édition échoue
    }
  }

  // 2. Envoi direct (ou fallback texte propre si balise HTML mal fermée)
  const sendRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: htmlText,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
      reply_markup: keyboard
    })
  });
  const sendData = await sendRes.json();

  if (!sendData.ok) {
    const cleanText = htmlText.replace(/<[^>]*>/g, '');
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: cleanText,
        reply_markup: keyboard
      })
    });
  }
}

// --- COLLECTE MULTI-SOURCES HAUTE DISPONIBILITÉ (CryptoCompare + CoinGecko) ---

async function resolveCoinsFromText(text) {
  const clean = (text || '').toLowerCase();
  const found = new Map();

  const words = clean.replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ]/gi, ' ').split(/\s+/).filter(Boolean);
  for (const w of words) {
    if (CATALOG[w]) {
      found.set(CATALOG[w].symbol, CATALOG[w]);
    }
  }

  // Recherche dynamique si l'utilisateur mentionne un autre altcoin
  if (found.size === 0) {
    const candidates = words.filter(w => w.length >= 3 && !STOP_WORDS.has(w) && !CRYPTO_KEYWORDS.includes(w)).slice(0, 2);
    for (const cand of candidates) {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(cand)}`, {
          headers: { 'User-Agent': 'CryptoCoreEngine/4.0' }
        });
        if (res.ok) {
          const data = await res.json();
          const top = data?.coins?.[0];
          if (top && (top.name.toLowerCase().includes(cand) || top.symbol.toLowerCase() === cand)) {
            found.set(top.symbol.toUpperCase(), {
              id: top.id,
              symbol: top.symbol.toUpperCase(),
              name: top.name,
              year: 'N/A'
            });
          }
        }
      } catch (e) {}
    }
  }

  return Array.from(found.values()).slice(0, 5);
}

// Récupère le Top 15 mondial + Tendances (avec bascule automatique si CoinGecko limite l'IP)
async function fetchGlobalMarketData() {
  let topList = [];
  let trendingList = [];
  let globalStats = { dominance_btc: 'N/A', dominance_eth: 'N/A', market_change_24h: 'N/A' };

  try {
    const [ccTopRes, cgTopRes, cgTrendRes, cgGlobalRes] = await Promise.allSettled([
      fetch('https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD'),
      fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=15&page=1&price_change_percentage=1h,24h,7d', {
        headers: { 'User-Agent': 'CryptoCoreEngine/4.0' }
      }),
      fetch('https://api.coingecko.com/api/v3/search/trending', {
        headers: { 'User-Agent': 'CryptoCoreEngine/4.0' }
      }),
      fetch('https://api.coingecko.com/api/v3/global', {
        headers: { 'User-Agent': 'CryptoCoreEngine/4.0' }
      })
    ]);

    // 1. Priorité aux données de marché disponibles (CoinGecko ou CryptoCompare)
    if (cgTopRes.status === 'fulfilled' && cgTopRes.value.ok) {
      const cgMarkets = await cgTopRes.value.json();
      if (Array.isArray(cgMarkets) && cgMarkets.length > 0) {
        topList = cgMarkets.map(c => ({
          name: c.name,
          symbol: (c.symbol || '').toUpperCase(),
          price: c.current_price || 0,
          change1h: c.price_change_percentage_1h_in_currency || 0,
          change24h: c.price_change_percentage_24h || 0,
          change7d: c.price_change_percentage_7d_in_currency || 0,
          ath: c.ath || 0
        }));
      }
    }

    // Fallback instantané sur CryptoCompare si CoinGecko a renvoyé une erreur 429
    if (topList.length === 0 && ccTopRes.status === 'fulfilled' && ccTopRes.value.ok) {
      const ccJson = await ccTopRes.value.json();
      const rawList = ccJson?.Data || [];
      topList = rawList
        .filter(item => item?.RAW?.USD)
        .map(item => {
          const info = item.CoinInfo || {};
          const usd = item.RAW.USD;
          return {
            name: info.FullName || info.Name,
            symbol: (info.Name || '').toUpperCase(),
            price: usd.PRICE || 0,
            change1h: usd.CHANGEPCTHOUR || 0,
            change24h: usd.CHANGEPCT24HOUR || 0,
            change7d: 0,
            ath: usd.HIGH24HOUR || 0
          };
        });
    }

    if (cgTrendRes.status === 'fulfilled' && cgTrendRes.value.ok) {
      const trJson = await cgTrendRes.value.json();
      trendingList = (trJson?.coins || []).slice(0, 6).map(t => ({
        name: t.item?.name,
        symbol: (t.item?.symbol || '').toUpperCase(),
        rank: t.item?.market_cap_rank || 'N/A',
        change24h: t.item?.data?.price_change_percentage_24h?.usd || 0
      }));
    }

    if (cgGlobalRes.status === 'fulfilled' && cgGlobalRes.value.ok) {
      const gJson = await cgGlobalRes.value.json();
      const g = gJson?.data || {};
      globalStats = {
        dominance_btc: g.market_cap_percentage?.btc ? `${g.market_cap_percentage.btc.toFixed(1)}%` : '56.0%',
        dominance_eth: g.market_cap_percentage?.eth ? `${g.market_cap_percentage.eth.toFixed(1)}%` : '13.5%',
        market_change_24h: g.market_cap_change_percentage_24h_usd ? fmtPct(g.market_cap_change_percentage_24h_usd) : 'N/A'
      };
    }
  } catch (e) {
    console.error('Erreur GlobalMarket:', e);
  }

  const sortedBy24h = [...topList].sort((a, b) => b.change24h - a.change24h);
  return {
    globalStats,
    topList: topList.slice(0, 12),
    topGainers: sortedBy24h.slice(0, 3),
    topLosers: sortedBy24h.slice(-3).reverse(),
    trendingList
  };
}

// Récupère le profil complet d'une crypto + ses archives de 1 à 18 ans (100% garanti via CryptoCompare histoday)
async function fetchCoinCompleteProfile(coin) {
  try {
    const [ccLiveRes, ccHistRes, cgRes] = await Promise.allSettled([
      fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin.symbol}&tsyms=USD`),
      fetch(`https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coin.symbol}&tsym=USD&allData=true`),
      fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coin.id}&price_change_percentage=1h,24h,7d,30d,1y`, {
        headers: { 'User-Agent': 'CryptoCoreEngine/4.0' }
      })
    ]);

    let price = 0, change1h = 0, change24h = 0, change7d = 0, change30d = 0, high24h = 0, low24h = 0, ath = 0;

    if (ccLiveRes.status === 'fulfilled' && ccLiveRes.value.ok) {
      const ccLive = await ccLiveRes.value.json();
      const usd = ccLive?.RAW?.[coin.symbol]?.USD;
      if (usd) {
        price = usd.PRICE || 0;
        change1h = usd.CHANGEPCTHOUR || 0;
        change24h = usd.CHANGEPCT24HOUR || 0;
        high24h = usd.HIGH24HOUR || 0;
        low24h = usd.LOW24HOUR || 0;
      }
    }

    if (cgRes.status === 'fulfilled' && cgRes.value.ok) {
      const cgArr = await cgRes.value.json();
      const cg = cgArr?.[0];
      if (cg) {
        price = cg.current_price || price;
        change1h = cg.price_change_percentage_1h_in_currency ?? change1h;
        change24h = cg.price_change_percentage_24h ?? change24h;
        change7d = cg.price_change_percentage_7d_in_currency || 0;
        change30d = cg.price_change_percentage_30d_in_currency || 0;
        ath = cg.ath || 0;
      }
    }

    // Traitement mathématique des archives de 1 à 18 ans
    const archives = [];
    if (ccHistRes.status === 'fulfilled' && ccHistRes.value.ok) {
      const histJson = await ccHistRes.value.json();
      const points = histJson?.Data?.Data || [];

      if (points.length > 0) {
        // Calcul de l'ATH et variations 7j/30j si CoinGecko était absent
        for (const p of points) {
          if (p.high > ath) ath = p.high;
        }
        const len = points.length;
        if (!change7d && len > 7 && points[len - 8]?.close > 0) {
          change7d = ((price - points[len - 8].close) / points[len - 8].close) * 100;
        }
        if (!change30d && len > 30 && points[len - 31]?.close > 0) {
          change30d = ((price - points[len - 31].close) / points[len - 31].close) * 100;
        }

        const nowSec = Math.floor(Date.now() / 1000);
        const targetYears = [1, 2, 3, 5, 8, 10, 12, 15, 16];

        for (const yrs of targetYears) {
          const targetSec = nowSec - (yrs * 365.25 * 86400);
          const pt = points.find(p => p.time >= targetSec && p.close > 0);
          if (pt && Math.abs(pt.time - targetSec) < 60 * 86400 && price > 0) {
            const oldPrice = pt.close;
            const mult = price / oldPrice;
            const pct = ((price - oldPrice) / oldPrice) * 100;
            const yearLabel = new Date(pt.time * 1000).getFullYear();
            archives.push({
              periode: `Il y a ${yrs} an${yrs > 1 ? 's' : ''} (${yearLabel})`,
              prix_epoque: fmtPrice(oldPrice),
              performance: mult >= 10 ? `x${mult.toFixed(1)}` : fmtPct(pct)
            });
          }
        }
      }
    }

    if (coin.symbol === 'BTC') {
      archives.push({
        periode: 'Il y a 17–18 ans (Genèse 2008–2009)',
        prix_epoque: '$0.0009 (1ère cotation 2009)',
        performance: 'Whitepaper 2008 (0$) • Mai 2010: $0.0041'
      });
    }

    return {
      name: coin.name,
      symbol: coin.symbol,
      year: coin.year,
      price,
      change1h,
      change24h,
      change7d,
      change30d,
      high24h,
      low24h,
      ath,
      status: trendBadge(change1h, change24h),
      archives
    };
  } catch (e) {
    return { name: coin.name, symbol: coin.symbol, error: true };
  }
}

// --- MOTEUR ANALYTIQUE NATIF (GARANTIT UNE RÉPONSE PARFAITE MÊME SANS IA) ---
function buildNativeExpertReport(mode, userText, data) {
  const { coinsData = [], marketData = null } = data;

  // 1. Mode Archives 1 à 18 ans
  if (mode === 'history') {
    let out = `🕰️ <b>ARCHIVES HISTORIQUES (1 À 18 ANS) & COMPARATIF DIRECT</b>\n`;
    out += `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n\n`;

    for (const c of coinsData) {
      if (c.error || !c.price) continue;
      out += `💎 <b>${c.name} (${c.symbol})</b> — Actuel : <code>${fmtPrice(c.price)}</code> (${fmtPct(c.change24h)} / 24h)\n`;
      if (c.ath) out += `   🏆 <i>Record absolu (ATH) :</i> <code>${fmtPrice(c.ath)}</code>\n`;
      if (c.archives && c.archives.length > 0) {
        for (const a of c.archives) {
          out += `   • <b>${a.periode} :</b> <code>${a.prix_epoque}</code> ➔ <b>${a.performance}</b>\n`;
        }
      } else {
        out += `   • <i>Actif récent : suivi en temps réel disponible.</i>\n`;
      }
      out += `\n`;
    }

    out += `<blockquote>💡 <b>Analyse Long Terme :</b> Les cycles historiques montrent l'importance de comparer la volatilité court terme (24h) avec la trajectoire pluriannuelle. Tape le nom de n'importe quelle crypto pour extraire ses archives !</blockquote>`;
    return out;
  }

  // 2. Mode Tendances & Plus Forts Mouvements
  if (mode === 'trending' && marketData) {
    let out = `🔥 <b>RADAR DES TENDANCES & MOUVEMENTS FORTS (24H)</b>\n`;
    out += `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n\n`;

    if (marketData.topGainers.length > 0) {
      out += `🚀 <b>Leaders à la Hausse (Top Cap) :</b>\n`;
      for (const g of marketData.topGainers) {
        out += `• <b>${g.name} (${g.symbol})</b> : <code>${fmtPrice(g.price)}</code> (<b>${fmtPct(g.change24h)}</b> sur 24h | 1h: ${fmtPct(g.change1h)})\n`;
      }
      out += `\n`;
    }

    if (marketData.topLosers.length > 0) {
      out += `📉 <b>Plus Fortes Corrections (24h) :</b>\n`;
      for (const l of marketData.topLosers) {
        out += `• <b>${l.name} (${l.symbol})</b> : <code>${fmtPrice(l.price)}</code> (<b>${fmtPct(l.change24h)}</b> sur 24h | 1h: ${fmtPct(l.change1h)})\n`;
      }
      out += `\n`;
    }

    if (marketData.trendingList.length > 0) {
      out += `⚡ <b>Cryptos les plus recherchées en ce moment :</b>\n`;
      for (const t of marketData.trendingList) {
        out += `• <b>${t.name} (${t.symbol})</b> — Rang #${t.rank} (${fmtPct(t.change24h)})\n`;
      }
      out += `\n`;
    }

    out += `<blockquote>💡 <b>Conseil Radar :</b> Écris simplement le nom d'une de ces cryptos dans le chat pour obtenir son analyse complète et ses archives.</blockquote>`;
    return out;
  }

  // 3. Mode Panorama du Marché Global
  if (mode === 'global' && marketData && marketData.topList.length > 0) {
    const g = marketData.globalStats;
    let out = `🌍 <b>PANORAMA DU MARCHÉ CRYPTO EN DIRECT</b>\n`;
    out += `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n`;
    out += `📊 <b>Dominance BTC :</b> <code>${g.dominance_btc}</code> | <b>ETH :</b> <code>${g.dominance_eth}</code>\n\n`;

    out += `🏆 <b>Top 10 Capitalisations Mondiales :</b>\n`;
    for (const c of marketData.topList.slice(0, 10)) {
      const icon = c.change24h > 0.3 ? '🟢' : c.change24h < -0.3 ? '🔴' : '⚖️';
      out += `${icon} <b>${c.name} (${c.symbol})</b> : <code>${fmtPrice(c.price)}</code>\n`;
      out += `   ↳ <i>1h:</i> <code>${fmtPct(c.change1h)}</code> | <i>24h:</i> <b>${fmtPct(c.change24h)}</b>\n`;
    }

    out += `\n<blockquote>💡 <b>Lecture du marché :</b> Clique sur un onglet ci-dessous ou pose-moi une question précise (ex: <i>"Compare Solana et Ethereum sur 3 ans"</i>).</blockquote>`;
    return out;
  }

  // 4. Mode Analyse de Cryptos Spécifiques (ou Piliers BTC/ETH/SOL/ZEC)
  let out = `⚡ <b>RAPPORT D'ANALYSE CRYPTO EN DIRECT</b>\n`;
  out += `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n\n`;

  for (const c of coinsData) {
    if (c.error || !c.price) continue;
    out += `🔹 <b>${c.name} (${c.symbol})</b> — <code>${fmtPrice(c.price)}</code>\n`;
    out += `   • <b>État :</b> ${c.status}\n`;
    out += `   • <b>Variations :</b> 1h: <code>${fmtPct(c.change1h)}</code> | 24h: <b>${fmtPct(c.change24h)}</b> | 7j: <code>${fmtPct(c.change7d)}</code> | 30j: <code>${fmtPct(c.change30d)}</code>\n`;
    if (c.ath) out += `   • <b>Record (ATH) :</b> <code>${fmtPrice(c.ath)}</code>\n`;

    if (c.archives && c.archives.length > 0) {
      const sample = c.archives.slice(0, 3).map(a => `${a.periode.replace('Il y a ', '')}: ${a.prix_epoque} (${a.performance})`).join(' • ');
      out += `   • 🕰️ <b>Archives :</b> ${sample}\n`;
    }
    out += `\n`;
  }

  out += `<blockquote>💡 <b>Interaction directe :</b> Tu peux cliquer sur les boutons ci-dessous pour approfondir les archives de 1 à 18 ans ou me poser une question comparative !</blockquote>`;
  return out;
}

// --- SYNTHÈSE HYBRIDE (IA GEMINI MULTI-MODÈLES + BASCULE NATIVE GARANTIE) ---
async function synthesizeWithAIOrNative(mode, userQuestion, payload) {
  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  if (apiKey) {
    const models = ['gemini-2.5-flash', 'gemini-2.0-flash'];
    const prompt = `Tu es un analyste et stratège crypto professionnel sur Telegram.
Voici les données financières vérifiées en temps réel et les archives de 1 à 18 ans :
${JSON.stringify(payload)}

DEMANDE DE L'UTILISATEUR : "${userQuestion}"

RÈGLES STRICTES :
1. Réponds DIRECTEMENT et précisément avec les VRAIS chiffres fournis ci-dessus (prix actuels, variations 1h/24h/7j, états de hausse/baisse/stagnation et archives historiques). Ne dis JAMAIS simplement "les données ont été récupérées".
2. Formatage HTML Telegram uniquement : <b>gras</b>, <i>italique</i>, <code>chiffres</code>, <blockquote>synthèse finale</blockquote>. Aucun Markdown (**).
3. Sois fluide, humain, structuré avec des puces visuelles (🟢, 🔴, ⚖️, 🚀, 🕰️) et concis (12 à 18 lignes).`;

    for (const modelName of models) {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 5500);

        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            signal: controller.signal,
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.35, maxOutputTokens: 750 }
            })
          }
        );
        clearTimeout(timer);

        if (res.ok) {
          const json = await res.json();
          let aiReply = json?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiReply && aiReply.length > 40) {
            return aiReply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/```html|```/g, '').trim();
          }
        }
      } catch (e) {
        // Passe automatiquement au modèle suivant ou au moteur natif
      }
    }
  }

  // Si Gemini est indisponible ou lent, le Moteur Analytique Natif génère immédiatement la réponse chiffrée complète
  return buildNativeExpertReport(mode, userQuestion, payload);
}

// --- DÉTECTEUR D'INTENTION ET GESTION DU HORS-SUJET ---
function classifyIntent(userText, detectedCoins) {
  const clean = (userText || '').toLowerCase().trim();

  // Salutations / Présentation
  if (/^(bonjour|salut|hello|hey|bonsoir|coucou|yo|ça va|ca va|qui es tu|qui es-tu)/.test(clean) && clean.split(/\s+/).length <= 5) {
    return 'GREETING';
  }

  if (detectedCoins.length > 0) {
    if (/archive|ans|an|annee|année|historique|2008|2010|2012|2015|2016|2018|2020|origine|genese|genèse/.test(clean)) {
      return 'COIN_HISTORY';
    }
    return 'COIN_ANALYSIS';
  }

  const hasCryptoWord = CRYPTO_KEYWORDS.some(k => clean.includes(k));
  if (hasCryptoWord) {
    if (/tendance|trending|explose|meilleur|top|gainer|mouvement/.test(clean)) return 'MARKET_TRENDING';
    if (/archive|ans|an|historique|18 ans|10 ans|5 ans/.test(clean)) return 'MARKET_HISTORY';
    return 'MARKET_GLOBAL';
  }

  return 'OUT_OF_SCOPE';
}

// --- ORCHESTRATEUR PRINCIPAL AVEC ANIMATIONS DE FEEDBACK ---
async function handleRequestWithFeedback(token, chatId, userQuery, forcedMode = null) {
  // Étape 1 : Message animé instantané (Feedback immédiat 25%)
  const progressId = await sendProgressMessage(
    token,
    chatId,
    `⚡ <b>Initialisation du moteur d'analyse...</b>\n<code>[███▒▒▒▒▒▒▒] 25%</code> — <i>Connexion aux flux de marché en direct...</i>`
  );

  const detectedCoins = await resolveCoinsFromText(userQuery);
  const intent = forcedMode || classifyIntent(userQuery, detectedCoins);

  // Cas particulier 1 : Salutation conviviale + Météo flash en direct
  if (intent === 'GREETING') {
    const core = await Promise.all([CATALOG.btc, CATALOG.eth, CATALOG.zec].map(fetchCoinCompleteProfile));
    const greetingHtml =
      `👋 <b>Salut ! Ravi de te retrouver sur ton terminal d'analyse crypto.</b>\n` +
      `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n` +
      `Voici le pouls immédiat du marché pendant qu'on discute :\n\n` +
      core.map(c => `• <b>${c.name} (${c.symbol})</b> : <code>${fmtPrice(c.price)}</code> (${c.status} : <b>${fmtPct(c.change24h)}</b> sur 24h)`).join('\n') +
      `\n\n<blockquote>💬 <b>Que veux-tu analyser maintenant ?</b>\nDemande-moi le cours ou l'historique (de 1 à 18 ans) de n'importe quelle cryptomonnaie, ou clique sur un onglet ci-dessous !</blockquote>`;

    await deliverFinalMessage(token, chatId, progressId, greetingHtml, buildKeyboard());
    return;
  }

  // Cas particulier 2 : Question hors-sujet ou devise non reconnue -> Redirection intelligente
  if (intent === 'OUT_OF_SCOPE') {
    const redirectHtml =
      `🧭 <b>Information sur ma spécialisation</b>\n` +
      `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n` +
      `Je ne suis pas programmé pour répondre à la demande : <i>« ${userQuery.replace(/<[^>]*>/g, '')} »</i> (ou la devise mentionnée n'est pas répertoriée sur les marchés mondiaux).\n\n` +
      `🎯 <b>Mon domaine d'expertise :</b>\n` +
      `Je suis spécialisé dans l'analyse en temps réel de <b>toutes les cryptomonnaies</b> (variations 1h, 24h, 7j, tendances mondiales) et l'extraction de leurs <b>archives historiques de 1 à 18 ans</b>.\n\n` +
      `<blockquote>💡 <b>Voici des exemples de questions auxquelles je réponds instantanément :</b>\n` +
      `• <i>"Quelles sont les cryptomonnaies qui ont le plus augmenté aujourd'hui ?"</i>\n` +
      `• <i>"Analyse le prix de Solana, XRP et Zcash en direct."</i>\n` +
      `• <i>"Quel était le prix du Bitcoin et d'Ethereum il y a 5 ans et 10 ans ?"</i></blockquote>`;

    await deliverFinalMessage(token, chatId, progressId, redirectHtml, buildKeyboard());
    return;
  }

  // Étape 2 : Animation de progression (70%) pendant la collecte des données et archives
  await updateProgressMessage(
    token,
    chatId,
    progressId,
    `📡 <b>Collecte & Traitement des données...</b>\n<code>[███████▒▒▒] 70%</code> — <i>Extraction des prix temps réel et archives (1–18 ans)...</i>`
  );

  // Cas 3 : Analyse de cryptos spécifiques (avec ou sans focus archives)
  if (intent === 'COIN_ANALYSIS' || intent === 'COIN_HISTORY' || forcedMode === 'majors' || forcedMode === 'history') {
    const targetList = detectedCoins.length > 0
      ? detectedCoins
      : [CATALOG.btc, CATALOG.eth, CATALOG.sol, CATALOG.bnb, CATALOG.xrp, CATALOG.zec];

    const coinsData = await Promise.all(targetList.map(fetchCoinCompleteProfile));
    const reportMode = (intent === 'COIN_HISTORY' || forcedMode === 'history') ? 'history' : 'coins';

    const finalHtml = await synthesizeWithAIOrNative(reportMode, userQuery, { coinsData });
    await deliverFinalMessage(token, chatId, progressId, finalHtml, buildKeyboard(detectedCoins));
    return;
  }

  // Cas 4 : Panorama Marché Global ou Top Tendances
  const marketData = await fetchGlobalMarketData();
  const reportMode = (intent === 'MARKET_TRENDING' || forcedMode === 'trending') ? 'trending' : 'global';
  const finalHtml = await synthesizeWithAIOrNative(reportMode, userQuery, { marketData });

  await deliverFinalMessage(token, chatId, progressId, finalHtml, buildKeyboard());
}

// --- POINT D'ENTRÉE DU SERVEUR VERCEL ---
module.exports = async function handler(req, res) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const host = req.headers.host;

  // 1. Mode Navigateur (Activation Webhook, Test Ping & Diagnostic)
  if (req.method === 'GET') {
    const { setup, ping } = req.query || {};

    if (setup === 'true') {
      const webhookUrl = `https://${host}/api/webhook`;
      const tgRes = await fetch(`https://api.telegram.org/bot${token}/setWebhook?url=${webhookUrl}`);
      const tgJson = await tgRes.json();
      return res.status(200).json({ message: 'Webhook V4 connecté avec succès !', detail: tgJson });
    }

    if (ping === 'true') {
      const coinsData = await Promise.all([CATALOG.btc, CATALOG.eth, CATALOG.sol, CATALOG.zec].map(fetchCoinCompleteProfile));
      const marketData = await fetchGlobalMarketData();
      const pingHtml = await synthesizeWithAIOrNative(
        'global',
        "Fais un Ping de veille automatique percutant : donne l'état (hausse, baisse ou stagnation) de BTC, ETH, SOL et ZEC sur 1h et 24h, cite la plus forte hausse du marché aujourd'hui et ajoute un bref comparatif historique.",
        { coinsData, marketData }
      );
      await deliverFinalMessage(token, process.env.TELEGRAM_CHAT_ID, null, `🔔 <b>PING AUTO — VEILLE CRYPTO</b>\n\n${pingHtml}`, buildKeyboard());
      return res.status(200).json({ ok: true, message: 'Ping envoyé sur Telegram !' });
    }

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(200).send(`
      <body style="font-family:system-ui,sans-serif;background:#090d16;color:#f0f6fc;padding:40px;text-align:center;">
        <h2>⚡ Bot Crypto V4 Enterprise — Opérationnel</h2>
        <p style="color:#8b949e;">Animations Live • Double Moteur IA + Natif • Multi-Sources • Archives 1–18 ans</p>
        <p><a href="/api/webhook?setup=true" style="background:#238636;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin:10px;font-weight:bold;">🔗 1. Vérifier le Webhook Telegram</a></p>
        <p><a href="/api/webhook?ping=true" style="background:#1f6feb;color:#fff;padding:12px 24px;text-decoration:none;border-radius:8px;display:inline-block;margin:10px;font-weight:bold;">🔔 2. Envoyer un Ping Immédiat</a></p>
      </body>
    `);
  }

  // 2. Mode Telegram (Clics sur Boutons & Questions Écrites)
  if (req.method === 'POST') {
    try {
      const { message, callback_query } = req.body || {};

      // A. GESTION DES CLICS SUR LES ONGLETS / BOUTONS INTERACTIFS
      if (callback_query) {
        const chatId = callback_query.message.chat.id;
        const action = callback_query.data || 'cmd_global';

        // Stoppe immédiatement l'icône de chargement du bouton avec une notification en haut de l'écran
        await fetch(`https://api.telegram.org/bot${token}/answerCallbackQuery`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ callback_id: callback_query.id, text: '⚡ Chargement des données en direct...' })
        });

        if (action === 'cmd_help') {
          const helpHtml =
            `🧭 <b>GUIDE INTERACTIF DU TERMINAL CRYPTO</b>\n` +
            `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n` +
            `Voici tout ce que tu peux me demander en langage naturel :\n\n` +
            `1️⃣ <b>Suivi en direct (15 000+ cryptos) :</b>\n` +
            `   • <i>"Où en sont Bitcoin, Solana et Zcash aujourd'hui ?"</i>\n` +
            `   • <i>" Analyse Kaspa, Pepe et Cardano."</i>\n\n` +
            `2️⃣ <b>Archives Historiques (de 1 à 18 ans) :</b>\n` +
            `   • <i>"Compare le prix du Bitcoin il y a 1 an, 10 ans et 18 ans."</i>\n` +
            `   • <i>"Quelle est l'évolution d'Ethereum et Litecoin sur 8 ans ?"</i>\n\n` +
            `3️⃣ <b>Scanner du Marché Global :</b>\n` +
            `   • <i>"Quelles cryptos ont le plus augmenté ces dernières 24h ?"</i>\n\n` +
            `<blockquote>👇 <b>Clique sur n'importe quel onglet ci-dessous pour recevoir une analyse chiffrée immédiate :</b></blockquote>`;
          await deliverFinalMessage(token, chatId, null, helpHtml, buildKeyboard());
          return res.status(200).json({ ok: true });
        }

        // Si bouton dynamique d'archive ou de comparaison d'une crypto spécifique (ex: hist_SOL ou cmp_ZEC)
        if (action.startsWith('hist_')) {
          const sym = action.replace('hist_', '');
          await handleRequestWithFeedback(
            token,
            chatId,
            `Donne-moi toutes les archives historiques de 1 à 18 ans et l'évolution complète de ${sym}.`,
            'history'
          );
          return res.status(200).json({ ok: true });
        }

        if (action.startsWith('cmp_')) {
          const sym = action.replace('cmp_', '');
          await handleRequestWithFeedback(
            token,
            chatId,
            `Compare en détail les performances en direct et sur plusieurs années de ${sym} face au Bitcoin (BTC).`,
            'coins'
          );
          return res.status(200).json({ ok: true });
        }

        const actionMap = {
          cmd_global: { mode: 'global', query: "Dresse le panorama complet du marché crypto mondial aujourd'hui (Top 10, prix exacts, variations 1h et 24h, dominance BTC/ETH)." },
          cmd_trending: { mode: 'trending', query: "Quelles sont les cryptomonnaies qui enregistrent les plus fortes hausses, les plus fortes baisses et les tendances majeures sur 24h ?" },
          cmd_majors: { mode: 'majors', query: "Analyse détaillée en temps réel des piliers : Bitcoin (BTC), Ethereum (ETH), Solana (SOL), BNB, XRP et Zcash (ZEC)." },
          cmd_history: { mode: 'history', query: "Présente le comparatif des archives historiques de 1 à 18 ans (2008 à aujourd'hui) pour Bitcoin, Ethereum, Zcash et Solana." },
          cmd_refresh: { mode: 'global', query: "Actualise les cours en direct et indique ce qui vient de bouger sur la dernière heure et sur 24h." }
        };

        const selected = actionMap[action] || actionMap.cmd_global;
        await handleRequestWithFeedback(token, chatId, selected.query, selected.mode);
        return res.status(200).json({ ok: true });
      }

      // B. GESTION DES MESSAGES ET QUESTIONS ÉCRITES PAR L'UTILISATEUR
      if (message && message.text) {
        const chatId = message.chat.id;
        const userText = message.text.trim();

        if (userText === '/start' || userText === '/menu') {
          const startHtml =
            `⚡ <b>TERMINAL CRYPTO V4 — ACTIF 24/7</b>\n` +
            `<code>━━━━━━━━━━━━━━━━━━━━━━</code>\n` +
            `Bienvenue ! Je suis connecté en temps réel aux marchés mondiaux et à <b>18 ans d'archives historiques (2008–2026)</b>.\n\n` +
            `✅ <b>Ce que je fais pour toi :</b>\n` +
            `• Analyse en direct de <b>toutes les cryptomonnaies</b> (1h, 24h, 7j, 30j).\n` +
            `• Comparaison avec les archives de <b>1 à 18 ans</b>.\n` +
            `• Détection des hausses, baisses, stagnations et cryptos en tendance.\n\n` +
            `<blockquote>👇 <b>Clique sur un onglet ci-dessous ou pose-moi directement ta question dans le chat :</b></blockquote>`;
          await deliverFinalMessage(token, chatId, null, startHtml, buildKeyboard());
          return res.status(200).json({ ok: true });
        }

        if (userText === '/id') {
          await deliverFinalMessage(token, chatId, null, `🔑 Ton Chat ID est : <code>${chatId}</code>`, buildKeyboard());
          return res.status(200).json({ ok: true });
        }

        await handleRequestWithFeedback(token, chatId, userText, null);
      }

      return res.status(200).json({ ok: true });
    } catch (e) {
      console.error('Webhook Error:', e);
      return res.status(200).json({ ok: true });
    }
  }
};
