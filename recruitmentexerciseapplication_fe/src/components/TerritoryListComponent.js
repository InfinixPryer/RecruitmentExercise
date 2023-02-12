import TerritoryComponent from './TerritoryComponent';

const TerritoryListComponent = ({ territories }) => {
    return (
        <div key="1" className="contents">
            <h1>Territories</h1>
            <p>Here are the list of territories.</p>
            <ul id="myUl">
                {territories.map((territory) => {
                    return (
                        <TerritoryComponent key={territory.id} territory={territory} />
                    );
                })
                }
            </ul>
        </div>
    )
}

export default TerritoryListComponent;