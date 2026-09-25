import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { fromEvent } from 'rxjs';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements AfterViewInit {
  /** Eyes squint shut while the cat is pressed/hovered. */
  protected readonly eyesClosed = signal<boolean>(false);
  protected readonly audio = new Audio('/public/purr.mp3');

  constructor() {}

  ngAfterViewInit() {}

  protected purr() {
    this.eyesClosed.set(true);
    this.audio.play();
  }

  protected unPurr() {
    this.eyesClosed.set(false);
  }
}
