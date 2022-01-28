import React, {useEffect, useState} from 'react';


export const Clock = () => {

    const [clockState, setClockState] = useState();

    useEffect(()=> {
        setInterval(()=> {
            const date = new Date();
            setClockState(date.toLocaleTimeString());

        });

    }, []);

  return <div style={{fontSize: "20px"}}> {clockState} </div>;
};