import { BehaviorSubject } from 'rxjs'
import { CalculationProcessLocation } from '~/types/calculation-process-location'

const calculationProcessLocationUpdatedSubject: BehaviorSubject<CalculationProcessLocation> = new BehaviorSubject<CalculationProcessLocation>('MainThread')
export const emitCalculationProcessLocationUpdated = (v: CalculationProcessLocation) => calculationProcessLocationUpdatedSubject.next(v)
export const calculationProcessLocationUpdated$ = calculationProcessLocationUpdatedSubject.asObservable()
