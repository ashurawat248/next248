'use client'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface TestItem {
  id: string;
  title: string;
  difficulty: string | null; // Adjust type as needed (e.g., Difficulty type if it's a custom enum)
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TestItemsProps {
  data: TestItem[];
}

const TestItems = ({ data }:TestItemsProps) => {
    const router = useRouter()
  const handleDelete = async (testId:string) => {
    try {
      const res = await axios.delete(`${process.env.NEXT_PUBLIC_APP_URL}/api/quiz/${testId}`);
      if (res.status === 200) {
        router.refresh()
        toast.success("Test Deleted Successfully");
      } else {
        toast.error("Failed to delete the test");
      }
    } catch (error) {
      console.error('Error deleting test:', error);
      toast.error("An error occurred while deleting the test");
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-5 gap-5'>
      {data.length > 0 && data.map((item, index) => (
        <Link href={`/section/${item?.id}`} key={index}>
          <div className='border p-5 cursor-pointer'>
            <h2 className='py-4'>{item?.title}</h2>
            <Button size='sm' onClick={() => handleDelete(item?.id)}>Delete</Button>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default TestItems;
