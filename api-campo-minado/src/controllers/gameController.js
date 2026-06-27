const gameService = require('../services/gameService');

class GameController {
  async start(req, res) {
    try {
      const { idUser, valorAposta } = req.body;
      const result = await gameService.startGame(idUser, valorAposta);
      res.status(201).json(result);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async reveal(req, res) {
    try {
      const { gameId } = req.params;
      const { linha, coluna } = req.body;
      const result = await gameService.revealPosition(gameId, linha, coluna);
      res.json(result);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async cashout(req, res) {
    try {
      const { gameId } = req.params;
      const result = await gameService.cashout(gameId);
      res.json(result);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }
}

// Garanta que essa linha exista no final:
module.exports = new GameController();