const React = require('react');
const ReactDOM = require('react-dom');

class Ul extends React.Component {
  constructor(props) {
    super(props);
    this.class = props.class;
    this.values = props.values;
    this.keyRoot = props.keyRoot;
  }

  render() {
    let uls = this.values.map((value) => {
      let currKey = this.keyRoot.join('_');
      if (currKey) currKey = currKey + '_' + value;
      else currKey = value;
      if(typeof value=='string')  return <li key={currKey} onClick={()=>console.log(this)}>{value}</li>;
      return <li key={currKey}>{value}</li>;
    });
    return (
      <ul className={this.class}>{uls}</ul>
    );
  }
}



class NavTree extends React.Component {
  constructor(props) {
    super(props);
    this.navPosition = props.navPosition;
    this.navigableGlobal = props.navigableGlobal;
  }
  render() {
    const { year, team, player } = this.navPosition;
    const currState = [year, team, player];
    const navigableClasses = ['years', 'teams', 'players'];
    let navigableValues = [];

    navigableValues.push(Object.keys(this.navigableGlobal));
    if (year) navigableValues.push(Object.keys(this.navigableGlobal[year]));
    if (team) navigableValues.push(this.navigableGlobal[year][team]);

    let tree = null;
    for (let depth = navigableValues.length - 1; depth >= 0; depth--) {
      let navigableValue = navigableValues[depth];
      let indexToSplice = navigableValue.indexOf(String(currState[depth])) + 1;
      if (tree) {
        navigableValue.splice(indexToSplice, 0, tree);
      }
      tree = <Ul
        class={navigableClasses[depth]}
        values={navigableValue}
        keyRoot={currState.filter((ele, idx) => idx < depth)}
      />;
    }

    return tree;
  }
}

module.exports = NavTree;