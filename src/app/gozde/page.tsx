'use client';
import React, { useEffect, useState } from 'react';
interface Props {}
function page(props: Props) {
  const [hello, setHello] = useState<string>('');
  async function logJSONData() {
    const response = await fetch('http://localhost:3000/hello');
    const jsonData = await response.json();
    return jsonData;
  }
  useEffect(() => {
    logJSONData().then((response) => {
      setHello(response.gorkem);
    });
  }, []);
  return <div>{hello}</div>;
}

export default page;
