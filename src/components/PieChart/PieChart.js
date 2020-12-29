import React from 'react'

import { VictoryPie, VictoryLabel, VictoryTooltip } from 'victory'

import pieDataDELETELATER from '../Helpers/GetData'

import './PieChart.sass'
import '../styles/Card.sass'

function PieChart(Props) {

    let dataPie = pieDataDELETELATER()

    return (
        <div className="SmallCard">
            <div className="Header">
                Languages used by the user
            </div>
            <PieChartBody data={dataPie.get('pie_data')} />
        </div>
    )
}

function PieChartBody(props) {
    let data = []
    props.data.forEach((value, key) => {
        data.push({ x: key, y: value.length })
    })
    return (
        <div>
            <VictoryPie
                style={{ labels: { fill: "white" } }}
                innerRadius={100}
                labelRadius={120}
                labels={({ datum }) => `${datum.x}`}
                labelComponent={<CustomLabel />}
                data={data}
            />
        </div>
    )
}

class CustomLabel extends React.Component {

    render() {
        let copy = { ...this.props }
        let text = copy['text']
        let correct_description = copy['slice']['value'] === 1 ? 'project' : 'projects'
        let number_projects = `${copy['slice']['value']} ${correct_description} using ${text}`
        copy['text'] = number_projects

        return (
            <g>
                <VictoryLabel {...this.props} />
                <VictoryTooltip
                    {...copy}
                    x={200} y={250}
                    orientation="top"
                    pointerLength={0}
                    cornerRadius={50}
                    flyoutWidth={100}
                    flyoutHeight={100}
                    flyoutStyle={{ fill: "black" }}
                />
            </g>
        )
    }
}

CustomLabel.defaultEvents = VictoryTooltip.defaultEvents

export default PieChart
