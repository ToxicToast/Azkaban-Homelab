import { Injectable, OnModuleInit } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiClient } from '@twurple/api';

@Injectable()
export class ApiService implements OnModuleInit {
  private readonly api: ApiClient;
  private readonly staticApi: ApiClient;
  private readonly clientCredentialApi: ApiClient;

  constructor(private readonly authService: AuthService) {
    this.api = new ApiClient({ authProvider: this.authService.AuthProvider });
    this.staticApi = new ApiClient({
      authProvider: this.authService.StaticAuthProvider,
    });
    this.clientCredentialApi = new ApiClient({
      authProvider: this.authService.ClientCredentialProvider,
    });
  }

  async onModuleInit(): Promise<void> {
    await this.removeSubs();
  }

  get ApiProvider(): ApiClient {
    return this.api;
  }

  get StaticApiProvider(): ApiClient {
    return this.staticApi;
  }

  get ClientCredentialApiProvider(): ApiClient {
    return this.clientCredentialApi;
  }

  private async removeSubs(): Promise<void> {
    await this.clientCredentialApi.eventSub.deleteAllSubscriptions();
  }
}
