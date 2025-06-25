# Template per il componente App completo con funzionalità form
app_template = '''import React from 'react';

const App = () => {
  // Stati per il form della waiting list
  const [email, setEmail] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [error, setError] = React.useState('');
  
  // Stati per le FAQ
  const [expandedFaq, setExpandedFaq] = React.useState(null);
  
  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  // Funzione per gestire il submit del form
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    
    // Validazione email
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Inserisci un indirizzo email valido');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Salva in localStorage per ora
      const existingEmails = JSON.parse(localStorage.getItem('waitingList') || '[]');
      const newEntry = {
        email: email,
        timestamp: new Date().toISOString()
      };
      
      // Evita duplicati
      const emailExists = existingEmails.some(entry => entry.email === email);
      if (!emailExists) {
        existingEmails.push(newEntry);
        localStorage.setItem('waitingList', JSON.stringify(existingEmails));
      }
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset dopo 5 secondi
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      setError('Errore nell\\'invio. Riprova più tardi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqData = [
    {
      question: "Come funziona GigAsk?",
      answer: "GigAsk ti permette di chiedere o offrire aiuto per attività quotidiane. Chi ha bisogno pubblica un task, chi vuole guadagnare si propone. Quando il task è completato, il pagamento avviene in modo sicuro tramite app.",
      emoji: "❓",
    },
    {
      question: "Che tipo di task posso trovare/pubblicare?",
      answer: "Puoi trovare o offrire servizi come: pulizie domestiche, babysitting, dog walking, consegne, montaggio mobili, giardinaggio, aiuto traslochi, e molto altro. Tutti i task sono semplici e non richiedono competenze specialistiche.",
      emoji: "🛠️",
    },
    {
      question: "Come avviene il pagamento?",
      answer: "I pagamenti sono gestiti in modo sicuro tramite Stripe. Il denaro viene trattenuto fino al completamento del task e rilasciato automaticamente quando entrambe le parti confermano la soddisfazione.",
      emoji: "💳",
    },
    {
      question: "Serve la Partita IVA per lavorare su GigAsk?",
      answer: "Per lavori occasionali sotto i 5.000€ annui non serve la Partita IVA. Per attività più frequenti, è consigliabile consultare un commercialista per valutare l\\'apertura di una Partita IVA.",
      emoji: "📋",
    },
    {
      question: "I guadagni sono tassabili?",
      answer: "Sì, tutti i guadagni devono essere dichiarati secondo la normativa italiana. Per importi occasionali si applica la ritenuta d\\'acconto del 20%. Ti consigliamo di consultare un commercialista per la tua situazione specifica.",
      emoji: "��",
    },
  ];

  // Componente Logo SVG
  const Logo = ({ size = 40 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" style={{ display: 'inline-block' }}>
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#ff6b35", stopOpacity:1}} />
          <stop offset="50%" style={{stopColor:"#1e88e5", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#e91e63", stopOpacity:1}} />
        </linearGradient>
      </defs>
      
      {/* Cerchi intrecciati */}
      <circle cx="35" cy="35" r="20" fill="none" stroke="#ff6b35" strokeWidth="4" opacity="0.8"/>
      <circle cx="65" cy="35" r="20" fill="none" stroke="#1e88e5" strokeWidth="4" opacity="0.8"/>
      <circle cx="50" cy="60" r="20" fill="none" stroke="#e91e63" strokeWidth="4" opacity="0.8"/>
      
      {/* Punto centrale */}
      <circle cx="50" cy="45" r="3" fill="url(#grad1)"/>
      
      {/* Linee di connessione */}
      <line x1="40" y1="40" x2="60" y2="50" stroke="url(#grad1)" strokeWidth="2" opacity="0.6"/>
      <line x1="45" y1="55" x2="55" y2="35" stroke="url(#grad1)" strokeWidth="2" opacity="0.6"/>
    </svg>
  );

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: 1.6, margin: 0, padding: 0 }}>
      {/* Navbar */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        zIndex: 1000
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Logo size={35} />
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>GigAsk</span>
          </div>
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
            <a href="#come-funziona" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>Come Funziona</a>
            <a href="#vantaggi" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>Vantaggi</a>
            <a href="#faq" style={{ textDecoration: 'none', color: '#666', fontWeight: '500' }}>FAQ</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #1e88e5 50%, #e91e63 100%)',
        color: 'white',
        padding: '120px 20px 80px',
        textAlign: 'center',
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '30px' }}>
            <Logo size={80} />
          </div>
          <h1 style={{ 
            fontSize: '3.5rem', 
            marginBottom: '20px', 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}>
            Trova o offri un Gig in pochi click
          </h1>
          <p style={{ 
            fontSize: '1.3rem', 
            marginBottom: '30px', 
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto 30px'
          }}>
            La piattaforma che connette chi cerca piccoli lavori con chi ha bisogno di aiuto
          </p>
          
          <form onSubmit={handleEmailSubmit} style={{
            display: 'flex',
            gap: '10px',
            marginTop: '20px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSubmitted}
              style={{
                padding: '12px 15px',
                fontSize: '16px',
                border: '2px solid #ddd',
                borderRadius: '25px',
                minWidth: '250px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted || !email.trim()}
              style={{
                background: isSubmitted ? '#28a745' : 'linear-gradient(135deg, #ff6b35, #1e88e5)',
                color: 'white',
                border: 'none',
                padding: '12px 25px',
                fontSize: '16px',
                borderRadius: '25px',
                cursor: isSubmitting || isSubmitted ? 'default' : 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                opacity: isSubmitting || isSubmitted || !email.trim() ? 0.7 : 1
              }}
            >
              {isSubmitted ? '✓ Registrato!' : isSubmitting ? 'Invio...' : 'Notificami'}
            </button>
          </form>
          
          {error && (
            <div style={{
              color: '#ffebee',
              marginTop: '10px',
              fontSize: '14px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.1)',
              padding: '8px 16px',
              borderRadius: '20px',
              display: 'inline-block'
            }}>
              {error}
            </div>
          )}
        </div>
      </section>

      {/* Come Funziona */}
      <section id="come-funziona" style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>Come Funziona</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            
            <div style={{ 
              background: 'white', 
              padding: '40px 30px', 
              borderRadius: '15px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #ff6b35, #ff8a65)',
                borderRadius: '50%',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                ��
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>1. Pubblica il tuo Gig</h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                Descrivi cosa ti serve: dalle pulizie al dog walking, dal babysitting alle consegne
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '40px 30px', 
              borderRadius: '15px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #1e88e5, #42a5f5)',
                borderRadius: '50%',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                🔍
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>2. Trova il tuo Gigger</h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                Ricevi proposte da persone della tua zona pronte ad aiutarti
              </p>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '40px 30px', 
              borderRadius: '15px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s'
            }}>
              <div style={{
                width: '80px',
                height: '80px',
                background: 'linear-gradient(135deg, #e91e63, #ec407a)',
                borderRadius: '50%',
                margin: '0 auto 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem'
              }}>
                ✅
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>3. Completa e Paga</h3>
              <p style={{ color: '#666', fontSize: '1.1rem' }}>
                Una volta completato il lavoro, paga in sicurezza tramite app
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vantaggi */}
      <section id="vantaggi" style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', color: '#333' }}>
            Perché Scegliere GigAsk
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '60px' }}>
            
            {/* Per chi cerca lavoro */}
            <div>
              <h3 style={{ 
                fontSize: '2rem', 
                marginBottom: '30px', 
                color: '#ff6b35',
                textAlign: 'center'
              }}>
                Per chi cerca Gig
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ff6b35, #ff8a65)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    💰
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#333' }}>Guadagna Extra</h4>
                    <p style={{ margin: 0, color: '#666' }}>Monetizza il tuo tempo libero con piccoli lavori</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ff6b35, #ff8a65)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    ⏰
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#333' }}>Flessibilità Totale</h4>
                    <p style={{ margin: 0, color: '#666' }}>Lavora quando vuoi, dove vuoi</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #ff6b35, #ff8a65)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    🎯
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#333' }}>Lavori Semplici</h4>
                    <p style={{ margin: 0, color: '#666' }}>Nessuna competenza speciale richiesta</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Per chi offre lavoro */}
            <div>
              <h3 style={{ 
                fontSize: '2rem', 
                marginBottom: '30px', 
                color: '#1e88e5',
                textAlign: 'center'
              }}>
                Per chi ha bisogno di aiuto
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #1e88e5, #42a5f5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    ⚡
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#333' }}>Soluzioni Rapide</h4>
                    <p style={{ margin: 0, color: '#666' }}>Trova aiuto in pochi minuti</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #1e88e5, #42a5f5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    🛡️
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#333' }}>Pagamenti Sicuri</h4>
                    <p style={{ margin: 0, color: '#666' }}>Transazioni protette e garantite</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    background: 'linear-gradient(135deg, #1e88e5, #42a5f5)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    flexShrink: 0
                  }}>
                    🌍
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.3rem', margin: '0 0 5px 0', color: '#333' }}>Persone Vicine</h4>
                    <p style={{ margin: 0, color: '#666' }}>Trova aiuto nella tua zona</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 20px', background: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>Cosa Dicono di Noi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            
            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '15px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ marginBottom: '20px' }}>
                {'⭐'.repeat(5)}
              </div>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#666', fontStyle: 'italic' }}>
                "Ho trovato subito qualcuno per portare fuori il mio cane. Servizio fantastico!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#ff6b35',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  M
                </div>
                <span style={{ fontWeight: 'bold', color: '#333' }}>Marco T.</span>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '15px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ marginBottom: '20px' }}>
                {'⭐'.repeat(5)}
              </div>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#666', fontStyle: 'italic' }}>
                "Guadagno extra aiutando con le pulizie. Perfetto per arrotondare!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#1e88e5',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  S
                </div>
                <span style={{ fontWeight: 'bold', color: '#333' }}>Sofia R.</span>
              </div>
            </div>

            <div style={{ 
              background: 'white', 
              padding: '30px', 
              borderRadius: '15px', 
              boxShadow: '0 5px 20px rgba(0,0,0,0.1)' 
            }}>
              <div style={{ marginBottom: '20px' }}>
                {'⭐'.repeat(5)}
              </div>
              <p style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#666', fontStyle: 'italic' }}>
                "App intuitiva e pagamenti sicuri. Lo consiglio a tutti!"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: '#e91e63',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold'
                }}>
                  L
                </div>
                <span style={{ fontWeight: 'bold', color: '#333' }}>Luca P.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" style={{ padding: '80px 20px', background: 'white' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', textAlign: 'center', color: '#333' }}>
            Domande Frequenti
          </h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {faqData.map((faq, index) => (
              <div 
                key={index}
                style={{
                  border: '1px solid #eee',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: expandedFaq === index ? '#f8f9fa' : 'white',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '1.2rem',
                    fontWeight: 'bold',
                    color: '#333',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    transition: 'background-color 0.3s'
                  }}
                >
                  <span style={{ fontSize: '1.5rem' }}>{faq.emoji}</span>
                  <span style={{ flex: 1 }}>{faq.question}</span>
                  <span style={{ 
                    fontSize: '1.5rem',
                    transform: expandedFaq === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s'
                  }}>
                    ▼
                  </span>
                </button>
                
                {expandedFaq === index && (
                  <div style={{
                    padding: '20px',
                    background: '#f8f9fa',
                    borderTop: '1px solid #eee'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      color: '#666', 
                      fontSize: '1.1rem',
                      lineHeight: '1.6'
                    }}>
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section style={{
        background: 'linear-gradient(135deg, #ff6b35 0%, #e91e63 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px', fontWeight: 'bold' }}>
            Pronto a Iniziare?
          </h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px', opacity: 0.9 }}>
            Unisciti alla community di GigAsk e scopri quanto è facile trovare o offrire aiuto
          </p>
          
          <form onSubmit={handleEmailSubmit} style={{
            display: 'flex',
            gap: '15px',
            marginTop: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            <input
              type="email"
              placeholder="La tua email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitting || isSubmitted}
              style={{
                padding: '15px 20px',
                fontSize: '18px',
                border: '2px solid #ddd',
                borderRadius: '30px',
                minWidth: '300px',
                outline: 'none',
                transition: 'border-color 0.3s'
              }}
            />
            <button
              type="submit"
              disabled={isSubmitting || isSubmitted || !email.trim()}
              style={{
                background: isSubmitted ? '#28a745' : 'linear-gradient(135deg, #ff6b35, #e91e63)',
                color: 'white',
                border: 'none',
                padding: '15px 30px',
                fontSize: '18px',
                borderRadius: '30px',
                cursor: isSubmitting || isSubmitted ? 'default' : 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s',
                opacity: isSubmitting || isSubmitted || !email.trim() ? 0.7 : 1
              }}
            >
              {isSubmitted ? '✓ Registrato!' : isSubmitting ? 'Invio...' : 'Unisciti alla Lista!'}
            </button>
          </form>
          
          {error && (
            <div style={{
              color: '#ffebee',
              marginTop: '15px',
              fontSize: '16px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.1)',
              padding: '10px 20px',
              borderRadius: '25px',
              display: 'inline-block'
            }}>
              {error}
            </div>
          )}
          
          <p style={{ fontSize: '0.9rem', marginTop: '20px', opacity: 0.8 }}>
            Ti avviseremo quando l'app sarà disponibile
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#333', color: 'white', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
            <Logo size={30} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>GigAsk</span>
          </div>
          <p style={{ margin: 0, opacity: 0.8 }}>© 2024 GigAsk. La piattaforma per piccoli lavori e servizi.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
'''

# Scrivi il nuovo file
with open('src/App.jsx', 'w') as f:
    f.write(app_template)

print("Functional App.jsx created successfully!")
