// In order to expose a variable to the browser you have to prefix the variable with NEXT_PUBLIC_

//strapi
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

//front-end api
export const NEXT_URL =
  process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000';

export const PER_PAGE = 5;
