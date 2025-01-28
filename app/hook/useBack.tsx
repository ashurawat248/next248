'use client';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { resetSectionState, setTimer } from '@/redux/slices/sectionSlice';
// import { persistor } from '@/redux/store';

const useBack = () => {
//   const dispatch = useDispatch();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      window.history.pushState(null, '', window.location.href);
      alert('You cannot go back until the test is finished.');
    };

    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', handlePopState);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
};

export default useBack;
