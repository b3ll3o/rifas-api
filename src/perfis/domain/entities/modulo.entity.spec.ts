import {
  moduloFactory,
  permissaoCadastradaFactory,
  permissaoFactory,
} from '../../tests/construtores-entidade';

describe('Modulo', () => {
  describe('adicionaPermissao', () => {
    it('deve adicionar uma permissao ao modulo', () => {
      const modulo = moduloFactory({});
      const permissao = permissaoCadastradaFactory({});

      modulo.adicionaPermissao(permissao);

      expect(modulo.permissoes).toContain(permissao);
    });

    it('não deve adicionar duas vezes a mesma permissao ao modulo', () => {
      const modulo = moduloFactory({});
      const permissao = permissaoCadastradaFactory({});

      modulo.adicionaPermissao(permissao);
      modulo.adicionaPermissao(permissao);

      expect(modulo.permissoes).toHaveLength(1);
    });

    it('não deve adicionar permissao sem id', () => {
      const modulo = moduloFactory({});
      const permissao = permissaoFactory({});

      modulo.adicionaPermissao(permissao);

      expect(modulo.permissoes).toHaveLength(0);
    });
  });
});
