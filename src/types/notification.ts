export type NotificationKind
  = 'info'
  | 'succeed'
  | 'failed'
  | 'warning'

export type Notification = {
  kind: NotificationKind
  title: string
  description?: string
  at: Date
}