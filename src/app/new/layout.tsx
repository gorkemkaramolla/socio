import Button from '@/components/UI/Button';
import { ReactNode } from 'react';
import { ArrowBigLeftDashIcon, DoorOpen } from 'lucide-react';
import { redirect } from 'next/navigation';
import Link from 'next/link';
interface Props {
  children: ReactNode;
}
export default async function createLayout({ children }: Props) {
  return (
    <div className=''>
      <div className=' '>
        <div className='fixed flex w-full '>
          <Link href={'/back'}>
            <Button variant={'ghost'}>
              <ArrowBigLeftDashIcon></ArrowBigLeftDashIcon>
            </Button>
          </Link>
          <Link href={'/'}>
            <Button variant={'ghost'}>
              <DoorOpen />
            </Button>
          </Link>
        </div>
      </div>

      {children}
    </div>
  );
}
