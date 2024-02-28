import { NotificationKind } from './notification-kind'

export type Notification = {
  kind: NotificationKind
  title: string
  description?: string
  at: Date
}