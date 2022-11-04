class ValidaCPF {

    constructor(cpfSended) {
        this.cpfSended = cpfSended
    }

    get cpfClean() {
        return this.cpfSended.replace(/\D+/g, '')
    }

    validationCPF() {
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