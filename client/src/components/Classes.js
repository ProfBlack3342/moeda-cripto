/**
 * Classe que define um usuario
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
export class User {
    
    static #id = null;

    static get id() {
        return this.#id;
    }
    static set id(newId) {
        let newIdNum = newId;   // Cópia da entrada para testes
        switch(typeof newId) {
            case 'string':
                // Se o valor teste for uma string, converte a entrada em um número e o armazena no valor teste.
                newIdNum = Number(newId);
            case 'number':
                // Caso seja um número, verifica se não é o valor especial 'NaN'. Se não for, '#id' recebe o valor
                if(!(Number.isNaN(newIdNum))) {
                    this.#id = newIdNum;
                    return true;
                }
            default:
                this.#id = -1;
                return false;
        }
    }

    static #login = null;
    static get login() {
        return this.#login;
    }
    static set login(newLogin) {
        switch(typeof newLogin) {
            case 'string':
                // Teste de tamanho, valor máximo é definido no banco de dados.
                if(newLogin.length <= 150) {
                    this.#login = newLogin;
                    return true;
                }
            default:
                this.#login = null;
                return false;
        }
    }

    static #hash = null;
    static get senha() {
        return this.#hash;
    }
    static set senha(newHash) {
        switch(typeof newHash) {
            case 'string':
                // Teste de tamanho, valor máximo é definido pela biblioteca Bcrypt E no banco de dados.
                if(newHash <= 60) {
                    this.#hash = newHash;
                    return true;
                }
            default:
                this.#hash = null;
                return false;
        }
    }

    static #nome = null;
    static get nome() {
        return this.#nome;
    }
    static set nome(newNome) {
        switch(typeof newNome) {
            case 'string':
                // Teste de tamanho, valor máximo é definido no banco de dados.
                if(newNome.length <= 150) {
                    this.#nome = newNome;
                    return true;
                }
            default:
                this.#nome = null;
                return false;
        }
    }

    static #cpf = null;
    static get cpf() {
        return this.#cpf;
    }
    static set cpf(newCpf) {
        let newCpfString = newCpf;  // Cópia da entrada para testes
        switch(typeof newCpf) {
            case 'number':
                // Se o valor teste for um número, converte a entrada em uma string e a armazena no valor teste.
                newCpfString = String(newCpf);
            case 'string':
                // Teste de tamanho (sendo que, em 2025, CPFs tem 11 e CNPJs 14), valor máximo é definido no banco de dados.
                if(newCpfString.length <= 14) {
                    this.#cpf = newCpfString;
                    return true;
                }
            default:
                this.#cpf = null;
                return false;
        }
    }

    static #email = null;
    static get email() {
        return this.#email;
    }
    static set email(newEmail) {
        switch(typeof newEmail) {
            case 'string':
                // Teste de tamanho, valor máximo é definido no banco de dados.
                if(newEmail <= 90) {
                    this.#email = newEmail;
                    return true;
                }
            default:
                this.#email = null;
                return false;
        }
    }

    static clearData() {
        this.#id = null;
        this.#login = null;
        this.#hash = null;
        this.#nome = null;
        this.#cpf = null;
        this.#email = null;
    }

    static toString() {
        return `User -> ID = ${this.#id} || Login = ${this.#login} || Senha = ${this.#hash} || Nome = ${this.#nome} || CPF = ${this.#cpf} || Email = ${this.#email}\n`;
    }

    static toJson() {
        return {
                id: this.#id,
                login: this.#login,
                senha: this.#hash,
                nome: this.#nome,
                cpf: this.#cpf,
                email: this.#email
            };
    }

}