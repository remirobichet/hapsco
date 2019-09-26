import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title: string = 'Hapsco';
  titleDescritpion: string;

  constructor(private router: Router, private route:ActivatedRoute, private titleService: Title) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.titleDescritpion = this.route.root.firstChild.snapshot.data['title'];
      this.titleService.setTitle(this.title + ' | ' + this.titleDescritpion);
    });
}
}
