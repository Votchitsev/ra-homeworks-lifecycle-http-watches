import { useRef, useState, useEffect } from 'react';
import './Watches.css';
import Watch from './Watch';

function Watches() {

  let [watches, setWatches] = useState([]);
  let [time, setTime] = useState(Date.now());
  
  const name = useRef();
  const timeZone = useRef();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => time + 1000)
    }, 1000)

    return () => clearInterval(interval);
  }, []);

  const changeWatches = (deleteWatchId) => {
    if (!deleteWatchId) {
      const tz = timeZone.current.value;
      let delta = 0;
      
      if (/\+/.test(tz)) {
        delta += Number(tz.match(/\d{1,2}/) * 3600000)
      } else {
        delta -= Number(tz.match(/\d{1,2}/) * 3600000)
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
    console.log(e);
    e.preventDefault();
    changeWatches()
    name.current.value = '';
    timeZone.current.value = '';
  }

  return (
    <div className="watches">
      <form className="watches-form" >
        <label htmlFor='name'>{ 'Название' }
          <input type="text" name="name" ref={ name } required></input>
        </label>
        <label htmlFor="tz">{ 'Временная зона' }
          <input type="text" name="tz" ref={ timeZone } pattern="(\+|-)\d{1,2}" placeholder='введите разницу, например +1 или -2'></input> 
        </label>
        <input type="submit" onClick={ onSubmitHandler } value="OK"></input>
      </form>
      <div className="watches-container">
        { watches.map(watch => <Watch watchData={ watch } time={ time } key={ watch.name } id={ watch.name } changeWatches={ changeWatches } />) }
      </div>
    </div>
  )
}

export default Watches;