const React = require('react');
const ReactDOM = require('react-dom');
const NavTree = require('./NavTree.js');

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            navPosition : {year: null, team: null, player: null}
      }
      this.updateHandler = this.updateHandler.bind(this);
    }
    updateHandler(updatedNavPosition) {
        this.setState({
            navPosition: updatedNavPosition
        })   
    }
    render() {
        return(
          <div id='app'> 
             <NavTree navPosition={this.state.navPosition} updateHandler={this.updateHandler} />
             <Stats navPosition={this.state.navPosition} />
          </div>
        );
    }
}


function Stats(props){

    let currState = Object.values(props.navPosition);
    let tableHeading = currState.filter(ele => ele).join(' - ');

    let statistics = {economy: 3.5, thisa: 'what'};
    let statNames = Object.keys(statistics);

    let tableData = statNames.map(statName => {        
        return (
            <tr key={statName}>
                <td><strong>{statName}</strong></td>
                <td>{statistics[statName]}</td>
            </tr>
        );
    });

    return (
        <div id="stats">
        <table>
            <tbody>
            <tr><th colSpan={2}>{tableHeading}</th></tr>
            {tableData}
            </tbody>
        </table>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('react-root'));