import { useState } from 'react';
import party from 'party-js';
import 'nes.css/css/nes.min.css';
import './App.css';

function App() {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [hint, setHint] = useState('');
  const [isEggActivated, setIsEggActivated] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [showSurprise, setShowSurprise] = useState(false);

  // Constants
  const SECRET_PASSWORD = 'nigga';
  const EGG_CODE = 'iddqd';
  const MAX_ATTEMPTS = 5;
  const YOUTUBE_VIDEO_ID = 'mIX39c8Byb8'; // From your YouTube link

  // Error messages that escalate
  const ERROR_MESSAGES = [
    "🐱 CATS demand the correct code!",
    "🎮 Pro tip: It's their birthday!",
    "💣 1 attempt left... then KABOOM!",
    "💥 SYSTEM OVERRIDE: Just enter 'birthday'!"
  ];

  // Play sound helper
  const playSound = (sound) => {
    try {
      new Audio(sound).play().catch(e => console.log("Sound playback prevented:", e));
    } catch (e) {
      console.log("Sound error:", e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Easter egg check
    if (password.toLowerCase() === EGG_CODE) {
      setIsEggActivated(true);
      party.confetti(document.body, { count: 500 });
      playSound('/assets/sounds/godmode.mp3');
      setHint('GOD MODE ACTIVATED! Press START');
      return;
    }

    // Normal password check
    if (password === SECRET_PASSWORD) {
      setIsLoggedIn(true);
      playSound('/assets/sounds/success.mp3');
      party.confetti(document.body, { count: 100 });
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setHint(ERROR_MESSAGES[Math.min(newAttempts - 1, ERROR_MESSAGES.length - 1)]);
      setPassword('');
      
      // Play escalating error sounds
      playSound(`/assets/sounds/error-${Math.min(newAttempts, 3)}.mp3`);
      
      // Visual punishment
      if (newAttempts >= MAX_ATTEMPTS - 1) {
        document.body.classList.add('shake');
        setTimeout(() => document.body.classList.remove('shake'), 500);
      }
    }
  };

  // Easter egg mode UI
  if (isEggActivated) {
    return (
      <div className="egg-mode">
        <h1>🔥 INVINCIBILITY UNLOCKED 🔥</h1>
        <button 
          className="nes-btn is-error" 
          onClick={() => setIsLoggedIn(true)}
        >
          START GAME
        </button>
        <div className="pixel-fire"></div>
      </div>
    );
  }

  // Login screen
  if (!isLoggedIn) {
    return (
      <div className="login-screen nes-container is-rounded">
        <h1 className="title">🎮 BIRTHDAY QUEST 🎮</h1>
        <p>Enter your name and crack the code!</p>
        
        <form onSubmit={handleSubmit}>
          <div className="nes-field">
            <input
              type="text"
              className="nes-input"
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          
          <div className="nes-field">
            <input
              type="password"
              className="nes-input"
              placeholder="Secret password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoFocus
            />
          </div>

          <button type="submit" className="nes-btn is-primary">
            {attempts > 0 ? 'TRY AGAIN' : 'START'}
          </button>
        </form>

        {hint && (
          <div className={`hint-box ${attempts >= MAX_ATTEMPTS - 1 ? 'is-error' : 'is-warning'}`}>
            <p>{hint}</p>
            {attempts >= 2 && (
              <progress 
                className="nes-progress is-error" 
                value={attempts} 
                max={MAX_ATTEMPTS} 
              />
            )}
          </div>
        )}

        {/* Easter egg clue after 3 attempts */}
        {attempts >= 3 && (
          <p className="egg-clue">
            Psst... try typing <code>{EGG_CODE}</code> for a surprise!
          </p>
        )}
      </div>
    );
  }

  // Birthday message page after login
  const blowCandles = () => {
    setCandlesBlown(true);
    playSound('/assets/sounds/blow.mp3');
    party.confetti(document.body, { 
      shapes: ['circle', 'star'], 
      count: 100 
    });
  };

  const revealSurprise = () => {
    setShowSurprise(true);
    playSound('/assets/sounds/surprise.mp3');
    party.sparkles(document.body, { count: 200 });
  };

  return (
    <div className="birthday-message">
      {!showSurprise ? (
        <div className="nes-container is-rounded is-centered">
          <h2>Happy Birthday, My Nigga! 🎉</h2>
          <div className="message-content">
            <p className="nes-balloon from-left">
              HAPPY BIRTHDAY,! 🎉
From classmates to coworkers to finally talking like normal humans—look at us adulting 😎
You’re honestly like the gender-swapped version of me... which is probably why you're awesome (and slightly dangerous 😂).
May your day be filled with memes, cake, and zero work emails.
Remember: age is just a number… in your case, a really big one now. Jk, you're still young enough to make questionable decisions and blame it on "figuring life out." 😁
Have a fantastic one, and don't forget to save me some cake. Or at least send me a pic of it. 🍾
            </p>
            
            <div className="cake-container">
              <div className={`cake ${candlesBlown ? 'candles-out' : ''}`}>
                <div className="frosting"></div>
                <div className="candles">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="candle">
                      {!candlesBlown && <div className="flame"></div>}
                    </div>
                  ))}
                </div>
              </div>
              {!candlesBlown ? (
                <button 
                  className="nes-btn is-primary blow-button"
                  onClick={blowCandles}
                >
                  Blow Out Candles!
                </button>
              ) : (
                <div className="wish-container">
                  <div className="nes-balloon from-left">
                    <p>Make a wish! 🎂✨</p>
                  </div>
                  <button
                    className="nes-btn is-success surprise-button"
                    onClick={revealSurprise}
                  >
                    🎁 Someone wanna wish you too!
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="surprise-container nes-container is-rounded">
          <h3>🎉 THAT SOMEONE IS ME NIGGA! 🎉</h3>
          <div className="video-wrapper">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
              title="Birthday Surprise Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <button
            className="nes-btn is-warning"
            onClick={() => {
              party.confetti(document.body);
              setShowSurprise(false);
            }}
          >
            Back to Celebration
          </button>
        </div>
      )}
    </div>
  );
}

export default App;