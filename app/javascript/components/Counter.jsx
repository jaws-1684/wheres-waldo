import React, { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";

export default function Counter({timerActivated}) {
    const [time, setTime] = useState(0)
    useEffect(() => {
      if (!timerActivated) {
        return
      }
       const key = setInterval(() => {
         setTime(time => time+=1)
       }, 1000)

       return () => clearInterval(key)
    }, [time, timerActivated])
    const duration = intervalToDuration({ start: 0, end: time * 1000 })
    return <p>{duration.minutes || 0}:{duration.seconds || 0} m/s</p>
}