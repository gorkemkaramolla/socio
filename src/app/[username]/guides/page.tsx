import axios from 'axios';
interface Props {
  params: {
    username: string;
  };
}
import { Pen } from 'lucide-react';
import Link from 'next/link';
export default async function guides({ params: { username } }: Props) {
  try {
    const usersGuides = await axios
      .get('http://localhost:3000/create_guide', {
        params: { username: username },
      })
      .then((res) => res.data);
    return (
      <div className='flex flex-col gap-4 mt-24'>
        {usersGuides.map((guide: any, i: number) => (
          <div key={i} className='border-2 flex flex-col  '>
            <div className='flex justify-between'>
              {guide.titleWithoutSlug}
              <Link
                href={{
                  pathname: '/new',
                  query: {
                    contentWithoutSanitize: guide.contentWithoutSanitize,
                    titleWithoutSlug: guide.titleWithoutSlug,
                    title: guide.title,
                  },
                }}
                className='rounded hover:ring-2 flex items-center justify-center p-1 m-2 transition-all dark:ring-white ring-black'
              >
                <Pen className=' '></Pen>
              </Link>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: guide.content.slice(0, 200) + '...',
              }}
            />
          </div>
        ))}
      </div>
    );
  } catch (e) {
    console.log(e);
  }
}
