import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ChatClient } from '@twurple/chat';
import { AccessToken, RefreshingAuthProvider } from '@twurple/auth';

@Injectable()
export class AppService implements OnModuleDestroy, OnModuleInit {
  private readonly logger: Logger = new Logger(AppService.name);
  private readonly authProvider: RefreshingAuthProvider =
    new RefreshingAuthProvider(
      { clientId: '', clientSecret: '' },
      {
        refreshToken: '',
        accessToken: '',
        expiresIn: 0,
        scope: [],
        obtainmentTimestamp: 0,
      }
    );
  private readonly client: ChatClient = new ChatClient();
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
    private readonly client_secret: string,
    @Inject('CHANNELS')
    private readonly channels: Array<string>
  ) {
    this.authProvider = new RefreshingAuthProvider(
      {
        clientId: client_id,
        clientSecret: client_secret,
        onRefresh: this.onRefresh,
      },
      {
        accessToken: access_token,
        refreshToken: refresh_token,
        expiresIn: expires_in,
        obtainmentTimestamp: obtainment_timestamp,
      }
    );
    this.client = new ChatClient({
      authProvider: this.authProvider,
      channels,
      requestMembershipEvents: true,
    });
  }

  onModuleInit(): void {
    this.onConnect();
  }

  onModuleDestroy(): void {
    this.onDisconnect();
  }

  getChatClient(): ChatClient {
    return this.client;
  }

  private onRefresh(token: AccessToken): void {
    this.logger.debug({ ...token });
    this.token = token;
  }

  private onConnect(): void {
    this.client
      .connect()
      .then(() => {
        this.logger.debug('Chat connected...');
      })
      .catch(() => {
        this.logger.error('Chat can not connect...');
      });
  }

  private onDisconnect(): void {
    this.client
      .quit()
      .then(() => {
        this.logger.debug('Chat disconnected...');
      })
      .catch(() => {
        this.logger.error('Chat can not disconnect...');
      });
  }
}
