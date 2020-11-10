import model from "./model"

async function loadFor (place){
  const historicalData = await fetch(('http://localhost:8080/data/' + place)).then(res => res.json())
  const forecastData = await fetch(('http://localhost:8080/forecast/' + place)).then(res => res.json())
  return model(historicalData, forecastData)
}

export default store => async ({type, ...params}) =>  {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
    switch(type) {
      case 'load_data':
        let placeData = await loadFor(params.place)
        if(params.from && params.to) { 
            placeData = placeData.forPeriod(params.from, params.to)
         }
        store({type, placeData})               

        break;
      

      case 'add_data':
       
        
        const weatherObject = [{ 
          place: params.place,
          type: params.data_type,
          value: params.value,
          unit: params.unitType,
          time: params.time
        }]

        await fetch('http://localhost:8080/data',
          { method: 'POST',
            body: JSON.stringify(weatherObject), headers})

          store({type, ...params, weatherObject})
        break;
        
      default:
    }
}