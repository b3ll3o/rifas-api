import { Column, Entity, OneToMany } from 'typeorm';
import { Rastreamento } from '../../../shared/rastreamento';
import { PerfilModulo } from './perfil-modulo.entity';
import { Permissao } from './permissao.entity';

@Entity()
export class Modulo extends Rastreamento<Modulo> {
  
  @Column()
  nome: string;

  @OneToMany(() => PerfilModulo, (perfil) => perfil.modulo)
  perfis: PerfilModulo[];

  @OneToMany(() => Permissao, (permissao) => permissao.modulo)
  permissoes: Permissao[];

  adicionaPermissao(permissao: Permissao) {
    if(!this.permissoes)
      this.permissoes = []

    if(permissao.valido() && !this.permissaoJaAdicionada(permissao))
      this.permissoes.push(permissao)
  }

  private permissaoJaAdicionada(permissao: Permissao): boolean {
    return this.permissoes.find(p => p.id === permissao.id) !== undefined
  }
}
