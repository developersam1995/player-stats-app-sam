const React = require('react');
const ReactDOM = require('react-dom');

//App component

const navigableGlobal = {
    2008: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
    2009: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
    2010: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] }
};

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
            navPosition : {year: 2008, team: 'KKR', player: null}
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
    
    const {year, team, player} = props.navPosition;
    const currState = [year, team, player];
    const navigableClasses = ['years','teams','players'];
    let navigableValues = [];
    
    navigableValues.push(Object.keys(navigableGlobal));
    if (year) navigableValues.push(Object.keys(navigableGlobal[year]));
    if (team) navigableValues.push(navigableGlobal[year][team]);
    
    function Ul(props) {
        let uls = props.values.map((value) => {
            let currKey = props.keyRoot.join('_');
            if(currKey) currKey = currKey+'_'+value;
            else currKey = value;
            return <li key={currKey}>{value}</li>;
        });
        return (
           <ul className={props.class}>{uls}</ul>
        );
    }
    
    let tree = null;
    for (let depth = navigableValues.length-1; depth >= 0; depth--) {
        let navigableValue = navigableValues[depth];
        let indexToSplice = navigableValue.indexOf(String(currState[depth]))+1;
        if(tree) {
            navigableValue.splice(indexToSplice, 0, tree);
        }
        tree = <Ul 
            class={navigableClasses[depth]} 
            values={navigableValue} 
            keyRoot = {currState.filter((ele,idx)=>idx<depth)}
        />;
    }

    return tree;
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

