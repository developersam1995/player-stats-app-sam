const React = require('react');

class Li extends React.Component {
  constructor(props){
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate() {
    let statusArr = this.props.pKey.split('_');
    let updatedNavPosition = { year: null, team: null, player: null }
    updatedNavPosition.year = Number(statusArr[0]);
    if (statusArr[1]) updatedNavPosition.team = statusArr[1];
    if (statusArr[2]) updatedNavPosition.player = statusArr[2];
    this.props.updateHandler(updatedNavPosition);
  }
  render() {
    if (typeof this.props.value == 'string') return <li onClick={this.handleUpdate}>{this.props.value}</li>;
    return <li>{this.props.value}</li>;
  }
}

class Ul extends React.Component {
  render() {
    let uls = this.props.values.map((value) => {
      let currKey = this.props.keyRoot.join('_');
      if (currKey) currKey = currKey + '_' + value;
      else currKey = value;
      return <Li key={currKey} pKey={currKey} value={value} updateHandler={this.props.updateHandler} />;
    });
    return (
      <ul>{uls}</ul>
    );
  }
}

class NavTree extends React.Component {
  constructor(props) {
    super(props);
    this.navigableGlobal = {
      2008: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
      2009: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] },
      2010: { KKR: ['B Mculum', 'S Ganguly'], RCB: ['R Dravid', 'W Jaffer'] }
  };
  }
  render() {
    const { year, team, player } = this.props.navPosition;
    const currState = [year, team, player];
    // const navigableClasses = ['years', 'teams', 'players'];
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
        // class={navigableClasses[depth]}
        values={navigableValue}
        keyRoot={currState.filter((ele, idx) => idx < depth)}
        updateHandler={this.props.updateHandler}
      />;
    }
    return tree;
  }
}

module.exports = NavTree; 