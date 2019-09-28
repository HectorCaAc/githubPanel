import React, {useState} from 'react'
import ReactModal from 'react-modal';


class FormTo extends React.Component{

}

export function Form(){

  const [user, userEnter] = useState("")

  return (
    <div>
      <form>
        <label>
          Please enter the Github username to see the staticst
        </label>
        <input type="submint" value="submit"/>
        <button>Look Stats of the user </button>

      </form>
    </div>
  )
}
