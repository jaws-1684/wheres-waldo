import React, { useEffect, useState } from "react";
import { intervalToDuration } from "date-fns";

export default function Counter() {
    const [time, setTime] = useState(0)
    useEffect(() => {
       const key = setInterval(() => {
         setTime(time => time+=1)
       }, 1000)

       return () => clearInterval(key)
    }, [time])
    const duration = intervalToDuration({ start: 0, end: time * 1000 })
    return <p>{duration.minutes || 0}:{duration.seconds || 0} minutes</p>
}