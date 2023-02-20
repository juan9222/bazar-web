export enum EVerifyStatus {
  none = "none",
  loading = "loading",
  verified = "verified",
  wrongVerified = "wrongVerified",
  countdown = "countdown"
}

export interface IVerifyLoginState {
  mfaToken: string;
  oobCode: string;
  uuid: string;
  phoneNumber: string;
  email?: string;
  password?: string;
}