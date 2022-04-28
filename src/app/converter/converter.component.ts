import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-converter',
    templateUrl : './converter.component.html',
    styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit {

    public usdBuy!: number
    public usdSale!: number
    public eurBuy!: number
    public eurSale!: number

    public leftInput: any
    public rightInput: any
    public leftCurrency = ''
    public rightCurrency = ''

    ngOnInit() {
        fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
        .then(res => res.json())
        .then(res => {
            this.usdBuy = +(parseFloat(res[0].buy).toFixed(2))
            this.eurBuy = +(parseFloat(res[1].buy).toFixed(2))
            this.usdSale = +(parseFloat(res[0].sale).toFixed(2))
            this.eurSale = +(parseFloat(res[1].sale).toFixed(2))
        })
    }

    changeValue(event: any) {

        event.target.value = event.target.value
        if(event.target.getAttribute('data-input') === 'left') {
            this.leftInput = event.target.value
            this.currencyConvert('left')

        } else {
            this.rightInput = event.target.value
            this.currencyConvert('right')

        }
    }

    changeCurrency(event: any) {
        if(event.target.getAttribute('data-input') === 'left') {

            this.leftCurrency = event.target.value
            this.currencyConvert('right')
            this.leftInput = ''
            this.rightInput = ''
        } else {

            this.rightCurrency = event.target.value
            this.currencyConvert('left')
        }
    }

    currencyConvert(side: any) {
        if (this.leftCurrency.length > 1 && this.rightCurrency.length > 1 && side === 'left') {
            switch(this.leftCurrency) {
                case 'uah':
                    switch (this.rightCurrency) {
                        case 'uah':
                            this.rightInput = this.leftInput
                            break;
                        case 'usd':
                            this.rightInput = +(this.leftInput / this.usdSale).toFixed(2)
                            break;
                        case 'eur':
                            this.rightInput = +(this.leftInput / this.eurSale).toFixed(2)
                            break;
                    }
                    break;
                case 'usd':
                    switch (this.rightCurrency) {
                        case 'uah':
                            this.rightInput = +(this.leftInput * this.usdBuy).toFixed(2)
                            break;
                        case 'usd':
                            this.rightInput = this.leftInput
                            break;
                        case 'eur':
                            this.rightInput = +(this.leftInput * (this.usdBuy/this.eurBuy)).toFixed(2)
                            break;
                    }
                    break;
                case 'eur':
                    switch (this.rightCurrency) {
                        case 'uah':
                            this.rightInput = +(this.leftInput * this.eurBuy).toFixed(2)
                            break;
                        case 'usd':
                            this.rightInput = +(this.leftInput * (this.eurBuy/this.usdBuy)).toFixed(2)
                            break;
                        case 'eur':
                            this.rightInput = this.leftInput
                            break;
                    }
                    break;
            }
        } else if (this.leftCurrency.length > 1 && this.rightCurrency.length > 1 && side === 'right') {
            switch(this.rightCurrency) {
                case 'uah':
                    switch (this.leftCurrency) {
                        case 'uah':
                            this.leftInput = this.rightInput
                            break;
                        case 'usd':
                            this.leftInput = +(this.rightInput / this.usdSale).toFixed(2)
                            break;
                        case 'eur':
                            this.leftInput = +(this.rightInput / this.eurSale).toFixed(2)
                            break;
                    }
                    break;
                case 'usd':
                    switch (this.leftCurrency) {
                        case 'uah':
                            this.leftInput = +(this.rightInput * this.usdBuy).toFixed(2)
                            break;
                        case 'usd':
                            this.leftInput = this.rightInput
                            break;
                        case 'eur':
                            this.leftInput = +(this.rightInput * (this.usdBuy/this.eurBuy)).toFixed(2)
                            break;
                    }
                    break;
                case 'eur':
                    switch (this.leftCurrency) {
                        case 'uah':
                            this.leftInput = +(this.rightInput * this.eurBuy).toFixed(2)
                            break;
                        case 'usd':
                            this.leftInput = +(this.rightInput * (this.eurBuy/this.usdBuy)).toFixed(2)
                            break;
                        case 'eur':
                            this.leftInput = this.rightInput
                            break;
                    }
                    break;
            }
        }
    }
}
