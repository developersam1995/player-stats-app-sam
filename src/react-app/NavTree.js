const React = require('react');
const ReactDOM = require('react-dom');

class Li extends React.Component {
  constructor(props) {
    super(props);
    this.value = props.value;
    this.pKey = props.pKey;
    this.updateHandler=props.updateHandler;
    this.handleUpdate=this.handleUpdate.bind(this);
  }
  handleUpdate() {
    this.updateHandler(this.pKey);
  }
  render() {
    if(typeof this.value=='string')  return <li onClick={this.handleUpdate}>{this.value}</li>;
    return <li>{this.value}</li>;
  }
}

class Ul extends React.Component {
  constructor(props) {
    super(props);
    this.class = props.class;
    this.values = props.values;
    this.keyRoot = props.keyRoot;
    this.updateHandler=props.updateHandler;
  }
  render() {
    let uls = this.values.map((value) => {
      let currKey = this.keyRoot.join('_');
      if (currKey) currKey = currKey + '_' + value;
      else currKey = value;
      return <Li key={currKey} pKey={currKey} value={value} updateHandler={this.updateHandler}/>;
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
    this.updateHandler = props.updateHandler;
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
        updateHandler={this.updateHandler}
      />;
    }
    return tree;
  }
}

module.exports = NavTree;