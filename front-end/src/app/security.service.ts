import {Injectable} from "@angular/core";
import {Http, RequestOptions} from "@angular/http";
import {UserCredentials} from "./user/user-credentials";
import {Utils} from "./util/Utils";
import {User} from "./user/user";
import {UserRole} from "./user/user-role";
import {RegisterUserCredentials} from "./user/register-user-credentials";

@Injectable()
export class SecurityService {

  /**
   * The url of auth endpoint.
   *
   * @type {string}
   */
  private static readonly AUTH_URL: string = '/user-management/authenticate';

  /**
   * The url of register endpoint.
   *
   * @type {string}
   */
  private static readonly REGISTER_URL: string = '/user-management/register';

  /**
   * The name of access token header.
   *
   * @type {string}
   */
  private static readonly ACCESS_TOKEN_HEADER = "X-Access-Token";

  /**
   * The current user.
   */
  private user: User;

  constructor(private readonly http: Http) {
  }

  /**
   * The function to auth an user in the system.
   *
   * @param credentials the user credentials.
   * @param handler to handle result of authentication.
   */
  public auth(credentials: UserCredentials, handler?: (message: string, result: boolean) => void): void {
    let username = credentials.username;
    this.http.post(SecurityService.AUTH_URL, credentials)
      .toPromise()
      .then(response => {
        let body = response.json();
        this.user = new User(username, body.token);
        handler(null, true);
      })
      .catch(error => Utils.handleErrorMessage(error, (ex: string) => handler(ex, false)));
  }

  /**
   * The function to register an user in the system.
   *
   * @param credentials the user credentials.
   * @param handler to handle result of registration.
   */
  public register(credentials: RegisterUserCredentials, handler?: (message: string, result: boolean) => void): void {
    let username = credentials.username;
    this.http.post(SecurityService.REGISTER_URL, credentials)
      .toPromise()
      .then(response => handler(null, true))
      .catch(error => Utils.handleErrorMessage(error, (ex: string) => handler(ex, false)));
  }

  /**
   * Add access token to header of the request options.
   *
   * @param requestOptions the request options.
   */
  public addAccessToken(requestOptions: RequestOptions): void {
    let accessToken = this.accessToken;
    if (accessToken == null) return;
    requestOptions.headers.append(SecurityService.ACCESS_TOKEN_HEADER, accessToken);
  }

  /**
   * The function to logout from the system.
   */
  logout() {
    this.user = null;
  }

  /**
   * Return true if the user was authed.
   *
   * @returns {boolean}
   */
  isAuthed(): boolean {
    return this.accessToken != null;
  }

  /**
   * Get the current access token.
   *
   * @returns {string} the current access token.
   */
  get accessToken(): string {
    if (this.user == null) return null;
    return this.user.accessToken;
  }

  /**
   * Get the roles of the current user.
   *
   * @returns {UserRole[]}
   */
  get userRoles(): UserRole[] {
    if (this.user == null) return null;
    return this.user.roles;
  }
}
