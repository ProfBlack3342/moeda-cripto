/**
 * Classe que define um usuario
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.1
 */
export class User {
    #id = -1;

    get id() {
        return this.#id;
    }
    set id(newId) {
        let tempNewId = newId;
        switch(typeof newId) {
            case 'string':
                tempNewId = Number(newId);
            case 'number':
                if(!(Number.isNaN(tempNewId))) {
                    this.#id = tempNewId;
                    return true;
                }
            default:
                this.#id = -1;
                return false;
        }
    }

    #login = 'login';
    get login() {
        return this.#login;
    }
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

    #senha = 'senha';
    get senha() {
        return this.#senha;
    }
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

    #nome = 'nome';
    get nome() {
        return this.#nome;
    }
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

    #cpf = 'cpf';
    get cpf() {
        return this.#cpf;
    }
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

    #email = 'email';
    get email() {
        return this.#email;
    }
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