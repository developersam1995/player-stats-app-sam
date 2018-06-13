const React = require('react');

class Stats extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navPosition: { year: null, team: null, player: null },
            statistics: { economy: 3.5, thisa: 'what' }
        }
    }
    fetchData(navPosition) {
        let stringifiedURL = Object.values(navPosition).join('_').replace(/ /g, '-');
        fetch(`http://localhost:3030/stats/${stringifiedURL}`).then((response) => {
            return response.json();
        }).then(json => {
            this.setState({ 
                navPosition: navPosition,
                statistics: json })
        });
    }
    render() {
        if(!(JSON.stringify(this.state.navPosition)==JSON.stringify(this.props.navPosition)))
        this.fetchData(this.props.navPosition);
        let currPosition = Object.values(this.state.navPosition);
        let tableHeading = currPosition.filter(ele => ele).join(' - ');
        let statistics = this.state.statistics;
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
}

module.exports = Stats;