import { Usuario } from '../../usuarios/domain/entities/usuario.entity';
import { Modulo } from '../domain/entities/modulo.entity';
import { Perfil } from '../domain/entities/perfil.entity';
import { Permissao } from '../domain/entities/permissao.entity';

const NOME = 'nome';
const SENHA = 'senha';
const EMAIL = 'email@email.com';

export const perfilFactory = ({ nome = NOME }): Perfil =>
  new Perfil({
    nome,
  });

export const moduloFactory = ({ nome = NOME }): Modulo =>
  new Modulo({
    nome,
  });

export const usuarioFactory = ({ email = EMAIL, senha = SENHA }): Usuario =>
  new Usuario({
    email,
    senha,
  });

export const permissaoFactory = ({ nome = NOME }): Permissao =>
  new Permissao({
    nome,
  });

export const permissaoCadastradaFActory = ({
  nome = NOME,
  id = 1,
}): Permissao =>
  new Permissao({
    nome,
    id,
  });
