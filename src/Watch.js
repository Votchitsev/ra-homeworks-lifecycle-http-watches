import parseDate from "./parseDate";

function Watch({ watchData, id, setWatches, time }) {

  const onDeleteHandler = () => {
    setWatches(id);
  }

  return (
    <div className="watch">
      <div className="watch-name">{ watchData.name }</div>
      <div className="watch-time">{ parseDate(time += watchData.delta) }</div>
      <div className="watch-delete" onClick={ onDeleteHandler }>{ 'del' }</div>
    </div>
  )
}

export default Watch;
