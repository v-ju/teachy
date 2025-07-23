export type SignupData = {
    name: string
    email: string
    password: string
}

export type SigninData = {
    email: string,
    password:string
}

export interface JwtUserPayload {
  id: string;
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}
