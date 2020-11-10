import * as _ from 'lodash';

const model = (historicalData, forecastData) => {

    const forPeriod = (_from, _to) => {
        if(_from && _to) {
            return model (historicalData.filter(x => x.time >= _from && x.time <= _to),
            forecastData.filter(x => x.time >= _from && x.time <= _to))    
      }
    }

  
    const reducer = (map, val) => {
        if (map[val] == null) {
          map[val] = 1;
        } else {
          ++map[val];
        }
       
        return map;
          
      }

    const getMaxTemp = () =>{ 
        try {
            let max =  [Math.max(...historicalData.filter(item => item.type === 'temperature').map(item => item.value))];
      
            return `The maximal temperature was: ${max}`
            
        } catch  {
            return console.log('no data')
        }
        
    }

    
    const getMinTemp = () =>{ 
        try {
            let min =  [Math.min(...historicalData.filter(item => item.type === 'temperature').map(item => item.value))];
            return `The minimal temperature was: ${min}`
            
        } catch  {
            return console.log('no data')
        }
       
    }

     const getTotalPrecipitation = function () {
         try {
            let total=  historicalData.filter(item => item.type === 'precipitation')
            .map(item=>item.value).reduce((a, b) => (a + b))
         
            return       `The total precipitation was: ${total} `
             
        } catch  {
            return console.log('no data')
        }
       
    } 

    const getAverageWind = function () {
        try{
        let array = historicalData.filter(item => item.type === 'wind speed')
      
        let avg = Math.round(array.reduce((a, b) => a + b.value, 0) / array.length)
             
    
    return       `The average wind speed was: ${avg}`
        
} catch  {
    return console.log('no data')
}
}

    const getAverageCloud = function () {
        try {
            let array = historicalData.filter(item =>item.type === 'cloud coverage');
   
            let avg = Math.round(array.reduce((a, b) => a + b.value, 0) / array.length)      
           
            return       `The average cloud coverage: ${avg} `
            
        } catch  {
            return console.log('no data')
        }
       
    }

    const getDominantWindDirection = function (){
        try {
            let dominant = historicalData.filter(item => item.type === 'wind speed').map(item=>item.direction)
            .reduce(reducer, {});
                  
            let h=  Object.keys(dominant).find(key => dominant[key] === Math.max(...Object.values(dominant)));
         
    
            return       `The dominant wind directon was: ${h}`
            
        } catch  {
            return console.log('no data')
        }
       
    }

    const gethistoricalData = () => historicalData

    //hourly forecast data
    const getForecastData = () => {
       
       return  _.uniqBy(forecastData, item =>new Date(item.time).getHours())
    }
  

    const addData = d => {
        console.log(d)
        return model(historicalData.concat(d)) 
    }
    return { forPeriod, gethistoricalData, getForecastData, addData, getMaxTemp, getMinTemp, getAverageWind,
     getAverageCloud,getTotalPrecipitation, getDominantWindDirection}
}

export default model