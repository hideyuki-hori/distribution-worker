import { Subject } from 'rxjs'

const subject = new Subject<void>()
export const emit = () => subject.next()
export const ready$ = subject.asObservable()