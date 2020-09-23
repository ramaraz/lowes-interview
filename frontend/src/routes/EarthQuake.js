import React, { useEffect, useState } from "react";
import csv from "csvtojson";
import { Chart } from 'react-charts'
import _ from "lodash"

function EarthQuake() {

    const [result, setResult] = useState([]);

    useEffect(() => {
        fetch("http://localhost:12059/react-interview/getEarthQuakes", {
            headers: {
                'Content-Type': 'text/csv'
            }
        })
            .then(res => res.text())
            .then(
                (result) => {
                    console.log("result =>", result)
                    csv({
                        noheader: false,
                    })
                        .fromString(result)
                        .then((csvRow) => {
                            console.log("csvRow =>", csvRow)
                            csvRow.splice(50);
                            let grouped = _.groupBy(csvRow, 'city');
                            delete grouped[""]
                            setResult(grouped)
                            console.log(grouped)
                        })
                },
            )
    }, [])


    let _data  = Object.values(result).map(obj1 => Object.assign({}, {  label: obj1[0].city,
    data: obj1.map((val,index) => [index + 1,parseInt(val.richter),val.date,val.time]),
    country:obj1[0].country}));

    console.log("_data =>",_data);

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const tooltip = React.useMemo(
        () => ({
            render: ({ datum, label }) => {
                // console.log("datum =>", datum)
                return datum ? <h3
                    style={{
                        display: 'block',
                        textAlign: 'left'
                    }}
                >
                    City: {datum.seriesLabel}<br/>
                    Country: {datum.originalSeries.country}<br/>
                    Date & Time: {datum.originalDatum[2]} {datum.originalDatum[3]}
                </h3> : <div></div>
            }
        }),[])

    return (
        <div className="earth-quake-wraper">
            <Chart data={_data} axes={axes} tooltip={tooltip} />
        </div>
    );
}

export default EarthQuake;
