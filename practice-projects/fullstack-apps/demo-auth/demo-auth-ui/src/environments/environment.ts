export const environment = {
  production: false,
  azure: {
    auth: {
      clientId: '99511986-0493-4f1f-a86f-d770663c4631',
      authority:
        'https://login.microsoftonline.com/f1e81eea-56e5-4c0f-96cc-2ce0e5a76ce8',
      redirectUri: 'http://localhost:4200',
      postLogoutRedirectUri: '/',
    },
    cache: { cacheLocation: 'localStorage' },

    // Every request to this base URL gets a token
    protectedResourceMap: new Map([
      [
        'https://localhost:3000/api/',
        ['api://api://bc1b1154-55b1-43d4-9ca3-4b27267ee0d6/user_impersonation'],
      ],
    ]),
  },
};
