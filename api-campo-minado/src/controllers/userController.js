const userRepository = require('../repositories/userRepository');

class UserController {
  async getProfile(req, res) {
    try {
      const user = await userRepository.findById(req.params.id);
      if (!user) return res.status(404).json({ erro: "Usuário não encontrado" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async getDashboard(req, res) {
    try {
      const userId = req.query.userId || 1; 
      const stats = await userRepository.getDashboardStats(userId);
      res.json(stats);
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }

  async updateSaldo(req, res) {
    try {
      const { id } = req.params;
      const { saldo } = req.body;
      if (saldo < 0) return res.status(400).json({ erro: "Não é permitido cadastrar saldo negativo." });
      
      const regexCasasDecimais = /^\d+(\.\d{1,2})?$/;
      if (!regexCasasDecimais.test(saldo.toString())) {
        return res.status(400).json({ erro: "O saldo deve conter no máximo duas casas decimais." });
      }

      const user = await userRepository.findById(id);
      const novoSaldoTotal = parseFloat(user.saldo) + parseFloat(saldo);
      const atualizado = await userRepository.updateSaldo(id, novoSaldoTotal);
      res.json({ saldo: atualizado });
    } catch (err) {
      res.status(400).json({ erro: err.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await userRepository.delete(req.params.id);
      res.status(204).send();
    } catch (err) {
      res.status(500).json({ erro: err.message });
    }
  }
}

// Garanta que essa linha exista no final:
module.exports = new UserController();