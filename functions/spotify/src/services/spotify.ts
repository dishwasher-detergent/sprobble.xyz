import axios from "axios";

type AccessToken = string;
type RefreshToken = string;

type SuccessfulGrantResponse = {
  accessToken: AccessToken;
  refreshToken: RefreshToken;
};

export interface ISpotifyService {
  getNewAccessTokenFromRefreshToken: () => Promise<void>;
  exchangeCodeForAccessAndRefreshToken: (
    code: string
  ) => Promise<SuccessfulGrantResponse>;
  getCurrentlyPlayingSong: () => Promise<any>;
}

export class SpotifyService implements ISpotifyService {
  /**
   * We're going to need a refresh token and we're going to need to
   * hard code it into our application.
   */

  private clientId: string;
  private clientSecret: string;
  private redirectUrl: string;
  private refreshToken: RefreshToken;
  private currentAccessToken: AccessToken = "";

  public setClientId(clientId: string): void {
    this.clientId = clientId;
  }

  public setClientSecret(clientSecret: string): void {
    this.clientSecret = clientSecret;
  }

  public setRedirectUrl(redirectUrl: string): void {
    this.redirectUrl = redirectUrl;
  }

  private setCurrentAccessToken(token: AccessToken): void {
    this.currentAccessToken = token;
  }

  private setRefreshToken(token: RefreshToken): void {
    this.refreshToken = token;
  }

  private hasAccessToken(): boolean {
    return this.currentAccessToken !== "";
  }

  public async exchangeCodeForAccessAndRefreshToken(
    code: string
  ): Promise<SuccessfulGrantResponse> {
    //@ts-ignore
    const params = new URLSearchParams();

    params.append("client_id", this.clientId);
    params.append("client_secret", this.clientSecret);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", this.redirectUrl);

    const response = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      params,
    });

    this.setCurrentAccessToken(response.data.access_token);
    this.setRefreshToken(response.data.refresh_token);

    return {
      accessToken: this.currentAccessToken,
      refreshToken: this.refreshToken,
    };
  }

  public async getNewAccessTokenFromRefreshToken(): Promise<void> {
    //@ts-ignore
    const params = new URLSearchParams();

    params.append("client_id", this.clientId);
    params.append("client_secret", this.clientSecret);
    params.append("grant_type", "refresh_token");
    params.append("refresh_token", this.refreshToken);

    const response = await axios({
      url: "https://accounts.spotify.com/api/token",
      method: "post",
      params,
    });

    this.setCurrentAccessToken(response.data.access_token);
  }

  public async getCurrentlyPlayingSong(): Promise<any> {
    if (!this.hasAccessToken()) {
      await this.getNewAccessTokenFromRefreshToken();
    }

    // TODO: Test if the request fails because the token is invalid, we should try again after using the refresh token

    const response = await axios({
      url: "https://api.spotify.com/v1/me/player/currently-playing",
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.currentAccessToken}`,
      },
    });

    const isSongPlaying = !!response.data.item;

    console.log(response);

    if (!isSongPlaying) {
      throw new Error("No song playing");
    }

    return response.data;
  }
}
