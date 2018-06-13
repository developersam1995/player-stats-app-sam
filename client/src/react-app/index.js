const React = require('react');
const ReactDOM = require('react-dom');
const NavTree = require('./NavTree.js');
const Stats = require('./Stats.js');

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
             <NavTree navPosition={this.state.navPosition} 
                      updateHandler={this.updateHandler} />
             <Stats navPosition={this.state.navPosition} />
          </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('react-root'));