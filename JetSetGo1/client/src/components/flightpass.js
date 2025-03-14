import React from "react";

const FlightPass = ({ flightNumber, departure, arrival, date, time, passengerName }) => {
    const styles = {
        body: {
            height: '100vh',
            margin: 0,
            background: 'radial-gradient(ellipse farthest-corner at center top, #ECECEC, #999)',
            color: '#363c44',
            fontSize: '14px',
            fontFamily: "'Roboto', sans-serif",
        },
        boardingPass: {
            position: 'relative',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '350px',
            height: '382px',
            background: '#fff',
            borderRadius: '12px',
            boxShadow: '0 5px 30px rgba(0, 0, 0, 0.2)',
            overflow: 'hidden',
            textTransform: 'uppercase',
        },
        small: {
            display: 'block',
            fontSize: '11px',
            color: '#A2A9B3',
            marginBottom: '2px',
        },
        strong: {
            fontSize: '15px',
            display: 'block',
        },
        header: {
            background: 'linear-gradient(to bottom, #36475f, #2c394f)',
            padding: '12px 20px',
            height: '53px',
        },
        logo: {
            float: 'left',
            width: '104px',
            height: '31px',
        },
        flight: {
            float: 'right',
            color: '#fff',
            textAlign: 'right',
        },
        flightSmall: {
            fontSize: '8px',
            marginBottom: '2px',
            opacity: 0.8,
        },
        flightStrong: {
            fontSize: '18px',
        },
        cities: {
            position: 'relative',
        },
        city: {
            padding: '20px 18px',
            float: 'left',
        },
        cityNthChild2: {
            float: 'right',
        },
        cityStrong: {
            fontSize: '40px',
            fontWeight: 300,
            lineHeight: 1,
        },
        citySmall: {
            marginBottom: 0,
            marginLeft: '3px',
        },
        airplane: {
            position: 'absolute',
            width: '30px',
            height: '25px',
            top: '57%',
            left: '30%',
            opacity: 0,
            transform: 'translate(-50%, -50%)',
            animation: 'move 3s infinite',
        },
        '@keyframes move': {
            '40%': {
                left: '50%',
                opacity: 1,
            },
            '100%': {
                left: '70%',
                opacity: 0,
            },
        },
        infos: {
            display: 'flex',
            borderTop: '1px solid #99D298',
        },
        places: {
            width: '50%',
            padding: '10px 0',
            background: '#ECECEC',
            borderRight: '1px solid #99D298',
        },
        times: {
            width: '50%',
            padding: '10px 0',
        },
        timesStrong: {
            transform: 'scale(0.9)',
            transformOrigin: 'left bottom',
        },
        placesSmall: {
            color: '#97A1AD',
        },
        placesStrong: {
            color: '#239422',
        },
        box: {
            padding: '10px 20px 10px',
            width: '47%',
            float: 'left',
        },
        boxSmall: {
            fontSize: '10px',
        },
        strap: {
            clear: 'both',
            position: 'relative',
            borderTop: '1px solid #99D298',
        },
        strapBox: {
            padding: '23px 0 20px 20px',
        },
        strapBoxDiv: {
            marginBottom: '15px',
        },
        strapBoxSmall: {
            fontSize: '10px',
        },
        strapBoxStrong: {
            fontSize: '13px',
        },
        strapSup: {
            fontSize: '8px',
            position: 'relative',
            top: '-5px',
        },
        qrcode: {
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '80px',
            height: '80px',
        },
    };


    return (
        <div>
            <div class="boarding-pass">
                <header>
                    <svg class="logo">
                        {/* <use xlink:href="#alitalia"></use> */}
                    </svg>
                    <div class="flight">
                        <small>flight</small>
                        <strong>AL 101</strong>
                    </div>
                </header>
                <section class="cities">
                    <div class="city">
                        <small>Roma</small>

                        <strong>FCO</strong>
                    </div>
                    <div class="city">
                        <small>Napoli</small>

                        <strong>NAP</strong>
                    </div>
                    <svg class="airplane">
                        {/* <use xlink:href="#airplane"></use> */}
                    </svg>
                </section>
                <section class="infos">
                    <div class="places">
                        <div class="box">
                            <small>Terminal</small>
                            <strong><em>W</em></strong>
                        </div>
                        <div class="box">
                            <small>Gate</small>
                            <strong><em>C3</em></strong>
                        </div>
                        <div class="box">
                            <small>Seat</small>
                            <strong>14B</strong>
                        </div>
                        <div class="box">
                            <small>Class</small>
                            <strong>E</strong>
                        </div>
                    </div>
                    <div class="times">
                        <div class="box">
                            <small>Boarding</small>
                            <strong>11:05</strong>
                        </div>
                        <div class="box">
                            <small>Departure</small>
                            <strong>11:35</strong>
                        </div>
                        <div class="box">
                            <small>Duration</small>
                            <strong>2:15</strong>
                        </div>
                        <div class="box">
                            <small>Arrival</small>
                            <strong>13:50</strong>
                        </div>
                    </div>
                </section>
                <section class="strap">
                    <div class="box">
                        <div class="passenger">
                            <small>passenger</small>
                            <strong>UX DEPOT DOT COM</strong>
                        </div>
                        <div class="date">
                            <small>Date</small>
                            <strong>Mon, 1 Jan 2015</strong>
                        </div>
                    </div>
                    <svg class="qrcode">
                        {/* <use xlink:href="#qrcode"></use> */}
                    </svg>
                </section>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" display="none">
                <symbol id="alitalia" viewBox="0 0 80 17">
                    <g>
                        <path fill="#FFFFFF" d="M10.297,2.333L0.5,16.135h4.434l9.107-12.7v12.717l3.867,0.009V1.5h-5.654
                              C10.83,1.5,10.297,2.333,10.297,2.333z M12.769,16.146v-8.62l-6.153,8.62H12.769z M20.367,16.186h3.745V2.102h-3.745V16.186z
                              M26.555,16.186h3.746V5.571h-3.746V16.186z M26.555,4.67h3.746V2.102h-3.746V4.67z M55.084,16.119h3.747V2.033h-3.747V16.119z
                              M61.271,16.119h3.75V5.505h-3.75V16.119z M61.271,4.604h3.75v-2.57h-3.75V4.604z M36.593,12.35V8.276h3.745V5.47h-3.885V3.336
                              h-3.539v10.163c0,2.839,3.041,2.653,3.041,2.653h4.502v-2.836h-2.715C36.558,13.316,36.593,12.35,36.593,12.35z M50.445,5.439
                              c0,0-2.854-0.719-5.774,0.016c0,0-3.078,0.469-2.889,3.323h3.766c0,0-0.019-1.484,1.857-1.469c0,0,1.646-0.117,1.786,0.968
                              c0,0,0.24,0.617-0.791,0.952l-4.968,0.901c0,0-2.253,0.401-2.253,2.905c0,0-0.067,1.65,1.066,2.533c0,0,1.271,0.904,3.748,0.904
                              c0,0,4.586,0.149,7.062-0.219V8.543C53.056,8.543,53.298,5.957,50.445,5.439z M49.225,14.134c0,0-2.286,0.216-3.317-0.114
                              c0,0-0.791-0.237-0.791-1.202c0,0,0-0.833,0.878-1.087l3.23-0.652V14.134z M75.891,5.439c0,0-2.853-0.719-5.774,0.016
                              c0,0-3.075,0.469-2.887,3.323h3.764c0,0-0.018-1.484,1.854-1.469c0,0,1.651-0.117,1.787,0.968c0,0,0.241,0.617-0.79,0.952
                              L68.88,10.13c0,0-2.254,0.401-2.254,2.905c0,0-0.067,1.65,1.065,2.533c0,0,1.271,0.904,3.747,0.904c0,0,4.589,0.149,7.063-0.219
                              V8.543C78.501,8.543,78.741,5.957,75.891,5.439z M74.672,14.134c0,0-2.288,0.216-3.318-0.114c0,0-0.787-0.237-0.787-1.202
                              c0,0,0-0.833,0.872-1.087l3.233-0.652V14.134z"/>
                    </g>
                </symbol>
                <symbol id="airplane" viewBox="243.5 245.183 25 21.633">
                    <g>
                        <path fill="#336699" d="M251.966,266.816h1.242l6.11-8.784l5.711,0.2c2.995-0.102,3.472-2.027,3.472-2.308
                              c0-0.281-0.63-2.184-3.472-2.157l-5.711,0.2l-6.11-8.785h-1.242l1.67,8.983l-6.535,0.229l-2.281-3.28h-0.561v3.566
                              c-0.437,0.257-0.738,0.724-0.757,1.266c-0.02,0.583,0.288,1.101,0.757,1.376v3.563h0.561l2.281-3.279l6.535,0.229L251.966,266.816z
                              "/>
                    </g>
                </symbol>
                <symbol id="qrcode" viewBox="0 0 130 130">
                    <g>
                        <path fill="#334158" d="M123,3h-5h-5h-5h-5h-5h-5v5v5v5v5v5v5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5V8V3H123z M123,13v5v5v5v5h-5h-5h-5
		h-5h-5v-5v-5v-5v-5V8h5h5h5h5h5V13z"/>
                        <polygon fill="#334158" points="88,13 88,8 88,3 83,3 78,3 78,8 78,13 83,13 	" />
                        <polygon fill="#334158" points="63,13 68,13 73,13 73,8 73,3 68,3 68,8 63,8 58,8 58,13 53,13 53,8 53,3 48,3 48,8 43,8 43,13 
		48,13 48,18 43,18 43,23 48,23 53,23 53,18 58,18 58,23 63,23 63,18 	"/>
                        <polygon fill="#334158" points="108,13 103,13 103,18 103,23 103,28 108,28 113,28 118,28 118,23 118,18 118,13 113,13 	" />
                        <polygon fill="#334158" points="78,18 73,18 73,23 78,23 83,23 83,18 	" />
                        <polygon fill="#334158" points="23,28 28,28 28,23 28,18 28,13 23,13 18,13 13,13 13,18 13,23 13,28 18,28 	" />
                        <polygon fill="#334158" points="53,28 53,33 53,38 58,38 58,33 58,28 58,23 53,23 	" />
                        <rect x="63" y="23" fill="#334158" width="5" height="5" />
                        <rect x="68" y="28" fill="#334158" width="5" height="5" />
                        <path fill="#334158" d="M13,38h5h5h5h5h5v-5v-5v-5v-5v-5V8V3h-5h-5h-5h-5h-5H8H3v5v5v5v5v5v5v5h5H13z M8,28v-5v-5v-5V8h5h5h5h5h5v5
		v5v5v5v5h-5h-5h-5h-5H8V28z"/>
                        <polygon fill="#334158" points="48,33 48,28 43,28 43,33 43,38 48,38 	" />
                        <polygon fill="#334158" points="83,38 88,38 88,33 88,28 88,23 83,23 83,28 78,28 78,33 83,33 	" />
                        <polygon fill="#334158" points="23,43 18,43 13,43 8,43 3,43 3,48 8,48 13,48 18,48 23,48 28,48 28,43 	" />
                        <rect x="108" y="43" fill="#334158" width="5" height="5" />
                        <rect x="28" y="48" fill="#334158" width="5" height="5" />
                        <polygon fill="#334158" points="88,53 93,53 93,48 93,43 88,43 88,48 83,48 83,53 	" />
                        <polygon fill="#334158" points="123,48 123,43 118,43 118,48 118,53 118,58 123,58 123,63 118,63 113,63 113,68 118,68 118,73 
		118,78 123,78 123,83 128,83 128,78 128,73 123,73 123,68 128,68 128,63 128,58 128,53 123,53 	"/>
                        <polygon fill="#334158" points="98,58 98,63 103,63 103,68 108,68 108,63 108,58 103,58 103,53 103,48 103,43 98,43 98,48 98,53 
		93,53 93,58 	"/>
                        <rect x="108" y="53" fill="#334158" width="5" height="5" />
                        <rect x="78" y="63" fill="#334158" width="5" height="5" />
                        <rect x="93" y="63" fill="#334158" width="5" height="5" />
                        <rect x="53" y="68" fill="#334158" width="5" height="5" />
                        <polygon fill="#334158" points="108,73 108,78 108,83 113,83 113,78 113,73 113,68 108,68 	" />
                        <rect x="13" y="73" fill="#334158" width="5" height="5" />
                        <rect x="98" y="73" fill="#334158" width="5" height="5" />
                        <polygon fill="#334158" points="18,83 18,88 23,88 28,88 28,83 23,83 23,78 18,78 	" />
                        <polygon fill="#334158" points="8,83 8,78 8,73 8,68 13,68 13,63 13,58 13,53 8,53 3,53 3,58 3,63 3,68 3,73 3,78 3,83 3,88 8,88 	
		"/>
                        <rect x="53" y="83" fill="#334158" width="5" height="5" />
                        <rect x="73" y="83" fill="#334158" width="5" height="5" />
                        <path fill="#334158" d="M108,88v-5h-5h-5h-5h-5v-5h5v-5h-5v-5h-5v5h-5h-5v-5h-5h-5v5h5v5h-5v5v5h5v-5h5v-5h5h5v5v5h-5v5h5v5h-5h-5
		v5h5v5h5v5v5h-5v5h5h5h5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5v-5v-5h-5h-5v-5v-5h-5v5H108z M98,118h-5v-5h5V118z M98,103h-5h-5v-5v-5v-5
		h5h5h5v5v5v5H98z M123,118v5h-5h-5v-5h-5h-5v-5h5v-5h5v5v5h5v-5h5V118z M118,98h5v5h-5h-5v-5H118z"/>
                        <path fill="#334158" d="M28,93h-5h-5h-5H8H3v5v5v5v5v5v5v5h5h5h5h5h5h5h5v-5v-5v-5v-5v-5v-5v-5h-5H28z M33,103v5v5v5v5h-5h-5h-5h-5
		H8v-5v-5v-5v-5v-5h5h5h5h5h5V103z"/>
                        <rect x="93" y="93" fill="#334158" width="5" height="5" />
                        <polygon fill="#334158" points="63,98 68,98 68,93 63,93 58,93 53,93 53,88 48,88 48,83 43,83 43,78 48,78 48,73 43,73 43,68 
		48,68 53,68 53,63 58,63 58,68 63,68 63,63 63,58 68,58 73,58 73,63 78,63 78,58 83,58 83,53 78,53 78,48 83,48 83,43 83,38 78,38 
		78,33 73,33 73,38 73,43 68,43 68,38 68,33 63,33 63,38 63,43 63,48 68,48 73,48 73,53 68,53 63,53 58,53 58,58 53,58 53,53 53,48 
		58,48 58,43 53,43 48,43 43,43 38,43 33,43 33,48 38,48 38,53 33,53 33,58 38,58 43,58 43,63 38,63 33,63 33,68 38,68 38,73 33,73 
		28,73 28,68 28,63 33,63 33,58 28,58 23,58 18,58 18,63 23,63 23,68 18,68 18,73 23,73 23,78 28,78 33,78 38,78 38,83 33,83 33,88 
		38,88 43,88 43,93 43,98 48,98 48,103 53,103 53,98 58,98 58,103 58,108 63,108 63,103 	"/>
                        <polygon fill="#334158" points="18,103 13,103 13,108 13,113 13,118 18,118 23,118 28,118 28,113 28,108 28,103 23,103 	" />
                        <polygon fill="#334158" points="48,108 48,103 43,103 43,108 43,113 43,118 43,123 43,128 48,128 53,128 53,123 48,123 48,118 
		48,113 53,113 58,113 58,108 53,108 	"/>
                        <polygon fill="#334158" points="78,118 78,113 78,108 73,108 68,108 63,108 63,113 68,113 68,118 63,118 63,123 63,128 68,128 
		68,123 73,123 73,118 	"/>
                        <rect x="73" y="123" fill="#334158" width="5" height="5" />
                    </g>
                </symbol>
            </svg>
        </div>
    );
};

export default FlightPass;
