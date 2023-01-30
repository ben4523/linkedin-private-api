import { parse as parseCookie } from 'cookie';
import * as fs from 'fs/promises';
import { merge, pickBy, reduce } from 'lodash';

import { requestHeaders, linkedinSalesNavigatorUrl } from '../../config';
import { AnonymousCookies } from '../types/anonymous-cookies';
import { AuthCookies, AuthSalesNavCookies } from '../types/auth-cookies';
import { SalesApiIdentity } from '../types/sales-navigator';
import { Client } from './client';

const SESSIONS_PATH = `${process.cwd()}/sessions.json`;

const parseCookies = <T>(cookies: string[]): Partial<T> =>
  cookies.reduce((res, c) => {
    let parsedCookie = parseCookie(c);

    parsedCookie = pickBy(parsedCookie, (v, k) => k === Object.keys(parsedCookie)[0]);

    return merge(res, parsedCookie);
  }, {});

export class Login {
  private client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  private setRequestHeaders({ cookies }: { cookies: AuthCookies }): void {
    const cookieStr = reduce(cookies, (res, v, k) => `${res}${k}="${v}"; `, '');

    this.client.request.setHeaders({
      ...requestHeaders,
      cookie: cookieStr,
      'csrf-token': cookies.JSESSIONID!,
    });
  }

  private async readCacheFile(cacheObject?: Record<string, AuthCookies>): Promise<Record<string, AuthCookies>> {
    if (cacheObject) return cacheObject;

    let cachedSessions: Record<string, AuthCookies>;

    try {
      const sessionsBuffer = (await fs.readFile(SESSIONS_PATH).catch(() => fs.writeFile(SESSIONS_PATH, '{}'))) || '{}';
      cachedSessions = JSON.parse(sessionsBuffer.toString());
    } catch (err) {
      cachedSessions = {};
    }

    return cachedSessions;
  }

  private tryCacheLogin({
    useCache = true,
    cachedSessions,
    username,
  }: {
    useCache: boolean;
    cachedSessions: Record<string, AuthCookies>;
    username?: string;
  }) {
    if (!useCache) {
      return false;
    }

    if (!username) {
      throw new TypeError('Must provide username when useCache option is true');
    }

    const cookies = cachedSessions[username];

    if (cookies) {
      this.setRequestHeaders({ cookies });

      return true;
    }

    return false;
  }

  private async initSalesNav(): Promise<AuthSalesNavCookies> {
    const salesApiIdentity = await this.client.request.get<SalesApiIdentity>(
      `${linkedinSalesNavigatorUrl}/salesApiIdentity?q=findLicensesByCurrentMember&includeRecentlyInactiveDueToOverallocation=true`,
    );

    const salesApiAgnosticAuthentication = await this.client.request.post(
      `${linkedinSalesNavigatorUrl}/salesApiAgnosticAuthentication`,
      {
        viewerDeviceType: 'DESKTOP',
        identity: {
          name: 'Sales Navigator Core',
          agnosticIdentity: salesApiIdentity.elements[0].agnosticIdentity,
        },
      },
      { fullResponse: true },
    );

    const parsedCookies = parseCookies<AuthSalesNavCookies>(salesApiAgnosticAuthentication.headers['set-cookie']);

    return parsedCookies;
  }

  async userPass({
    username,
    password,
    useCache = true,
    saleNav = false,
    cacheObject,
  }: {
    username: string;
    password?: string;
    useCache?: boolean;
    saleNav?: boolean;
    cacheObject?: Record<string, AuthCookies>;
  }): Promise<Client> {
    const cachedSessions = await this.readCacheFile(cacheObject);

    if (this.tryCacheLogin({ useCache, cachedSessions, username })) {
      return this.client;
    }

    if (!password) {
      throw new TypeError('password is required for login');
    }

    const anonymousAuthResponse = await this.client.request.auth.getAnonymousAuth();

    const sessionId = parseCookies<AnonymousCookies>(anonymousAuthResponse.headers['set-cookie']).JSESSIONID!;

    const authRes = await this.client.request.auth.authenticateUser({ username, password, sessionId });

    let parsedCookies = parseCookies<AuthCookies>(authRes.headers['set-cookie']);

    if (saleNav) {
      const salesNavCookies = await this.initSalesNav();

      parsedCookies = { ...parsedCookies, ...salesNavCookies };
    }

    fs.writeFile(SESSIONS_PATH, JSON.stringify({ ...cachedSessions, [username]: parsedCookies }));
    this.setRequestHeaders({ cookies: parsedCookies });

    return this.client;
  }

  async userCookie({
    username,
    cookies,
    useCache = true,
    saleNav = false,
    cacheObject,
  }: {
    username?: string;
    cookies: { JSESSIONID: string; li_at?: string; li_a?: string } | string;
    useCache?: boolean;
    saleNav?: boolean;
    cacheObject?: Record<string, AuthCookies>;
  }): Promise<Client> {
    const cachedSessions = await this.readCacheFile(cacheObject);

    if (this.tryCacheLogin({ useCache, cachedSessions, username })) {
      return this.client;
    }

    let parsedCookies = typeof cookies === 'string' ? parseCookies<AuthCookies>(cookies.split(';')) : cookies;

    if (saleNav) {
      const salesNavCookies = await this.initSalesNav();

      parsedCookies = { ...parsedCookies, ...salesNavCookies };
    }

    this.setRequestHeaders({ cookies: parsedCookies });

    if (username) {
      fs.writeFile(SESSIONS_PATH, JSON.stringify({ ...cachedSessions, [username]: parsedCookies }));
    }

    return this.client;
  }
}
