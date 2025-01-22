export interface LoginForm {
  email: string
  password: string
}

export interface RegisterForm extends LoginForm {
  email: string
  password: string
  confirmPassword: string
  username: string
  firstName: string
  lastName: string
}
