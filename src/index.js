import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Model
let model = {
    running : false,
    time : 0
}

// View, gets Updated Model as input again
let view = (m) =>   {
    let minutes = Math.floor(m.time / 60);
    let seconds = m.time - (minutes * 60);
    let secondFormatted = `${seconds < 10 ? '0' : ''}${seconds}`;
    let handler = (event) => {
        model = update(model, m.running ? intents.STOP : intents.START);
    }
    return <div><p>{minutes}:{secondFormatted}</p>
    <button onClick={handler}>{m.running ? 'Stop' : 'Start'}</button></div>;
}

const intents = {
    TICK: 'TICK',
    START: 'START',
    STOP: 'STOP',
    RESET: 'RESET'
}

// intent(may be user intent or self intent) , that acts on model.
const update = (model, intent) =>  {
    const updates = {
        'START': (model) => Object.assign(model, {running: true}),
        'STOP': (model) => Object.assign(model, {running: false}),
        'TICK': (model) => Object.assign(model, {time: model.time + (model.running ? 
            1 : 0)})
    };
    return updates[intent](model);
};

const render = () => {
    ReactDOM.render(view(model), document.getElementById('root'));
};
render();


setInterval(() => {
    model = update(model, 'TICK');
    render();
}, 1000)

