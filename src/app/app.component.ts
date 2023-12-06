import { Component } from '@angular/core';
import {
  trigger,
  style,
  animate,
  animateChild,
  query,
  stagger,
  transition,
  sequence,
  group,
} from '@angular/animations';


const trigger1 = trigger('listAnimation', [
  transition('* => *', [ // each time the binding value changes
    query(':leave', [
      stagger(-100, [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ], { optional: true }),
    query(':enter', [
      style({ opacity: 0 }),
      stagger(500, [
        animate('0.5s', style({ opacity: 1 }))
      ])
    ], { optional: true }),
  ]),
  transition1
]);

const transition1 = transition(':enter', [
    sequence([
      group([
       query('app-child', animateChild({ duration:'0.5s' }), { optional: true })
      ])
    ])
  ]);

const trigger2 = trigger('animateChildren', [
  transition(':enter', [
      query('app-child', animateChild(), { optional: true })
  ])
]);

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger2,
    trigger1
  ]
})
export class AppComponent {

  items = [];

  showItems() {
    this.items = [0,1,2,3,4];
  }

  hideItems() {
    this.items = [];
  }

  toggle() {
    this.items.length ? this.hideItems() : this.showItems();
   }

}

