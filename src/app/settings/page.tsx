import SettingsPage from '@/components/Settings/Settings';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
export default async function Settings() {
  const session = await getServerSession();
  if (!session) {
    redirect('/login');
  }
  return <SettingsPage />;
}
