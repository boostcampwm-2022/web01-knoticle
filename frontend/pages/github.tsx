import { useRouter } from 'next/router';

import { useEffect } from 'react';

import axios from 'axios';

export default function Github() {
  const router = useRouter();

  useEffect(() => {
    if (router.query) {
      // axios.post();
    }
  });

  return <div>github</div>;
}
