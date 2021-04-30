import cookie from 'cookie';
import { API_URL } from '@/config/index';

export default async (req, res) => {
  if (req.method === 'GET') {
    //check if cookie exists
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    //put the token into a variable by destructuring the req.headers.cookie object
    const { token } = cookie.parse(req.headers.cookie);
    //use the token with strapi
    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: 'User forbidden' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
