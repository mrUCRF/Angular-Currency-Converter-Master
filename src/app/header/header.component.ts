import { Component, OnInit } from "@angular/core";
import { timer } from "rxjs";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

    public usdBuy!: number
    public usdSale!: number
    public eurBuy!: number
    public eurSale!: number
dateTime: any = Date



    ngOnInit() {
        fetch('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
        .then(res => res.json())
        .then(res => {
            this.usdBuy = Number(parseFloat(res[0].buy).toFixed(2))
            this.eurBuy = Number(parseFloat(res[1].buy).toFixed(2))
            this.usdSale = Number(parseFloat(res[0].sale).toFixed(2))
            this.eurSale = Number(parseFloat(res[1].sale).toFixed(2))
        })
this.dateTime = new Date()

timer(0, 1000).subscribe(() => {
    this.dateTime = new Date()
})
        }

    }


