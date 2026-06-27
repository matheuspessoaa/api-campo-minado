const db = require('../config/database'); // Ajusta o caminho do teu banco se necessário

class AuthService {
  async register(userData) {
    const { nome, email, dataNascimento, senha, confirmacaoSenha } = userData;

    // 1. Validar se todos os campos obrigatórios foram enviados
    if (!nome || !email || !dataNascimento || !senha || !confirmacaoSenha) {
      throw new Error("Todos os campos são obrigatórios.");
    }

    // 2. Validar se as senhas são iguais
    if (senha !== confirmacaoSenha) {
      throw new Error("A senha e a confirmação de senha não coincidem.");
    }

    // 3. Validar as regras da senha (Mínimo 8 caracteres, maiúscula, número e caractere especial)
    if (senha.length < 8) {
      throw new Error("A senha deve possuir no mínimo 8 caracteres.");
    }
    if (!/[A-Z]/.test(senha)) {
      throw new Error("A senha deve conter pelo menos uma letra maiúscula.");
    }
    if (!/[0-9]/.test(senha)) {
      throw new Error("A senha deve conter pelo menos um número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>_]/.test(senha)) {
      throw new Error("A senha deve conter pelo menos um caractere especial.");
    }

    // 4. Verificar se o e-mail já está duplicado no banco de dados
    const emailExistente = await db.query('SELECT id FROM usuarios WHERE email = $1', [email]);
    if (emailExistente.rows.length > 0) {
      throw new Error("Este e-mail já está cadastrado.");
    }

    // 5. Criar o usuário no banco de dados (saldo inicial começa em 0 ou conforme a tua regra)
    const novoUsuario = await db.query(
      'INSERT INTO usuarios (nome, email, data_nascimento, senha, saldo) VALUES ($1, $2, $3, $4, $5) RETURNING id, nome, email, data_nascimento as "dataNascimento", saldo',
      [nome, email, dataNascimento, senha, 0.00]
    );

    return novoUsuario.rows[0];
  }

  async login(email, senha) {
    if (!email || !senha) {
      throw new Error("E-mail e senha são obrigatórios.");
    }

    const usuario = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (usuario.rows.length === 0 || usuario.rows[0].senha !== senha) {
      throw new Error("E-mail ou senha incorretos.");
    }

    const user = usuario.rows[0];
    return {
      id: user.id,
      nome: user.nome,
      email: user.email,
      saldo: user.saldo
    };
  }

  async resetPassword(id, novaSenha) {
    if (!id || !novaSenha) {
      throw new Error("ID e nova senha são obrigatórios.");
    }

    // Validar regras da nova senha
    if (novaSenha.length < 8) {
      throw new Error("A nova senha deve possuir no mínimo 8 caracteres.");
    }
    if (!/[A-Z]/.test(novaSenha)) {
      throw new Error("A nova senha deve conter pelo menos uma letra maiúscula.");
    }
    if (!/[0-9]/.test(novaSenha)) {
      throw new Error("A nova senha deve conter pelo menos um número.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>_]/.test(novaSenha)) {
      throw new Error("A nova senha deve conter pelo menos um caractere especial.");
    }

    // Buscar senha atual para garantir que não é igual
    const usuario = await db.query('SELECT senha FROM usuarios WHERE id = $1', [id]);
    if (usuario.rows.length === 0) {
      throw new Error("Usuário não encontrado.");
    }

    if (usuario.rows[0].senha === novaSenha) {
      throw new Error("A nova senha não pode ser igual à senha atual.");
    }

    // Atualizar no banco
    await db.query('UPDATE usuarios SET senha = $1 WHERE id = $2', [novaSenha, id]);
    return true;
  }
}

// ESTA LINHA RESOLVE O ERRO DO THUNDER CLIENT:
module.exports = new AuthService();