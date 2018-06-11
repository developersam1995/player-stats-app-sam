const React = require('react');
const ReactDOM = require('react-dom');

class Li extends React.Component {
  constructor(props) {
    super(props);
    this.value = props.value;
    this.pKey = props.pKey;
    this.updateHandler = props.updateHandler;
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate() {
    this.updateHandler(this.pKey);
  }
  render() {
    if (typeof this.value == 'string') return <li onClick={this.handleUpdate}>{this.value}</li>;
    return <li>{this.value}</li>;
  }
}

function Ul (props) {
  let uls = props.values.map((value) => {
    let currKey = props.keyRoot.join('_');
    if (currKey) currKey = currKey + '_' + value;
    else currKey = value;
    return <Li key={currKey} pKey={currKey} value={value} updateHandler={props.updateHandler}/>;
  });
  return (
    <ul className={props.class}>{uls}</ul>
  );
}

function NavTree(props) {
    const { year, team, player } = props.navPosition;
    const currState = [year, team, player];
    const navigableClasses = ['years', 'teams', 'players'];
    let navigableValues = [];

    navigableValues.push(Object.keys(props.navigableGlobal));
    if (year) navigableValues.push(Object.keys(props.navigableGlobal[year]));
    if (team) navigableValues.push(props.navigableGlobal[year][team]);

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
        updateHandler={props.updateHandler}
      />;
    }
    return tree;
}

module.exports = NavTree;