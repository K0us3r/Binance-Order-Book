import React, { useState, useEffect } from "react";
import Select from 'react-select'
import Table from "react-bootstrap/Table";
import Alert from 'react-bootstrap/Alert';

const dummy_data = {
    "E": 1689262549693,
    "s": "DUMMY",
    "b": [],
    "a": []
}

const OrderBook = (props) => {
    // for fetching TradePairs
    const [options, setOptions] = useState([]);
    const fetchTradePairs = () => {
        fetch("https://api.binance.com/api/v3/exchangeInfo")
        .then(res => res.json())
        .then(res => {
            let opts = res.symbols.map(item => {return {label: item.symbol, value: item.symbol.toLowerCase()}});
            setOptions(opts);
        })
        .catch(err => setErr("Error connecting to binance API."));
    }
    useEffect(() => {
        fetchTradePairs();
    }, []);

    // connecting to web sockets for order book data
    let pair = "DUMMY";
    const [data, setData] = useState(dummy_data)
    const [ws, setWS] = useState();

    const updatePair = (option) => {
        pair = option.value.toUpperCase();
        setData(dummy_data);
        if (ws) {
            ws.close();
        }
        let ww = new WebSocket(`wss://stream.binance.com:9443/ws/${option.value}@depth`);
        ww.onmessage = function (event) {
            let dt = JSON.parse(event.data);
            if (pair == dt.s && dt.E && Array.isArray(dt.a) && Array.isArray(dt.b)) { // Checking the reponse object
                dt.date = new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(dt.E);
                setData(dt);
            }
        };
        setWS(ww);
    }

    // for alert 
    const [err, setErr] = useState();

    return (
        <div>
            {err ? <Alert variant="danger">{err}</Alert> : <div></div>}
            <div className='main'>
                <div><h3>Trading Pair :</h3></div>
                <div className='dropdown'><Select options={options} onChange={updatePair}/></div>
            </div>
            <div className="order-book-container">
                <div>Last Updated on: {data.date}</div>
                <div className="order-book">
                    <div className="ask-orders">
                        <h4>Asks</h4>
                        <Table striped bordered hover variant="light">
                            <thead>
                            <tr>
                                <th>Price</th>
                                <th>Quantity</th>
                            </tr>
                            </thead>
                            <tbody>
                                {data.a.map((ask, i) => <tr key={"ask-"+i}><td>{ask[0]}</td><td>{ask[1]}</td></tr>)}
                            </tbody>
                        </Table>
                    </div>
                    <div className="bid-orders">
                        <h4>Bids</h4>
                        <Table striped bordered hover variant="light">
                            <thead>
                            <tr>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.b.map((bid, i) => <tr key={"bid-"+i}><td>{bid[0]}</td><td>{bid[1]}</td></tr>)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderBook