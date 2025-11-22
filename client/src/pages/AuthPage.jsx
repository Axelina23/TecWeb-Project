import { useState } from 'react';
import './Auth.css';

function AuthPage() {
    // Se true, mostra il pannello di destra (Registrazione)
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);

    return (
        <div className="auth-body">
            <div className={`container ${isRightPanelActive ? "right-panel-active" : ""}`} id="container">
                
                {/* --- FORM REGISTRAZIONE (Sign Up) --- */}
                <div className="form-container sign-up-container">
                    <form>
                        <h1>Create Account</h1>
                        <span>usa la tua email per registrarti</span>
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>

                {/* --- FORM LOGIN (Sign In) --- */}
                <div className="form-container sign-in-container">
                    <form>
                        <h1>Sign in</h1>
                        <span>usa il tuo account esistente</span>
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <a href="#" style={{color: 'white', fontSize: '12px', margin: '10px 0'}}>Password dimenticata?</a>
                        <button>Sign In</button>
                    </form>
                </div>

                {/* --- PANNELLO VIOLA SCORREVOLE --- */}
                <div className="overlay-container">
                    <div className="overlay">
                        
                        {/* Pannello Sinistro (Visibile dopo lo switch) */}
                        <div className="overlay-panel overlay-left">
                            <h1>Bentornato!</h1>
                            <p>Per rimanere connesso con noi effettua il login con i tuoi dati</p>
                            <button className="ghost" onClick={() => setIsRightPanelActive(false)}>
                                Sign In
                            </button>
                        </div>

                        {/* Pannello Destro (Visibile all'inizio) */}
                        <div className="overlay-panel overlay-right">
                            <h1>Benvenuto!</h1>
                            <p>Inserisci i tuoi dettagli personali e inizia il viaggio con noi</p>
                            <button className="ghost" onClick={() => setIsRightPanelActive(true)}>
                                Sign Up
                            </button>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default AuthPage;