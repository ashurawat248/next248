import { useEffect, useRef } from 'react';
import Desmos from 'desmos';

const CalculatorContainer = () => {
  const calculatorRef = useRef(null);

  useEffect(() => {
    if (calculatorRef.current) {
      const calculator = Desmos.GraphingCalculator(calculatorRef.current);
      calculator.setExpression({ id: 'graph1', latex: 'y=x^2' });
    }
  }, []);

  return <div ref={calculatorRef} 
  style={{ width: '600px', height: '600px' }} 
  className='absolute left-0 top-7 overflow-hidden z-10' />;
};

export default CalculatorContainer;
