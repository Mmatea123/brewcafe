import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Coffee, CoffeeService } from '../../../../core/services/coffee.service';

@Component({
  selector: 'app-coffee-details',
  templateUrl: './coffee-details.component.html',
  styleUrls: ['./coffee-details.component.scss']
})
export class CoffeeDetailsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public coffeeService: CoffeeService
  ) {}

  ngOnInit() {
    // Subscribe to route params and fetch coffee details
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = Number(params['id']);
        if (id) {
          this.coffeeService.getCoffeeById(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe({
              error: (error) => {
                console.error('Error loading coffee:', error);
                this.router.navigate(['/menu']);
              }
            });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onOrderCoffee(coffee: Coffee) {
    this.router.navigate(['/order'], { 
      queryParams: { coffeeId: coffee.id }
    });
  }

  goBack() {
    this.router.navigate(['/menu']);
  }
}
