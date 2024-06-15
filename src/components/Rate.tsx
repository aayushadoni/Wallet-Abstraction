import React from 'react';

const Rate = ({ isIncrement, rate }: { isIncrement: boolean|undefined; rate: string }) => {
  return (
    <p className={`text-sm ${isIncrement ? 'text-green-500' : 'text-red-500'}`}>
      {rate}
    </p>
  );
};

export default Rate;
