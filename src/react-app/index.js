const React = require('react');
const ReactDOM = require('react-dom');
const NavTree = require('./NavTree.js');

//App component

const navigableGlobal = {
    2008: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
    2009: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
    2010: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] }
};

class App extends React.Component {
    constructor(props) {
      super(props);
      this.navigableGlobal = navigableGlobal;
      this.state = {
            navPosition : {year: 2008, team: 'KKR', player: 'S Ganguly'}
      }
      this.updateHandler = this.updateHandler.bind(this);
    }
    updateHandler(st) {
        let stArr = st.split('_');
        let updatedNavPosition = {year: null, team: null, player: null}
        updatedNavPosition.year = Number(stArr[0]);
        if(stArr[1]) updatedNavPosition.team = stArr[1];
        if(stArr[2]) updatedNavPosition.player = stArr[2];
          
        this.setState({
            navPosition: updatedNavPosition
        })
          
    }
    render() {
        return(
          <div id='app'> 
             <NavTree navPosition={this.state.navPosition} updateHandler={this.updateHandler}
             navigableGlobal={this.navigableGlobal}/>
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
        <table>
            <tbody>
            <tr><th colSpan={2}>{tableHeading}</th></tr>
            {tableData}
            </tbody>
        </table>
    );
}

ReactDOM.render(<App />, document.getElementById('react-root'));

function logr(a){
  console.log(a);
  return a;
}

