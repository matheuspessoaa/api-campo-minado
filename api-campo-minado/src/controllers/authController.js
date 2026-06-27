const authService = require('../services/authService');

class AuthController {
  async register(req, res) {
    try {
      const user = await authService.register(req.body);
      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const data = await authService.login(email, senha);
      res.status(200).json(data);
    } catch (err) {
      res.status(401).json({ erro: err.message });
    }
  }

  async resetPassword(req, res) {
    try {
      const { id, novaSenha } = req.body;
      await authService.resetPassword(id, novaSenha);
      res.status(200).json({ mensagem: "Senha atualizada com sucesso!" });
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }
}

// ESSA LINHA É CRUCIAL (instancia e exporta a classe):
module.exports = new AuthController();