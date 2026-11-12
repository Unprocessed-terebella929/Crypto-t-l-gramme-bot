// api/cron.js
import { detectCoinsFromQuery, fetchAndCompressCoinData, generateSmartResponse } from './cryptoEngine.js';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization;
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Non autorisé' });
  }

  try {
    const defaultCoins = detectCoinsFromQuery('bitcoin ethereum zcash');
    const compressedData = await Promise.all(
      defaultCoins.map(coin => fetchAndCompressCoinData(coin))
    );

    const promptPing = "Génère un Ping de notification ultra-concis sur l'état actuel (1h et 24h : indique clairement si ça a augmenté, baissé ou stagné) pour BTC, ETH et ZEC, et ajoute en 1 seule phrase par crypto un comparatif frappant avec son prix d'il y a 1 an ou 10 ans.";

    const report = await generateSmartResponse(promptPing, compressedData);

    await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: process.env.TELEGRAM_CHAT_ID,
        text: `🔔 *PING AUTO CRYPTO*\n\n${report}`,
        parse_mode: 'Markdown'
      })
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
