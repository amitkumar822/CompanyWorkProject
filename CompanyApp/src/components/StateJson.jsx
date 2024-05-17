import React from 'react'
import StateCityData2 from '../data/StateCityData2.json'

function StateJson() {
  return (
    <div>
        StateJson
        {
            StateCityData2.map((item, index) => {
                return (
                    <div key={index}>
                        {item.state}
                    </div>
                )
            })
        }
    </div>
  )
}

export default StateJson