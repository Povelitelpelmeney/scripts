module.exports = class Float {
    constructor(number) {
        this.#convertToBinary(number)
        this.#convertToDecimal()
    }
/////////////////////////////////////////////////////////
    #convertToBinary(number) {
        if (number === undefined || isNaN(+number)) {
            this.sign = isNaN(+number) ? '1' : '0'
            this.exponent = '11111111'
            this.significand = '10000000000000000000000'
            return
        }
        number = number.toString()
        number[0] === '-' ? (this.sign = '1', number = number.slice(1)) : this.sign = '0'
        while (number.length > 1 && number[0] === '0' && number[1] !== '.')
            number = number.slice(1)

        number = number.split('.')
        let integer = (+number[0]).toString(2)
        let fraction = ''
        for (let i = 0, temp = +('0.' + number[1]); i < 149; i++) {
            temp *= 2
            if (temp >= 1) {
                temp -= 1
                fraction += '1'
            } else fraction += '0'
        }

        let exponent = 0
        while (integer.length > 1 && exponent < 128) {
            fraction = integer[integer.length - 1] + fraction
            integer = integer.slice(0, integer.length - 1)
            exponent++
        }
        while (integer === '0' && exponent > -126) {
            integer = fraction[0]
            fraction = fraction.slice(1)
            exponent--
        }

        if (integer === '0') exponent = -127

        this.exponent = (exponent + 127).toString(2)
        while (this.exponent.length < 8)
            this.exponent = '0' + this.exponent

        this.significand = exponent === 128 ? '00000000000000000000000' : fraction.slice(0, 23)
    }
//////////////////////////////////////////////////////////////////////////////////////

    #convertToDecimal() {
        let exponent = parseInt(this.exponent, 2) - 127

        if (exponent === -127 && this.significand === '00000000000000000000000') {
            this.decimal = this.sign === '0' ? '0' : '-0'
            return
        }
        let significand = 0
        for (let i = 0; i < this.significand.length; i++)
            significand += (1 / Math.pow(2, i + 1)) * this.significand[i]

        exponent === -127 ? exponent++ : significand++
        if (this.sign === '1') significand *= -1

        this.decimal = significand * Math.pow(2, exponent)
    }
////////////////////////////////////////////////////////////////////////////////////////
    static sum(num1, num2, operator) {
        num1 = new Float(num1)
        num2 = new Float(num2)

        let sign1 = num1.sign
        let exponent1 = parseInt(num1.exponent, 2) - 127
        let significand1 = num1.significand

        let sign2 = num2.sign
        let exponent2 = parseInt(num2.exponent, 2) - 127
        let significand2 = num2.significand

        if (exponent1 === 128 && significand1 === '10000000000000000000000')
            return num1
        if (exponent2 === 128 && significand2 === '10000000000000000000000')
            return num2
        if (exponent1 === 128 && exponent2 === 128)
            return new Float(NaN)
        if (exponent1 === 128)
            return num1
        if (exponent2 === 128) {
            if (operator === '-') {
                num2.sign = ((+num2.sign + 1) % 2).toString()
                num2.#convertToDecimal()
            }
            return num2
        }

        exponent1 === -127 ? (significand1 = '0' + significand1, exponent1++) : significand1 = '1' + significand1
        exponent2 === -127 ? (significand2 = '0' + significand2, exponent2++) : significand2 = '1' + significand2

        while (exponent1 < exponent2) {
            significand1 = '0' + significand1.slice(0, 23)
            exponent1++
            if (significand1 === '000000000000000000000000')
                return num2
        }
        while (exponent2 < exponent1) {
            significand2 = '0' + significand2.slice(0, 23)
            exponent2++
            if (significand2 === '000000000000000000000000')
                return num1
        }
        let exponent = exponent1

        significand1 = sign1 === '1' ? '-' + significand1 : significand1
        significand2 = sign2 === '1' ? '-' + significand2 : significand2

        num1 = parseInt(significand1, 2)
        num2 = parseInt(significand2, 2)

        let significand
        switch (operator) {
            case '+':
                significand = (num1 + num2).toString(2)
                break
            case '-':
                significand = (num1 - num2).toString(2)
                break
        }

        let sign
        significand[0] === '-' ? (sign = '1', significand = significand.slice(1)) : sign = '0'

        while (significand.length > 24 && exponent < 128) {
            significand = significand.slice(0, significand.length - 1)
            exponent++
        }
        while (significand.length < 24) {
            exponent > -126 ? (significand += '0', exponent--) : significand = '0' + significand
        }

        if (exponent === 128) significand = '000000000000000000000000'
        if (exponent === -126 && significand[0] === '0') exponent--

        let result = new Float()
        result.sign = sign
        result.exponent = (exponent + 127).toString(2)
        while (result.exponent.length < 8)
            result.exponent = '0' + result.exponent
        result.significand = significand.slice(1)
        result.#convertToDecimal()

        return result
    }
/////////////////////////////////////////////////////////////////////////////////
    toString() {
        return `${this.decimal} = ${this.sign} ${this.exponent} ${this.significand}`
    }
}
const args = process.argv
const fs = require('fs')
const Float = require('./js16')
let expr = fs.readFileSync('input.txt', 'utf-8')
expr = expr.split(/\s+/);

if (expr[2] && (expr[1] === '+' || expr[1] === '-')) {
    let num1 = new Float(expr[0])
    let num2 = new Float(expr[2])
    let result = Float.sum(expr[0], expr[2], expr[1])
    console.log(`${num1}\n${num2}\n${result}`)
} else {
    let result = new Float(expr[0])
    console.log(result.toString())
}