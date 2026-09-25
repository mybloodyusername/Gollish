import { Component, effect, ElementRef, signal, viewChild } from '@angular/core';
import { interval, skip } from 'rxjs';
import { clearTimeout } from 'node:timers';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home {
  /** Eyes squint shut while the cat is pressed/hovered. */
  protected readonly eyesClosed = signal<boolean>(false);
  protected readonly purrAudioElement = viewChild.required<ElementRef<HTMLAudioElement>>('purrAudio');
  protected readonly meow1AudioElement = viewChild.required<ElementRef<HTMLAudioElement>>('meow1Audio');
  protected readonly meow2AudioElement = viewChild.required<ElementRef<HTMLAudioElement>>('meow2Audio');
  interval$ = interval(1000);
  initiated = false;

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
        meow1.play();
      }
    });
    this.interval$.pipe(skip(1)).subscribe((value) => {
      const eyesClosed = this.eyesClosed();
      if (eyesClosed) return;
      if (value % 8 == 0) {
        const meow2 = this.meow2AudioElement().nativeElement;
        meow2.play();
      }
    });
  }
}
