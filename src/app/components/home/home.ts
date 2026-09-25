import { AfterViewInit, Component, ElementRef, viewChild } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class Home implements AfterViewInit {
  protected readonly canvasElement = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasElement');

  ngAfterViewInit(): void {
    const canvas = this.canvasElement().nativeElement;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // 1. Draw Ears (Triangles)
    ctx.fillStyle = '#555'; // Dark grey

    // Left Ear
    ctx.beginPath();
    ctx.moveTo(140, 150); // Left side of head
    ctx.lineTo(150, 80); // Tip of ear
    ctx.lineTo(200, 130); // Base of ear
    ctx.fill();

    // Right Ear
    ctx.beginPath();
    ctx.moveTo(260, 150); // Right side of head
    ctx.lineTo(250, 80); // Tip of ear
    ctx.lineTo(200, 130); // Base of ear
    ctx.fill();

    // 2. Draw Head (Circle)
    ctx.fillStyle = '#777'; // Lighter grey
    ctx.beginPath();
    ctx.arc(200, 200, 70, 0, Math.PI * 2);
    ctx.fill();

    // 3. Draw Eyes (Circles)
    ctx.fillStyle = 'white';
    // Left Eye
    ctx.beginPath();
    ctx.arc(175, 185, 12, 0, Math.PI * 2);
    ctx.fill();
    // Right Eye
    ctx.beginPath();
    ctx.arc(225, 185, 12, 0, Math.PI * 2);
    ctx.fill();

    // Pupils (Small black dots)
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(175, 185, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(225, 185, 5, 0, Math.PI * 2);
    ctx.fill();

    // 4. Draw Nose (Small triangle/circle)
    ctx.fillStyle = '#ffb6c1'; // Pink
    ctx.beginPath();
    ctx.arc(200, 210, 6, 0, Math.PI * 2);
    ctx.fill();

    // 5. Draw Mouth (Curves)
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    // Left smile
    ctx.arc(190, 215, 10, 0, Math.PI, false);
    // Right smile
    ctx.arc(210, 215, 10, 0, Math.PI, false);
    ctx.stroke();

    // 6. Draw Whiskers
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1;

    // Left Whiskers
    ctx.beginPath();
    ctx.moveTo(150, 210);
    ctx.lineTo(100, 200);
    ctx.moveTo(150, 220);
    ctx.lineTo(100, 220);
    ctx.moveTo(150, 230);
    ctx.lineTo(100, 240);
    ctx.stroke();

    // Right Whiskers
    ctx.beginPath();
    ctx.moveTo(250, 210);
    ctx.lineTo(300, 200);
    ctx.moveTo(250, 220);
    ctx.lineTo(300, 220);
    ctx.moveTo(250, 230);
    ctx.lineTo(300, 240);
    ctx.stroke();
  }
}
