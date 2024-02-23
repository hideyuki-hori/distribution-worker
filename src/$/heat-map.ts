import { Subject } from 'rxjs'

const subject = new Subject<HTMLCanvasElement>()
export const canvasMounted$ = subject.asObservable()
export const notifyCanvasMounted = (canvas: HTMLCanvasElement) => subject.next(canvas)