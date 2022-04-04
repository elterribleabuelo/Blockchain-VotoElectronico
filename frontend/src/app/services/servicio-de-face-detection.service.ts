import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServicioDeFaceDetectionService {

  @Output() disparadoDeFaceDetection:EventEmitter<any> = new EventEmitter();
  constructor() { }
}
