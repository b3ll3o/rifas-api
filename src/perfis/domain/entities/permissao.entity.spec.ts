import {
  permissaoCadastradaFactory,
  permissaoFactory,
} from '../../../perfis/tests/construtores-entidade';

describe('Permissao', () => {
  describe('valido', () => {
    it('deve retornar true se o id for diferente de undefined, null ou 0', () => {
      const permissao = permissaoCadastradaFactory({});
      permissao.id = 1;
      expect(permissao.valido()).toBeTruthy();
    });

    it('deve retornar false se o id for igual a undefined, null ou 0', () => {
      const permissao = permissaoFactory({});
      permissao.id = undefined;
      expect(permissao.valido()).toBeFalsy();
    });

    it('deve retornar false se o id for igual a undefined, null ou 0', () => {
      const permissao = permissaoFactory({});
      permissao.id = null;
      expect(permissao.valido()).toBeFalsy();
    });

    it('deve retornar false se o id for igual a undefined, null ou 0', () => {
      const permissao = permissaoFactory({});
      permissao.id = 0;
      expect(permissao.valido()).toBeFalsy();
    });
  });
});
