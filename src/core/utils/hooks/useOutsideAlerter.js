import { useEffect } from 'react';

export default function useOutsideAlerter(ref, onClickOutise) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutise()
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClickOutise, ref]);
}
