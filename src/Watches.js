import { useRef, useState } from 'react';
import './Watches.css';
import Watch from './Watch';

function Watchers() {

  let [watches, setWatches] = useState([]);
  
  const name = useRef();
  const timeZone = useRef();

  const changeWatches = (deleteWatchId) => {
    if (!deleteWatchId) {
      const Tz = timeZone.current.value;
      let time = Date.now();
      
      if (/\+/.test(Tz)) {
        time += Number(Tz.match(/\d{1,2}/) * 3600000)
      } else {
        time -= Number(Tz.match(/\d{1,2}/) * 3600000)
      }

      setWatches(
        watches = [...watches, { 
          name: name.current.value,
          time: time,
        }]
      )

      return;
    }

    setWatches(
      () => {
        const index = watches.indexOf(watches.find(watch => watch.name === deleteWatchId));
        console.log(index);
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
        { watches.map(watch => <Watch watchData={ watch } key={ watch.name } id={ watch.name } setWatches={ changeWatches }/>) }
      </div>
    </div>
  )
}

export default Watchers;