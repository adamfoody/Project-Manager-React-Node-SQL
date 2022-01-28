import React, {useEffect, useState} from 'react';

export const DateToday = () => {

    const [dateState, setDateState] = useState();

    useEffect(()=> {
        setInterval(()=> {
            const date = new Date();
            setDateState(date.toLocaleDateString());

        },);

    }, []);

  return <div style={{fontSize: "20px"}}> {dateState} </div>;
};