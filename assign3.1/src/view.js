import React from 'react'


const getPlace = () => {
    let selected = document.getElementById('selectedPlace');
    return selected.value
}
const getInsertPlace = () => {
    let selected = document.getElementById('insertPlace')
    return selected.value
}

const getFrom = () => {
    let selected = document.getElementById('from')
    return selected.value
}
const getTo = () => {
    let selected = document.getElementById('to')
    return selected.value
}

const getType = () => {
    let selected = document.getElementById('selectedData')
    return selected.value
}

const getSelectedUnit = () => {
    let selected = document.getElementById('selectedUnitType')
    return selected.value
}


const getValue = () => {
    let val = document.getElementById('value')
    return val.value
}

const getTime = () => {
    let time = document.getElementById('time')
    return time.value
}

const MaxTemperature = ({model}) => (

    <div>{
       model.getMaxTemp()
    }
    </div>
    
)
const MinTemperature = ({model}) => (

    <div>{
       model.getMinTemp()
    }
    </div>
    
)
const TotalPrecipitation = ({model}) => (

    <div>{
       model.getTotalPrecipitation()
    
    }
    </div>    
)
const AverageWindSpeed = ({model}) => (

    <div>{
        model.getAverageWind()
    }
    </div>
    
)
const AverageCloud = ({model}) => (

    <div>{
        model.getAverageCloud()
    }
    </div>
    
)
const DominantWindDirection = ({model}) => (

    <div>{
        model.getDominantWindDirection()
    }
    </div>
    
)


const ForecastData = (pd) => [
    <td key = 'time'> {pd.time}</td>,
    <td key = 'type'> {pd.type}</td>,
    <td key = 'from'> {pd.from}</td>,
    <td key = 'to'> {pd.to}</td>,
    <td key = 'unit'> {pd.unit}</td>,
    <td key = 'place'> {pd.place}</td>
]
const ForecastDataRow = (props) => (
    <tr>
        <ForecastData {...props}/>
    </tr>
)

const ForecastDataBody = ({model}) => (
    <tbody>
        {
            model.getForecastData().map(function(rowData, i) {return <ForecastDataRow key={i} {...rowData}/> })
        }
    </tbody>
)

export default dispatcher => (model) => (
    <div id='base'>
          <h1>Historical weather data</h1>
          <br></br>
          <label htmlFor="selectedPlace">Select place:</label>
        <select id='selectedPlace'>
            <option value = "Horsens"> Horsens </option>
            <option value = "Aarhus"> Aarhus </option>
            <option value = "Copenhagen"> Copenhagen </option>
        </select>
        
        
        <label htmlFor="from">From:</label>
        <input id="from" type="datetime-local"/>

        <label htmlFor="to">To:</label>
        <input id="to" type="datetime-local"/>
        <button onClick = {() => dispatcher()({type:'load_data', place:getPlace(), from:getFrom(), to:getTo()})}>Load Data</button> <br></br> 

   <br></br>

        <div> 
                <MaxTemperature {...{model}}/>
                <MinTemperature {...{model}}/>
                <TotalPrecipitation {...{model}}/>
                <AverageWindSpeed {...{model}}/>
                <AverageCloud {...{model}}/>
                <DominantWindDirection {...{model}}/>
     </div>

<br></br>

        <h1>Forecast data</h1>
        <br></br>     

<div>
          <br></br>
       
            <table id='forecastData' style={{border:"1px solid black"}}>
                <thead><tr>   
                    <td>Time</td><td>Data type</td><td>From</td><td>To</td><td>Unit</td><td>Place</td>    
                </tr></thead>
                <ForecastDataBody {...{model}}/>
            </table>
        </div>   

<h1>Add new weather data</h1>

<select id='insertPlace'>
            <option value = "Horsens"> Horsens </option>
            <option value = "Aarhus"> Aarhus </option>
            <option value = "Copenhagen"> Copenhagen </option>
        </select>
<select id ="selectedData">
            <option value = "temperature">Temperature</option>
            <option value = "precipitation">Precipitation</option>
            <option value = "wind speed">Wind speed</option>
            <option value = "cloud coverage">Cloud coverage</option>
        </select>
        
        <input placeholder='value' id='value'/>
   
        <select id ="selectedUnitType" >
        <option > </option>
            <option value = "C">C</option>
            <option value = "F">F</option>
            <option value = "ms">m/s</option>
            <option value = "mm">mm</option>
            <option value = "%">%</option>
            <option value = "mph">mph</option>
            
        </select>
        
        <input id='time' type="datetime-local"/>

        <button onClick = {() => dispatcher()({type:'add_data', place:getInsertPlace(),
             data_type:getType(), value:getValue(), unitType:getSelectedUnit(), time:getTime()})}>Insert Data</button>            
        
     
        <br></br>   
        <br></br>   
        <br></br>   
        <br></br>   
        

    </div>
    
)