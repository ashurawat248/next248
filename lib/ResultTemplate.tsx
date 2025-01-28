import { Button, Html } from "@react-email/components";
import * as React from "react";

export default function ({score, totalQuestions}:{score: string, totalQuestions: string}) {
  return (
      <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}> 
        <h1>Congratulations!</h1> 
      <p>Your score is: {score} out of {totalQuestions}.</p> 
      <p>Thank you for taking the test!</p> </div>
  );
}
