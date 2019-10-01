import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ChartDataSets, ChartOptions} from 'chart.js';
import { Label, Color, BaseChartDirective } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import regression from 'regression';

import { Hapsco } from '../_models/hapsco.model';
import { HapscoService } from '../_services/hapsco.service';
import { DateUtils } from '../_helpers/date.utile';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  @ViewChild(BaseChartDirective, { static: true }) chart;

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Hapsco' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            beginAtZero: true,
            stepSize: 10,
            max: 100
          }
        }
      ]
    },
    annotation: {
      annotations: [{
        drawTime: 'afterDraw',
        id: 'linearRegression',
        type: 'line',
        mode: 'horizontal',
        scaleID: 'y-axis-0',
        borderColor: 'orange',
        borderWidth: 2,
        value: 50,
        endValue: 50,
      }],
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
  public lineChartPlugins = [pluginAnnotations];

  constructor(public datepipe: DatePipe, private hapscoService: HapscoService) { }

  ngOnInit() {
    this.hapscoService.getHapsco().subscribe((data) => {
      // sorting by date
      const element = data.map(e => {
        return {
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Hapsco;
      });
      DateUtils.sortByDate(element);

      // set linear regression line
      let linearRegression = regression.linear(Array.from(element.keys()).map(n => [n, +element[n].value]));
      this.chart.chart.annotation.elements['linearRegression'].options.value = linearRegression.points.shift()[1];
      this.chart.chart.annotation.elements['linearRegression'].options.endValue = linearRegression.points.pop()[1];

      this.lineChartData[0].data = element.map(obj =>  obj.value);
      this.lineChartLabels = element.map(obj => this.datepipe.transform(new Date(DateUtils.fireBaseDateToDate(obj.date)), 'dd/MM/yy'));

      // update chart to apply line
      this.chart.update();
    });
  }
}
