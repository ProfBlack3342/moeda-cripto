/**
 * Classe que define um usuario
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
export class User {
    #id = -1;

    get id() {return this.#id;}
    set id(newId) {
        switch(typeof newId) {
            case 'number':
                this.#id = newId;
                return true;
            case 'string':
                this.#id = Number(newId);
                return true;
            default:
                this.#id = null;
                return false;
        }
    }

    #login = 'LoginUsuario';
    get login() {return this.#login;}
    set login(newLogin) {
        switch(typeof newLogin) {
            case 'string':
                this.#login = newLogin;
                return true;
            default:
                this.#login = null;
                return false;
        }
    }

    #senha = 'HashSenhaUsuario';
    get senha() {return this.#senha;}
    set senha(newSenha) {
        switch(typeof newSenha) {
            case 'string':
                this.#senha = newSenha;
                return true;
            default:
                this.#senha = null;
                return false;
        }
    }

    #nome = 'NomeUsuario';
    get nome() {return this.#nome;}
    set nome(newNome) {
        switch(typeof newNome) {
            case 'string':
                this.#nome = newNome;
                return true;
            default:
                this.#nome = null;
                return false;
        }
    }

    #cpf = 'CPF Usuario';
    get cpf() {return this.#cpf;}
    set cpf(newCpf) {
        switch(typeof newCpf) {
            case 'number':
                this.#cpf = String(newCpf);
                return true;
            case 'string':
                this.#cpf = newCpf;
                return true;
            default:
                this.#cpf = null;
                return false;
        }
    }

    #email = 'Email Usuario';
    get email() {return this.#email;}
    set email(newEmail) {
        switch(typeof newEmail) {
            case 'string':
                this.#email = newEmail;
                return true;
            default:
                this.#email = null;
                return false;
        }
    }

    toString() {
        return `User -> ID = ${this.#id} || Login = ${this.#login} || Senha = ${this.#senha} || Nome = ${this.#nome} || CPF = ${this.#cpf} || Email = ${this.#email}\n`;
    }

}