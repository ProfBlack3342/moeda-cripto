/**
 * Classe que define um usuario
 * 
 * @author Eduardo Pereira Moreira <eduardopereiramoreira1995@gmail.com>
 * @since 1.0
 * @version 1.0
 */
export class User {
    #id = -1;

    get id() {
        return this.#id;
    }
    set id(newId) {
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

    #login = 'login';
    get login() {
        return this.#login;
    }
    set login(newLogin) {
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

    #senha = 'senha';
    get senha() {
        return this.#senha;
    }
    set senha(newSenha) {
        switch(typeof newSenha) {
            case 'string':
                // Tamanho em bytes da entrada, para evitar erros na geração do hash no backend.
                const bytesSenha = (newSenha) => new Blob([newSenha]).size;
                if(bytesSenha <= 72) {
                    this.#senha = newSenha;
                    return true;
                }
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

    #cpf = 'cpf';
    get cpf() {
        return this.#cpf;
    }
    set cpf(newCpf) {
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

    #email = 'email';
    get email() {
        return this.#email;
    }
    set email(newEmail) {
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

    toString() {
        return `User -> ID = ${this.#id} || Login = ${this.#login} || Senha = ${this.#senha} || Nome = ${this.#nome} || CPF = ${this.#cpf} || Email = ${this.#email}\n`;
    }

}