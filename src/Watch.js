import { useEffect, useState } from "react";
import parseDate from "./parseDate";

function Watch({ watchData, id, setWatches }) {

  let [time, setTime] = useState(Number(watchData.time));

  useEffect(() => {
    setTimeout(() => {
      setTime((time => time + 1000))
    }, 1000)
  }, [time])

  const onDeleteHandler = () => {
    setWatches(id);
  }

  return (
    <div className="watch">
      <div className="watch-name">{ watchData.name }</div>
      <div className="watch-time">{ parseDate(time) }</div>
      <div className="watch-delete" onClick={ onDeleteHandler }>{ 'del' }</div>
    </div>
  )
}

export default Watch;
