'use client';
import Button from '@/components/Button';
import TypeWriter from '@/components/TypeWriter';
import Image from 'next/image';

export default function Home() {
  return (
    <div className=''>
      <Button size={'sm'} variant={'default'}>
        Gorkem
      </Button>
      <TypeWriter />
    </div>
  );
}
