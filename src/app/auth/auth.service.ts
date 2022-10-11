import { Injectable } from '@angular/core';
import { AuthenticationDetails, ChallengeName, CognitoUser, CognitoUserPool, CognitoUserSession, IAuthenticationCallback } from 'amazon-cognito-identity-js';
import { BehaviorSubject, first, ReplaySubject, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
export interface MoYaUser {
  nickname: string,
  email: string
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public readonly authenticated$ = new ReplaySubject<boolean>(1)
  public readonly myUser$ = new BehaviorSubject<MoYaUser | null>(null)
  public readonly idToken$ = new BehaviorSubject<string | null>(null)
  public readonly accessToken$ = new BehaviorSubject<string | null>(null)
  public readonly refreshToken$ = new BehaviorSubject<string | null>(null)
  public amTalking$ = new BehaviorSubject<boolean>(false)
  
  public onSuccess$ = new Subject<{session: CognitoUserSession, userConfirmationNecessary: boolean | undefined}>()
  public onFailure$ = new Subject<{err: any}>()
  public totpRequired$ = new Subject<{challengeName: ChallengeName, challengeParameters: any}>()
  public newPasswordRequired$ = new Subject<{userAttributes: any, requiredAttributes: any}>()
  public mfaSetup$ = new Subject<{challengeName: ChallengeName, challengeParameters: any}>()
  public associateSecretCode$ = new Subject<{secretCode: string}>()

  private cognitoUserClient: CognitoUser | null = null
  private cognitoUserPool: CognitoUserPool = new CognitoUserPool({
    UserPoolId: environment.cognito.UserPoolId,
    ClientId: environment.cognito.ClientId 
  })

  onSuccess(session: CognitoUserSession, userConfirmationNecessary: boolean | undefined = undefined){
    this.accessToken$.next(session.getAccessToken().getJwtToken())
    this.refreshToken$.next(session.getRefreshToken().getToken())
    this.onSuccess$.next({session, userConfirmationNecessary})
    this.authenticated$.next(true)
    this.amTalking$.next(false)
  }
  onFailure(err: any){
    this.onFailure$.next({err})
    this.authenticated$.next(false)
    this.amTalking$.next(false)
  }
  totpRequired(challengeName: ChallengeName, challengeParameters: any){
    this.cognitoUserClient!.associateSoftwareToken(this)
    this.totpRequired$.next({challengeName, challengeParameters})
    this.amTalking$.next(false)
  }
  newPasswordRequired(userAttributes: any, requiredAttributes: any){
    this.newPasswordRequired$.next({userAttributes, requiredAttributes})
    this.amTalking$.next(false)
  }
  mfaSetup(challengeName: ChallengeName, challengeParameters: any){
    this.cognitoUserClient!.associateSoftwareToken(this)
    this.mfaSetup$.next({challengeName, challengeParameters})
    this.amTalking$.next(false)
  }
  associateSecretCode(secretCode: string){
    this.associateSecretCode$.next({secretCode})
    this.amTalking$.next(false)
  }
  constructor() {
    this.cognitoUserClient = this.cognitoUserPool.getCurrentUser()
    if(this.cognitoUserClient === null) this.authenticated$.next(false)
    this.cognitoUserClient?.getSession((err?: any, session?: CognitoUserSession)=>{
      if(err != null) this.onFailure(err)
      if(session != null) this.onSuccess(session)
    })
  }
  createClient(email: string){
    this.cognitoUserClient = new CognitoUser({
      Username: email,
      Pool: this.cognitoUserPool
    })
  }

  signIn(email: string, password: string) {
    this.amTalking$.next(true)
    this.createClient(email)
    this.cognitoUserClient!.authenticateUser(new AuthenticationDetails({
      Username: email,
      Password: password
    }), this)
  }
  completeNewPasswordChallenge(newPassword: string, nickname: string){
    this.amTalking$.next(true)
    this.cognitoUserClient!.completeNewPasswordChallenge(newPassword, {nickname: nickname}, this)
  }
  verifySoftwareToken(mfaCode: string){
    this.amTalking$.next(true)
    this.cognitoUserClient?.verifySoftwareToken(mfaCode, environment.cognito.DeviceName, this)
  }
  sendMFACode(mfaCode: string){
    this.amTalking$.next(true)
    this.cognitoUserClient?.sendMFACode(mfaCode, this, 'SOFTWARE_TOKEN_MFA')
  }
}
