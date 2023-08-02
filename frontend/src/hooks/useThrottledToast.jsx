// File: src/hooks/useThrottledToast.jsx
import { useRef } from 'react';
import { toast } from 'react-toastify';

export default function useThrottledToast(inputDelay = 10000) {
  // console.trace();
  const lastToastTimeRef = useRef(Date.now());
  const lastToastContentRef = useRef('');
  console.log('lastToastTimeRef', lastToastTimeRef);

  return function throttledToast(content, options) {
    const now = Date.now();
    console.log('now', now);
    let delay = inputDelay;

    console.log('process.env.NODE_ENV', process.env.NODE_ENV);
    if (process.env.NODE_ENV === 'development') delay = 0;

    console.log('content', content);
    console.log('lastToastContentRef.current', lastToastContentRef.current);
    console.log('time since last toast', now - lastToastTimeRef.current);

    if (content !== lastToastContentRef.current || now - lastToastTimeRef.current >= delay) {
      console.log('inside if', now - lastToastTimeRef.current);
      toast(content, options);
      lastToastTimeRef.current = now;
      lastToastContentRef.current = content;
    }
  };
}
