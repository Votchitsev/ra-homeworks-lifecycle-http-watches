import { useRef, useState, useEffect } from 'react';
import './Watches.css';
import Watch from './Watch';

function Watches() {

  let [watches, setWatches] = useState([]);
  let [time, setTime] = useState(Date.now());
  
  const name = useRef();
  const timeZone = useRef();

  useEffect(() => {
    setTimeout(() => {
      setTime((time => time + 1000))
    }, 1000)

    return;
  }, [ time ])

  const changeWatches = (deleteWatchId) => {
    if (!deleteWatchId) {
      const Tz = timeZone.current.value;
      let delta = 0;
      
      if (/\+/.test(Tz)) {
        delta += Number(Tz.match(/\d{1,2}/) * 3600000)
      } else {
        delta -= Number(Tz.match(/\d{1,2}/) * 3600000)
      }

      setWatches(
        watches = [...watches, { 
          name: name.current.value,
          time: time,
          delta,
        }]
      )

      return;
    }

    setWatches(
      () => {
        const index = watches.indexOf(watches.find(watch => watch.name === deleteWatchId));
        watches = [...watches.slice(0, index), ...watches.slice(index + 1)]
        return watches;
      }
    )
  }

  const onSubmitHandler = (e) => {
    e.preventDefault();
    changeWatches()
    name.current.value = '';
    timeZone.current.value = '';
  }

  return (
    <div className="watches">
      <form className="watches-form">
        <label for='name'>{ 'Название' }
          <input type="text" name="name" ref={ name }></input>
        </label>
        <label for="date">{ 'Временная зона' }
          <input type="text" name="date" ref={ timeZone } pattern="^(\+|\-)\d{1,2}"></input> 
        </label>
        <input type="submit" onClick={ onSubmitHandler }></input>
      </form>
      <div className="watchers-container">
        { watches.map(watch => <Watch watchData={ watch } time={ time } key={ watch.name } id={ watch.name } />) }
      </div>
    </div>
  )
}

export default Watches;