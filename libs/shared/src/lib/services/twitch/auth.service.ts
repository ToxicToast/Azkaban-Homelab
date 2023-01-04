import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  AccessToken,
  ClientCredentialsAuthProvider,
  RefreshingAuthProvider,
  StaticAuthProvider,
} from '@twurple/auth';

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name);
  private readonly auth: RefreshingAuthProvider;
  private readonly staticAuth: StaticAuthProvider;
  private readonly clientCredentialsAuthProvider: ClientCredentialsAuthProvider;
  private token: AccessToken;

  constructor(
    @Inject('EXPIRESIN')
    private readonly expires_in: number,
    @Inject('OBTAINMENTTIMESTAMP')
    private readonly obtainment_timestamp: number,
    @Inject('ACCESSTOKEN')
    private readonly access_token: string,
    @Inject('REFRESHTOKEN')
    private readonly refresh_token: string,
    @Inject('SCOPE')
    private readonly scope: Array<string>,
    @Inject('CLIENTID')
    private readonly client_id: string,
    @Inject('CLIENTSECRET')
    private readonly client_secret: string
  ) {
    this.auth = new RefreshingAuthProvider(
      {
        clientId: client_id,
        clientSecret: client_secret,
        onRefresh: this.refreshTokens,
      },
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
        obtainmentTimestamp: obtainment_timestamp,
      }
    );
    this.staticAuth = new StaticAuthProvider(client_id, access_token);
    this.clientCredentialsAuthProvider = new ClientCredentialsAuthProvider(
      client_id,
      client_secret
    );
  }

  private refreshTokens(token: AccessToken): void {
    this.logger.debug({ ...token });
    this.token = token;
  }

  get AuthProvider(): RefreshingAuthProvider {
    return this.auth;
  }

  get StaticAuthProvider(): StaticAuthProvider {
    return this.staticAuth;
  }

  get ClientCredentialProvider(): ClientCredentialsAuthProvider {
    return this.clientCredentialsAuthProvider;
  }
}
