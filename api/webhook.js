// api/webhook.js
import { detectCoinsFromQuery, fetchAndCompressCoinData, generateSmartResponse } from './cryptoEngine.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(200).send('Webhook Bot Crypto Intelligent Actif.');
  }

  try {
    const { message } = req.body;
    if (!message || !message.text) return res.status(200).json({ ok: true });

    const chatId = message.chat.id;
    const userText = message.text.trim();
    const token = process.env.TELEGRAM_BOT_TOKEN;

    // 1. Afficher immédiatement "Le bot est en train d'écrire..." sur Telegram
    await fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, action: 'typing' })
    });

    let replyText = '';

    if (userText === '/start' || userText === '/aide') {
      replyText = `🤖 *Assistant Crypto Temps Réel & Archives (1–18 ans)*\n\nPose-moi n'importe quelle question directement ! Exemples :\n• _"Où en est le Zcash aujourd'hui et par rapport à il y a 5 ans ?"_\n• _"Compare l'évolution du Bitcoin sur 1 an, 10 ans et 18 ans."_\n• _"Pourquoi Ethereum bouge aujourd'hui ?"_\n\nCommandes rapides : /check ou /id`;
    } else if (userText === '/id') {
      replyText = `Ton Chat ID est : \`${chatId}\``;
    } else {
      // 2. Détection des cryptos concernées par la question
      const targetCoins = detectCoinsFromQuery(userText);

      // 3. Collecte et compression en parallèle (Temps réel + 18 ans d'archives)
      const compressedData = await Promise.all(
        targetCoins.map(coin => fetchAndCompressCoinData(coin))
      );

      // 4. Génération de la réponse filtrée sans surcharge
      replyText = await generateSmartResponse(userText, compressedData);
    }

    // 5. Envoi de la réponse finale sur Telegram
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: replyText,
        parse_mode: 'Markdown'
      })
    });

    return res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    return res.status(200).json({ ok: true });
  }
}
