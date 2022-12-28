import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiClient } from '@twurple/api';
import { ClientCredentialsAuthProvider } from '@twurple/auth';

@Injectable()
export class ApiService {
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

  get ApiProvider(): ApiClient {
    return this.api;
  }

  get StaticApiProvider(): ApiClient {
    return this.staticApi;
  }

  get ClientCredentialApiProvider(): ApiClient {
    this.clientCredentialApi.eventSub.deleteAllSubscriptions();
    return this.clientCredentialApi;
  }
}
