import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointState, BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-my-dashboard',
  templateUrl: './my-dashboard.component.html',
  styleUrls: ['./my-dashboard.component.css']
})
export class MyDashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1, photo: '../../assets/imgs/1.jpg' },
          { title: 'Card 2', cols: 1, rows: 1, photo: '../../assets/imgs/2.jpg'},
          { title: 'Card 3', cols: 1, rows: 1, photo: '../../assets/imgs/3.jpg' },
          { title: 'Card 4', cols: 1, rows: 1, photo: '../../assets/imgs/4.jpg' }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1, photo: '../../assets/imgs/3.jpg' },
        { title: 'Card 2', cols: 1, rows: 1, photo: '../../assets/imgs/2.jpg'},
        { title: 'Card 3', cols: 1, rows: 2, photo: '../../assets/imgs/p.jpeg' },
        { title: 'Card 4', cols: 1, rows: 1, photo: '../../assets/imgs/4.jpg' }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
