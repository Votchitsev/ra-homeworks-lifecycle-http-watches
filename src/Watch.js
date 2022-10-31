import parseDate from "./parseDate";

function Watch({ watchData, id, changeWatches, time }) {

  const onDeleteHandler = () => {
    changeWatches(id);
  }

  return (
    <div className="watch">
      <div className="watch-name">{ watchData.name }</div>
      <div className="watch-time">{ parseDate(time += watchData.delta) }</div>
      <div className="watch-delete" onClick={ onDeleteHandler }>{ 'x' }</div>
    </div>
  )
}

export default Watch;
