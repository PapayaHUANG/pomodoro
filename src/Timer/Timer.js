import { useState, useEffect } from 'react';
import { useInterval } from '../useInterval';
import './Timer.css';
const beepSound =
  'https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav';

const Timer = ({ sessionValue, breakValue, value, resetValue }) => {
  const [isBreakOn, setIsBreakOn] = useState(false);
  const [minute, setMinute] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [second, setSecond] = useState(0);
  const [rightCircleDeg, setRightCircleDeg] = useState(-135);
  const [leftCircleDeg, setleftCircleDeg] = useState(-135);
  const beep = new Audio(beepSound);

  useEffect(() => {
    setMinute(!isBreakOn ? sessionValue : breakValue);
  }, [sessionValue, breakValue]);

  useEffect(() => {
    if (isBreakOn && isRunning && minute === 0) {
      beep.play();
    }
  });

  useInterval(
    () => {
      if (second === 0) {
        if (minute !== 0) {
          setSecond(59);
          setMinute(minute - 1);
        } else {
          setIsBreakOn(!isBreakOn);
          setMinute(isBreakOn ? sessionValue : breakValue);
        }
      } else {
        setSecond(second - 1);
      }
    },
    isRunning ? 1000 : null
  );

  let progressSpeed = 360 / (sessionValue * 60);
  // console.log(progressSpeed);
  useInterval(
    () => {
      if (!isBreakOn) {
        if (minute * 60 + second > (sessionValue * 60) / 2) {
          setRightCircleDeg(rightCircleDeg + progressSpeed);
          setleftCircleDeg(-135);
          if (minute * 60 + second === sessionValue) {
            setRightCircleDeg(-135);
            setleftCircleDeg(-135);
          }
          if (minute * 60 + second === breakValue) {
            setRightCircleDeg(45);
            setleftCircleDeg(45);
          }
        }
        if (minute * 60 + second <= (sessionValue * 60) / 2) {
          setleftCircleDeg(leftCircleDeg + progressSpeed);
          setRightCircleDeg(45);
          if (minute * 60 + second === 0) {
            setRightCircleDeg(-135);
            setleftCircleDeg(-135);
          }
        }
      } else {
        setRightCircleDeg(-135);
        setleftCircleDeg(-135);
      }
    },
    isRunning ? 1000 : null
  );

  const reset = () => {
    setIsRunning(false);
    setIsBreakOn(false);
    setMinute(value.sessionValue);
    setSecond(0);
    resetValue();
    setleftCircleDeg(-135);
    setRightCircleDeg(-135);
  };

  return (
    <div className="clock-container">
      <div className="progress-circle">
        <div className="right">
          <div
            className="rightcircle"
            style={{ transform: `rotate(${rightCircleDeg}deg)` }}
          ></div>
        </div>
        <div className="left">
          <div
            className="leftcircle"
            style={{ transform: `rotate(${leftCircleDeg}deg)` }}
          ></div>
        </div>
      </div>
      <div className="text">
        {!isBreakOn ? 'Keep working!' : 'Take a break!'}
      </div>
      <div className="time">
        {minute < 10 ? `0${minute}` : minute}:
        {second < 10 ? `0${second}` : second}
      </div>
      <button className="btn start" onClick={() => setIsRunning(true)}>
        <i className="fas fa-play"></i>
      </button>
      <button className="btn pause" onClick={() => setIsRunning(false)}>
        <i className="fas fa-pause"></i>
      </button>
      <button className="btn reset" onClick={() => reset()}>
        <i className="fas fa-undo"></i>
      </button>
    </div>
  );
};

export default Timer;
