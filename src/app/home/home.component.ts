import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'
import { ChartDataSets, ChartOptions} from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { Hapsco } from '../_models/hapsco.model';
import { HapscoService } from '../_services/hapsco.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Hapsco' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(public datepipe: DatePipe, private hapscoService: HapscoService) { }

  ngOnInit() {
    this.hapscoService.getHapsco().subscribe((data: Hapsco[]) => {
      this.lineChartData[0].data = data.map(obj => {return obj.value });
      this.lineChartLabels = data.map(obj => { return this.datepipe.transform(new Date(obj.date.toDate()), 'dd/MM/yy')});
    });
  }
}
