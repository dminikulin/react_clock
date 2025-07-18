import React from 'react';
import './App.scss';

interface AppState {
  hasClock: boolean;
  clockName: string;
  prevName: string;
  now: Date;
}

export class App extends React.Component<{}, AppState> {
  state: AppState = {
    hasClock: true,
    clockName: 'Clock-0',
    prevName: 'Clock-0',
    now: new Date(),
  };

  clockTimer: number = 0;

  nameTimer: number = 0;

  getRandomName(): string {
    const value = Date.now().toString().slice(-4);

    return `Clock-${value}`;
  }

  hideClock = (e: MouseEvent) => {
    e.preventDefault();
    if (this.state.hasClock) {
      this.setState({ hasClock: false });
    }
  };

  showClock = () => {
    if (!this.state.hasClock) {
      this.setState({ hasClock: true });
    }
  };

  componentDidMount() {
    this.nameTimer = window.setInterval(() => {
      const newName = this.getRandomName();

      this.setState(state => ({
        prevName: state.clockName,
        clockName: newName,
      }));
    }, 3300);

    this.clockTimer = window.setInterval(() => {
      // eslint-disable-next-line no-console
      console.log(this.state.now.toUTCString().slice(-12, -4));
      this.setState({ now: new Date() });
    }, 1000);

    document.addEventListener('contextmenu', this.hideClock);
    document.addEventListener('click', this.showClock);
  }

  componentDidUpdate(_: {}, prevState: AppState) {
    if (prevState.clockName !== this.state.clockName) {
      // eslint-disable-next-line no-console
      console.warn(
        `Renamed from ${this.state.prevName} to ${this.state.clockName}`,
      );
    }
  }

  componentWillUnmount() {
    if (this.nameTimer) {
      window.clearInterval(this.nameTimer);
    }

    if (this.clockTimer) {
      window.clearInterval(this.clockTimer);
    }

    document.removeEventListener('contextmenu', this.hideClock);
    document.removeEventListener('click', this.showClock);
  }

  render() {
    const { hasClock, clockName, now } = this.state;

    return (
      <div className="App">
        <h1>React clock</h1>

        {hasClock && (
          <div className="Clock">
            <strong className="Clock__name">{clockName}</strong>
            {' time is '}
            <span className="Clock__time">
              {now.toUTCString().slice(-12, -4)}
            </span>
          </div>
        )}
      </div>
    );
  }
}
