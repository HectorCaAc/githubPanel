import React from 'react'

class Base extends React.Component{

  constructor(props){
    super()

    this.state ={
              component_ready:false
    }

  }

  render(){
    return(
      <div>
        <div id="basic">
        </div>
        <div class="charts">
          <div class="row">
            <div class="col">
              <div id="pie-chart">

              </div>
            </div>
            <div class="col">
              <div id="commits">

              </div>
            </div>
            <div class="col">
              <div id="popularity">

              </div>
            </div>

          </div>
        </div>
      </div>
    )
  }
}
