import { useState } from 'react';
import Timer from '../Timer/Timer';
import './Main.css';

const Menu = (props) => {
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [breakValue, setBreakValue] = useState(props.value.breakValue);
  const [sessionValue, setSessionValue] = useState(props.value.sessionValue);

  const resetValue = () => {
    setSessionValue(25);
    setBreakValue(5);
  };
  const breakValuePlusHander = () => {
    setBreakValue(breakValue + 1);
    if (breakValue >= 5) {
      setBreakValue(5);
    }
  };

  const breakValueMinusHander = () => {
    setBreakValue(breakValue - 1);
    if (breakValue <= 1) {
      setBreakValue(1);
    }
  };

  const sessionValuePlusHander = () => {
    setSessionValue(sessionValue + 1);
    if (sessionValue >= 25) {
      setSessionValue(25);
    }
  };

  const sessionValueMinusHander = () => {
    setSessionValue(sessionValue - 1);
    if (sessionValue <= 1) {
      setSessionValue(1);
    }
  };
  return (
    <>
      <Timer
        sessionValue={sessionValue}
        breakValue={breakValue}
        value={props.value}
        resetValue={resetValue}
      />

      <div className="setting-menu">
        <button className="btn menu" onClick={() => setIsMenuOn(!isMenuOn)}>
          <i className="fas fa-bars"></i>
        </button>
        {isMenuOn && (
          <div className="control">
            <div className="control-pad">
              <h4>Break Length</h4>
              <button className="btn minus" onClick={breakValueMinusHander}>
                <i className="fas fa-minus"></i>
              </button>
              <h4>{breakValue}</h4>
              <button className="btn plus" onClick={breakValuePlusHander}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
            <div className="control-pad">
              <h4>Session Length</h4>
              <button className="btn minus" onClick={sessionValueMinusHander}>
                <i className="fas fa-minus"></i>
              </button>
              <h4>{sessionValue}</h4>
              <button className="btn plus" onClick={sessionValuePlusHander}>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Menu;
