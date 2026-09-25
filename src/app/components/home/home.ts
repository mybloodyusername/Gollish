import { Component, effect, ElementRef, OnDestroy, signal, viewChild } from '@angular/core';
import { interval, skip, Subscription } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements OnDestroy {
  /** Eyes squint shut while the cat is pressed/hovered. */
  protected readonly eyesClosed = signal<boolean>(false);
  protected readonly purrAudioElement = viewChild.required<ElementRef<HTMLAudioElement>>('purrAudio');
  protected readonly meow1AudioElement = viewChild.required<ElementRef<HTMLAudioElement>>('meow1Audio');
  protected readonly meow2AudioElement = viewChild.required<ElementRef<HTMLAudioElement>>('meow2Audio');
  interval$ = interval(1000);
  initiated = false;
  /** Timestamp (ms) of the last meow-1 playback — used to skip meow-2 that would overlap it. */
  private meow1PlayedAt = 0;
  /** Subscription for the periodic meow-2 timer, cleaned up on destroy. */
  private intervalSubscription: Subscription;

  constructor() {
    effect(() => {
      const eyesClosed = this.eyesClosed();
      const purr = this.purrAudioElement().nativeElement;
      const meow1 = this.meow1AudioElement().nativeElement;
      if (!purr || !this.initiated) return;
      if (eyesClosed) {
        purr.play();
      } else {
        purr.pause();
        if (meow1.paused) {
          meow1.play();
          this.meow1PlayedAt = performance.now();
        }
      }
    });
    this.intervalSubscription = this.interval$.pipe(skip(1)).subscribe((value) => {
      const eyesClosed = this.eyesClosed();
      if (eyesClosed) return;
      if (value % 8 == 0) {
        // Suppress meow-2 if meow-1 started recently enough that it would
        // still be audible — meow-1 lasts roughly 2s.
        const sinceMeow1 = performance.now() - this.meow1PlayedAt;
        if (sinceMeow1 > 2500) {
          const meow2 = this.meow2AudioElement().nativeElement;
          meow2.play();
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
