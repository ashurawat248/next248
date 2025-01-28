import ClientOnly from "@/components/ClientOnly";
import Navbar from "@/components/Navbar";
import SubscriptionCard from "@/components/SubscriptionCard";
import TestCard from "@/components/TestCard";

export default function Home() {

  const score = 44;  // Example score (correct answers)
const totalQuestions = 108;  // Example total questions

const progress = (score / totalQuestions) * 100;

const progressRounded = progress.toFixed(0);

console.log(`User's progress: ${progressRounded}%`);

  

  return (
    <ClientOnly>
    <main className="h-full w-full">
      {/* <Navbar/> */}
      
      <div className="flex flex-wrap border items-center justify-center py-10 gradient">
        <SubscriptionCard/>
      </div>
        <div className="my-4">
        <TestCard/>
        </div>
    </main>
    </ClientOnly>
  );
}
