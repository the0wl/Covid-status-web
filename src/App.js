import React, { useState, useEffect } from 'react';
import api from './config/api'
import loading from './asset/loading.gif'
import './App.css';

function App() {
  const [ country, setCountry ] = useState('Brazil')
  const [ searchCountry, setSearchCountry ] = useState('Brazil')
  const [ loadingCountry, setLoadingCountry ] = useState(false);
  const [ loadingWorld, setLoadingWorld ] = useState(false);
  
  const [ totalCases, setTotalCases ] = useState(0)
  const [ newCases, setNewCases ] = useState(0)
  const [ totalDeaths, setTotalDeaths ] = useState(0)
  const [ newDeaths, setNewDeaths ] = useState(0)

  const [ totalWorldCases, setTotalWorldCases ] = useState(0)
  const [ newWorldCases, setNewWorldCases ] = useState(0)
  const [ totalWorldDeaths, setTotalWorldDeaths ] = useState(0)
  const [ newWorldDeaths, setNewWorldDeaths ] = useState(0)

  useEffect(() => {
    async function getData() {
      setLoadingCountry(true)
      const response = await api.get(`/${searchCountry}`)

      setTotalCases(response.data.totalCases)
      setNewCases(response.data.newCases === "" ? 0 : response.data.newCases)
      setTotalDeaths(response.data.totalDeaths)
      setNewDeaths(response.data.newDeaths === "" ? 0 : response.data.newDeaths)

      setLoadingCountry(false)
    }

    getData()
  }, [searchCountry])

  useEffect(() => {
    async function getData() {
      setLoadingWorld(true)
      const response = await api.get(`/World`)

      setTotalWorldCases(response.data.totalCases)
      setNewWorldCases(response.data.newCases === "" ? 0 : response.data.newCases)
      setTotalWorldDeaths(response.data.totalDeaths)
      setNewWorldDeaths(response.data.newDeaths === "" ? 0 : response.data.newDeaths)

      setLoadingWorld(false)
    }

    getData()
  }, [])

  function shouldChangeInfo(event) {
    const key = event.which || event.keyCode

    if (key === 13) {
      setSearchCountry(event.target.value)
    }
  }

  return (
    <div className="App">
      <div className="World">
        <div className="Title">
          <span className="Text">Informações mundiais</span>
        </div>
        <div className="Body">
          { loadingWorld ?
            <div className="Loading">
              <img className="Spinner" alt="Loading" src={loading}/>
            </div>
            :
            <>
              <div className="Cases">
                <span className="Subtitle">NÚMERO TOTAL DE CASOS</span>
                <br/>
                <span className="Number">{totalWorldCases}</span> 
              </div>
              <div className="Cases">
                <span className="Subtitle">NÚMERO DE CASOS NOVOS</span>
                <br/>
                <span className="Number">{newWorldCases}</span> 
              </div>
              <div className="Cases">
                <span className="Subtitle">NÚMERO TOTAL DE MORTES</span>
                <br/>
                <span className="Number">{totalWorldDeaths}</span> 
              </div>
              <div className="Cases">
                <span className="Subtitle">NÚMERO DE MORTES RECENTES</span>
                <br/>
                <span className="Number">{ newWorldDeaths }</span> 
              </div>
            </>
          }
        </div>
      </div>

      <div className="Country">
        <div className="Title">
          <input className="TextInput" type="text" value={country} onChange={e => setCountry(e.target.value)} onKeyUp={e => shouldChangeInfo(e)}/>
        </div>
        <div className="Body">
          { loadingCountry ?
            <div className="Loading">
              <img className="Spinner" alt="Loading" src={loading}/>
            </div>
            :
            <>
              <div className="Cases">
                <span className="Subtitle">NÚMERO TOTAL DE CASOS</span>
                <br/>
                <span className="Number">{totalCases}</span> 
              </div>
              <div className="Cases">
                <span className="Subtitle">NÚMERO DE CASOS NOVOS</span>
                <br/>
                <span className="Number">{newCases}</span> 
              </div>
              <div className="Cases">
                <span className="Subtitle">NÚMERO TOTAL DE MORTES</span>
                <br/>
                <span className="Number">{totalDeaths}</span> 
              </div>
              <div className="Cases">
                <span className="Subtitle">NÚMERO DE MORTES RECENTES</span>
                <br/>
                <span className="Number">{ newDeaths }</span> 
              </div>
            </>
          }
        </div>
      </div>

      <div className="Credits">
        <span className="Credit">Updated at March 27, 2020, 03:05 GMT</span>
        <br/>
        <span className="Credit">All information is collected from <a className="Link" href="https://www.worldometers.info/coronavirus/">worldometers</a></span>
        <br/>
        <span className="Credit">created by <a className="Link" href="https://github.com/the0wl">the_0wl</a></span>
      </div>
    </div>
  );
}

export default App;
