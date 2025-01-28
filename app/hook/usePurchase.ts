import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPurchaseStatus } from '@/redux/slices/sectionSlice';

const usePurchase = () => {
  const dispatch = useDispatch();
  const {user} = useSelector((store:any) => store.section)
  const userId = user?.newUser?._id

  useEffect(() => {

    if(!userId) return;

    const fetchPurchase = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout/purchase/${userId}`);
        const purchase = await res.json();
        console.log(purchase, 'chase')
        if(res.ok) {
          dispatch(setPurchaseStatus(purchase));
        }else {
          dispatch(setPurchaseStatus(null))
        }
      } catch (error) {
        console.error('Error fetching purchase:', error);
      }
    };

    fetchPurchase();
  }, [userId, dispatch]);
};

export default usePurchase;
