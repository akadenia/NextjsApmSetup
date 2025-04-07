export enum Status {
  Idle,
  Pending,
  Resolved,
  Rejected
}

export enum Severity {
  Error = 'error',
  Warning = 'warning',
  Info = 'info',
  Success = 'success'
}

export enum Endpoints {
  Login = '/api/login',
  Register = '/api/register',
  RequestResetLink = '/api/recover-password',
  ResetPassword = '/api/reset-password',
  Users = '/api/users',
  VerifyEmail = '/api/verify-email',
  SendVerificationEmail = '/api/send-verification-email'
}
