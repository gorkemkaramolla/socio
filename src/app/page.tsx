import Image from 'next/image';

export default function Home() {
  return (
    <div className='grid group grid-cols-12  gap-5 container mx-auto bg-slate-900 p-5'>
      <button className=' col-span-6 bg-red-200 py-6 px-3 group-hover:bg-red-900'>
        gorkem
      </button>
      <button className=' col-span-6 bg-red-200 py-6 px-3'>gorkem</button>
    </div>
  );
}
