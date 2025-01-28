'use client'
import React, { useEffect } from 'react'
import ThreeCardClient from './Card'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { setPurchaseStatus } from '@/redux/slices/loaderSlice'
import FreeCard from './FreeCard'


const options = [
    { id:1, text: "Personalized Feedback"},
    { id:2, text: "Priority Support"},
    { id:3, text: "Track Your Progress"},
    { id:4, text: "Comprehensive Coverage"},
    { id:5, text: "Adapted Test"},
]


const SubscriptionCard = () => {
  const {user} = useSelector((store:any) => store.section)
  const {purchaseStatus} = useSelector((store:any) => store.loader)
  const userId = user?.newUser?._id
  const router = useRouter()
  console.log(purchaseStatus, 'puss')
  const dispatch = useDispatch()

  useEffect(() => { 
    const purchasedPlans = user?.newUser?.purchase || []; 
    purchasedPlans.forEach((purchase: any) => { 
      dispatch(setPurchaseStatus({ planType: purchase.planType, status: true })); 
    }); 
  }, [user, dispatch])

    const handleTest = async (query:string) => {
      try {

        if (!userId) { 
          router.push('/auth/sign-in');    
        return; 
      }

        if(purchaseStatus[query]){
          router.push(`/querytest/${query}`)
          return;
        }
          console.log(query, 'querr')
          const res = await axios.post(`${process.env.NEXT_PUBLIC_APP_URL}/api/checkout`, {
            userId,
            planType:query
          })
          console.log(res, 'purchase')
          
          if(res.data.success && res.data.approvalUrl){
            window.location.href = res.data.approvalUrl
            if(res.data.status === "CREATED"){
              const purchaseUnit = res.data.order.purchase_units.find((unit:any) => unit.custom_id === query);
              console.log(purchaseUnit, 'unit')
              if(purchaseUnit){
                dispatch(setPurchaseStatus({planType:query, status:true}))
              }
            }
          // dispatch(setUser({
          //   ...user,
          //   newUser:{
          //     ...user.newUser,
          //     purchase: [...user.newUser.purchase, res.data.order]
          //   }
          // }))

        }else {
          console.error('Failed to create order:', res.data.message);
        }
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    }



  return (
    <div className='flex-col gap-5 flex sm:flex-row sm:gap-5 relative'>
      <FreeCard/>
      <ThreeCardClient 
      title="BASIC" 
      price="20" 
      desc="Basic Plan: One-time submission, 1 video solution, No progress tracker, No written solution."
      options={options}
      onSelect={() => handleTest('BASIC')}
      />
      <ThreeCardClient 
      title="STANDARD" 
      price="40" 
      desc="Standard Plan: One-time submission, 1 video solution, progress tracker, No written solution."
      options={options}
      onSelect={() => handleTest('STANDARD')}
      />
      <ThreeCardClient 
      title="PREMIUM" 
      price="60" 
      desc="Premium Plan: One-time submission, 1 video solution, progress tracker, written solution."
      options={options}
      onSelect={() => handleTest('PREMIUM')}
      />
    </div>
  )
}

export default SubscriptionCard
