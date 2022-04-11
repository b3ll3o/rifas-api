import { Usuario } from '../../usuarios/domain/entities/usuario.entity';
import { Modulo } from '../domain/entities/modulo.entity';
import { PerfilModuloPermissao } from '../domain/entities/perfil-modulo-permissao.entity';
import { PerfilModulo } from '../domain/entities/perfil-modulo.entity';
import { Perfil } from '../domain/entities/perfil.entity';
import { Permissao } from '../domain/entities/permissao.entity';

const NOME = 'nome';
const SENHA = 'senha';
export const EMAIL = 'email@email.com';

export const perfilFactory = ({ nome = NOME }): Perfil =>
  new Perfil({
    nome,
  });

export const perfilCadastradoFactory = ({ nome = NOME, id = 1 }): Perfil =>
  new Perfil({
    id,
    nome,
  });

export const moduloFactory = ({ nome = NOME }): Modulo =>
  new Modulo({
    nome,
  });

export const moduloCadastradoFactory = ({ nome = NOME, id = 1 }): Modulo =>
  new Modulo({
    id,
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

export const permissaoCadastradaFactory = ({
  nome = NOME,
  id = 1,
}): Permissao =>
  new Permissao({
    nome,
    id,
  });

export const perfilModuloFactory = ({
  modulo = moduloCadastradoFactory({}),
  perfil = perfilCadastradoFactory({}),
}) =>
  new PerfilModulo({
    modulo,
    perfil,
  });

export const perfilModuloCadastradoFactory = ({
  modulo = moduloCadastradoFactory({}),
  perfil = perfilCadastradoFactory({}),
  id = 1,
}) =>
  new PerfilModulo({
    modulo,
    perfil,
    id,
  });

export const perfilModuloPermissaoFactory = ({
  perfilModulo = perfilModuloCadastradoFactory({}),
  permissao = permissaoCadastradaFactory({}),
}): PerfilModuloPermissao =>
  new PerfilModuloPermissao({
    perfilModulo,
    permissao,
  });

export const perfilModuloPermissaoCadastradaFactory = ({
  perfilModulo = perfilModuloCadastradoFactory({}),
  permissao = permissaoCadastradaFactory({}),
  id = 1,
}): PerfilModuloPermissao =>
  new PerfilModuloPermissao({
    perfilModulo,
    permissao,
    id,
  });
