class Calculator{
    constructor(prevText, currentText){
        this.prevText = prevText
        this.currentText= currentText,
        this.clear()
    }

    clear(){
        this.currentOperand =''
        this.prevOperand=''
        this.opreation = undefined
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    append(num){
        if(num ==="."&&this.currentOperand.includes('.'))return 
        this.currentOperand = this.currentOperand.toString()+num.toString()
    }

    chooseOperation(operation){
        if(this.currentOperand=='')return
        if(this.prevOperand !== ''){
            this.compute()
        }
        this.opreation = operation
        this.currentOperand = `${this.currentOperand} ${this.opreation}`
        this.prevOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let result
        const prev = parseFloat(this.prevOperand)
        const current=parseFloat(this.currentOperand)
        if(isNaN(prev)||isNaN(current))return
        switch(this.opreation){
            case '+':
                result = prev+current
                break
            case '-':
                result = prev-current
                break
            case '*':
                result = prev*current
                break
            case '/':
                result = prev/current
                break
            default:
                return
        }

        this.prevOperand=''
        this.opreation=undefined
        this.currentOperand=result
    }


    getNumber(number){
        const stringNum = number.toString()
        const intNum = parseFloat(stringNum.split('.')[0]) 
        const decNum = stringNum.split('.')[1] 
        let intDisplay
        if(isNaN(intNum)){
            intDisplay = ''
        }else{
            intDisplay = intNum.toLocaleString('en',{maximumFractionDigits:0})
        }

        if(decNum!=null){
            return `${intDisplay}.${decNum}`
        }else{
            return intDisplay
        }
    }
    
    updateDisplay(){
        this.currentText.innerText = this.getNumber(this.currentOperand)
        this.prevText.innerText = this.getNumber(this.prevOperand)
    }
}


const number = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll('[data-operand]')
const equals = document.querySelector('[data-equals]')
const clear = document.querySelector('[data-clear]')
const prevText = document.querySelector('[data-prev]')
const deleteButton = document.querySelector('[data-delete]')
const currentText = document.querySelector('[data-current]')


const calculator = new Calculator(prevText,currentText)


number.forEach((e)=>{
    e.addEventListener('click',()=>{
       calculator.append(e.innerText)
       calculator.updateDisplay() 
    })
})

operation.forEach((e)=>{
    e.addEventListener('click',()=>{
       calculator.chooseOperation(e.innerText)
       calculator.updateDisplay() 
    })
})

equals.addEventListener('click',()=>{
    calculator.compute()
    calculator.updateDisplay()
})

clear.addEventListener('click',()=>{
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click',()=>{
    calculator.delete()
    calculator.updateDisplay()
})