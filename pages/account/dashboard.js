import { parseCookies } from '@/helpers/index';
import Layout from '@/components/Layout';
import DashboardEvent from '@/components/DashboardEvent';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css';
import { useRouter } from 'next/router';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DashboardPage({ events, token }) {
  //use the useRouter hook of next.js
  const router = useRouter();

  //this id is coming from dashboard.js page
  const deleteEvent = async (id) => {
    if (confirm('Are you sure?')) {
      const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <ToastContainer />
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  //use the token to make a request to the strapi backend
  //the request is made to our custom endpoint /events/me
  const res = await fetch(`${API_URL}/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const events = await res.json();

  return {
    props: {
      events,
      token
    }
  };
}
