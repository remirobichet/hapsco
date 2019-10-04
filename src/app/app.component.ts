import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";
import { filter } from 'rxjs/operators';
import {MessagingService} from './_services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'Hapsco';
  titleDescritpion: string;
  message;

  constructor(private router: Router, private route:ActivatedRoute, private titleService: Title, private messagingService: MessagingService) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
    .subscribe(() => {
      this.titleDescritpion = this.route.root.firstChild.snapshot.data['title'];
      this.titleService.setTitle(this.title + ' | ' + this.titleDescritpion);
    });

    const userId = 'user001';
    this.messagingService.requestPermission(userId);
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
  }
}
