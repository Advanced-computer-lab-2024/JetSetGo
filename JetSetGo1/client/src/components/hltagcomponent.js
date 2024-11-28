import '../pages/ToursimGovernor.css';

const HLTagElement = ({ tag }) => {

    return (

        <div className="container" style={{ marginTop: '50px' }}>
            
            <div className="card-sl">
            <div className="row">

                <div className="card-row">
                    <div className="card-heading">Type:</div>
                    <div className="card-text">{tag.type}</div>
                </div>
                <div className="card-row">
                    <div className="card-heading">Historical Period:</div>
                    <div className="card-text">{tag.historicalPeriod}</div>
                </div>
                </div>
            </div>
        </div>



    );
};

export default HLTagElement;
