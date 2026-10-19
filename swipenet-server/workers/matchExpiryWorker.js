import Match from '../models/Match.js';

export const initMatchExpiryWorker = (io, intervalMs = 60000) => {
  console.log('⏱️ Match Expiry Worker initialized (48h Anti-Ghosting Engine)');

  const checkExpiredMatches = async () => {
    try {
      const now = new Date();

      const expiredMatches = await Match.find({
        stage: 'matched',
        firstMessageAt: null,
        expiresAt: { $lte: now },
      });

      if (expiredMatches.length > 0) {
        console.log(`⏳ Expiring ${expiredMatches.length} inactive match(es)`);
      }

      for (const match of expiredMatches) {
        match.stage = 'expired';
        await match.save();

        if (io) {
          io.to(match._id.toString()).emit('match:status_changed', {
            matchId: match._id,
            stage: 'expired',
            reason: '48-hour response window elapsed without contact.',
          });
        }
      }
    } catch (err) {
      console.error('[MatchExpiryWorker] Error running cycle:', err);
    }
  };

  // Run on startup and on interval
  checkExpiredMatches();
  const timer = setInterval(checkExpiredMatches, intervalMs);

  return () => clearInterval(timer);
};
