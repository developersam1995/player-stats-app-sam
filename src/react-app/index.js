const React = require('react');
const ReactDOM = require('react-dom');

//App component

const navigable = {
    2008: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
    2009: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
    2010: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] }
};

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            navPosition : {year: 2008, team: 'KKR', player: 'R Dravid'}
      }
    }
    render() {
        return(
          <div id='app'> 
             <NavTree navPosition={this.state.navPosition} />
             <Stats navPosition={this.state.navPosition} />
          </div>
        );
    }
}

function NavTree(props) {
    
    const currStateValues = Object.values(props.navPosition);
    let years = Object.keys(navigable);
    if (currStateValues[0]) var teams = Object.keys(navigable[year]);
    if (currStateValues[1]) var players = navigable[year][team];

    // let retDOM;

    // currStateValues.forEach(currStateValue => {

    // });

    // return (
    //     <li>{players}</li>
    // );
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

