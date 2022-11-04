class ValidaCPF {

    constructor() {
        this.cpfSended = ''
        this.cpfClean = ''
    }

    cpfCleaner() {
        return this.cpfSended.replace(/\D+/g, '')
    }

    validationCPF(cpfSended) {

        this.cpfSended = cpfSended
        this.cpfClean = this.cpfCleaner(this.cpfSended)

        if (!this.cpfClean || this.cpfClean.length !== 11 || this.isSequence()) {
            return false
        }
    
        const cpfParcial = this.cpfClean.slice(0, -2)
    
        const digit1 = this.getDigitCPF(cpfParcial)
        const digit2 = this.getDigitCPF(cpfParcial + digit1)
    
        const newCpf = cpfParcial + digit1 + digit2
    
        return newCpf === this.cpfClean
    }

    getDigitCPF(cpfParcial) {
        const cpfArray = cpfParcial.split('')
        let counter = cpfArray.length + 1

        const total = cpfArray.reduce((ac, valor) => {
            ac += Number(valor) * counter
            counter--
            return ac
        }, 0)

        const digit = 11 - (total % 11)
    
        return digit > 9 ? String(0) : String(digit)
    }

    isSequence() {
        return this.cpfClean[0].repeat(this.cpfClean.length) === this.cpfClean
    }

}

class FormValidation {

    constructor(ValidCPF) {
        this.ValidCPF = ValidCPF
        this.form = document.querySelector('.form')
        this.events()
    }

    events() {
        this.form.addEventListener('submit', e => {
            this.handleSubmit(e)
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        const validsInputs = this.isInputsValids()
        const validsPasswords = this.isPasswordsValids()

        if (validsInputs && validsPasswords) {
            alert('Formulário enviado com sucesso!')
            this.form.submit()
        }
    }

    generateError(input, message) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerText = message

        input.insertAdjacentElement('afterend', div)

    }

    isInputsValids() {
        let valid = true
        const inputs = this.form.querySelectorAll('.input')

        for (let divError of this.form.querySelectorAll('.error')) {
            divError.remove()
        }

        for (let input of inputs) {
            let messageError = ''
            const label = input.previousElementSibling.innerText

            if (!input.value) {
                valid = false
                messageError = `Campo "${label}" não pode estar vazio!`
                this.generateError(input, messageError)
            }

            if (input.id === 'idCpf') {
                if (!this.isCPFValid(input)) valid = false
            }

            if (input.id === 'idUser') {
                if (!this.isUserValid(input)) valid = false
            }
        }

        return valid
    }

    isPasswordsValids() {
        let messageError = ''
        let valid = true

        const password = this.form.querySelector('#idPassword')
        const confirmPassword = this.form.querySelector('#idConfirmPassword')

        if (password.value.length < 6 || password.value.length > 12) {
            valid = false
            messageError = 'Senha precisa ter entre 6 e 12 caracteres!'
            this.generateError(password, messageError)
        }

        if (password.value !== confirmPassword.value) {
            valid = false
            messageError = 'Campos Senha e Repetir Senha não são iguais!'
            this.generateError(password, messageError)
            this.generateError(confirmPassword, messageError)
        }

        return valid
    }

    isCPFValid(input) {
        let messageError = 'CPF inválido!'

        if (!this.ValidCPF.validationCPF(input.value)) {
            this.generateError(input, messageError)
            return false
        }

        return true
    } 

    isUserValid(input) {
        let messageError = ''
        const user = input.value
        let valid = true

        if (user.length < 3 || user.length > 12) {
            messageError = 'Nome de usuário precisa ter entre 3 e 12 caracteres!'
            this.generateError(input, messageError)
            valid = false
        }

        if (!user.match(/^[a-zA-Z0-9]+$/gi)) {
            messageError = 'Nome de usuário precisa conter apenas letras e/ou números!'
            this.generateError(input, messageError)
            valid = false
        }
           
        return valid
        
    }
    
}

const ValidCPF = new ValidaCPF()
const validation = new FormValidation(ValidCPF)