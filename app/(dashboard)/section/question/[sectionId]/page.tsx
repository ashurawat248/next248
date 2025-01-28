import AllQuestions from "./_component/AllQuestions"
import QuestionForm from "./_component/QuestionForm"


const page = ({params}:{params: {sectionId: string}}) => {
  console.log(params.sectionId, 'id')
  return (
    <div className='mt-5'>
      <div className="flex gap-3">
      <QuestionForm sectionId={params?.sectionId}/>
      <AllQuestions sectionId={params?.sectionId}/>
      </div>
    </div>
      
  )
}

export default page
