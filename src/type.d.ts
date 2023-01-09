type ErrorMessage = {
  message: string
}
type Outage = {
  id: string
  begin: string
  end: string
}
type SiteId = string
type Device = {
  id: string
  name: string
}
type SiteInfo = {
  id: string
  name: string
  devices: Device[]
}
type EnhancedOutages = {
  id: string
  name: string
  begin: string
  end: string
}
