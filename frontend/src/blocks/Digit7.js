import React, { useState, useCallback } from 'react';
import cn from 'classnames';
import { List } from 'immutable';

import { Connector, SIGNAL } from './index.js';

function getX(part) {
  const step = 100;
  if (part === 4 || part === 5) {
    return step;
  }
  return 0;
}

function getY(part) {
  const step = 100;
  if (part === 0 || part === 2 || part === 4) {
    return step;
  } else if (part === 3) {
    return step * 2;
  }
  return 0;
}

function getRotate(part) {
  if (part === 1 || part === 2 || part === 4 || part === 5) {
    return 90;
  }
  return 0;
}

export default React.memo(rest => {
  const [pins, setPins] = useState(List(Array(3 * 7).fill(SIGNAL.X)));

  const calcDigit = useCallback((index) => {
    let digit0 = pins.get(index * 4 + 0) === SIGNAL.H;
    let digit1 = pins.get(index * 4 + 1) === SIGNAL.H;
    let digit2 = pins.get(index * 4 + 2) === SIGNAL.H;
    let digit3 = pins.get(index * 4 + 3) === SIGNAL.H;
    let digit = digit3 * 8 + digit2 * 4 + digit1 * 2 + digit0;
    return digit.toString(16).toUpperCase();
  }, [pins]);

  return <div className="block digit7" {...rest}>
    <div className="pins">
      {
        pins.map((s, idx) => <div key={idx} style={{
          gridRow: idx % 7 + 1,
          gridColumn: Math.floor(idx / 7) + 1,
        }}>
          {(6 - (idx % 7) + 10).toString(17).toUpperCase()}
          <Connector onChange={v => {
            setPins(pins.set(idx, v))
          }}></Connector>
        </div>)
      }
    </div>
    <div className="digits">
      {
        [...Array(3).keys()].map((idx) => <div key={idx}>
          <svg width="20px" height="30px" viewBox="0 0 200 300">
            {[...Array(7).keys()].map((part) =>
              <g transform={`translate(${getX(part)}, ${getY(part)}) rotate(${getRotate(part)}, 50, 20)`}
                fill={pins.get(idx*7+part) === SIGNAL.H ? 'dark' : 'grey'}>
                <path d="M 50,10 40,20 50,30 150,30 160,20 150,10 Z"></path>
              </g>
            )}
          </svg>
        </div>)
      }
    </div>
  </div>
});
